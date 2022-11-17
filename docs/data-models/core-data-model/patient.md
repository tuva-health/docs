---
sidebar_position: 1
---

# Patient

## Description
The patient table describes the attributes of a patient that are unchanging over time (e.g. biological sex, birth date, etc.).  The vast majority of healthcare analytics use cases involve analyzing things that happen to patients, so it's critical to have a clean patient table that contains this information.

## Mapping Guidelines
The patient table is intended to store a single unique record per patient.  If you're dealing with multiple healthcare datasets with overlapping patients these datasets should be mastered (e.g. merged) upstream from this table.  A few concepts in the patient table need to be normalized (e.g. gender, race, etc.).  You can see exactly which concepts these are in the data dictionary below.

## Data Dictionary
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