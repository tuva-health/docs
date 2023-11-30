---
id: reference-data
title: "Reference Data"
---

## Geographic Datasets
The US Census provides geographic shape files for different grains of census areas.
We use three primary areas: County, Tract and Block Group.

You can find the original file downloads from the Census [here](https://www.census.gov/cgi-bin/geo/shapefiles/index.php)

For census tract and census block groups the Census provides shapefiles on a state by state basis. 
We want to create and use a single table for tracts and a single table for block groups so we have combined
the shape files to make it easier to create the tables. You can find the County, Tract and Block Group
shapefiles in our S3 reference bucket.
- [County](https://tuva-public-resources.s3.amazonaws.com/reference-data/2022+Census+Shapefiles/us-census-counties.zip)
- [Tract](https://tuva-public-resources.s3.amazonaws.com/reference-data/2022+Census+Shapefiles/us-census-tracts.zip)
- [Block Group](https://tuva-public-resources.s3.amazonaws.com/reference-data/2022+Census+Shapefiles/us-census-block-groups.zip)

For convenience, we also host the [CDC/ATSDR Social Vulnerability Index (SVI)](https://svi.cdc.gov/data-and-tools-download.html)
here: [SVI Tracts](https://tuva-public-resources.s3.amazonaws.com/reference-data/SVI/SVI_2020_US.zip) &
[SVI County](https://tuva-public-resources.s3.amazonaws.com/reference-data/SVI/SVI_2020_US_county.zip). 
The SVI is a measure of the social vulnerability of a county or census tract. We have both files available.

While we have schemas and queries for Neighborhood Atlas Area Deprivation Index (ADI), we do not host the data due
to licensing restrictions.
You can find the ADI data [here](https://www.neighborhoodatlas.medicine.wisc.edu/). 

In some cases you might want to use zipcode as a grain. There is not a one-to-one relationship between zipcodes
and tracts but you can use the 
[Census Zip Code Tabulation Areas (ZCTA)](https://www.census.gov/geographies/reference-maps/2010/geo/2010-zcta-rel.html)
or the HUD [ZIP Code Crosswalk Files](https://www.huduser.gov/portal/datasets/usps_crosswalk.html). For convenience,
we also host the crosswalks in our reference bucket: 
- [Zip to Tract](https://tuva-public-resources.s3.amazonaws.com/reference-data/Crosswalks/ZIP_TRACT_032023.csv)
- [Tract to Zip](https://tuva-public-resources.s3.amazonaws.com/reference-data/Crosswalks/TRACT_ZIP_032023.csv)

## FIPS
For a full breakdown of ANSI FIPS codes, please see [here](https://www.census.gov/library/reference/code-lists/ansi.html).

In the case of The Tuva Project we are mainly concerned with the following FIPS codes:
State, County, Tract and Block Group.

Each State has a unique two digit FIPS code. For example, California is 06 and New York is 36.

Each county has a unique five digit FIPS code. The first two digits are the state FIPS code and the last three are
the county. 

The next level we care about is the census tract. Each tract has a unique 11 digit FIPS code. The first two digits
are the state FIPS code, the next three are the county FIPS code and the last six are the tract FIPS code.

Finally, we have the census block group. Each block group has a unique 12 digit FIPS code. The first two digits
are the state FIPS code, the next three are the county FIPS code, the next six are the tract FIPS code and the last
digit is the block group FIPS code.

There are other codes and levels of granularity but these are the ones we use in The Tuva Project. For a full
breakdown of GEOIDs please see [here](https://www.census.gov/programs-surveys/geography/guidance/geo-identifiers.html).


## Dataset Descriptions
### Census Shapefiles
The full documentation of data fields can be found [here](https://www2.census.gov/geo/pdfs/maps-data/data/tiger/tgrshp2023/TGRSHP2023_TechDoc.pdf).

Here is a brief description of the fields taken from the above full documentation: 

Block Groups

| Field     | Length | Type   | Description                                                                                     |
|-----------|--------|--------|-------------------------------------------------------------------------------------------------|
| STATEFP   | 2      | String | Current state FIPS code                                                                         |
| COUNTYFP  | 3      | String | Current county FIPS code                                                                        |
| TRACTCE   | 6      | String | Current census tract code                                                                       |
| BLKGRPCE  | 1      | String | Current block group number                                                                      |
| GEOID     | 12     | String | Census block group identifier; a concatenation of the current state FIPS code, county FIPS code, census tract code, and block group number. |
| NAMELSAD  | 13     | String | Current translated legal/statistical area description and the block group number                |
| MTFCC     | 5      | String | MAF/TIGER Feature Class Code (G5030)                                                            |
| FUNCSTAT  | 1      | String | Current functional status                                                                       |
| ALAND     | 14     | Number | Current land area                                                                               |
| AWATER    | 14     | Number | Current water area                                                                              |
| INTPTLAT  | 11     | String | Current latitude of the internal point                                                          |
| INTPTLON  | 12     | String | Current longitude of the internal point                                                         |

Census Tracts


| Field     | Length | Type   | Description                                                                                     |
|-----------|--------|--------|-------------------------------------------------------------------------------------------------|
| STATEFP   | 2      | String | Current state FIPS code                                                                         |
| COUNTYFP  | 3      | String | Current county FIPS code                                                                        |
| TRACTCE   | 6      | String | Current census tract code                                                                       |
| GEOID     | 12     | String | Census block group identifier; a concatenation of the current state FIPS code, county FIPS code, census tract code, and block group number. |
| NAMELSAD  | 13     | String | Current translated legal/statistical area description and the block group number                |
| MTFCC     | 5      | String | MAF/TIGER Feature Class Code (G5030)                                                            |
| FUNCSTAT  | 1      | String | Current functional status                                                                       |
| ALAND     | 14     | Number | Current land area                                                                               |
| AWATER    | 14     | Number | Current water area                                                                              |
| INTPTLAT  | 11     | String | Current latitude of the internal point                                                          |
| INTPTLON  | 12     | String | Current longitude of the internal point                                                         |


## Creating the Reference Tables

In order to create the geospatial tables in Snowflake it requires a special user defined function (UDF). 

```SQL
CREATE OR REPLACE FUNCTION tuva.geocoded.PY_LOAD_GEOFILE(PATH_TO_FILE string, FILENAME string)
returns table (wkb binary, properties object)
language python
runtime_version = 3.8
packages = ('fiona', 'shapely', 'snowflake-snowpark-python')
handler = 'GeoFileReader'
AS $$
from shapely.geometry import shape
from snowflake.snowpark.files import SnowflakeFile
from fiona.io import ZipMemoryFile
class GeoFileReader:
    def process(self, PATH_TO_FILE: str, filename: str):
        with SnowflakeFile.open(PATH_TO_FILE, 'rb') as f:
            with ZipMemoryFile(f) as zip:
                with zip.open(filename) as collection:
                    for record in collection:
                        if (not (record['geometry'] is None)):
                            yield ((shape(record['geometry']).wkb, dict(record['properties'])))
$$;
```
Once you have created the UDF you can use it to load the data into the tables. 

Download the shapefiles from the reference bucket and upload them to a stage in Snowflake.

Create a stage in Snowflake.
```sql
CREATE OR REPLACE STAGE tuva.geocoded.CENSUS_BG_STAGE;

grant all PRIVILEGES on stage tuva.geocoded.CENSUS_BG_STAGE to accountadmin;
```
Remember to update the role you need to grant the permissions to. 

Upload the shapefiles to the stage. 
```sql
PUT file:///Users/user/Downloads/us-census-tracts.zip @CENSUS_BG_STAGE AUTO_COMPRESS=FALSE;
```
Remember to adjust the path in the PUT command to match your download location. 

Create the table. 
```sql
create or replace table tuva.reference.census_tracts as
SELECT
to_geography(wkb, True) as geography,
properties
FROM
	table(tuva.core.PY_LOAD_GEOFILE
			(build_scoped_file_url
				(@CENSUS_BG_STAGE, 'us-census-tracts.zip'),
				                   'us-census-tracts.shp')
)
;
```

Repeat for the census block groups (you can reuse the same stage). 

```sql
PUT file:///Users/user/Downloads/us-census-block-groups.zip @CENSUS_BG_STAGE AUTO_COMPRESS=FALSE;

create or replace table tuva.reference.census_block_groups as
SELECT
to_geography(wkb, True) as geography,
properties
FROM
	table(tuva.core.PY_LOAD_GEOFILE
			(build_scoped_file_url
				(@CENSUS_BG_STAGE, 'us-census-block-groups.zip'),
				                   'us-census-block-groups.shp')
);
```
If you are also loading the SDoH datasets (SVI and ADI) you can use the same stage and process. 

```sql
PUT file:///Users/user/Downloads/SVI2020_US.csv @CENSUS_BG_STAGE AUTO_COMPRESS=FALSE;

create or replace table tuva.reference.svi (
    ST varchar, STATE varchar, ST_ABBR varchar, STCNTY varchar, COUNTY varchar, FIPS varchar
, LOCATION varchar, AREA_SQMI varchar, E_TOTPOP varchar, M_TOTPOP varchar, E_HU varchar
, M_HU varchar, E_HH varchar, M_HH varchar, E_POV150 varchar, M_POV150 varchar
, E_UNEMP varchar, M_UNEMP varchar, E_HBURD varchar, M_HBURD varchar, E_NOHSDP varchar
, M_NOHSDP varchar, E_UNINSUR varchar, M_UNINSUR varchar, E_AGE65 varchar, M_AGE65 varchar
, E_AGE17 varchar, M_AGE17 varchar, E_DISABL varchar, M_DISABL varchar, E_SNGPNT varchar
, M_SNGPNT varchar, E_LIMENG varchar, M_LIMENG varchar, E_MINRTY varchar, M_MINRTY varchar
, E_MUNIT varchar, M_MUNIT varchar, E_MOBILE varchar, M_MOBILE varchar, E_CROWD varchar
, M_CROWD varchar, E_NOVEH varchar, M_NOVEH varchar, E_GROUPQ varchar, M_GROUPQ varchar
, EP_POV150 varchar, MP_POV150 varchar, EP_UNEMP varchar, MP_UNEMP varchar, EP_HBURD varchar
, MP_HBURD varchar, EP_NOHSDP varchar, MP_NOHSDP varchar, EP_UNINSUR varchar, MP_UNINSUR varchar
, EP_AGE65 varchar, MP_AGE65 varchar, EP_AGE17 varchar, MP_AGE17 varchar, EP_DISABL varchar
, MP_DISABL varchar, EP_SNGPNT varchar, MP_SNGPNT varchar, EP_LIMENG varchar, MP_LIMENG varchar
, EP_MINRTY varchar, MP_MINRTY varchar, EP_MUNIT varchar, MP_MUNIT varchar, EP_MOBILE varchar
, MP_MOBILE varchar, EP_CROWD varchar, MP_CROWD varchar, EP_NOVEH varchar, MP_NOVEH varchar
, EP_GROUPQ varchar, MP_GROUPQ varchar, EPL_POV150 varchar, EPL_UNEMP varchar, EPL_HBURD varchar
, EPL_NOHSDP varchar, EPL_UNINSUR varchar, SPL_THEME1 varchar, RPL_THEME1 varchar, EPL_AGE65 varchar
, EPL_AGE17 varchar, EPL_DISABL varchar, EPL_SNGPNT varchar, EPL_LIMENG varchar, SPL_THEME2 varchar
, RPL_THEME2 varchar, EPL_MINRTY varchar, SPL_THEME3 varchar, RPL_THEME3 varchar, EPL_MUNIT varchar
, EPL_MOBILE varchar, EPL_CROWD varchar, EPL_NOVEH varchar, EPL_GROUPQ varchar, SPL_THEME4 varchar
, RPL_THEME4 varchar, SPL_THEMES varchar, RPL_THEMES varchar, F_POV150 varchar, F_UNEMP varchar
, F_HBURD varchar, F_NOHSDP varchar, F_UNINSUR varchar, F_THEME1 varchar, F_AGE65 varchar
, F_AGE17 varchar, F_DISABL varchar, F_SNGPNT varchar, F_LIMENG varchar, F_THEME2 varchar
, F_MINRTY varchar, F_THEME3 varchar, F_MUNIT varchar, F_MOBILE varchar, F_CROWD varchar
, F_NOVEH varchar, F_GROUPQ varchar, F_THEME4 varchar, F_TOTAL varchar, E_DAYPOP varchar
, E_NOINT varchar, M_NOINT varchar, E_AFAM varchar, M_AFAM varchar, E_HISP varchar
, M_HISP varchar, E_ASIAN varchar, M_ASIAN varchar, E_AIAN varchar, M_AIAN varchar
, E_NHPI varchar, M_NHPI varchar, E_TWOMORE varchar, M_TWOMORE varchar, E_OTHERRACE varchar
, M_OTHERRACE varchar, EP_NOINT varchar, MP_NOINT varchar, EP_AFAM varchar, MP_AFAM varchar
, EP_HISP varchar, MP_HISP varchar, EP_ASIAN varchar, MP_ASIAN varchar, EP_AIAN varchar
, MP_AIAN varchar, EP_NHPI varchar, MP_NHPI varchar, EP_TWOMORE varchar, MP_TWOMORE varchar
, EP_OTHERRACE varchar, MP_OTHERRACE varchar
);

copy into tuva.reference.svi from @CENSUS_BG_STAGE/SVI2020_US.csv
File_format = (type = CSV FIELD_OPTIONALLY_ENCLOSED_BY = '"'  SKIP_HEADER = 1);
```

```sql
PUT file:///Users/user/Downloads/US_2021_ADI_Census_Block_Group_v4_0_1.csv @CENSUS_BG_STAGE AUTO_COMPRESS=FALSE;

create table tuva.reference.adi (
  GISJOIN varchar
 ,FIPS varchar
 ,ADI_NATRANK varchar
 ,ADI_STATERNK varchar
);

copy into tuva.reference.adi from @CENSUS_BG_STAGE/US_2021_ADI_Census_Block_Group_v4_0_1.csv
File_format = (type = CSV FIELD_OPTIONALLY_ENCLOSED_BY = '"' SKIP_HEADER = 1);
```

Remember for ADI data you need to register and download it from the 
[Neighborhood Atlas](https://www.neighborhoodatlas.medicine.wisc.edu/).