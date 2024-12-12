---
id: person_id_crosswalk
title: "Person ID Crosswalk"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The person_id_crosswalk table contains all source patient identifiers from 
the input layer for claims and/or clinical.

**Primary Keys:**
  * person_id
  * patient_id
  * member_id
  * payer
  * plan
  * data_source

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__person_id_crosswalk.columns" />
