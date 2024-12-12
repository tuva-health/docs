---
id: observation
title: "Observation"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The observation table contains information on measurements other than lab 
tests e.g. blood pressure, height, and weight.

**Primary Keys:**
  * observation_id

**Foreign Keys:**
  * person_id
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__observation.columns" />