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
2. Go to the ICD-10  Files section, click the section for ICD-10-CM & PCS files of the current fiscal year (e.g. 2025 ICD-10 CM & PCS)
3. Within the ICD-10-CM Files section, select the hyperlink titled "Code Descriptions in Tabular Order" to download the associated ZIP file
4. Unzip the downloaded file and open "icd10cm_order_\{year}"
5. Save the "icd10cm_order_\{year}" as a text file
6. Load the text file into the below python script:
    ```python
    import pandas as pd

    def text_to_dataframe(input_file):
        with open(input_file, 'r', encoding='utf-8') as file:
            lines = file.readlines()
        
        df = pd.DataFrame({'Text': lines})
        df['Text'] = df['Text'].str.strip('\n')
        
        return df


    def main():
        input_filename = "your text file path"
        output_filename = "output csv file path"   
        
        df = text_to_dataframe(input_filename)
        print(df.head())

        df['SN'] = df['Text'].str.slice(0,6)
        df['icd_10_cm'] = df['Text'].str.slice(6,14)
        df['header_flag'] = df['Text'].str.slice(14,16)
        df['short_description'] = df['Text'].str.slice(16, 77)
        df['long_description'] = df['Text'].str.slice(77, )

        df2 = df[['icd_10_cm', 'header_flag', 'short_description',    'long_description']]
        # Remove leading/trailing whitespace from all string columns
        df2 = df2.apply(lambda x: x.str.strip() if x.dtype == "object" else x)
        
        print(df2.head())
        #save the final dataframe as a csv file
        df2.to_csv(output_filename, index=False)

    if __name__ == "__main__":
        main()
    ```
    **Note**: *You might need to adjust the slicing indexes according to the length of your data field*
7. Import the CSV file into any data warehouse and upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)

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
of the ICD-10-CM file in GitHub.**


10. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
11. Alter the headers as needed in [ICD-10-CM file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__icd_10_cm.csv)
12. Submit a pull request

