---
id: ccsr
title: "CCSR"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The CCSR data mart implements the HCUP Clinical Classification Software Refined diagnosis and procedure groupers.  You can read more about this grouper [here](https://hcup-us.ahrq.gov/toolssoftware/ccsr/ccs_refined.jsp).  HCUP provides a distribution of the algorithm in SAS.  This is an exact copy of the that version that runs using dbt.

## long_condition_category

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__long_condition_category.columns" />

## long_procedure_category

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__long_procedure_category.columns" />

## singular_condition_category

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__singular_condition_category.columns" />

## wide_condition_category

This model contains a row for each input record with a column for every CCSR condition category. 
Each column contains a value of 0, 1, 2, or 3. These values indicate:
* 0 \- The CCSR was not triggered by any ICD-10-CM diagnosis code on the input record.
* 1 \- The CCSR was triggered by only the principal (or first-listed) diagnosis on the input record.
* 2 \- The CCSR was triggered by both the principal (or first-listed) diagnosis and any secondary diagnosis on the input record.
* 3 \- The CCSR was triggered by only secondary diagnosis code(s) on the input record.

This table doesn't include any category descriptions, but category and parent category descriptions
can be found by querying the target column name against the `ccsr__dx_vertical_pivot` intermediate model.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__wide_condition_category.columns" />

## wide_procedure_category

This model contains a row for each input record with a column for every CCSR procedure category. 
Each column contains a value of 0 or 1. These values indicate:
* 0 \- The CCSR was not triggered by any ICD-10-PCS code on the input record.
* 1 \- The CCSR was triggered by a procedure on the input record.  

While the CCSR maps to values 0-3, these values require a procedure rank, but no rank is
included in the TUVA procedure model.

This table doesn't include any category descriptions, but category and parent category descriptions
can be found by querying the target column name against the `ccsr_procedure_category_map` intermediate model. 

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__wide_procedure_category.columns" />
