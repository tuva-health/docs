---
id: readmission-summary
title: "Readmission Summary"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The readmission summary table is the output table from the readmissions data mart.  It contains all the columns needed to do hospital readmission analytics in a single table.

<JsonDataTable  jsonPath="nodes.model\.readmissions\.readmissions__readmission_summary.columns"  />


[//]: # (| Column Name | Data Type | Normalized Terminology | Description |)

[//]: # (|---|:---:|:---:|---|)

[//]: # (| encounter_id | varchar | no | Unique ID for the encounter. |)

[//]: # (| patient_id | varchar | no | Unique ID for the patient. |)

[//]: # (| admit_date | date | no | Date of admission for the index admission. |)

[//]: # (| discharge_date | date | no | Date of discharge for the index admission. |)

[//]: # (| discharge_disposition_code | varchar | yes | Discharge disposition for the index admission. |)

[//]: # (| facility | varchar | no | Name of the facility &#40;hospital&#41; for the index admission. |)

[//]: # (| ms_drg | varchar | yes | MS-DRG for the index admission. |)

[//]: # (| length_of_stay | int | no | Length of stay &#40;discharge minus admit date&#41; for the index admission. |)

[//]: # (| index_admission_flag | int | no | Flag indicating the admission qualified as an index admission. |)

[//]: # (| planned_flag | int | no | Flag indicating the admission qualified as a planned admission. |)

[//]: # (| specialty_cohort | varchar | no | The specialty cohort of the admission. |)

[//]: # (| died_flag | int | no | Flag indicating whether the patient died during the index admission. |)

[//]: # (| diagnosis_ccs | varchar | no | The CCS code corresponding to the admission. |)

[//]: # (| had_readmission_flag | int | no | Flag indicating whether a readmission occurred for the index admission. |)

[//]: # (| days_to_readmit | int | no | Number of days from index admission to readmission. |)

[//]: # (| readmit_30_flag | int | no | Flag indicating whether the readmission was within 30 days of discharge of the index. |)

[//]: # (| unplanned_readmit_30_flag | int | no | Flag indicating whether an unplanned readmission occurred within 30 days of the index admission. |)

[//]: # (| readmission_encounter_id | varchar | no | Encounter ID for the readmission. |)

[//]: # (| readmission_admit_date | date | no | Admit date for the readmission. |)

[//]: # (| readmission_discharge_date | date | no | Discharge date for the readmission. |)

[//]: # (| readmission_discharge_disposition_code | varchar | yes | Discharge disposition code for the readmission. |)

[//]: # (| readmission_facility | varchar | no | The facility &#40;hospital&#41; where the readmission occurred. |)

[//]: # (| readmission_ms_drg | varchar | yes | The MS-DRG for the readmission. |)

[//]: # (| readmission_length_of_stay | int | no | The length of stay of the readmission. |)

[//]: # (| readmission_index_admission_flag | int | no | Indicates whether the readmission was an index itself. |)

[//]: # (| readmission_planned_flag | int | no | Indicates whether the readmission was planned. |)

[//]: # (| readmission_specialty_cohort | varchar | no | The readmission's specialty cohort. |)

[//]: # (| readmission_died_flag | int | no | Indicates whether the patient died in the hospital during the readmission. |)

[//]: # (| readmission_diagnosis_ccs | varchar | no | Indicates the CCS for the readmission. |)

[//]: # (| data_source | varchar | no | Indicates the name of the source dataset &#40;e.g. Medicare Claims&#41;. |)

