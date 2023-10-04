---
id: tuva-chronic-conditions-long
title: "Tuva Chronic Conditions Long"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

This table contains one record per patient per chronic condition.  For example, if a patient has 3 chronic conditions they will have 3 records in this table.  Each record includes the condition category, condition, date of onset, most recent diagnosis, and the total count of diagnosis codes that were recorded that are relevant for the condition.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__tuva_chronic_conditions_long.columns" />
