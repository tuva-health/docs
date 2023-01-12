---
id: condition
title: "CONDITION"
---
## Description
The condition table includes billing diagnosis codes from institutional and professional claims in the medical_claim table.  Key ancillary data related to each diagnosis includes the date it was reported, it's rank (i.e. primary or secondary), and whether or not it was present during admission (inpatient encounters only).)  

## Data Dictionary
| Column Name | Data Type | Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique ID for each visit |
| patient_id | varchar | no | Unique ID for the patient |
| condition_date | date | no | Date the condition was recorded |
| condition_type | varchar | yes | Type of condition recorded (e.g. problem | complaint | admit diagnosis | discharge diagnosis) |
| code_type | varchar |	[yes](https://github.com/tuva-health/terminology/blob/main/terminology/code_type.csv) | Type of condition code (e.g. icd-9-cm | icd-10-cm | snomed-ct) |
| code | varchar | yes | The actual condition code |
| description |	varchar | yes | The actual condition description |
| diagnosis_rank | int | no | The order of diagnosis codes (applies to discharge diagnoses only, 1 indicates primary discharge diagnosis) |
| present_on_admit_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Indicates whether the condition was present on admission for discharge diagnosis codes |
| present_on_admit_description | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Indicates whether the condition was present on admission for discharge diagnosis codes |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims) |