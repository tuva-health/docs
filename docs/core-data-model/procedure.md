---
id: procedure
title: "Procedure"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

Procedures are treatments performed by clinicians for patients to help manage or 
alleviate conditions.  Important ancillary data related to procedures includes 
the date performed and the performing clinician.  Common procedure codes include 
ICD-10-PCS and HCPCS.

**Primary Keys:**
  * procedure_id

**Foreign Keys:**
  * person_id
  * member_id
  * patient_id
  * encounter_id
  * practitioner_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__procedure.columns" />