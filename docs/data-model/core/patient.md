---
id: patient
title: "Patient"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The patient table describes the attributes of a patient that are unchanging over time (e.g. biological sex, birth date, etc.).  The vast majority of healthcare analytics use cases involve analyzing things that happen to patients, so it's critical to have a clean patient table that contains this information.

<JsonDataTable jsonPath="nodes.model\.claims_preprocessing\.claims_preprocessing__patient.columns" />


[//]: # (| Column Name | Data Type | Terminology | Description |)

[//]: # (|---|:---:|:---:|---|)

[//]: # (| patient_id | varchar | no | Unique ID for the patient. |)

[//]: # (| gender | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/gender.csv&#41; | The patient's biological sex at birth. |)

[//]: # (| race | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/race.csv&#41; | The patient's race. |)

[//]: # (| birth_date | date | no |	The patient's date of birth. |)

[//]: # (| death_date | date | no |	The patient's date of death. |)

[//]: # (| death_flag | int | no | Flag &#40;0 or 1&#41; indicating whether the patient is deceased. |)

[//]: # (| first_name | varchar | no | First name of the patient. |)

[//]: # (| last_name | varchar | no | Last name of the patient. |)

[//]: # (| address |	varchar | no | The patient's most recent street address. |)

[//]: # (| city | varchar | no | The patient's most recent city of residence &#40;home address&#41;. |)

[//]: # (| state | varchar |	[yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/state.csv&#41; |	The patient's most recent state of residence &#40;home address&#41;. |)

[//]: # (| zip_code | varchar | no | The patient's most recent zip code of residence &#40;home address&#41;. |)

[//]: # (| phone | varchar | no | The patient's preferred contact number. |)

[//]: # (| data_source |	varchar	| no | Indicates the name of the source dataset &#40;e.g. Medicare Claims&#41;. |)


<JsonDataTable jsonPath="nodes.model\.claims_preprocessing\.claims_preprocessing__patient.columns" />