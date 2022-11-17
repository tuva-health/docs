---
sidebar_position: 12
---

# Allergy

## Description
This information contains information on a patient's known allergies, including medication, food, and environmental allergies.

## Mapping Guidelines
A patient may have many allergies or none.  An allergy is recorded during an encounter.

## Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique ID for each visit. |
| patient_id | varchar | no | Unique ID for the patient. |
| status | varchar | yes | Indicates the status of the allergy (e.g. active | inactive | resolved). |
| allergy_description | varchar | no | Description of the allergy. |
| severity | varchar | yes | Indicates the severity of the allergy (e.g. mild | moderate | severe (of event as a whole). |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims). |