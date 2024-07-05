---
id: terminology
title: "Terminology"
description: The Tuva Project makes it easy to load useful terminology sets like ICD-10 codes directly into your data warehouse where you need them for analytics.
---
## Overview

import { CSVDataTableCatalog } from '@site/src/components/CSVDataTableCatalog';

<iframe width="560" height="315" src="https://www.youtube.com/embed/oJyuJ4XFYNI?si=2OqvRdcL9D9itUrB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>

Terminology sets are reference code sets and descriptions used in healthcare analytics.  These code sets are maintained by many different organizations, updated on various frequencies, and often distributed in ways that make it a pain to load them into your data warehouse.

We're adding as many open source healthcare terminology sets as we can to the Tuva Project so they are easily available for healthcare analytics in a data warehouse.  You can search through and learn about these terminologies in this section.  If there is a code set you would like to see added you can [submit an issue](https://github.com/tuva-health/the_tuva_project/issues) on GitHub.

The terminology sets are maintained in S3. If you click a link below it takes you to a file on GitHub that only has a header for the corresponding terminology file, but the full terminology files are in S3.


| Terminology Set                                                                                                                                     | Maintainer                                       | Last Updated | Download CSV                                                                                                  | 
|-----------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|--------------|---------------------------------------------------------------------------------------------------------------|
| [Admit Source](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_source.csv)                           | National Uniform Billing Committee               | 1/1/2024     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/admit_source.csv_0_0_0.csv.gz)              |
| [Admit Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_type.csv)                               | National Uniform Billing Committee               | 1/1/2024     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/admit_type.csv_0_0_0.csv.gz)                |
| [APR-DRG](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__apr_drg.csv)                                     | 3M                                               | 1/1/2024     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/apr_drg.csv_0_0_0.csv.gz)                   |
| [Bill Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__bill_type.csv)                                 | National Uniform Billing Committee               | 11/3/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/bill_type.csv_0_0_0.csv.gz)                 |
| [Claim Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__claim_type.csv)                               | Tuva                                             | 11/4/2023    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/claim_type.csv_0_0_0.csv.gz)                |
| [Code Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv)                                 | Tuva                                             | 4/19/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/code_type.csv_0_0_0.csv.gz)                 |
| [Discharge Disposition](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__discharge_disposition.csv)         | National Uniform Billing Committee               | 1/1/2024     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/discharge_disposition.csv_0_0_0.csv.gz)     |
| [Encounter Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__encounter_type.csv)                       | Tuva                                             | 6/17/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/encounter_type.csv_0_0_0.csv.gz)            |
| [Ethnicity](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__ethnicity.csv)                                 | Tuva                                             | 11/3/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/ethnicity.csv_0_0_0.csv.gz)                 |
| [Gender](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__gender.csv)                                       | Tuva                                             | 4/19/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/gender.csv_0_0_0.csv.gz)                    |
| [HCPCS Level II](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__hcpcs_level_2.csv)                        | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/hcpcs_level_2.csv_0_0_0.csv.gz)             |
| [ICD-9-CM](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_9_cm.csv)                                   | Centers for Medicare & Medicaid Services (CMS)   | 5/10/2023    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/icd_9_cm.csv_0_0_0.csv.gz)                  |
| [ICD-9-PCS](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_9_pcs.csv)                                 | Centers for Medicare & Medicaid Services (CMS)   | 5/10/2023    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/icd_9_pcs.csv_0_0_0.csv.gz)                 |
| [ICD-10-CM](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_10_cm.csv)                                 | Centers for Disease Control and Prevention (CDC) | 1/1/2024     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/icd_10_cm.csv_0_0_0.csv.gz)                 |
| [ICD-10-PCS](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_10_pcs.csv)                               | Centers for Medicare & Medicaid Services (CMS)   | 1/1/2024     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/icd_10_pcs.csv_0_0_0.csv.gz)                |
| [LOINC](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__loinc.csv)                                         | Regenstrief Institute                            | 9/18/2023    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/loinc.csv_0_0_0.csv.gz)                     |
| [LOINC Deprecated Mapping](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__loinc_deprecated_mapping.csv)   | Regenstrief Institute                            | 9/18/2023    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/loinc_deprecated_mapping.csv_0_0_0.csv.gz)  |
| [MDC](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__mdc.csv)                                             | Centers for Medicare & Medicaid Services (CMS)   | 1/1/2024     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/mdc.csv_0_0_0.csv.gz)                       |
| [Medicare Dual Eligibility](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_dual_eligibility.csv) | Centers for Medicare & Medicaid Services (CMS)   | 3/7/2023     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/medicare_dual_eligibility.csv_0_0_0.csv.gz) |
| [Medicare Status](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_status.csv)                     | Centers for Medicare & Medicaid Services (CMS)   | 11/3/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/medicare_status.csv_0_0_0.csv.gz)           |
| [MS-DRG](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__ms_drg.csv)                                       | Centers for Medicare & Medicaid Services (CMS)   | 1/1/2024     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/ms_drg.csv_0_0_0.csv.gz)                    |
| [NDC](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/ndc.csv)                                                                      | [CodeRx](https://coderx.io/)                     | 4/24/2024    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/ndc.csv_0_0_0.csv.gz)   |
| [Payer Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__payer_type.csv)                               | Tuva                                             | 4/19/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/payer_type.csv_0_0_0.csv.gz)                |
| [Place of Service](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__place_of_service.csv)                   | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/place_of_service.csv_0_0_0.csv.gz)          |
| [Present on Admission](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__present_on_admission.csv)           | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/present_on_admission.csv_0_0_0.csv.gz)      |
| [Race](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__race.csv)                                           | Tuva                                             | 2/3/2023     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/race.csv_0_0_0.csv.gz)                      |
| [Revenue Center](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__revenue_center.csv)                       | National Uniform Billing Committee               | 6/23/2022    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/revenue_center.csv_0_0_0.csv.gz)            |
| [RxNorm to ATC](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__rxnorm_to_atc.csv)                                     | [CodeRx](https://coderx.io/)                     | 4/24/2024    | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/rxnorm_to_atc.csv_0_0_0.csv.gz)   
| [Snomed-CT](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__snomed_ct.csv)                                             | US National Library of Medicine                  | 3/1/2024     |          |
| [Snomed-CT transitive closures](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__snomed_ct_transitive_closures.csv)     | US National Library of Medicine                  | 3/1/2024     |          |
| [Snomed-CT to ICD-10-CM Map](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__snomed_icd_10_map.csv)                    | US National Library of Medicine                  | 9/1/2023     | [Link](https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/0.8.2/snomed_icd_10_map.csv_0_0_0.csv.gz)         |

## Maintenance
The instructions to update each terminology file have been provided below.  Steps may differ based on how often codes are updated.
For example, admit source is rarely updated so optional steps have been included.  This file is also small enough that a person
can manually review the codes for changes.  On the other hand, ICD-10-CM codes are released yearly.  The file is too large 
for manual review and should always be refreshed.

### Admit Source Code
1. Navigate to the [ResDac Inpatient website](https://resdac.org/cms-data/files/ip-ffs)
2. Click "View Data Documentation" under the page title
3. Locate and select the Variable Name "Claim Source Inpatient Admission Code"
4. Open the .txt file at the bottom of the webpage 

Follow steps 5-11 if there are any changes to the admit source codes.  Otherwise, skip to step 12

5. Copy and paste the code list into any text editor
6. Format the codes as a CSV file and save
   - Find and replace "â€”" with a hyphen (-)
7. Import the CSV file into any data warehouse
8. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/admit_source.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
9. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
10. Copy and paste the updated codes into the [admit source file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__admit_source.csv)
11. Submit a pull request
12. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date.
13. Submit a pull request

### Admit Type Code
1. Navigate to the [ResDac Inpatient website](https://resdac.org/cms-data/files/ip-ffs)
2. Click "View Data Documentation" under the page title
3. Locate and select the Variable Name "Claim Inpatient Admission Type Code"
4. Open the .txt file at the bottom of the webpage 

Follow steps 5-11 if there are any changes.  Otherwise, skip to step 12

5. Copy and paste the code list into any text editor
6. Format the codes as a CSV file and save
   - Find and replace "â€”" with a hyphen (-)
7. Import the CSV file into any data warehouse
8. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/admit_type.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
9. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
10. Copy and paste the updated codes into the [admit type file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__admit_type.csv)
11. Submit a pull request
12. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
13. Submit a pull request

### APR-DRG
1. Navigate to the [AHRQ HCUP website](https://hcup-us.ahrq.gov/)
2. Click the header tab "Database Information"
3. Click on the hyperlink "NIS Database Documentation"
4. Under "Additional Resources for Data Elements" click on the hyperlink ["APR-DRGs Methodology Overview Version 31"](https://hcup-us.ahrq.gov/db/nation/nis/grp031_aprdrg_meth_ovrview.pdf)
5. Scroll to the bottom of the PDF, copy and paste the codes found in "Appendix A - List of All Patient refined DRGs" into any text editor
6. Format the codes as a CSV file and save
7. Import the CSV file into any data warehouse
8. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/apr_drg.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
9. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
10. Copy and paste the CSV formatted code list into the [APR-DRG file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__apr_drg.csv)
11. Create a branch in [docs](https://github.com/tuva-health/docs). Update the `last_updated` column in the table above with the current date
12. Submit a pull request

### Discharge Disposition
1. Navigate to the [ResDac Inpatient website](https://resdac.org/cms-data/files/ip-ffs)
2. Click "View Data Documentation" under the page title
3. Locate and select the Variable Name "Patient Discharge Status Code"
4. Open the .txt file at the bottom of the webpage

Follow steps 5-11 if there are any changes.  Otherwise, skip to step 12

5. Copy and paste the code list into any text editor
6. Format the codes as a CSV file and save
   - Find and replace "â€”" with a hyphen (-)
7. Import the CSV file into any data warehouse
8. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/discharge_disposition.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
9. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
10. Copy and paste the updated codes into [Discharge Disposition file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__discharge_disposition.csv)
11. Submit a pull request
12. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
13. Submit a pull request

### ICD-10-CM
1. Navigate to the [CMS ICD 10 website](https://www.cms.gov/medicare/coding-billing/icd-10-codes)
2. In the left hand menu, click the hyperlink for ICD-10-CM of the current fiscal year (e.g. 2024 ICD-10-CM)
3. Under Downloads, click "Code Description in Tabular Order"
4. Unzip the downloaded file and open "icd_10cm_codes"
5. Format this file as a CSV and save
6. Import the CSV file into any data warehouse
7. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/icd_10_cm.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
8. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
9. Submit a pull request

**The below steps are only required if the headers of the file need to be changed.  The Tuva Project does not store the contents
of the ICD-10-CM file in GitHub because it is a large file.**


10. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
11. Alter the headers as needed in [ICD-10-CM file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__icd_10_cm.csv)
12. Submit a pull request

### ICD-10-PCS
1. Navigate to the [CMS ICD 10 website](https://www.cms.gov/medicare/coding-billing/icd-10-codes)
2. In the left hand menu, click the hyperlink for ICD-10-PCS of the current fiscal year (e.g. 2024 ICD-10-PCS)
3. Under Downloads, click "Code Description in Tabular Order"
4. Unzip the downloaded file and open "icd_10pcs_codes"
5. Format this file as a CSV and save
6. Import the CSV file into any data warehouse
7. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
8. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
9. Submit a pull request
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/icd_10_pcs.csv
from [table_created_in_step_6]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
**The below steps are only required if the headers of the file need to be changed.  The Tuva Project does not store the contents
of the ICD-10-PCS file in GitHub because it is a large file.**

10. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
11. Alter the headers as needed in [ICD-10-PCS file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__icd_10_pcs.csv)
12. Submit a pull request

### MDC
1. Navigate to the [CMS MS DRG website](https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps/ms-drg-classifications-and-software)
2. Under the section "MS-DRG Definitions and Manual and Software", click on "V41 Definitions and Manual Table of Contents - Full Titles - HTML Versions"
    - The version (e.g. V41) will change with each new release.    
3. Click on the hyperlink "Appendix A List of MS-DRGs Version 41.0"
4. Click on the hyperlink ["Design and development of the Diagnosis Related Group (DRGs)"](https://www.cms.gov/icd10m/FY2024-version41-fullcode-cms/fullcode_cms/Design_and_development_of_the_Diagnosis_Related_Group_(DRGs).pdf)
5. Scroll through the PDF to find the "Major Diagnostic Categories" table

Follow steps 5-11 if there are any changes.  Otherwise, skip to step 12

5. Copy and paste the code list into any text editor
6. Format the codes as a CSV and save
7. Import the CSV file into any data warehouse
8. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/mdc.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
9. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
10. Copy and paste the updated codes into the [MDC file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__mdc.csv)
11. Submit a pull request
12. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
13. Submit a pull request

### MS-DRG
On October 1st, CMS releases a list of MS-DRG codes that are valid for the fiscal year.  This list only contains valid codes
and omits any that have been deprecated.  Tuva maintains these deprecated code so historical data can be analyzed.

1. Navigate to the [CMS MS DRG website](https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps/ms-drg-classifications-and-software)
2. Under the section "MS-DRG Definitions and Manual and Software", click on "V41 Definitions and Manual Table of Contents - Full Titles - HTML Versions"
    - The version (e.g. V41) will change with each new release.    
3. Click on the hyperlink "Appendix A List of MS-DRGs Version 41.0"
4. Click on the hyperlink ["List of MS-DRGs Version 41.0"](https://www.cms.gov/icd10m/FY2024-version41-fullcode-cms/fullcode_cms/P0380.html)
5. Copy and paste the list of MS-DRGs into any text editor.
6. Format the file
   - Remove the text "MDC" from column 2
   - Wrap the description in column 4 with double quotes so commas are interpreted correctly
7. Save the file
8. Import the file into any data warehouse that also has the previous version of MS-DRG loaded
9. Use the SQL below to populate the `deprecated` and `deprecated_date` columns.  The script does the following:
   1. Compares the old file with the new file to determine if codes have been deprecated.  If they have been, set the column "deprecated" to 1
      and "deprecated_date" to the date the newest codes were published (i.e. the beginning of the current fiscal year)
   2. UNIONs the list of deprecated codes with new valid codes
   3. Cleans up any formatting issues with the output and creates a table.

``` 
-- create table from the output of the script
create table [ms_drg_new] as

-- compare the old codes with the new codes and only return codes that are missing
with depreacted_ms_drg_codes as(
  select
      old.ms_drg_code
      , old.mdc_code
      , old.medical_surgical
      , old.ms_drg_description
      , 1 as deprecated
      , case when deprecated = 0 then '2023-10-01'
          else deprecated_date
    end as deprecated_date
  from [previous_ms_drg_codes] old
  left join [current_ms_drg_codes] new
      on old.ms_drg_code = new.ms_drg_code
  where new.ms_drg_code is null
)

-- union valid codes and depreacted codes together
, union_all_codes as(
select 
  ms_drg_code
  , mdc_code
  , medical_surgical
  , 0 as deprecated
  , null as deprecated_date 
from [current_ms_drg_codes]
where ms_drg_code not in (select ms_drg_code from depreacted_ms_drg_codes)

union all

select
   ms_drg_code
  , mdc_code
  , medical_surgical
  , deprecated
  , deprecated_date
from depreacted_ms_drg_codes
  
)

-- clean up formatting as necessary
select
    trim(ms_drg_code) as ms_drg_code
    , nullif(trim(mdc_code),'') as mdc_code
    , trim(medical_surgical) as medical_surgical
    , trim(ms_drg_description) as ms_drg_description
    , trim(deprecated) as deprecated
    , trim(deprecated_date) as deprecated_date
from union_all_codes

```

10. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
11. Copy and paste the newly created code list into the [MS-DRG file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__ms_drg.csv) as
a CSV file
12. Submit a pull request
13. Upload the newly created code list into S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/ms_drg.csv
from [table_created_in_step_9]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
14. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column with the current date (above).
15. Submit a pull request


### SNOMED-CT to ICD-10-CM Map

This mapping is updated with each new relase of SNOMED CT US Edition which 
happens in March and September, and includes the annual ICD-10-CM update.

The mapping file can be found on the [SNOMED CT United States Edition](https://www.nlm.nih.gov/healthit/snomedct/us_edition.html)
page. Click on the link to download the SNOMED CT to ICD-10-CM Mapping Resources
which includes the human-readable version that contains all required data 
elements in a single TSV file.

The only clean-up required for the Tuva project is to remove the formatting
from the maptarget (ICD-10-CM code) field (e.g. `replace(maptarget,'.','')`).

The HCC Suspecting data mart utilizes the default mapping guidance from NLM which
specifies that the map priority rule of “TRUE” or “OTHERWISE TRUE” should be 
applied if nothing further is known about the patient’s condition. Other 
use-cases may need to further evaluate the map rules that consider a patient's
age, gender, and comorbidities.
