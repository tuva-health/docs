---
id: condition
title: "Condition"
---

## Description
A condition is any sort of symptom, problem, complaint, admitting diagnosis, or billing diagnosis as reported by the patient, a clinician, or as otherwise generated (e.g. by the billing process).  Key ancillary data related to condition includes the date it was reported, it's rank (i.e. primary or secondary), and whether or not it was present during admission for an acute inpatient encounter.

## Mapping Guidelines
Conditions can only be generated during encounters (i.e. every condition must have an encounter_id).  

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
| present_on_admit | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Indicates whether the condition was present on admission for discharge diagnosis codes |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims) |