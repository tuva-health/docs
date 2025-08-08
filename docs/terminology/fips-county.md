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

**The below description outlines the update process as it existed prior to changes in the ANSI site no longer publishing updates to this code set. Updates are currently on hold until a new source can be identified**

1. Navigate to the [ANSI Census Website](https://www.census.gov/library/reference/code-lists/ansi.html)
2. Select the latest available census year
3. Navigate to **County and County Equivalent Entities** section
4. From Dropdown section, select **United States**
5. Copy and paste the code list into any text editor
6. Find and replace all "|" with "," and save in a CSV file format
7. Format the file
    - Encode and Decode the non regular characters like "â€" to plain text
    - Concat `STATEFP` and `COUNTYFP` from raw data to generate `FIPS_CODE` field
    - Truncate last part of `COUNTYNAME` field and map to `COUNTY` field and `STATE` to `STATE` itself.

***Note**: you can use the below script to format the file as said in **number 7.***
```python
import re
import pandas as pd
import unicodedata

def fix_and_normalize(val):
    '''
        Normalize the string to NFKD form, encode to latin1, decode to utf-8, then encode to ascii ignoring errors
    '''
    if isinstance(val, str):
        try:
            return unicodedata.normalize('NFKD', val.encode('latin1').decode('utf-8')).encode('ascii', 'ignore').decode('ascii')
        except Exception:
            return val
    return val

def format_columns(raw_df):
    # select only the necessary columns
    raw_df = raw_df[['STATEFP', 'COUNTYFP', 'COUNTYNAME', 'STATE']]
    # concats `STATEFP` and `COUNTYFP` to generate `FIPS_CODE`
    raw_df['FIPS_CODE'] = raw_df['STATEFP'] + '' + raw_df['COUNTYFP']
    raw_df.rename(columns={'COUNTYNAME':'COUNTY'}, inplace=True)
    raw_df.drop(['STATEFP', 'COUNTYFP'], axis=1, inplace=True)
    column_formatted_df = raw_df[['FIPS_CODE', 'COUNTY', 'STATE']]
    return column_formatted_df


if __name__ == "__main__":
    input_file_location= "your csv file path"
    output_file_location = "your processed csv file path"
    read_df = pd.read_csv(f'{input_file_location}', dtype=str)
    column_formatted_df = format_columns(raw_df = read_df)
    for col in column_formatted_df.select_dtypes(include=['object']).columns:
        column_formatted_df[col] = column_formatted_df[col].apply(fix_and_normalize)

    cleaning_list = ['parish', 'borough', 'census area', 'county', 'city and borough', 'municipio', 'island', 'municipality']
    # regex matches optional whitespace and trailing dots followed by any word from cleaning_list at the end of a string.
    pattern = r'\s*(?:{})(?:\s*\.*)?\s*$'.format("|".join(map(re.escape, cleaning_list)))
    column_formatted_df['COUNTY'] = column_formatted_df['COUNTY'].str.replace(pattern, '', regex=True, flags=re.IGNORECASE)
    column_formatted_df.to_csv(f'{output_file_location}', index=False, encoding='utf-8', sep=',')

```
8. Import the CSV file into any data warehouse
9. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/fips_county.csv
from [table_created_in_step_8]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
10. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
11. Submit a pull request

**The below steps are only required if the headers of the file need to be changed. The Tuva Project does not store the contents of the terminology file in GitHub.**

1. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
2. Copy and paste the updated header into the [ANSI FIPS County File](https://github.com/Nabin-Maitri/tuva/blob/main/seeds/reference_data/reference_data__fips_county.csv)
3. Submit a pull request