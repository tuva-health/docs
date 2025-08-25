---
id: immunization
title: "Immunization"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The immunization table contains information on immunizations administered to patients, including the vaccine code, description, and administration date.

**Primary Key:**
  * immunization_id

**Foreign Keys:**
  * patient_id
  * person_id
  * encounter_id
  * location_id
  * practitioner_id


<JsonDataTable jsonPath="nodes.model\.input_layer\.immunization.columns" />
