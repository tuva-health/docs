---
id: icd-10-pcs
title: "ICD-10-PCS"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__icd_10_pcs.columns" />

## Maintenance Instructions

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