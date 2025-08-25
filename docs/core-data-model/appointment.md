---
id: appointment
title: "Appointment"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The appointment table contains information related to appointments at a healthcare facility. 
This table may include canceled, completed, or scheduled events.

**Primary Key:**
  * appointment_id

**Foreign Keys:**
  * patient_id
  * person_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__appointment.columns" />



