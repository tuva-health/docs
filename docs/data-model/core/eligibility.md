---
id: eligibility
title: "Eligibility"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The eligibility table includes information about a patient's health insurance coverage and demographics (note: we use the word patient as a synonym for member).  Every claims dataset should include some sort of eligibility data, otherwise it's impossible to calculate member months, which are needed to calculate measures like PMPM.

<JsonDataTable jsonPath="nodes.model\.claims_preprocessing\.claims_preprocessing__eligibility_enhanced.columns" />

[//]: # (| Column | Data Type | Terminology | Description |)

[//]: # (|---|:---:|:---:|---|)

[//]: # (| patient_id | varchar | no | Unique identifier for each patient in the dataset. |)

[//]: # (| member_id | varchar | no | Identifier that links a patient to a particular insurance product or health plan.  A patient can have more than one member_id because they can have more than one insurance product/plan. |)

[//]: # (| gender | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/terminology__gender.csv&#41; | Biological sex of the patient. |)

[//]: # (| race | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/terminology__race.csv&#41; | Race of the patient. |)

[//]: # (| birth_date | date | no | Date the patient was born. |)

[//]: # (| death_date | date | no | Date the patient died. |)

[//]: # (| death_flag | int | yes ∈ {0,1} | Indicates whether the patient has died. |)

[//]: # (| enrollment_start_date | date | no | Date the patient's insurance eligibility began. |)

[//]: # (| enrollment_end_date | date | no | Date the patient's insurance eligibility ended. |)

[//]: # (| payer | varchar | no | Name of the payer &#40;i.e. health insurer&#41; providing coverage. |)

[//]: # (| payer_type | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/terminology__payer_type.csv&#41; | Type of payer &#40;e.g. commercial, medicare, medicaid, etc.&#41;. |)

[//]: # (| dual_status | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_dual_eligibility.csv&#41; | Indicates whether the patient is dually eligible for Medicare and Medicaid. |)

[//]: # (| medicare_status | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_status.csv&#41; | Indicates how the patient became eligible for Medicare. |)

[//]: # (| first_name | varchar | no | Patient's first name. |)

[//]: # (| last_name | varchar | no | Patient's last name. |)

[//]: # (| address | varchar | no | Patient's street address. |)

[//]: # (| city | varchar | no | Patient's city of address. |)

[//]: # (| state | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_state_fips.csv&#41; | State the patient lives in &#40;most recent known address&#41; |)

[//]: # (| zip_code | varchar | no | Zip code the patient lives in &#40;most recent known address&#41;. |)

[//]: # (| phone | varchar | no | Patient's phone number. |)

[//]: # (| data_source | varchar | no | User-configured field that indicates the data source &#40;e.g. typically named after the payer and state "BCBS Tennessee"&#41;. |)

[//]: # ()


