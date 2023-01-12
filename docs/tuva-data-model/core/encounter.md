---
id: encounter
title: "ENCOUNTER"
---
## Description
Each record in the encounter table represents a unique visit.  Each visit is assigned a unqiue encounter type, which denotes the type of visit (e.g. acute inpatient, emergency department, etc.).  All claims related to the visit, whether that includes a single professional claim in the case of an office visit, or mulitple professional and institutional claims in the case of an acute inpatient visit, are grouped together and rolled up to the encounter level.  For example, this means that each encounter will have a unique start date and end date, even though the claims underneath the encounter may have multiple start and end dates.  Codes (e.g. discharge disposition and MS-DRG) are similarly rolled up.  Financial concepts, such as paid amount, allowed amount, and charges are summed across claims.

## Data Dictionary
| Column Name | Data Type | Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique ID for each visit |
| patient_id | varchar | no | Unique ID for the patient |
| encounter_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/encounter_type.csv) | Type of encounter (e.g. acute inpatient, outpatient, emergency department, office visit, etc.) |
| encounter_start_date | date |	no | Start date for the encounter |
| encounter_end_date | date | no | End date for the encounter |
| admit_source_code	| varchar |	[yes](https://github.com/tuva-health/terminology/blob/main/terminology/admit_source.csv) | Indicates the point of origin for the patient prior to admission (e.g. Non-Health Care, Emergency Room, Transfer) |
| admit_source_description | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/admit_source.csv) | Indicates the point of origin for the patient prior to admission (e.g. Non-Health Care, Emergency Room, Transfer) |
| admit_type_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/admit_type.csv) | Indicates the type of admission (e.g. elective, urgent, emergency, newborn, etc.) |
| admit_type_description | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/admit_type.csv) | Indicates the type of admission (e.g. elective, urgent, emergency, newborn, etc.) |
| discharge_disposition_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/discharge_disposition.csv) | Indicates the type of setting the patient was discharged to (e.g. Home, SNF, Home Health) |
discharge_disposition_description | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/discharge_disposition.csv) | Indicates the type of setting the patient was discharged to (e.g. Home, SNF, Home Health) |
| rendering_npi | varchar |	no | Typically represents the attending provider NPI associated with the encounter |
| billing_npi | varchar |	no | Typically represents the healthcare organization submitting the claim |
| facility_npi | varchar |	no | Typically represents the facility where the healthcare service was rendered (institutional claims only) |
| ms_drg_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/ms_drg.csv) | The MS-DRG billed on the encounter |
| ms_drg_description | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/ms_drg.csv) | The MS-DRG billed on the encounter |
| paid_date | float |	no | The date of the last paid claim for the encounter |
| paid_amount | float |	no | The total amount paid by the health insurer for the encounter |
| allowed_amount | float |	no | The total amount contractually allowed (patient plus health insurer) for the encounter |
| charge_amount | float | no | The total amount charged by the provider for the encounter |
| data_source |	varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims) |