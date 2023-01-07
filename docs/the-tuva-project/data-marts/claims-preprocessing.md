---
id: claims-preprocessing
title: "Claims Preprocessing"
---
Claims Preprocessing is a data mart that transforms data from the Claims Common Data Model (CDM) into a collection of tables that are foundational for analytics.  Specifically, Claims Preprocessing outputs the following tables:

- **[Condition](#condition):** Organizes all diagnosis codes into a long-formatted table that is easy to join to or lookup diagnosis codes in.

- **[Encounter](#encounter):** Assigns every claim a mutually exclusive encounter type and groups continuous stay claims (e.g. acute inpatient visits) into a single encounter.

- **[Patient](#patient):** Organizes all patient demographic and geographic information into a single table.

- **[Procedure](#procedure):** Organizes all procedure codes into a long-formatted table that is easy to join to or lookup procedures codes in.

## Condition

### Description
The condition table includes billing diagnosis codes from institutional and professional claims in the medical_claim table.  Key ancillary data related to each diagnosis includes the date it was reported, it's rank (i.e. primary or secondary), and whether or not it was present during admission (inpatient encounters only).)  

### Data Dictionary
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

## Encounter

### Description
Each record in the encounter table represents a unique visit.  Each visit is assigned a unqiue encounter type, which denotes the type of visit (e.g. acute inpatient, emergency department, etc.).  All claims related to the visit, whether that includes a single professional claim in the case of an office visit, or mulitple professional and institutional claims in the case of an acute inpatient visit, are grouped together and rolled up to the encounter level.  For example, this means that each encounter will have a unique start date and end date, even though the claims underneath the encounter may have multiple start and end dates.  Codes (e.g. discharge disposition and MS-DRG) are similarly rolled up.  Financial concepts, such as paid amount, allowed amount, and charges are summed across claims.

### Data Dictionary
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

## Patient

### Description
The patient table describes the attributes of a patient that are unchanging over time (e.g. biological sex, birth date, etc.).  The vast majority of healthcare analytics use cases involve analyzing things that happen to patients, so it's critical to have a clean patient table that contains this information.

### Data Dictionary
| Column Name | Data Type | Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique ID for the patient. |
| gender | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/gender.csv) | The patient's biological sex at birth. |
| race | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/race.csv) | The patient's race. |
| birth_date | date | no |	The patient's date of birth. |
| death_date | date | no |	The patient's date of death. |
| death_flag | int | no | Flag (0 or 1) indicating whether the patient is deceased. |
| first_name | varchar | no | First name of the patient. |
| last_name | varchar | no | Last name of the patient. |
| address |	varchar | no | The patient's most recent street address. |
| city | varchar | no | The patient's most recent city of residence (home address). |
| state | varchar |	[yes](https://github.com/tuva-health/terminology/blob/main/terminology/state.csv) |	The patient's most recent state of residence (home address). |
| zip_code | varchar | no | The patient's most recent zip code of residence (home address). |
| phone | varchar | no | The patient's preferred contact number. |
| data_source |	varchar	| no | Indicates the name of the source dataset (e.g. Medicare Claims). |

## Procedure

### Description
Procedures are treatments performed by clinicians for patients to help manage or alleviate conditions.  Important ancillary data related to procedures includes the date performed and the performing clinician.  Common procedure codes include ICD-10-PCS and HCPCS.

### Data Dictionary
| Column Name | Data Type | Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique ID for each visit |
| patient_id | varchar | no | Unique ID for the patient |
| procedure_date | date | no | Date when the procedure was performed |
| code_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/code_type.csv) | Indicates the type of procedure (e.g. cpt, icd-10-pcs, etc.) |
| code | varchar | yes | Acute procedure code |
| description |	varchar | yes |	Acute procedure code description |
| practitioner_npi | varchar |	yes | NPI for the physician who performed the procedure |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims) |