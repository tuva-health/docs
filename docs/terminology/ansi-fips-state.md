---
id: ansi-fips-state
title: "ANSI FIPS State"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

[FIPS state codes](https://www.census.gov/library/reference/code-lists/ansi.html) assigned by ANSI and used by the US Census Bureau.

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.reference_data__ansi_fips_state.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/ansi_fips_state.csv_0_0_0.csv.gz">Download CSV</a>

---

## What are ANSI FIPS State Code?

American National Standards Insititute (ANSI) codes are standarized numeric or alphabetic codes whose documentation is issued by ANSI to ensure the uniform indentificaiton of geographic entities through all government agencies. 

Federal Information Processing Standards (FIPS) is a set of publically announced standards developed by the U.S. Federal Government for use in computer system by non-military government agencies and contractors. FIPS ensures standardized security and interportability across government system. 

ANSI FIPS State code is a standarized two-digit numeric codes that represents each U.S. state and certain territories. 

---

## Tuva Seed File Update Process

Note: This is the maintenance process used by Tuva to maintain the current codeset in the Tuva package. Tuva users do not need to complete this step unless they are leveraging a different version of codes or are no longer updating to the current version of the project, but need an updated terminology set. 

**The below description outlines the update process as it existed prior to changes in the ANSI site no longer publishing updates to this code set. Updates are currently on hold until a new source can be identified**

1. Navigate to the [ANSI Census Website](https://www.census.gov/library/reference/code-lists/ansi.html)
2. Select the latest available census year
3. Navigate to **State and State Equivalent** section
4. Click to the available data file link to download the latest avilable data
5. Copy and paste the code list into any text editor
6. Find and replace all "|" with "," and save in a CSV file format
7. Map the headers as follow

    | Source Header | Expected Header              |
    |---------------|------------------------------|
    | STATEFP       | ANSI_FIPS_STATE_CODE         |
    | STATE         | ANSI_FIPS_STATE_ABBREVIATION |
    | STATE_NAME    | ANSI_FIPS_STATE_NAME         |
    
8. Import the CSV file into any data warehouse
9. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/anis_fips_state.csv
from [table_created_in_step_8]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
10. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
11. Submit a pull request

**The below steps are only required if the headers of the file need to be changed. The Tuva Project does not store the contents of the terminology file in GitHub.**

1. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
2. Copy and paste the updated header into the [ANSI FIPS State File](https://github.com/Nabin-Maitri/tuva/blob/main/seeds/reference_data/reference_data__ansi_fips_state.csv)
3. Submit a pull request