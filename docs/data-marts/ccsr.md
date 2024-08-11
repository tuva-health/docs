---
id: ccsr
title: "CCSR"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Overview

[Code](https://github.com/tuva-health/tuva/tree/main/models/ccsr)

The CCSR data mart implements [AHRQ's Clinical Classifications Software Refined](https://hcup-us.ahrq.gov/toolssoftware/ccsr/ccs_refined.jsp) diagnosis and procedure grouper.  This is a very commonly used tool to group ICD-10-CM and ICD-10-PCS diagnosis and procedure codes into higher-level categories.

## Instructions

## Data Dictionary

### long_condition_category

This model contains a mapping of individual condition ICD-10-CM diagnosis codes 
to the CCSR's clinically meaningful diagnosis categories. Each row represents a 
mapping of an ICD-10 code to a CCSR category. As each ICD-10 code may be mapped 
to up to 6 categories, it's expected that this table will output as many or more 
rows than the Tuva condition model. The model is equivalent to the CCSR's Output 
Option 1 - Vertical File Output.

**Primary Keys:**
  * patient_id
  * normalized_code
  * ccsr_category

**Foreign Keys:**
  * encounter_id
  * claim_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__long_condition_category.columns" />

### long_procedure_category

This model contains a mapping of individual condition ICD-10-PCS procedure codes 
to the CCSR's clinically meaningful procedure categories. Each row represents a 
mapping of an ICD-10 code to a CCSR category. The model is equivalent to the 
CCSR's Output Option 1 - Vertical File Output.

**Primary Keys:**
  * patient_id
  * normalized_code
  * ccsr_category

**Foreign Keys:**
  * encounter_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__long_procedure_category.columns" />

### singular_condition_category

This model contains only the CCSR's default category assignment for the 
ICD-10 code, and only for the first-listed ICD-10 code (`diagnosis_code = 1`).

**Primary Keys:**
  * patient_id
  * ccsr_category

**Foreign Keys:**
  * encounter_id
  * claim_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__singular_condition_category.columns" />

## Analytics