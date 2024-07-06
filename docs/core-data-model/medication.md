---
id: medication
title: "Medication"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The medication table contains information on medications ordered and/or 
administered during a patient encounter.

**Primary Keys:**
  * medication_id

**Foreign Keys:**
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__medication.columns" />