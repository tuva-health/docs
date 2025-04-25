---
id: present-on-admission
title: "Present on Admission"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__present_on_admission.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/present_on_admission.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

1. Navigate to the [Present on Admission](https://www.cms.gov/medicare/payment/fee-for-service-providers/hospital-aquired-conditions-hac/coding)
2. Scroll through the page and find the **CMS POA Indicator Options and Definitions** section    
3. Copy and paste the code list into any text editor or spreadsheet
4. Format the codes as a CSV and save
5. Import the CSV file into any data warehouse
6. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/present_on_admission.csv
from [table_created_in_step_5]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```

**The below steps are only required if the headers of the file need to be changed.  The Tuva Project does not store the contents of the present_on_admission file in GitHub.**

7. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
8. Copy and paste the updated codes into the [present_on_admission file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__present_on_admission.csv)
9. Submit a pull request
10. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
11. Submit a pull request