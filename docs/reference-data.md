---
id: reference-data
title: "Reference Data"
---

The Tuva Project contains a variety of datasets that are useful for healthcare analytics.  We call these datasets reference datasets.  These reference datasets are hosted on a public AWS S3 bucket.

| Reference Dataset                                         | Description                                                                                                                                      |
|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| [Calendar](#calendar)                                     | Contains a record for every day of the year from 1900 through 2100 and a number of date-related concepts (e.g. is the day a weekday or weekend). |
| [Census Shape Files](#census-shape-files)                 | The U.S. Census provides geographic shape files for different grains of census areas including: County, Tract and Block Group.                   |
| [Code Type](#code-type)                                   | Tuva expected values for code type across marts                                                                                                  |
| [FIPS](#fips)                                             | ANSI FIPS codes identify specific geographic areas such as states and counties.                                                                  |
| [Provider Data](#provider-data)                           | Provider data is created from NPPES and NUCC Taxonomy.                                                                                           |
| [Social Vulnerability Index](#social-vulnerability-index) | A variety of SDOH variables and composites.                                                                                                      |
| [Zip Codes](#zip-codes)                                   | A list of all zip codes in the U.S.                                                                                                              |


## Calendar
It's often useful to have a calendar table handy for analytics.  We provide a calendar data which includes one record for every date from January 1, 1900 through the year 2100.  For every date in the table we provide a variety of useful transformations such as:
- year
- month
- day
- month_name
- day_of_week_number
- day_of_week_name
- week_of_year
- day_of_year
- year_month
- first_day_of_month
- last_day_of_month

## Census Shape Files
The U.S. Census provides geographic shape files for different grains of census areas.  We use three primary areas: County, Tract and Block Group.  You can find the original file downloads from the U.S. Census [here](https://www.census.gov/cgi-bin/geo/shapefiles/index.php).

For census tract and block groups, the U.S. Census provides shapefiles on a state by state basis.  We have preprocessed these state files to create single shape files for the entire U.S.  You can find the County, Tract and Block Group shapefiles in our S3 reference bucket here:
- [County](https://tuva-public-resources.s3.amazonaws.com/reference-data/2022+Census+Shapefiles/us-census-counties.zip)
- [Tract](https://tuva-public-resources.s3.amazonaws.com/reference-data/2022+Census+Shapefiles/us-census-tracts.zip)
- [Block Group](https://tuva-public-resources.s3.amazonaws.com/reference-data/2022+Census+Shapefiles/us-census-block-groups.zip)

The full documentation of data fields can be found [here](https://www2.census.gov/geo/pdfs/maps-data/data/tiger/tgrshp2023/TGRSHP2023_TechDoc.pdf).  Here is a brief description of the fields taken from the above full documentation: 

**Block Groups:**

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

**Census Tracts:**

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

## Code Type
Records in Tuva can only be used in for analytics if the codes used to identify clinical elements are labeled
in a standardized manner.  The values in found in the code_type reference data dictionary must be used in any
'source_code_type` column in order for Tuva to use the codes in any downstream marts.


## FIPS
We make several FIPS datasets available:
- [State](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__ansi_fips_state.csv)
- [County](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__fips_county.csv)

For a full breakdown of ANSI FIPS codes, please see [here](https://www.census.gov/library/reference/code-lists/ansi.html).

Here's a brief explanation of how FIPS works:
- Each State has a unique two digit FIPS code. For example, California is 06 and New York is 36.
- Each county has a unique five digit FIPS code. The first two digits are the state FIPS code and the last three are
the county. 
- The next level we care about is the census tract. Each tract has a unique 11 digit FIPS code. The first two digits
are the state FIPS code, the next three are the county FIPS code and the last six are the tract FIPS code.
- Finally, we have the census block group. Each block group has a unique 12 digit FIPS code. The first two digits
are the state FIPS code, the next three are the county FIPS code, the next six are the tract FIPS code and the last
digit is the block group FIPS code.

There are other codes and levels of granularity but these are the ones we use in The Tuva Project. For a full
breakdown of GEOIDs please see [here](https://www.census.gov/programs-surveys/geography/guidance/geo-identifiers.html).

## Provider Data
We include two provider datasets which we've created from NPPES and NUCC Taxonomy.  

## Social Vulnerability Index
SVI has 158 faw variables that are grouped into 15 measure. These measures are then grouped into 4 themes.
The composite score of the 4 themes is the SVI score.

Themes:
1. Socioeconomic Status
2. Household Composition & Disability
3. Racial & Ethnic Minority Status
4. Housing Type & Transportation

Here is a good representation from the official website: 
![SVI](https://www.atsdr.cdc.gov/placeandhealth/svi/documentation/SVI-Variables.png?_=02699)

For a full data dictionary of all the available data you can reference the official documentation
[here](https://www.atsdr.cdc.gov/placeandhealth/svi/documentation/SVI_documentation_2020.html).

The [Social Vulnerability Index (SVI)](https://svi.cdc.gov/data-and-tools-download.html) datasets are available here: 
- [SVI Tracts](https://tuva-public-resources.s3.amazonaws.com/reference-data/SVI/SVI_2020_US.zip)
- [SVI County](https://tuva-public-resources.s3.amazonaws.com/reference-data/SVI/SVI_2020_US_county.zip) 

**Area Depreviation Index**
Neighborhood Atlas ADI data is based on the Area Deprivation Index is developed by the University of Wisconsin. The ADI is a composite measure of socioeconomic status that includes variables for income, education, employment, and housing quality. 

The ADI is calculated for each census tract in the United States and is then grouped into deciles.  The lower the ADI decile the more affluent the area. ADI provides nationwide score as well as state ranked scores. 

We are not able to host the Area Deprivation Index data due to licensing restrictions.  You can find the ADI data [here](https://www.neighborhoodatlas.medicine.wisc.edu/). 

## Zip Codes
In some cases you might want to use zipcode as a grain. There is not a one-to-one relationship between zipcodes
and tracts but you can use the 
[Census Zip Code Tabulation Areas (ZCTA)](https://www.census.gov/geographies/reference-maps/2010/geo/2010-zcta-rel.html)
or the HUD [ZIP Code Crosswalk Files](https://www.huduser.gov/portal/datasets/usps_crosswalk.html). For convenience,
we also host the crosswalks in our reference bucket: 
- [Zip to Tract](https://tuva-public-resources.s3.amazonaws.com/reference-data/Crosswalks/ZIP_TRACT_032023.csv)
- [Tract to Zip](https://tuva-public-resources.s3.amazonaws.com/reference-data/Crosswalks/TRACT_ZIP_032023.csv)

## Data Dictionaries

See the data dictionaries for our reference data [here](data-dictionaries/reference-data)