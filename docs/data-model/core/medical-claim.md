---
id: medical-claim
title: "Medical Claim"
---

## Description
During a typical healthcare encounter clinicians will perform multiple services for the patient.  This can include anything from a physician consult, to therapy (e.g. respiratory therapy), to administering intravenous medications.  These services are recorded for billing purposes using revenue center codes and HCPCS codes and provide a useful record of care.  Each service receives it's own separate record.

## Mapping Guidelines
The grain of this table is at the encounter-service level (i.e. one record per encounter per service).

## Data Dictionary
| Column Name | Data Type | Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique encounter ID (one for each visit) |
| patient_id | varchar | no | Unique patient ID for each patient |
| claim_id | varchar | no |	Unique ID for each claim related to the encounter |
| claim_line_number | int | no | Integer indicating the line number of the claim |
| claim_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/claim_type.csv) | The type of claim (e.g. professional, institutional) |
| revenue_center_code |	varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/revenue_center_code.csv) | The revenue code for the claim (institutional claims only) |
| revenue_center_description | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/revenue_center_code.csv) | The revenue code for the claim (institutional claims only) |
| service_unit_quantity | int | no | The number of units for the given service (revenue code) |
| hcpcs_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/hcpcs_level_2.csv) | HCPCS level 1 and level 2 codes |
| hcpcs_modifier_1 | varchar | yes | HCPCS modifier |
| hcpcs_modifier_2 | varchar | yes | HCPCS modifier |
| hcpcs_modifier_3 | varchar | yes | HCPCS modifier |
| hcpcs_modifier_4 | varchar | yes | HCPCS modifier |
| hcpcs_modifier_5 | varchar | yes | HCPCS modifier |
| rendering_npi | varchar |	yes | NPI for the provider that performed the service being billed |
| billing_npi | varchar | yes | NPI for the organization billing for the service |
| facility_npi | varchar | yes | NPI for the facility where the service was performed |
| paid_date	| date | no | The date the claim was paid |
| paid_amount |	float | no | The total paid amount for the claim |
| charge_amount | float | no | Total charge amount for the claim |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims) |