---
id: place-of-service
title: "Place of Service"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__place_of_service.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/place_of_service.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

1. Navigate to the [Place of Service Code Set](https://www.cms.gov/medicare/coding-billing/place-of-service-codes/code-sets)
2. Scroll through the page and find the **Place of Service Codes for Professional Claims section**    
3. Copy and paste the code list into any text editor or spreadsheet
4. **Clean the data:** Remove the row with the "Place of Service Name" as *“unassigned”* from the data
5. Format the codes as a CSV and save
6. Import the CSV file into any data warehouse
7. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/place_of_service.csv
from [table_created_in_step_5]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```

**The below steps are only required if the headers of the file need to be changed.  The Tuva Project does not store the contents of the place_of_service file in GitHub.**

8. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
9. Copy and paste the updated codes into the [place of service file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__place_of_service.csv)
10. Submit a pull request
11. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
12. Submit a pull request