---
id: medicare-dual-eligibility
title: "Medicare Dual Eligibility"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__medicare_dual_eligibility.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/medicare_dual_eligibility.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

1. Navigate to the [Medicare-Medicaid Dual Eligibility Code - Latest in Year](https://resdac.org/cms-data/variables/medicare-medicaid-dual-eligibility-code-latest-year#:~:text=CMS%20generally%20considers%20beneficiaries%20as,%2C%2005%2C%20or%2006).
2. Scroll through the page and find the code and code value table.    
3. Copy and paste the code list into any text editor
4. Format the codes as a CSV and save
5. Import the CSV file into any data warehouse
6. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/medicare_dual_eligibility.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```

**The below steps are only required if the headers of the file need to be changed.  The Tuva Project does not store the contents
of the medicare_dual_eligibility file in GitHub.**

9. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
10. Copy and paste the updated codes into the [medicare dual eligibility file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__medicare_dual_eligibility.csv)
11. Submit a pull request
12. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
13. Submit a pull request
