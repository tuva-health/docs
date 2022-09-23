---
sidebar_position: 10
---

# Lab

## Description
This table contains information on lab tests ordered and completed (i.e. with results).  

## Mapping Guidelines
Not all data elements in this table have to be populated.  For example, if you have a lab result dataset that doesn't contain an order_id, you don't need to populate order_id.  

## Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique ID for each visit. |
| patient_id | varchar | no | Unique ID for the patient. |
| order_id | varchar | no | Order ID associated with the lab test order. |
| order_date | date | no | The date the lab test was ordered. |
| result_date | date | no | Date of the lab test result. |
| component_name | varchar | no | Name of the lab test component from the source data. |
| loinc | varchar | yes | Standard LOINC code the lab test component maps to. |
| loinc_description | varchar | yes | Standard LOINC code the lab test component maps to. |
| result | varchar | no | Result of the lab test. |
| units | varchar | yes | Unit of measurement for the lab test. |
| reference_range | varchar | yes | High end of the reference range for the lab test. |
| specimen | varchar | yes | The type of specimen the lab test was run on (blood, urine, etc.). |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims). |