---
sidebar_position: 2
---

# Member Month

## Description
This table contains information on patient health insurance eligibility.

## Mapping Guidelines
This table has one record per patient (i.e. member) per month.

## Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique ID for the patient. |
| payer | varchar | no | The name of payer giving the patient insurance coverage. |
| month | int | no | The month of coverage. |
| year | int | no | The year of coverage. |
| payer_type | varchar | yes | Type of insurer (e.g. commercial | medicare | medicaid | unknown) |
| dual_status_code | varchar | yes | Indicates whether the patient was dually eligible for Medicare and Medicaid for the month. |
| dual_status_description | varchar | yes | Indicates whether the patient was dually eligible for Medicare and Medicaid for the month. |
| medicare_status_code | varchar | yes | Indicates how the patient originally received Medicare eligibility. |
| medicare_status_description | varchar | yes | Indicates how the patient originally received Medicare eligibility. |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims). |