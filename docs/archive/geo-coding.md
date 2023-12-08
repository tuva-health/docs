---
id: geo-coding
title: "Geo-coding"
---

We use a geocoding service to convert patient addresses to longitude and latitude. 
Having longitude and latitude available allows us to perform geospatial queries to enrich 
data with other location based datasets like [social determinants of health](/knowledge-base/sdoh), for example. 
It also allows us to create geospatial plots like this example Social Vulnerability Index map: 

![SVI Map](/img/svi-map.png)

We currently use AWS Location Services to perform our geocoding process but you can use any HIPAA approved process. 

Our process has the following workflow: 

![Generic AWS Geocoding Flow](/img/Generic_AWS_Geocoding_Flow.png)

The terraform code for creating the infrastructure and python code for the lambda functions are 
available in [this repo](https://github.com/tuva-health/geo-coding) if you want to use this 
same process. There is a README.md in the repo that details how to deploy. 

We also have several geographic reference data sets available from public sources. 
For details on our reference data please see [this page](/reference-data).

If you are using The Tuva Project you can create tables for Social Determinants of Health and different 
grains of patient location using the following queries. Please note some of these queries are currently 
specific to Snowflake. 

You will need to create an AWS role that allows access to the bucket you want to read from and write to and 
note the ARN. You then need to create a storage integration in Snowflake that uses that role. 

To create the storage integration: 
```sql
create or replace storage integration <NAME>
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'S3'
  ENABLED = TRUE
  STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::<AWSACCOUNTNUM>:role/<ROLENAME>'
  STORAGE_ALLOWED_LOCATIONS = ('<S3BUCKET>')
```

Please make sure to replace: 
- <NAME\>
- <AWSACCOUNTNUM\>
- <ROLENAME\>
- <S3BUCKET\>

Here is an example creation: 

```sql
create or replace storage integration tuva
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'S3'
  ENABLED = TRUE
  STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::123456789123:role/aws-tuva-s3'
  STORAGE_ALLOWED_LOCATIONS = ('s3://s3-example-bucket/')
```

For the rest of this example we will assume in the terraform code above you set your pre-geocode 
prefix to `/pre_geocode` and your post-geocode prefix to `/post_geocode`.

If you are using the Tuva data model you can unload the correct data with this query: 

```sql
copy into s3://s3-example-bucket/pre_geocode/
from (
    select
        PATIENT_ID,
        ADDRESS,
        CITY,
        STATE,
        ZIP_CODE
    from tuva.core.patient
    where address is not null
    )
storage_integration = tuva
file_format = (type = csv COMPRESSION = NONE SKIP_HEADER = 0
field_optionally_enclosed_by = '"')
HEADER = TRUE
overwrite = TRUE
```

Once the geocoding process has finished (you can monitor this in the AWS Console -> SQS Queue) you can 
create a table for the raw geocoded data and read it back in. 

```sql
CREATE or replace TABLE tuva.geocoded.raw_geocoded (data VARIANT);
```

```SQL
COPY INTO tuva.geocoded.raw_geocoded
FROM s3://s3-example-bucket/post_geocode/
storage_integration = tuva
FILE_FORMAT = (TYPE = 'JSON');
```

We then convert the JSON data into a table with separate columns: 

```SQL
create or replace table tuva.geocoded.geocoded_patients as (
select data:Patient_id::varchar as Patient_id, data:Latitude as Latitude, data:Longitude as Longitude
from tuva.geocoded.raw_geocoded
);
```

Now we can start to join the data to other [geography tables](/reference-data/#geographic-datasets) 
using geospatial queries. 

The next two examples will create tables that add [census block groups](/reference-data/#census-shapefiles) 
and [census tracts](reference-data/#census-shapefiles) from census geospatial tables. Census tracts can be used 
to link [Social Vulnerability Index (SVI)](/knowledge-base/sdoh#social-vulnerability-index) data and block groups can be used to 
link [Area Deprivation Index (ADI)](/knowledge-base/sdoh#neighborhood-atlas-adi) data. 

Please see [this documentation](/reference-data#creating-the-reference-tables) for instructions on how to 
create the 
geospatial reference tables.

Census Tracts: 
```SQL
create or replace table tuva.geocoded.patient_tracts as (
select a.patient_id::varchar patient_id, b.PROPERTIES:GEOID::STRING FIPS
from tuva.geocoded.geocoded_patients a
join tuva.reference.census_tracts b
on st_contains(GEOGRAPHY, st_point(a.longitude, a.latitude))
);
```


Census Block Groups:
```SQL
create or replace table tuva.geocoded.patient_block_groups as (
select a.patient_id::string patient_id, b.PROPERTIES:GEOID::STRING FIPS
from tuva.geocoded.geocoded_patients a
join tuva.reference.census_block_groups b
on st_contains(b.GEOGRAPHY, st_point(a.longitude, a.latitude))
);
```

For detailed descriptions of the differences between State, County, Tract and Block Group and Zip 
please [see here](reference-data#FIPS).

The above queries use geospatial functions that may not be available in every data warehouse. 
The `GEOGRAPHY` column is a special columns that contains a list of points that creates a polygon. 
The function `st_contains` returns TRUE if a specific point exists inside the polygon. 
We use the `st_point` function to create that point using the longitude and latitude retrieved from 
the geocoding process. 

This part of the query essential says find the polygon that contains my point. 
```SQL
on st_contains(b.GEOGRAPHY, st_point(a.longitude, a.latitude))
```

Now we have retrieved the GEOID or FIPS code for the census tracts and block groups we can enrich the data 
by creating a couple SDoH tables if you have 
[loaded the reference tables](/reference-data#creating-the-reference-tables).

SVI:
```SQL
create or replace table tuva.geocoded.patient_svi as (
select a.patient_id, b.*
from tuva.geocoded.patient_tracts a
join tuva.reference.svi b
on a.fips = b.fips
);
```

ADI: 
```SQL
create or replace table tuva.geocoded.patient_adi as (
select a.patient_id, b.*
from tuva.geocoded.patient_block_groups a
join tuva.reference.adi b
on a.fips = b.fips
);
```


