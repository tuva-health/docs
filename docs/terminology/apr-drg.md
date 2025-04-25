---
id: apr-drg
title: "APR-DRG"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.terminology__apr_drg.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/apr_drg.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

1. Navigate to the [Solventum APR DRG page](https://www.solventum.com/en-us/home/h/f/b5005024009/)
2. Find the description files worded 'Solventum APR DRG descriptions'
3. Open the latest description file, named 'APR DRG &lt;latestversion&gt; descriptions'
4. Copy the code block from the file and paste it into a text editor.
5. Format the codes as a CSV file and save
    - You can paste it into Google Sheets or Excel
    - Use the pipe symbol (`|`) as the custom delimiter
    - Save/export the sheet as a `.csv` file
6. Import the CSV file into your data warehouse
    - Ensure that empty fields are imported as `null`, not blank strings (`''`)
7. Transform the uploaded data to another table to match the Tuva Terminology standard:
    - DRG → apr_drg_code
    - Type → medical_surgical
    - MDC → mdc_code
    - Long Description → apr_drg_description
8. Unload the table from the data warehouse to a CSV file in S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/apr_drg.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
overwrite = true;
```
9. Create a branch in [docs](https://github.com/tuva-health/docs). Update the `last_updated` column in the table above with the current date
10. Submit a pull request
