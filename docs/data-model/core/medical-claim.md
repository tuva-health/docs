---
id: medical-claim
title: "Medical Claim"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The medical_claim table contains information on healthcare services and supplies provided to patients, billed by providers, and paid for by health insurers.  It includes information on the provider who rendered the service, the amount paid for the service by the health insurer, and the underlying reason for the service (i.e. diagnosis).  

The medical_claim table in core has been enhanced with concepts like service category and encounter that are useful for analytics.

<JsonDataTable jsonPath="nodes.model\.claims_preprocessing\.claims_preprocessing__medical_claim_core.columns" />

[//]: # (| Column Name | Data Type | Terminology | Description |)

[//]: # (|---|:---:|:---:|---|)

[//]: # (| encounter_id | varchar | no | Unique encounter ID &#40;one for each visit&#41; |)

[//]: # (| patient_id | varchar | no | Unique patient ID for each patient |)

[//]: # (| claim_id | varchar | no |	Unique ID for each claim related to the encounter |)

[//]: # (| claim_line_number | int | no | Integer indicating the line number of the claim |)

[//]: # (| claim_type | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/claim_type.csv&#41; | The type of claim &#40;e.g. professional, institutional&#41; |)

[//]: # (| revenue_center_code |	varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/revenue_center_code.csv&#41; | The revenue code for the claim &#40;institutional claims only&#41; |)

[//]: # (| revenue_center_description | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/revenue_center_code.csv&#41; | The revenue code for the claim &#40;institutional claims only&#41; |)

[//]: # (| service_unit_quantity | int | no | The number of units for the given service &#40;revenue code&#41; |)

[//]: # (| hcpcs_code | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/hcpcs_level_2.csv&#41; | HCPCS level 1 and level 2 codes |)

[//]: # (| hcpcs_modifier_1 | varchar | yes | HCPCS modifier |)

[//]: # (| hcpcs_modifier_2 | varchar | yes | HCPCS modifier |)

[//]: # (| hcpcs_modifier_3 | varchar | yes | HCPCS modifier |)

[//]: # (| hcpcs_modifier_4 | varchar | yes | HCPCS modifier |)

[//]: # (| hcpcs_modifier_5 | varchar | yes | HCPCS modifier |)

[//]: # (| rendering_npi | varchar |	yes | NPI for the provider that performed the service being billed |)

[//]: # (| billing_npi | varchar | yes | NPI for the organization billing for the service |)

[//]: # (| facility_npi | varchar | yes | NPI for the facility where the service was performed |)

[//]: # (| paid_date	| date | no | The date the claim was paid |)

[//]: # (| paid_amount |	float | no | The total paid amount for the claim |)

[//]: # (| charge_amount | float | no | Total charge amount for the claim |)

[//]: # (| data_source | varchar | no | Indicates the name of the source dataset &#40;e.g. Medicare Claims&#41; |)