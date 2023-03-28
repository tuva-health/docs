---
id: terminology
title: "Terminology + Value Sets"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are two ways to load our terminology code set into your data warehouse without using dbt:  SQL script and data shares. 

If you would rather use dbt, all terminology codes will automatically be loaded if you run The Tuva Project.  Terminology can be loaded via dbt as a standalone project, as a standalone package, or as part of `the_tuva_project`.   Please refer to our section ‘Setting Up The Tuva Project’ for more information.

## Load via SQL script

### Step 1: Prerequisites

To load terminology via SQL, there are two requirements:

1. Access to one of the three data warehouses we support:  Snowflake, Redshift, or BigQuery
2. A database called `tuva`

### Step 2:  Copy and paste the SQL script for you data warehouse

In the dropdown below, there are tabs labeled with each supported data warehouse.  Within that tab is the SQL that will import terminology.  Copy and paste that SQL into your console of choice.

### Step 3:  Execute the SQL

Run the SQL script in your data warehouse.  When execution completes, the `tuva` database will populate with all the terminology code sets.


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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
  access_key_id ''
  secret_access_key ''
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
load data into terminology.admit_source
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
load data into terminology.admit_type
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
load data into terminology.ansi_fips_state
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
load data into terminology.apr_drg
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
load data into terminology.bill_type
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/bill_type.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );

CREATE OR REPLACE TABLE `terminology.claim_type`
(
  claim_type STRING
);
load data into terminology.claim_type
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
load data into terminology.code_type
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
load data into terminology.discharge_disposition
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
load data into terminology.encounter_type
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
load data into terminology.ethnicity
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
load data into terminology.fips_county
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
load data into terminology.gender
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
load data into terminology.hcpcs_level_2
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
load data into terminology.icd_10_cm
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
load data into terminology.icd_10_pcs
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
load data into terminology.mdc
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
load data into terminology.medicare_dual_eligibility
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
load data into terminology.medicare_status
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
load data into terminology.ms_drg
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
load data into terminology.other_provider_taxonomy
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
load data into terminology.payer_type
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
load data into terminology.place_of_service
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
load data into terminology.present_on_admission
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
load data into terminology.provider
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
load data into terminology.race
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
load data into terminology.revenue_center
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
load data into terminology.ssa_fips_state
from files (format = 'csv',
    uris = ['gs://tuva-public-resources/terminology/ssa_fips_state.csv*'],
    compression = 'GZIP',
    quote = '"',
    null_marker = '\\N'
    );
```

</details>

</TabItem>
</Tabs>