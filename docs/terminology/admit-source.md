---
id: admit-source
title: "Admit Source"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.terminology__admit_source.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/admit_source.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

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
9. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date.
10. Submit a pull request
