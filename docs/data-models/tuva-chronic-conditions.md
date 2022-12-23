---
id: tuva-chronic-conditions
title: "Tuva Chronic Conditions"
---
The Tuva Chronic Conditions data mart is a chronic condition grouper that includes ~40 homogeneous and mutually exclusive chronic condition categories.  We developed this grouper after working with the CMS Chronic Condition grouper and finding problems with it.  

There are 3 main output tables from this data mart:

- **[Chronic Condition Groups](#chronic-condition-groups):** This table contains the chronic condition hierarchy - use it if you're interested to see the distinct list of chronic conditions and condition families they map to.

- **[Chronic Conditions Long](#chronic-conditions-long):** This table contains 1 record for each patient for each chronic condition they have, along with the first and most recent dates of diagnosis.

- **[Chronic Conditions Wide](#chronic-conditions-wide):** This table contains 1 record per patient and a column for each chronic condition.  For each chronic condition column, the value will be 1 if the patient has that chronic condition, and 0 otherwise.

## Chronic Condition Groups

### Description
This table contains the list of chronic conditions included in this grouper, along with the condition families that they map to.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| condition_family | varchar |  | The disease family the condition belongs to e.g. cardiovascular, metabolic, etc. |
| condition | varchar | yes | The actual chronic condition. |

## Chronic Conditions Long

### Description
This table contains a single record per patient per chronic condition.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique ID for each patient. |
| condition_family | varchar | [yes](https://github.com/tuva-health/tuva_chronic_conditions/blob/main/seeds/tuva_chronic_conditions__chronic_conditions_hierarchy.csv) | The disease family the condition belongs to e.g. cardiovascular, metabolic, etc. |
| condition | varchar | [yes](https://github.com/tuva-health/tuva_chronic_conditions/blob/main/seeds/tuva_chronic_conditions__chronic_conditions_hierarchy.csv)] | Unique ID for each patient. |
| first_diagnosis_date | date | no | The date the patient was first diagnosed with the condition. |
| last_diagnosis_date | date | no | The date the patient was last diagnosed with the condition. |

## Chronic Conditions Wide

### Description
This table contains a single record per patient with columns for every chronic condition.  For each chronic condition column, the patient receives a '1' if the patient has been diagnosed with that chronic condition, and a '0' otherwise.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique ID for each patient. |
| patient_id | varchar | no | Unique ID for each patient. |

