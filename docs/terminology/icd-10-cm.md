---
id: icd-10-cm
title: "ICD-10-CM"
---

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
2. Navigate to the "ICD-10 Files" section of the page and open the drop down for the latest year: example "2025 ICD-10 CM & PCS files"
3. In the dropdown section, click "Code Descriptions in Tabular Order"
4. Unzip the downloaded file and open "icd_10cm_codes"
5. Format this file as a CSV and save
6. Import the CSV file into any data warehouse
7. Upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)

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
of the ICD-10-CM file in GitHub because it is a large file.**


10. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
11. Alter the headers as needed in [ICD-10-CM file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__icd_10_cm.csv)
12. Submit a pull request

## Data Dictionary

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__icd_10_cm.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/icd_10_cm.csv_0_0_0.csv.gz">Download CSV</a>
