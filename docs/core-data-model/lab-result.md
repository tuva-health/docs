---
id: lab-result
title: "Lab Result"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The lab result table contains information about lab test results, 
including the LOINC code and description, units, reference range, and 
result.

**Primary Keys:**
  * lab_result_id

**Foreign Keys:**
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__lab_result.columns" />