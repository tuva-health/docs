---
id: apr-drg
title: "APR-DRG"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.terminology__apr_drg.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/apr_drg.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

1. Navigate to the [AHRQ HCUP website](https://hcup-us.ahrq.gov/)
2. Click the header tab "Database Information"
3. Click on the hyperlink "NIS Database Documentation"
4. Under "Additional Resources for Data Elements" click on the hyperlink ["APR-DRGs Methodology Overview Version 31"](https://hcup-us.ahrq.gov/db/nation/nis/grp031_aprdrg_meth_ovrview.pdf)
5. Scroll to the bottom of the PDF, copy and paste the codes found in "Appendix A - List of All Patient refined DRGs" into any text editor
6. Format the codes as a CSV file and save
7. Import the CSV file into any data warehouse
8. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/apr_drg.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
9. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
10. Copy and paste the CSV formatted code list into the [APR-DRG file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__apr_drg.csv)
11. Create a branch in [docs](https://github.com/tuva-health/docs). Update the `last_updated` column in the table above with the current date
12. Submit a pull request
