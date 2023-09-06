---
id: wide-procedure-category
title: "Wide Procedure Category"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

This model contains a row for each input record with a column for every CCSR procedure category. 
Each column contains a value of 0 or 1. These values indicate:
* 0 \- The CCSR was not triggered by any ICD-10-PCS code on the input record.
* 1 \- The CCSR was triggered by a procedure on the input record.  

While the CCSR maps to values 0-3, these values require a procedure rank, but no rank is
included in the TUVA procedure model.

This table doesn't include any category descriptions, but category and parent category descriptions
can be found by querying the target column name against the `ccsr_procedure_category_map` intermediate model. 

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__wide_procedure_category.columns" />