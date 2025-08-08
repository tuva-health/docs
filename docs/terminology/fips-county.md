---
id: fips-county
title: "FIPS County"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

Here's a brief explanation of how FIPS works:
- Each State has a unique two digit FIPS code. For example, California is 06 and New York is 36.
- Each county has a unique five digit FIPS code. The first two digits are the state FIPS code and the last three are
the county. 
- The next level we care about is the census tract. Each tract has a unique 11 digit FIPS code. The first two digits
are the state FIPS code, the next three are the county FIPS code and the last six are the tract FIPS code.
- Finally, we have the census block group. Each block group has a unique 12 digit FIPS code. The first two digits
are the state FIPS code, the next three are the county FIPS code, the next six are the tract FIPS code and the last
digit is the block group FIPS code.

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.reference_data__fips_county.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/fips_county.csv_0_0_0.csv.gz">Download CSV</a>

---
## Tuva Seed File Update Process

Note: This is the maintenance process used by Tuva to maintain the current codeset in the Tuva package. Tuva users do not need to complete this step unless they are leveraging a different version of codes or are no longer updating to the current version of the project, but need an updated terminology set. 

**The below description outlines the update process as it existed prior to changes in the ANSI site no longer publishing updates to this code set. Updates are currently on hold until a new source can be identified**

1. Navigate to the [ANSI Census Website](https://www.census.gov/library/reference/code-lists/ansi.html)
2. Select the latest available census year
3. Navigate to **County and County Equivalent Entities** section
4. From Dropdown section, select **United State**
5. Copy and paste the code list into any text editor
6. Find and replace all "|" with "," and save in a CSV file format
    - Encode and Decode the non regular characters like "â€" to plain text
7. Concat `STATEFP` and `COUNTYFP` from raw data to generate `FIPS_CODE` field
8. Truncate last part of `COUNTYNAME` field and map to `COUNTY` field and `STATE` to `STATE` itself.

9. Import the CSV file into any data warehouse
10. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/fips_county.csv
from [table_created_in_step_8]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
11. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
12. Submit a pull request

**The below steps are only required if the headers of the file need to be changed. The Tuva Project does not store the contents of the terminology file in GitHub.**

1. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
2. Copy and paste the updated header into the [ANSI FIPS County File](https://github.com/Nabin-Maitri/tuva/blob/main/seeds/reference_data/reference_data__fips_county.csv)
3. Submit a pull request