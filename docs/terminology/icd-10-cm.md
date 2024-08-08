---
id: icd-10-cm
title: "ICD-10-CM"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__icd_10_cm.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/icd_10_cm.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

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

