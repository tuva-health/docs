---
sidebar_position: 9
---

# Medication

## Description
This table contains information on medications ordered by providers and administered to patients.

## Mapping Guidelines
This table is intended to store medications administered to patients during an encounter (e.g. hospital visit) and also medications filled by patients outside of an encounter (e.g. at a retail pharmacy).

## Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique ID for each visit |
| patient_id | varchar | no | Unique ID for the patient |
| request_date | date | no | Date the medication request was entered |
| filled_date | date | no | Date the prescription was filled |
| paid_date | date | no | Date the prescription as paid |
| request_status | varchar | yes | Status of the medication order (e.g. active | on-hold | cancelled | completed) |
| medication_name | varchar | no | Name of the medication from the source data |
| ndc | varchar | yes | NDC code associated with the medication |
| rx_norm | varchar | yes | RxNorm code associated with the medication |
| dose | varchar | no | Prescribed dose |
| dose_unit | varchar | yes | Prescribed dose units |
| quantity | varchar | no | Quantity contained in a single medication fill |
| refills | varchar | no | Number of refills |
| duration | varchar | no | The duration the medication is intended to be taken over |
| route | varchar | no | How the medication was delivered (e.g. IV) |
| physician_npi | varchar | yes | Physician who ordered or prescribed the medication |
| paid_amount | float |  | Claim paid amount for the medication |
| data_source | varchar |  | Indicates the name of the source dataset (e.g. Medicare Claims) |