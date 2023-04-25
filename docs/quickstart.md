---
id: quickstart
title: "Quickstart"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to setup the Tuva Project on your healthcare data.

<!-- <div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}>
  <iframe src="https://www.loom.com/embed/c6ac1645ced94463ada69a54ab112819" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}></iframe>
</div> -->

## Prerequisites

To get started with the Tuva Project, you will need:

1. dbt version 1.3 or greater.  You can use either [dbt cloud](https://cloud.getdbt.com/) or [dbt CLI](https://docs.getdbt.com/dbt-cli/cli-overview).
2. Access to one of the data warehouses currently supported by the Tuva Project (i.e. Snowflake, Redshift, and BigQuery).

## Step 1: Map Your Data

The first step is mapping your data to the Input Layer.  The Input Layer is a data model that acts like an API for the rest of the Tuva Project.  Once your data has been mapped to the Input Layer data model you can run the entire Tuva Project.  There are two options for mapping your data to the Input Layer, depending on the type of data you have.  

**Standard Data Formats:** If your data source is a standard format that we have a connector for, you can use a connector to map your data.  A connector is just a dbt package that maps a standard data format to the Input Layer.  We currently have connectors for the following standard data formats:
- [Medicare LDS](https://github.com/tuva-health/medicare_saf_connector)
- [Medicare CCLF](https://github.com/tuva-health/medicare_cclf_connector)

**Custom Data Formats:** If your data source is in a custom format (i.e. any data source that we don't have a connector for) then you need to create SQL models in your dbt project that map your data to the Input Layer.  You can find the Input Layer data dictionary in the data marts section of these docs.  The mapping models need to match the definition of the Input Layer exactly (i.e. same table names, column names, and data types).

If you need help mapping your data, feel free to post in [#buildersask](https://thetuvaproject.slack.com/archives/C03DET9ETK3) on Slack.

## Step 2: Import the Tuva Package

The next step is to import [the Tuva Project](https://github.com/tuva-health/the_tuva_project) package into your dbt project.  A [package](https://docs.getdbt.com/docs/build/packages) is dbt’s version of a library for modularized code.  Follow these steps to import the package:

1. Create a `packages.yml` file under the parent folder of your dbt project
2. Add the following lines of code to the `packages.yml` file:
```yml
packages:
  - package: tuva-health/the_tuva_project
    version: 0.3.0
```
3. Execute the command `dbt deps` to import the package into your project

## Step 3: Execute dbt build

You're now ready to run the Tuva Project on your data.  Execute the command `dbt build`. This will build all models, load all seeds, and run all tests.

## Optional: Terminology Only

If you only want to download terminology from our S3 bucket to your data warehouse you can execute the SQL below.  We currently support direct download of terminology for the following data warehouses:
- Snowflake
- Redshift
- BigQuery

Before running the SQL below you need to create a database called `tuva`.  Once you've done this, copy and paste and execute the SQL below in your data warehouse.  This will automatically download all the terminology sets and load them into your data warehouse.

<Tabs groupId="load_scripts">
<TabItem value="snowflake" label="Snowflake">

<details><summary>Snowflake Load Script</summary>

```
create schema if not exists TERMINOLOGY;
Use schema TERMINOLOGY;


create or replace TABLE TERMINOLOGY.ADMIT_SOURCE (
	ADMIT_SOURCE_CODE VARCHAR,
	ADMIT_SOURCE_DESCRIPTION VARCHAR,
	NEWBORN_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.ADMIT_SOURCE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/admit_source\.csv.*';


create or replace TABLE TERMINOLOGY.ADMIT_TYPE (
	ADMIT_TYPE_CODE VARCHAR,
	ADMIT_TYPE_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.ADMIT_TYPE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/admit_type\.csv.*';


create or replace TABLE TERMINOLOGY.ANSI_FIPS_STATE (
	ANSI_FIPS_STATE_CODE VARCHAR,
	ANSI_FIPS_STATE_ABBREVIATION VARCHAR,
	ANSI_FIPS_STATE_NAME VARCHAR
);
copy into TERMINOLOGY.ANSI_FIPS_STATE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/ansi_fips_state\.csv.*';


create or replace TABLE TERMINOLOGY.APR_DRG (
	APR_DRG_CODE VARCHAR,
	SEVERITY VARCHAR,
	APR_DRG_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.APR_DRG
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/apr_drg\.csv.*';


create or replace TABLE TERMINOLOGY.BILL_TYPE (
	BILL_TYPE_CODE VARCHAR,
	BILL_TYPE_DESCRIPTION VARCHAR,
	DEPRECATED NUMBER(38,0),
	DEPRECATED_DATE DATE
);
copy into TERMINOLOGY.BILL_TYPE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/bill_type\.csv.*';


create or replace TABLE TERMINOLOGY.CALENDAR (
	FULL_DATE DATE NOT NULL,
	YEAR NUMBER(38,0) NOT NULL,
	MONTH NUMBER(38,0) NOT NULL,
	DAY NUMBER(38,0) NOT NULL,
	MONTH_NAME VARCHAR(3) NOT NULL,
	DAY_OF_WEEK_NUMBER NUMBER(38,0) NOT NULL,
	DAY_OF_WEEK_NAME VARCHAR(9) NOT NULL,
	WEEK_OF_YEAR NUMBER(38,0) NOT NULL,
	DAY_OF_YEAR NUMBER(38,0) NOT NULL,
	YEAR_MONTH VARCHAR(7) NOT NULL,
	FIRST_DAY_OF_MONTH DATE NOT NULL,
	LAST_DAY_OF_MONTH DATE NOT NULL
);
copy into TERMINOLOGY.CALENDAR
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/calendar\.csv.*';


create or replace TABLE TERMINOLOGY.CLAIM_TYPE (
	CLAIM_TYPE VARCHAR
);
copy into TERMINOLOGY.CLAIM_TYPE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/claim_type\.csv.*';


create or replace TABLE TERMINOLOGY.CODE_TYPE (
	CODE_TYPE VARCHAR
);
copy into TERMINOLOGY.CODE_TYPE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/code_type\.csv.*';


create or replace TABLE TERMINOLOGY.DISCHARGE_DISPOSITION (
	DISCHARGE_DISPOSITION_CODE VARCHAR,
	DISCHARGE_DISPOSITION_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.DISCHARGE_DISPOSITION
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/discharge_disposition\.csv.*';


create or replace TABLE TERMINOLOGY.ENCOUNTER_TYPE (
	ENCOUNTER_TYPE VARCHAR
);
copy into TERMINOLOGY.ENCOUNTER_TYPE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/encounter_type\.csv.*';


create or replace TABLE TERMINOLOGY.ETHNICITY (
	CODE VARCHAR,
	DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.ETHNICITY
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/ethnicity\.csv.*';


create or replace TABLE TERMINOLOGY.FIPS_COUNTY (
	FIPS_CODE VARCHAR,
	COUNTY VARCHAR,
	STATE VARCHAR
);
copy into TERMINOLOGY.FIPS_COUNTY
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/fips_county\.csv.*';


create or replace TABLE TERMINOLOGY.GENDER (
	GENDER VARCHAR
);
copy into TERMINOLOGY.GENDER
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/gender\.csv.*';


create or replace TABLE TERMINOLOGY.HCPCS_LEVEL_2 (
	HCPCS VARCHAR,
	SEQNUM VARCHAR,
	RECID VARCHAR,
	LONG_DESCRIPTION VARCHAR(2000),
	SHORT_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.HCPCS_LEVEL_2
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/hcpcs_level_2\.csv.*';


create or replace TABLE TERMINOLOGY.ICD_10_CM (
	ICD_10_CM VARCHAR,
	VALID_FLAG VARCHAR,
	SHORT_DESCRIPTION VARCHAR,
	LONG_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.ICD_10_CM
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/icd_10_cm\.csv.*';


create or replace TABLE TERMINOLOGY.ICD_10_PCS (
	ICD_10_PCS VARCHAR,
	VALID_FLAG VARCHAR,
	SHORT_DESCRIPTION VARCHAR,
	LONG_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.ICD_10_PCS
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/icd_10_pcs\.csv.*';


create or replace TABLE TERMINOLOGY.MDC (
	MDC_CODE VARCHAR,
	MDC_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.MDC
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/mdc\.csv.*';


create or replace TABLE TERMINOLOGY.MEDICARE_DUAL_ELIGIBILITY (
	DUAL_STATUS_CODE VARCHAR,
	DUAL_STATUS_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.MEDICARE_DUAL_ELIGIBILITY
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/medicare_dual_eligibility\.csv.*';


create or replace TABLE TERMINOLOGY.MEDICARE_STATUS (
	MEDICARE_STATUS_CODE VARCHAR,
	MEDICARE_STATUS_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.MEDICARE_STATUS
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/medicare_status\.csv.*';


create or replace TABLE TERMINOLOGY.MS_DRG (
	MS_DRG_CODE VARCHAR,
	MDC_CODE VARCHAR,
	MEDICAL_SURGICAL VARCHAR,
	MS_DRG_DESCRIPTION VARCHAR,
	DEPRECATED NUMBER(38,0),
	DEPRECATED_DATE DATE
);
copy into TERMINOLOGY.MS_DRG
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/ms_drg\.csv.*';


create or replace TABLE TERMINOLOGY.OTHER_PROVIDER_TAXONOMY (
	NPI VARCHAR(35),
	TAXONOMY_CODE VARCHAR(35),
	MEDICARE_SPECIALTY_CODE VARCHAR(173),
	DESCRIPTION VARCHAR(101),
	PRIMARY_FLAG NUMBER(38,0)
);
copy into TERMINOLOGY.OTHER_PROVIDER_TAXONOMY
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/other_provider_taxonomy\.csv.*';


create or replace TABLE TERMINOLOGY.PAYER_TYPE (
	PAYER_TYPE VARCHAR
);
copy into TERMINOLOGY.PAYER_TYPE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/payer_type\.csv.*';


create or replace TABLE TERMINOLOGY.PLACE_OF_SERVICE (
	PLACE_OF_SERVICE_CODE VARCHAR,
	PLACE_OF_SERVICE_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.PLACE_OF_SERVICE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/place_of_service\.csv.*';


create or replace TABLE TERMINOLOGY.PRESENT_ON_ADMISSION (
	PRESENT_ON_ADMIT_CODE VARCHAR,
	PRESENT_ON_ADMIT_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.PRESENT_ON_ADMISSION
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/present_on_admission\.csv.*';


create or replace TABLE TERMINOLOGY.PROVIDER (
	NPI VARCHAR(35),
	ENTITY_TYPE_CODE VARCHAR(26),
	ENTITY_TYPE_DESCRIPTION VARCHAR(37),
	PRIMARY_TAXONOMY_CODE VARCHAR(35),
	PRIMARY_SPECIALTY_DESCRIPTION VARCHAR(173),
	PROVIDER_NAME VARCHAR(95),
	PARENT_ORGANIZATION_NAME VARCHAR(95),
	PRACTICE_ADDRESS_LINE_1 VARCHAR(80),
	PRACTICE_ADDRESS_LINE_2 VARCHAR(80),
	PRACTICE_CITY VARCHAR(65),
	PRACTICE_STATE VARCHAR(65),
	PRACTICE_ZIP_CODE VARCHAR(42),
	LAST_UPDATED DATE,
	DEACTIVATION_DATE DATE,
	DEACTIVATION_FLAG VARCHAR(80)
);
copy into TERMINOLOGY.PROVIDER
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/provider\.csv.*';


create or replace TABLE TERMINOLOGY.RACE (
	CODE VARCHAR,
	DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.RACE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/race\.csv.*';


create or replace TABLE TERMINOLOGY.REVENUE_CENTER (
	REVENUE_CENTER_CODE VARCHAR,
	REVENUE_CENTER_DESCRIPTION VARCHAR
);
copy into TERMINOLOGY.REVENUE_CENTER
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/revenue_center\.csv.*';


create or replace TABLE TERMINOLOGY.SSA_FIPS_STATE (
	SSA_FIPS_STATE_CODE VARCHAR,
	SSA_FIPS_STATE_NAME VARCHAR
);
copy into TERMINOLOGY.SSA_FIPS_STATE
    from s3://tuva-public-resources/terminology/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/ssa_fips_state\.csv.*';



create schema if not exists VALUE_SETS;
Use schema VALUE_SETS;


create or replace TABLE VALUE_SETS.ACUTE_DIAGNOSIS_CCS (
	CCS_DIAGNOSIS_CATEGORY VARCHAR,
	DESCRIPTION VARCHAR
);
copy into VALUE_SETS.ACUTE_DIAGNOSIS_CCS
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/acute_diagnosis_ccs\.csv.*';


create or replace TABLE VALUE_SETS.ACUTE_DIAGNOSIS_ICD_10_CM (
	ICD_10_CM VARCHAR,
	DESCRIPTION VARCHAR
);
copy into VALUE_SETS.ACUTE_DIAGNOSIS_ICD_10_CM
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/acute_diagnosis_icd_10_cm\.csv.*';


create or replace TABLE VALUE_SETS.ALWAYS_PLANNED_CCS_DIAGNOSIS_CATEGORY (
	CCS_DIAGNOSIS_CATEGORY VARCHAR,
	DESCRIPTION VARCHAR
);
copy into VALUE_SETS.ALWAYS_PLANNED_CCS_DIAGNOSIS_CATEGORY
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/always_planned_ccs_diagnosis_category\.csv.*';


create or replace TABLE VALUE_SETS.ALWAYS_PLANNED_CCS_PROCEDURE_CATEGORY (
	CCS_PROCEDURE_CATEGORY VARCHAR,
	DESCRIPTION VARCHAR
);
copy into VALUE_SETS.ALWAYS_PLANNED_CCS_PROCEDURE_CATEGORY
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/always_planned_ccs_procedure_category\.csv.*';


create or replace TABLE VALUE_SETS.CMS_CHRONIC_CONDITIONS_HIERARCHY (
	CONDITION_ID NUMBER(38,0),
	CONDITION VARCHAR,
	CONDITION_COLUMN_NAME VARCHAR,
	CHRONIC_CONDITION_TYPE VARCHAR,
	CONDITION_CATEGORY VARCHAR,
	ADDITIONAL_LOGIC VARCHAR,
	CLAIMS_QUALIFICATION VARCHAR,
	INCLUSION_TYPE VARCHAR,
	CODE_SYSTEM VARCHAR,
	CODE VARCHAR
);
copy into VALUE_SETS.CMS_CHRONIC_CONDITIONS_HIERARCHY
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/cms_chronic_conditions_hierarchy\.csv.*';


create or replace TABLE VALUE_SETS.EXCLUSION_CCS_DIAGNOSIS_CATEGORY (
	CCS_DIAGNOSIS_CATEGORY VARCHAR,
	DESCRIPTION VARCHAR,
	EXCLUSION_CATEGORY VARCHAR
);
copy into VALUE_SETS.EXCLUSION_CCS_DIAGNOSIS_CATEGORY
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/exclusion_ccs_diagnosis_category\.csv.*';


create or replace TABLE VALUE_SETS.ICD_10_CM_TO_CCS (
	ICD_10_CM VARCHAR,
	DESCRIPTION VARCHAR,
	CCS_DIAGNOSIS_CATEGORY VARCHAR,
	CCS_DESCRIPTION VARCHAR
);
copy into VALUE_SETS.ICD_10_CM_TO_CCS
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/icd_10_cm_to_ccs\.csv.*';


create or replace TABLE VALUE_SETS.ICD_10_PCS_TO_CCS (
	ICD_10_PCS VARCHAR,
	DESCRIPTION VARCHAR,
	CCS_PROCEDURE_CATEGORY VARCHAR,
	CCS_DESCRIPTION VARCHAR
);
copy into VALUE_SETS.ICD_10_PCS_TO_CCS
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/icd_10_pcs_to_ccs\.csv.*';


create or replace TABLE VALUE_SETS.POTENTIALLY_PLANNED_CCS_PROCEDURE_CATEGORY (
	CCS_PROCEDURE_CATEGORY VARCHAR,
	DESCRIPTION VARCHAR
);
copy into VALUE_SETS.POTENTIALLY_PLANNED_CCS_PROCEDURE_CATEGORY
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/potentially_planned_ccs_procedure_category\.csv.*';


create or replace TABLE VALUE_SETS.POTENTIALLY_PLANNED_ICD_10_PCS (
	ICD_10_PCS VARCHAR,
	DESCRIPTION VARCHAR
);
copy into VALUE_SETS.POTENTIALLY_PLANNED_ICD_10_PCS
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/potentially_planned_icd_10_pcs\.csv.*';


create or replace TABLE VALUE_SETS.SERVICE_CATEGORY (
	SERVICE_CATEGORY_1 VARCHAR,
	SERVICE_CATEGORY_2 VARCHAR,
	CLAIM_TYPE VARCHAR,
	HCPCS_CODE VARCHAR,
	BILL_TYPE_CODE_FIRST_2_DIGITS VARCHAR,
	REVENUE_CENTER_CODE VARCHAR,
	VALID_DRG_FLAG NUMBER(38,0),
	PLACE_OF_SERVICE_CODE VARCHAR
);
copy into VALUE_SETS.SERVICE_CATEGORY
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/service_category\.csv.*';


create or replace TABLE VALUE_SETS.SPECIALTY_COHORT (
	CCS VARCHAR,
	DESCRIPTION VARCHAR,
	SPECIALTY_COHORT VARCHAR,
	PROCEDURE_OR_DIAGNOSIS VARCHAR
);
copy into VALUE_SETS.SPECIALTY_COHORT
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/specialty_cohort\.csv.*';


create or replace TABLE VALUE_SETS.SURGERY_GYNECOLOGY_COHORT (
	ICD_10_PCS VARCHAR,
	DESCRIPTION VARCHAR,
	CCS_CODE_AND_DESCRIPTION VARCHAR,
	SPECIALTY_COHORT VARCHAR
);
copy into VALUE_SETS.SURGERY_GYNECOLOGY_COHORT
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/surgery_gynecology_cohort\.csv.*';


create or replace TABLE VALUE_SETS.TUVA_CHRONIC_CONDITIONS_HIERARCHY (
	CONDITION_FAMILY VARCHAR,
	CONDITION VARCHAR,
	ICD_10_CM_CODE VARCHAR,
	ICD_10_CM_DESCRIPTION VARCHAR,
	CONDITION_COLUMN_NAME VARCHAR
);
copy into VALUE_SETS.TUVA_CHRONIC_CONDITIONS_HIERARCHY
    from s3://tuva-public-resources/value-sets/
    file_format = (type = CSV
    compression = 'GZIP'
    field_optionally_enclosed_by = '"'
)
pattern = '.*/tuva_chronic_conditions_hierarchy\.csv.*';

```

</details>

</TabItem>

<TabItem value="redshift" label="Redshift">

<details><summary>Redshift Load Script</summary>

```
create schema if not exists terminology;
-- with owner <user>;



DROP TABLE IF EXISTS terminology.admit_source CASCADE;
CREATE TABLE terminology.admit_source
(
	admit_source_code VARCHAR(256)   ENCODE lzo
	,admit_source_description VARCHAR(256)   ENCODE lzo
	,newborn_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.admit_source owner to <User>;
copy terminology.admit_source
  from 's3://tuva-public-resources/terminology/admit_source.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.admit_type CASCADE;
CREATE TABLE terminology.admit_type
(
	admit_type_code VARCHAR(256)   ENCODE lzo
	,admit_type_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.admit_type owner to <User>;
copy terminology.admit_type
  from 's3://tuva-public-resources/terminology/admit_type.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.ansi_fips_state CASCADE;
CREATE TABLE terminology.ansi_fips_state
(
	ansi_fips_state_code VARCHAR(256)   ENCODE lzo
	,ansi_fips_state_abbreviation VARCHAR(256)   ENCODE lzo
	,ansi_fips_state_name VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.ansi_fips_state owner to <User>;
copy terminology.ansi_fips_state
  from 's3://tuva-public-resources/terminology/ansi_fips_state.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.apr_drg CASCADE;
CREATE TABLE terminology.apr_drg
(
	apr_drg_code VARCHAR(256)   ENCODE lzo
	,severity VARCHAR(256)   ENCODE lzo
	,apr_drg_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.apr_drg owner to <User>;
copy terminology.apr_drg
  from 's3://tuva-public-resources/terminology/apr_drg.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.bill_type CASCADE;
CREATE TABLE terminology.bill_type
(
	bill_type_code VARCHAR(256)   ENCODE lzo
	,bill_type_description VARCHAR(256)   ENCODE lzo
	,deprecated INTEGER   ENCODE az64
	,deprecated_date DATE   ENCODE az64
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.bill_type owner to <User>;
copy terminology.bill_type
  from 's3://tuva-public-resources/terminology/bill_type.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.calendar CASCADE;
CREATE TABLE terminology.calendar
(
	full_date DATE   ENCODE az64
	,"year" INTEGER   ENCODE az64
	,"month" INTEGER   ENCODE az64
	,"day" INTEGER   ENCODE az64
	,month_name VARCHAR(3)   ENCODE lzo
	,day_of_week_number INTEGER   ENCODE az64
	,day_of_week_name VARCHAR(9)   ENCODE lzo
	,week_of_year INTEGER   ENCODE az64
	,day_of_year INTEGER   ENCODE az64
	,year_month VARCHAR(7)   ENCODE lzo
	,first_day_of_month DATE   ENCODE az64
	,last_day_of_month DATE   ENCODE az64
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.calendar owner to <User>;
copy terminology.calendar
  from 's3://tuva-public-resources/terminology/calendar.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.claim_type CASCADE;
CREATE TABLE terminology.claim_type
(
	claim_type VARCHAR(13)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.claim_type owner to <User>;
copy terminology.claim_type
  from 's3://tuva-public-resources/terminology/claim_type.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.code_type CASCADE;
CREATE TABLE terminology.code_type
(
	code_type VARCHAR(13)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.code_type owner to <User>;
copy terminology.code_type
  from 's3://tuva-public-resources/terminology/code_type.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.discharge_disposition CASCADE;
CREATE TABLE terminology.discharge_disposition
(
	discharge_disposition_code VARCHAR(256)   ENCODE lzo
	,discharge_disposition_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.discharge_disposition owner to <User>;
copy terminology.discharge_disposition
  from 's3://tuva-public-resources/terminology/discharge_disposition.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.encounter_type CASCADE;
CREATE TABLE terminology.encounter_type
(
	encounter_type VARCHAR(34)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.encounter_type owner to <User>;
copy terminology.encounter_type
  from 's3://tuva-public-resources/terminology/encounter_type.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.ethnicity CASCADE;
CREATE TABLE terminology.ethnicity
(
	code VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.ethnicity owner to <User>;
copy terminology.ethnicity
  from 's3://tuva-public-resources/terminology/ethnicity.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.fips_county CASCADE;
CREATE TABLE terminology.fips_county
(
	fips_code VARCHAR(256)   ENCODE lzo
	,county VARCHAR(256)   ENCODE lzo
	,state VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.fips_county owner to <User>;
copy terminology.fips_county
  from 's3://tuva-public-resources/terminology/fips_county.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.gender CASCADE;
CREATE TABLE terminology.gender
(
	gender VARCHAR(7)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.gender owner to <User>;
copy terminology.gender
  from 's3://tuva-public-resources/terminology/gender.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.hcpcs_level_2 CASCADE;
CREATE TABLE terminology.hcpcs_level_2
(
	hcpcs VARCHAR(256)   ENCODE lzo
	,seqnum VARCHAR(256)   ENCODE lzo
	,recid VARCHAR(256)   ENCODE lzo
	,long_description VARCHAR(2000)   ENCODE lzo
	,short_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.hcpcs_level_2 owner to <User>;
copy terminology.hcpcs_level_2
  from 's3://tuva-public-resources/terminology/hcpcs_level_2.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.icd_10_cm CASCADE;
CREATE TABLE terminology.icd_10_cm
(
	icd_10_cm VARCHAR(256)   ENCODE lzo
	,valid_flag VARCHAR(256)   ENCODE lzo
	,short_description VARCHAR(256)   ENCODE lzo
	,long_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.icd_10_cm owner to <User>;
copy terminology.icd_10_cm
  from 's3://tuva-public-resources/terminology/icd_10_cm.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.icd_10_pcs CASCADE;
CREATE TABLE terminology.icd_10_pcs
(
	icd_10_pcs VARCHAR(256)   ENCODE lzo
	,valid_flag VARCHAR(256)   ENCODE lzo
	,short_description VARCHAR(256)   ENCODE lzo
	,long_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.icd_10_pcs owner to <User>;
copy terminology.icd_10_pcs
  from 's3://tuva-public-resources/terminology/icd_10_pcs.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.mdc CASCADE;
CREATE TABLE terminology.mdc
(
	mdc_code VARCHAR(256)   ENCODE lzo
	,mdc_description VARCHAR(88)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.mdc owner to <User>;
copy terminology.mdc
  from 's3://tuva-public-resources/terminology/mdc.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.medicare_dual_eligibility CASCADE;
CREATE TABLE terminology.medicare_dual_eligibility
(
	dual_status_code VARCHAR(256)   ENCODE lzo
	,dual_status_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.medicare_dual_eligibility owner to <User>;
copy terminology.medicare_dual_eligibility
  from 's3://tuva-public-resources/terminology/medicare_dual_eligibility.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.medicare_status CASCADE;
CREATE TABLE terminology.medicare_status
(
	medicare_status_code VARCHAR(256)   ENCODE lzo
	,medicare_status_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.medicare_status owner to <User>;
copy terminology.medicare_status
  from 's3://tuva-public-resources/terminology/medicare_status.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.ms_drg CASCADE;
CREATE TABLE terminology.ms_drg
(
	ms_drg_code VARCHAR(256)   ENCODE lzo
	,mdc_code VARCHAR(256)   ENCODE lzo
	,medical_surgical VARCHAR(256)   ENCODE lzo
	,ms_drg_description VARCHAR(256)   ENCODE lzo
	,deprecated INTEGER   ENCODE az64
	,deprecated_date DATE   ENCODE az64
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.ms_drg owner to <User>;
copy terminology.ms_drg
  from 's3://tuva-public-resources/terminology/ms_drg.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.other_provider_taxonomy CASCADE;
CREATE TABLE terminology.other_provider_taxonomy
(
	npi VARCHAR(35)   ENCODE lzo
	,taxonomy_code VARCHAR(35)   ENCODE lzo
	,medicare_specialty_code VARCHAR(173)   ENCODE lzo
	,description VARCHAR(101)   ENCODE lzo
	,primary_flag INTEGER   ENCODE az64
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.other_provider_taxonomy owner to <User>;
copy terminology.other_provider_taxonomy
  from 's3://tuva-public-resources/terminology/other_provider_taxonomy.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.payer_type CASCADE;
CREATE TABLE terminology.payer_type
(
	payer_type VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.payer_type owner to <User>;
copy terminology.payer_type
  from 's3://tuva-public-resources/terminology/payer_type.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.place_of_service CASCADE;
CREATE TABLE terminology.place_of_service
(
	place_of_service_code VARCHAR(256)   ENCODE lzo
	,place_of_service_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.place_of_service owner to <User>;
copy terminology.place_of_service
  from 's3://tuva-public-resources/terminology/place_of_service.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.present_on_admission CASCADE;
CREATE TABLE terminology.present_on_admission
(
	present_on_admit_code VARCHAR(256)   ENCODE lzo
	,present_on_admit_description VARCHAR(230)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.present_on_admission owner to <User>;
copy terminology.present_on_admission
  from 's3://tuva-public-resources/terminology/present_on_admission.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology."provider" CASCADE;
CREATE TABLE terminology."provider"
(
	npi VARCHAR(35)   ENCODE lzo
	,entity_type_code VARCHAR(26)   ENCODE lzo
	,entity_type_description VARCHAR(37)   ENCODE lzo
	,primary_taxonomy_code VARCHAR(35)   ENCODE lzo
	,primary_specialty_description VARCHAR(173)   ENCODE lzo
	,provider_name VARCHAR(95)   ENCODE lzo
	,parent_organization_name VARCHAR(95)   ENCODE lzo
	,practice_address_line_1 VARCHAR(80)   ENCODE lzo
	,practice_address_line_2 VARCHAR(80)   ENCODE lzo
	,practice_city VARCHAR(65)   ENCODE lzo
	,practice_state VARCHAR(65)   ENCODE lzo
	,practice_zip_code VARCHAR(42)   ENCODE lzo
	,last_updated DATE   ENCODE az64
	,deactivation_date DATE   ENCODE az64
	,deactivation_flag VARCHAR(80)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology."provider" owner to <User>;
copy terminology.provider
  from 's3://tuva-public-resources/terminology/provider.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.race CASCADE;
CREATE TABLE terminology.race
(
	code VARCHAR(6)   ENCODE lzo
	,description VARCHAR(41)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.race owner to <User>;
copy terminology.race
  from 's3://tuva-public-resources/terminology/race.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.revenue_center CASCADE;
CREATE TABLE terminology.revenue_center
(
	revenue_center_code VARCHAR(256)   ENCODE lzo
	,revenue_center_description VARCHAR(66)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.revenue_center owner to <User>;
copy terminology.revenue_center
  from 's3://tuva-public-resources/terminology/revenue_center.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS terminology.ssa_fips_state CASCADE;
CREATE TABLE terminology.ssa_fips_state
(
	ssa_fips_state_code VARCHAR(256)   ENCODE lzo
	,ssa_fips_state_name VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE terminology.ssa_fips_state owner to <User>;
copy terminology.ssa_fips_state
  from 's3://tuva-public-resources/terminology/ssa_fips_state.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';




create schema if not exists value_sets;
-- with owner <user>;



DROP TABLE IF EXISTS value_sets.acute_diagnosis_ccs CASCADE;
CREATE TABLE value_sets.acute_diagnosis_ccs
(
	ccs_diagnosis_category VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.acute_diagnosis_ccs owner to <User>;
copy value_sets.acute_diagnosis_ccs
  from 's3://tuva-public-resources/value-sets/acute_diagnosis_ccs.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.acute_diagnosis_icd_10_cm CASCADE;
CREATE TABLE value_sets.acute_diagnosis_icd_10_cm
(
	icd_10_cm VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.acute_diagnosis_icd_10_cm owner to <User>;
copy value_sets.acute_diagnosis_icd_10_cm
  from 's3://tuva-public-resources/value-sets/acute_diagnosis_icd_10_cm.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.always_planned_ccs_diagnosis_category CASCADE;
CREATE TABLE value_sets.always_planned_ccs_diagnosis_category
(
	ccs_diagnosis_category VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.always_planned_ccs_diagnosis_category owner to <User>;
copy value_sets.always_planned_ccs_diagnosis_category
  from 's3://tuva-public-resources/value-sets/always_planned_ccs_diagnosis_category.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.always_planned_ccs_procedure_category CASCADE;
CREATE TABLE value_sets.always_planned_ccs_procedure_category
(
	ccs_procedure_category VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.always_planned_ccs_procedure_category owner to <User>;
copy value_sets.always_planned_ccs_procedure_category
  from 's3://tuva-public-resources/value-sets/always_planned_ccs_procedure_category.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.cms_chronic_conditions_hierarchy CASCADE;
CREATE TABLE value_sets.cms_chronic_conditions_hierarchy
(
	condition_id INTEGER   ENCODE az64
	,condition VARCHAR(81)   ENCODE lzo
	,condition_column_name VARCHAR(79)   ENCODE lzo
	,chronic_condition_type VARCHAR(49)   ENCODE lzo
	,condition_category VARCHAR(25)   ENCODE lzo
	,additional_logic VARCHAR(248)   ENCODE lzo
	,claims_qualification VARCHAR(295)   ENCODE lzo
	,inclusion_type VARCHAR(7)   ENCODE lzo
	,code_system VARCHAR(10)   ENCODE lzo
	,code VARCHAR(11)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.cms_chronic_conditions_hierarchy owner to <User>;
copy value_sets.cms_chronic_conditions_hierarchy
  from 's3://tuva-public-resources/value-sets/cms_chronic_conditions_hierarchy.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.exclusion_ccs_diagnosis_category CASCADE;
CREATE TABLE value_sets.exclusion_ccs_diagnosis_category
(
	ccs_diagnosis_category VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
	,exclusion_category VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.exclusion_ccs_diagnosis_category owner to <User>;
copy value_sets.exclusion_ccs_diagnosis_category
  from 's3://tuva-public-resources/value-sets/exclusion_ccs_diagnosis_category.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.icd_10_cm_to_ccs CASCADE;
CREATE TABLE value_sets.icd_10_cm_to_ccs
(
	icd_10_cm VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
	,ccs_diagnosis_category VARCHAR(256)   ENCODE lzo
	,ccs_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.icd_10_cm_to_ccs owner to <User>;
copy value_sets.icd_10_cm_to_ccs
  from 's3://tuva-public-resources/value-sets/icd_10_cm_to_ccs.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.icd_10_pcs_to_ccs CASCADE;
CREATE TABLE value_sets.icd_10_pcs_to_ccs
(
	icd_10_pcs VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
	,ccs_procedure_category VARCHAR(256)   ENCODE lzo
	,ccs_description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.icd_10_pcs_to_ccs owner to <User>;
copy value_sets.icd_10_pcs_to_ccs
  from 's3://tuva-public-resources/value-sets/icd_10_pcs_to_ccs.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.potentially_planned_ccs_procedure_category CASCADE;
CREATE TABLE value_sets.potentially_planned_ccs_procedure_category
(
	ccs_procedure_category VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.potentially_planned_ccs_procedure_category owner to <User>;
copy value_sets.potentially_planned_ccs_procedure_category
  from 's3://tuva-public-resources/value-sets/potentially_planned_ccs_procedure_category.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.potentially_planned_icd_10_pcs CASCADE;
CREATE TABLE value_sets.potentially_planned_icd_10_pcs
(
	icd_10_pcs VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.potentially_planned_icd_10_pcs owner to <User>;
copy value_sets.potentially_planned_icd_10_pcs
  from 's3://tuva-public-resources/value-sets/potentially_planned_icd_10_pcs.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.service_category CASCADE;
CREATE TABLE value_sets.service_category
(
	service_category_1 VARCHAR(256)   ENCODE lzo
	,service_category_2 VARCHAR(256)   ENCODE lzo
	,claim_type VARCHAR(256)   ENCODE lzo
	,hcpcs_code VARCHAR(256)   ENCODE lzo
	,bill_type_code_first_2_digits VARCHAR(256)   ENCODE lzo
	,revenue_center_code VARCHAR(256)   ENCODE lzo
	,valid_drg_flag VARCHAR(256)   ENCODE lzo
	,place_of_service_code VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.service_category owner to <User>;
copy value_sets.service_category
  from 's3://tuva-public-resources/value-sets/service_category.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.specialty_cohort CASCADE;
CREATE TABLE value_sets.specialty_cohort
(
	ccs VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
	,specialty_cohort VARCHAR(256)   ENCODE lzo
	,procedure_or_diagnosis VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.specialty_cohort owner to <User>;
copy value_sets.specialty_cohort
  from 's3://tuva-public-resources/value-sets/specialty_cohort.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.surgery_gynecology_cohort CASCADE;
CREATE TABLE value_sets.surgery_gynecology_cohort
(
	icd_10_pcs VARCHAR(256)   ENCODE lzo
	,description VARCHAR(256)   ENCODE lzo
	,ccs_code_and_description VARCHAR(256)   ENCODE lzo
	,specialty_cohort VARCHAR(256)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.surgery_gynecology_cohort owner to <User>;
copy value_sets.surgery_gynecology_cohort
  from 's3://tuva-public-resources/value-sets/surgery_gynecology_cohort.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';



DROP TABLE IF EXISTS value_sets.tuva_chronic_conditions_hierarchy CASCADE;
CREATE TABLE value_sets.tuva_chronic_conditions_hierarchy
(
	condition_family VARCHAR(26)   ENCODE lzo
	,condition VARCHAR(47)   ENCODE lzo
	,icd_10_cm_code VARCHAR(7)   ENCODE lzo
	,icd_10_cm_description VARCHAR(225)   ENCODE lzo
	,condition_column_name VARCHAR(40)   ENCODE lzo
)
DISTSTYLE AUTO
;
-- ALTER TABLE value_sets.tuva_chronic_conditions_hierarchy owner to <User>;
copy value_sets.tuva_chronic_conditions_hierarchy
  from 's3://tuva-public-resources/value-sets/tuva_chronic_conditions_hierarchy.csv'
  access_key_id 'AKIA2EPVNTV4FLAEBFGE'
  secret_access_key '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'
  csv
  gzip
  region 'us-east-1';





```

</details>

</TabItem>
<TabItem value="bigquery" label="BigQuery">


<details><summary>BigQuery Load Script</summary>

```
create schema if not exists terminology;



CREATE OR REPLACE TABLE `terminology.admit_source`
(
  admit_source_code STRING,
  admit_source_description STRING,
  newborn_description STRING
);
load data into terminology.admit_source (
  admit_source_code STRING,
  admit_source_description STRING,
  newborn_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/admit_source.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.admit_type`
(
  admit_type_code STRING,
  admit_type_description STRING
);
load data into terminology.admit_type (
  admit_type_code STRING,
  admit_type_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/admit_type.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.ansi_fips_state`
(
  ansi_fips_state_code STRING,
  ansi_fips_state_abbreviation STRING,
  ansi_fips_state_name STRING
);
load data into terminology.ansi_fips_state (
  ansi_fips_state_code STRING,
  ansi_fips_state_abbreviation STRING,
  ansi_fips_state_name STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/ansi_fips_state.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.apr_drg`
(
  apr_drg_code STRING,
  severity STRING,
  apr_drg_description STRING
);
load data into terminology.apr_drg (
  apr_drg_code STRING,
  severity STRING,
  apr_drg_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/apr_drg.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.bill_type`
(
  bill_type_code STRING,
  bill_type_description STRING,
  deprecated INT64,
  deprecated_date DATE
);
load data into terminology.bill_type (
  bill_type_code STRING,
  bill_type_description STRING,
  deprecated INT64,
  deprecated_date DATE
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/bill_type.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.calendar`
(
  FULL_DATE DATE,
  YEAR INT64,
  MONTH INT64,
  DAY INT64,
  MONTH_NAME STRING,
  DAY_OF_WEEK_NUMBER INT64,
  DAY_OF_WEEK_NAME STRING,
  WEEK_OF_YEAR INT64,
  DAY_OF_YEAR INT64,
  YEAR_MONTH STRING,
  FIRST_DAY_OF_MONTH DATE,
  LAST_DAY_OF_MONTH DATE
);
load data into terminology.calendar (
  FULL_DATE DATE,
  YEAR INT64,
  MONTH INT64,
  DAY INT64,
  MONTH_NAME STRING,
  DAY_OF_WEEK_NUMBER INT64,
  DAY_OF_WEEK_NAME STRING,
  WEEK_OF_YEAR INT64,
  DAY_OF_YEAR INT64,
  YEAR_MONTH STRING,
  FIRST_DAY_OF_MONTH DATE,
  LAST_DAY_OF_MONTH DATE
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/calendar.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.claim_type`
(
  claim_type STRING
);
load data into terminology.claim_type (
  claim_type STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/claim_type.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.code_type`
(
  code_type STRING
);
load data into terminology.code_type (
  code_type STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/code_type.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.discharge_disposition`
(
  discharge_disposition_code STRING,
  discharge_disposition_description STRING
);
load data into terminology.discharge_disposition (
  discharge_disposition_code STRING,
  discharge_disposition_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/discharge_disposition.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.encounter_type`
(
  encounter_type STRING
);
load data into terminology.encounter_type (
  encounter_type STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/encounter_type.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.ethnicity`
(
  code STRING,
  description STRING
);
load data into terminology.ethnicity (
  code STRING,
  description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/ethnicity.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.fips_county`
(
  fips_code STRING,
  county STRING,
  state STRING
);
load data into terminology.fips_county (
  fips_code STRING,
  county STRING,
  state STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/fips_county.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.gender`
(
  gender STRING
);
load data into terminology.gender (
  gender STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/gender.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.hcpcs_level_2`
(
  hcpcs STRING,
  seqnum STRING,
  recid STRING,
  long_description STRING,
  short_description STRING
);
load data into terminology.hcpcs_level_2 (
  hcpcs STRING,
  seqnum STRING,
  recid STRING,
  long_description STRING,
  short_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/hcpcs_level_2.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.icd_10_cm`
(
  icd_10_cm STRING,
  valid_flag STRING,
  short_description STRING,
  long_description STRING
);
load data into terminology.icd_10_cm (
  icd_10_cm STRING,
  valid_flag STRING,
  short_description STRING,
  long_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/icd_10_cm.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.icd_10_pcs`
(
  icd_10_pcs STRING,
  valid_flag STRING,
  short_description STRING,
  long_description STRING
);
load data into terminology.icd_10_pcs (
  icd_10_pcs STRING,
  valid_flag STRING,
  short_description STRING,
  long_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/icd_10_pcs.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.mdc`
(
  mdc_code STRING,
  mdc_description STRING
);
load data into terminology.mdc (
  mdc_code STRING,
  mdc_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/mdc.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.medicare_dual_eligibility`
(
  dual_status_code STRING,
  dual_status_description STRING
);
load data into terminology.medicare_dual_eligibility (
  dual_status_code STRING,
  dual_status_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/medicare_dual_eligibility.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.medicare_status`
(
  medicare_status_code STRING,
  medicare_status_description STRING
);
load data into terminology.medicare_status (
  medicare_status_code STRING,
  medicare_status_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/medicare_status.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.ms_drg`
(
  ms_drg_code STRING,
  mdc_code STRING,
  medical_surgical STRING,
  ms_drg_description STRING,
  deprecated INT64,
  deprecated_date DATE
);
load data into terminology.ms_drg (
  ms_drg_code STRING,
  mdc_code STRING,
  medical_surgical STRING,
  ms_drg_description STRING,
  deprecated INT64,
  deprecated_date DATE
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/ms_drg.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.other_provider_taxonomy`
(
  npi STRING,
  taxonomy_code STRING,
  medicare_specialty_code STRING,
  description STRING,
  primary_flag INT64
);
load data into terminology.other_provider_taxonomy (
  npi STRING,
  taxonomy_code STRING,
  medicare_specialty_code STRING,
  description STRING,
  primary_flag INT64
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/other_provider_taxonomy.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.payer_type`
(
  payer_type STRING
);
load data into terminology.payer_type (
  payer_type STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/payer_type.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.place_of_service`
(
  place_of_service_code STRING,
  place_of_service_description STRING
);
load data into terminology.place_of_service (
  place_of_service_code STRING,
  place_of_service_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/place_of_service.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.present_on_admission`
(
  present_on_admit_code STRING,
  present_on_admit_description STRING
);
load data into terminology.present_on_admission (
  present_on_admit_code STRING,
  present_on_admit_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/present_on_admission.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.provider`
(
  npi STRING,
  entity_type_code STRING,
  entity_type_description STRING,
  primary_taxonomy_code STRING,
  primary_specialty_description STRING,
  provider_name STRING,
  parent_organization_name STRING,
  practice_address_line_1 STRING,
  practice_address_line_2 STRING,
  practice_city STRING,
  practice_state STRING,
  practice_zip_code STRING,
  last_updated DATE,
  deactivation_date DATE,
  deactivation_flag STRING
);
load data into terminology.provider (
  npi STRING,
  entity_type_code STRING,
  entity_type_description STRING,
  primary_taxonomy_code STRING,
  primary_specialty_description STRING,
  provider_name STRING,
  parent_organization_name STRING,
  practice_address_line_1 STRING,
  practice_address_line_2 STRING,
  practice_city STRING,
  practice_state STRING,
  practice_zip_code STRING,
  last_updated DATE,
  deactivation_date DATE,
  deactivation_flag STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/provider.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.race`
(
  code STRING,
  description STRING
);
load data into terminology.race (
  code STRING,
  description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/race.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.revenue_center`
(
  revenue_center_code STRING,
  revenue_center_description STRING
);
load data into terminology.revenue_center (
  revenue_center_code STRING,
  revenue_center_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/revenue_center.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE `terminology.ssa_fips_state`
(
  ssa_fips_state_code STRING,
  ssa_fips_state_name STRING
);
load data into terminology.ssa_fips_state (
  ssa_fips_state_code STRING,
  ssa_fips_state_name STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/ssa_fips_state.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


create schema if not exists value_sets;



CREATE OR REPLACE TABLE value_sets.acute_diagnosis_ccs (
  ccs_diagnosis_category STRING,
  description STRING
);
load data into value_sets.acute_diagnosis_ccs (
  ccs_diagnosis_category STRING,
  description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/acute_diagnosis_ccs.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.acute_diagnosis_icd_10_cm (
  icd_10_cm STRING,
  description STRING
);
load data into value_sets.acute_diagnosis_icd_10_cm (
  icd_10_cm STRING,
  description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/acute_diagnosis_icd_10_cm.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.always_planned_ccs_diagnosis_category (
  ccs_diagnosis_category STRING,
  description STRING
);
load data into value_sets.always_planned_ccs_diagnosis_category (
  ccs_diagnosis_category STRING,
  description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/always_planned_ccs_diagnosis_category.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.always_planned_ccs_procedure_category (
  ccs_procedure_category STRING,
  description STRING
);
load data into value_sets.always_planned_ccs_procedure_category (
  ccs_procedure_category STRING,
  description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/always_planned_ccs_procedure_category.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.cms_chronic_conditions_hierarchy (
  condition_id INT64,
  condition STRING,
  condition_column_name STRING,
  chronic_condition_type STRING,
  condition_category STRING,
  additional_logic STRING,
  claims_qualification STRING,
  inclusion_type STRING,
  code_system STRING,
  code STRING
);
load data into value_sets.cms_chronic_conditions_hierarchy (
  condition_id INT64,
  condition STRING,
  condition_column_name STRING,
  chronic_condition_type STRING,
  condition_category STRING,
  additional_logic STRING,
  claims_qualification STRING,
  inclusion_type STRING,
  code_system STRING,
  code STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/cms_chronic_conditions_hierarchy.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.exclusion_ccs_diagnosis_category (
  ccs_diagnosis_category STRING,
  description STRING,
  exclusion_category STRING
);
load data into value_sets.exclusion_ccs_diagnosis_category (
  ccs_diagnosis_category STRING,
  description STRING,
  exclusion_category STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/exclusion_ccs_diagnosis_category.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.icd_10_cm_to_ccs (
  icd_10_cm STRING,
  description STRING,
  ccs_diagnosis_category STRING,
  ccs_description STRING
);
load data into value_sets.icd_10_cm_to_ccs (
  icd_10_cm STRING,
  description STRING,
  ccs_diagnosis_category STRING,
  ccs_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/icd_10_cm_to_ccs.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.icd_10_pcs_to_ccs (
  icd_10_pcs STRING,
  description STRING,
  ccs_procedure_category STRING,
  ccs_description STRING
);
load data into value_sets.icd_10_pcs_to_ccs (
  icd_10_pcs STRING,
  description STRING,
  ccs_procedure_category STRING,
  ccs_description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/icd_10_pcs_to_ccs.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.potentially_planned_ccs_procedure_category (
  ccs_procedure_category STRING,
  description STRING
);
load data into value_sets.potentially_planned_ccs_procedure_category (
  ccs_procedure_category STRING,
  description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/potentially_planned_ccs_procedure_category.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.potentially_planned_icd_10_pcs (
  icd_10_pcs STRING,
  description STRING
);
load data into value_sets.potentially_planned_icd_10_pcs (
  icd_10_pcs STRING,
  description STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/potentially_planned_icd_10_pcs.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.service_category (
  service_category_1 STRING,
  service_category_2 STRING,
  claim_type STRING,
  hcpcs_code STRING,
  bill_type_code_first_2_digits STRING,
  revenue_center_code STRING,
  valid_drg_flag STRING,
  place_of_service_code STRING
);
load data into value_sets.service_category (
  service_category_1 STRING,
  service_category_2 STRING,
  claim_type STRING,
  hcpcs_code STRING,
  bill_type_code_first_2_digits STRING,
  revenue_center_code STRING,
  valid_drg_flag STRING,
  place_of_service_code STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/service_category.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.specialty_cohort (
  ccs STRING,
  description STRING,
  specialty_cohort STRING,
  procedure_or_diagnosis STRING
);
load data into value_sets.specialty_cohort (
  ccs STRING,
  description STRING,
  specialty_cohort STRING,
  procedure_or_diagnosis STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/specialty_cohort.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.surgery_gynecology_cohort (
  icd_10_pcs STRING,
  description STRING,
  ccs_code_and_description STRING,
  specialty_cohort STRING
);
load data into value_sets.surgery_gynecology_cohort (
  icd_10_pcs STRING,
  description STRING,
  ccs_code_and_description STRING,
  specialty_cohort STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/surgery_gynecology_cohort.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );


CREATE OR REPLACE TABLE value_sets.tuva_chronic_conditions_hierarchy (
  condition_family STRING,
  condition STRING,
  icd_10_cm_code STRING,
  icd_10_cm_description STRING,
  condition_column_name STRING
);
load data into value_sets.tuva_chronic_conditions_hierarchy (
  condition_family STRING,
  condition STRING,
  icd_10_cm_code STRING,
  icd_10_cm_description STRING,
  condition_column_name STRING
)
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/value-sets/tuva_chronic_conditions_hierarchy.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );

```

</details>

</TabItem>
</Tabs>