---
id: icd-10-cm
title: "ICD-10-CM"
---

## Data Dictionary

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__icd_10_cm.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/icd_10_cm.csv_0_0_0.csv.gz">Download CSV</a>

## What is ICD-10-CM?

**ICD-10-CM** stands for *International Classification of Diseases, 10th Revision, Clinical Modification*. It is the U.S. clinical adaptation of the **ICD-10** system developed by the **World Health Organization (WHO)**.

- **Maintained by**: National Center for Health Statistics (NCHS), part of the CDC.
- **Purpose**: Enables the standardized coding of diagnoses across all healthcare settings in the U.S.
- **Usage**: Medical billing, claims processing, clinical research, quality reporting, risk adjustment, and public health tracking.

## Who Maintains ICD-10-CM?

- The **National Center for Health Statistics (NCHS)**, under the **Centers for Disease Control and Prevention (CDC)**, is responsible for the development and maintenance of ICD-10-CM.
- Updates are published annually, typically effective **October 1** of each year.
- Coordination occurs through the **ICD-10 Coordination and Maintenance Committee**, jointly managed by:
  - **NCHS** (diagnoses)
  - **CMS** (Centers for Medicare & Medicaid Services – procedures via ICD-10-PCS)

📎[ICD-10-CM Updates and Information] (https://www.cms.gov/medicare/coding-billing/icd-10-codes)

📎 [ICD-10-CM Official Guidelines for Coding and Reporting](https://www.cms.gov/files/document/fy-2025-icd-10-cm-coding-guidelines.pdf)


## Code Structure

Each **ICD-10-CM** code:
- Is **alphanumeric**, typically **3 to 7 characters** long.
- The **first character is always a letter**.
- The **next 2 characters are numbers**.
- The **4th–7th characters (if present)** provide greater specificity, such as:
  - **Laterality** (e.g., left vs. right)
  - **Episode of care** (e.g., initial vs. subsequent encounter)
  - **Severity, etiology, or anatomical site**

**Example**:
> `S52.521A`  
> → Displaced fracture of shaft of right radius, initial encounter for closed fracture

## Key Use Cases

- **Billing & Reimbursement**: Required on all claims submitted to payers.
- **Clinical Documentation Improvement (CDI)**: Ensures precise representation of patient conditions.
- **Analytics & Reporting**: Tracks trends, utilization, outcomes, risk stratification.
- **Quality Measures & Risk Adjustment**: Used in programs like HEDIS, Medicare Advantage, and ACOs.


### 📌 Notes for Data Analysts

- ICD-10-CM codes are often joined to **hierarchical groupers** like [CCSR](../value-sets/ccsr-groupers) or [HCC](docs/value-sets/cms-hccs.md) for summarization.
- Strings may need **normalization** (e.g., removing periods or standardizing case). Tuva's source for this data does not currently contain periods, but some sources may have them and they are typically removed. 

## Tuva Seed File Update Process

Note: This is the maintenance process used by Tuva to maintain the current codeset in the Tuva package. Tuva users do not need to complete this step unless they are leveraging a different version of ICD-10-CM codes or have forked the Tuva project and are no longer updating to the current version. 

1. Navigate to the [CMS ICD 10 website](https://www.cms.gov/medicare/coding-billing/icd-10-codes)
2. Go to the ICD-10  Files section, click the section for ICD-10-CM & PCS files of the current fiscal year (e.g. 2025 ICD-10 CM & PCS)
3. Within the ICD-10-CM Files section, select the hyperlink titled "Code Descriptions in Tabular Order" to download the associated ZIP file
4. Unzip the downloaded file and open "icd10cm_order_\{year}"
5. Save the "icd10cm_order_\{year}" as a text file
6. Load the text file into the below python script and run:

*Since the text file contains fixed-length fields, the following Python script can be used to convert it into a CSV file.*
    ```python
    import pandas as pd

    #This function converts the text file into a dataframe with single field 'Text'
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

        #Slices the single column dataframe into dataframe with required columns
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

1. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
2. Alter the headers as needed in [ICD-10-CM file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__icd_10_cm.csv)
3. Submit a pull request