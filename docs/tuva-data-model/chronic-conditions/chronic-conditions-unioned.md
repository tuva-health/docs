---
id: chronic-conditions-unioned
title: "chronic_conditions_unioned"
---
## Description
This table contains one record per patient per chronic condition.  For example, if a patient has 3 chronic conditions they will have 3 records in this table.  Each record includes the condition category, condition, date of onset, most recent diagnosis, and the total count of diagnosis codes that were recorded that are relevant for the condition.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar |  | Unique ID for each patient. |
| condition_category | varchar | yes | The category of the condition (e.g. physicial health, behavioral health). |
| condition | varchar | yes | The name of the condition. |
| condition_onset_date | date |  | The date the condition was first diagnosed based on available data. |
| condition_recent_date | date |  | The date the condition was most recently diagnosed based on available data. |
| condition_count | int |  | The number of conditions for the patient. |
| data_source | varchar |  | Indicates the name of the source dataset (e.g. Medicare Claims). |