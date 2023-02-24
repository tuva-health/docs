---
id: encounter
title: "Encounter"
---

## Description
The encounter table is intended to store information that represents a unique patient interaction with the healthcare system.  It's intended to be synonymous with a healthcare visit (e.g. hospital admission, office visit, etc.).  All healthcare analytics use cases involving utilization require an encounter concept.  Not only is it important to know about each unique encounter a patient has with the healthcare system, but it's also important to know the type of visit (e.g. acute inpatient, ED, office visit, inpatient rehab, etc.), the start and end dates for the visit, the total amount paid for the visit, and other pieces of information about the visit.  The encounter table stores all of this important information in a single table.

## Mapping Guidelines
Each record in the encounter table is supposed to be a unique encounter (i.e. visit).  The encounter_type field (which is a normalized field) indicates the type of visit (e.g. acute inpatient).  If the data source is claims data, you can use [claims preprocessing](https://github.com/tuva-health/claims_preprocessing_snowflake) to create this concept.

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
| physician_npi | varchar |	yes | The attending provider NPI associated with the encounter |
| location | varchar | no | The discharge location name (e.g. facility name) |
| facility_npi | varchar | no | The discharge location NPI (e.g. facility NPI) |
| ms_drg | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/ms_drg.csv) | The MS-DRG billed on the encounter |
| paid_amount | float |	no | The total paid amount (claims cost) for the encounter |
| charge_amount | float | no | The total amount charged by the provider for the encounter |
| data_source |	varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims) |

