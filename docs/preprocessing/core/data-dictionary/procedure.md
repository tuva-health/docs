---
id: procedure
title: "Procedure"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

Procedures are treatments performed by clinicians for patients to help manage or alleviate conditions.  Important ancillary data related to procedures includes the date performed and the performing clinician.  Common procedure codes include ICD-10-PCS and HCPCS.

<JsonDataTable jsonPath="nodes.model\.claims_preprocessing\.claims_preprocessing__procedure.columns" />


[//]: # (| Column Name | Data Type | Terminology | Description |)

[//]: # (|---|:---:|:---:|---|)

[//]: # (| encounter_id | varchar | no | Unique ID for each visit |)

[//]: # (| patient_id | varchar | no | Unique ID for the patient |)

[//]: # (| procedure_date | date | no | Date when the procedure was performed |)

[//]: # (| code_type | varchar | [yes]&#40;https://github.com/tuva-health/terminology/blob/main/terminology/code_type.csv&#41; | Indicates the type of procedure &#40;e.g. cpt, icd-10-pcs, etc.&#41; |)

[//]: # (| code | varchar | yes | Acute procedure code |)

[//]: # (| description |	varchar | yes |	Acute procedure code description |)

[//]: # (| physician_npi | varchar |	yes | NPI for the physician who performed the procedure |)

[//]: # (| data_source | varchar | no | Indicates the name of the source dataset &#40;e.g. Medicare Claims&#41; |)

