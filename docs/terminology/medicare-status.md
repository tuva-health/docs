---
id: medicare-status
title: "Medicare Status"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__medicare_status.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/medicare_status.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

1. Navigate to the [Medicare Status Code-Latest in Year](https://resdac.org/cms-data/variables/medicare-status-code-latest-year)
2. Scroll through the page and find the code and code value table    
3. Copy and paste the code list into any text editor or spreadsheet.
4. Format the codes as a CSV and save
5. Import the CSV file into any data warehouse
6. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/medicare_status.csv
from [table_created_in_step_5]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
7. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
8. Submit a pull request

**The below steps are only required if the headers of the file need to be changed.  The Tuva Project does not store the contents of the medicare_status file in GitHub.**

1. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
2. Alter the headers as needed in [medicare_status file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__medicare_status.csv)
3. Submit a pull request
