---
id: admit-type
title: "Admit Type"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

## Maintenance Instructions

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