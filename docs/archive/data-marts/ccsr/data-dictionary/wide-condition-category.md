---
id: wide-condition-category
title: "Wide Condition Category"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';


This model contains a row for each input record with a column for every CCSR condition category. 
Each column contains a value of 0, 1, 2, or 3. These values indicate:
* 0 \- The CCSR was not triggered by any ICD-10-CM diagnosis code on the input record.
* 1 \- The CCSR was triggered by only the principal (or first-listed) diagnosis on the input record.
* 2 \- The CCSR was triggered by both the principal (or first-listed) diagnosis and any secondary diagnosis on the input record.
* 3 \- The CCSR was triggered by only secondary diagnosis code(s) on the input record.

This table doesn't include any category descriptions, but category and parent category descriptions
can be found by querying the target column name against the `ccsr__dx_vertical_pivot` intermediate model.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__wide_condition_category.columns" />
