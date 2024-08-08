---
id: ms-drg
title: "MS-DRG"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__ms_drg.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/ms_drg.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

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

```sql
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
