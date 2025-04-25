---
id: mdc
title: "MDC"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__mdc.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/mdc.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instructions

1. Navigate to the [CMS MS DRG website](https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps/ms-drg-classifications-and-software)
2. Under the section "MS-DRG Definitions Manual and Software", click on "V42 Definitions Manual Table of Contents - Full Titles - HTML Version"
    - The version (e.g. V42) will change with each new release.    
3. Click on the hyperlink ["Design and Development of the Diagnosis Related Group (DRGs)"](https://www.cms.gov/icd10m/fy2025-version42.1-fullcode-cms/fullcode_cms/Design_and_Development_of_the_Diagnosis_Related_Group_(DRGs).pdf)
4. Scroll through the PDF to find the "Major Diagnostic Categories" table

Follow steps 5-11 if there are any changes.  Otherwise, skip to step 12

5. Copy and paste the code list into any text editor
6. Format the codes as a CSV and save
7. Import the CSV file into any data warehouse
8. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/mdc.csv
from [table_created_in_step_7]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```

**The below steps are only required if the headers of the file need to be changed. The Tuva Project does not store the contents
of the mdc file in GitHub.**

9. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
10. Copy and paste the updated codes into the [MDC file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__mdc.csv)
11. Submit a pull request
12. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
13. Submit a pull request
