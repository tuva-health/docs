---
id: hcpcs-level-2
title: "HCPCS Level 2"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__hcpcs_level_2.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/hcpcs_level_2.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

1. Navigate to the [CMS HCPCS Quarterly Update page](https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system/quarterly-update)

2. Download the latest ZIP file available.

3. Extract the file named `HCPC<year>_<month>_ANWEB.xlsx` from the ZIP.  
   *This is the only file needed.*

4. Load the extracted Excel file into your data warehouse.

5. Transform the uploaded data into a new table that matches the Tuva Terminology standard:

   | Source Column        | Tuva Column            |
   |----------------------|------------------------|
   | hcpc                 | hcpcs                  |
   | seqnum               | seqnum                 |
   | recid                | recid                  |
   | long description     | long_description       |
   | short description    | short_description      |

   - Ensure that null values are properly represented as `null`, not blank strings (`''`).

6. Unload the table to S3 as a `.csv` file (requires credentials with write permissions to the bucket):
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/hcpcs_level_2.csv
from 
(  select hcpcs, seqnum, recid, substr(long_description, 1, 2000), short_description
   from [table_created_in_step_7]
)
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
overwrite = true;
```
9. Create a branch in [docs](https://github.com/tuva-health/docs). Update the `last_updated` column in the table above with the current date
10. Submit a pull request
