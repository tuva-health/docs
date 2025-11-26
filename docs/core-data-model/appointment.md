---
id: appointment
title: "Appointment"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { CoreModelDescription } from '@site/src/components/CoreModelDescription';

<CoreModelDescription modelName="core__appointment" />

**Primary Key:**
  * appointment_id

**Foreign Keys:**
  * patient_id
  * person_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__appointment.columns" />

