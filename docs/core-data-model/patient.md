---
id: patient
title: "Patient"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The patient table describes the attributes of a patient that are unchanging over 
time (e.g. biological sex, birth date, etc.).  The vast majority of healthcare 
analytics use cases involve analyzing things that happen to patients, so it's 
critical to have a clean patient table that contains this information.

**Primary Keys:**
  * person_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__patient.columns" />