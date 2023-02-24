---
id: provider
title: "Provider"
---

## Description
Procedures are treatments performed by clinicians for patients to help manage or alleviate conditions.  Important ancillary data related to procedures includes the date performed and the performing clinician.  Common procedure codes include ICD-10-PCS and HCPCS.

## Mapping Guidelines 
This grain of this table is the encounter and procedure level.  Every procedure must have a corresponding encounter during which the procedure was performed.

## Data Dictionary
| Column Name | Data Type | Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique ID for each visit |
| patient_id | varchar | no | Unique ID for the patient |
| procedure_date | date | no | Date when the procedure was performed |
| code_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/code_type.csv) | Indicates the type of procedure (e.g. cpt, icd-10-pcs, etc.) |
| code | varchar | yes | Acute procedure code |
| description |	varchar | yes |	Acute procedure code description |
| physician_npi | varchar |	yes | NPI for the physician who performed the procedure |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims) |