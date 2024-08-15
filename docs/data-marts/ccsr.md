---
id: ccsr
title: "CCSR"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Overview

[Code](https://github.com/tuva-health/tuva/tree/main/models/ccsr)

The CCSR data mart implements [AHRQ's Clinical Classifications Software Refined](https://hcup-us.ahrq.gov/toolssoftware/ccsr/ccs_refined.jsp) diagnosis and procedure grouper.  This is a very commonly used tool to group ICD-10-CM and ICD-10-PCS diagnosis and procedure codes into higher-level categories.

## Instructions

This mart builds off of the Core Condition and Procedure tables.

### dbt Examples

```bash
# Runs all marts
dbt build

# Runs only the CCSR mart
dbt build --select tag:ccsr
```

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

<details>
  <summary>Condition Count by Body System</summary>

```sql
select
      body_system
    , count(*)
from ccsr.singular_condition_category
group by body_system
order by count(*) desc;
```
</details>

<details>
  <summary>Condition Count by CCSR Category</summary>

```sql
select
      ccsr_category_description
    , count(*)
from ccsr.singular_condition_category
group by ccsr_category_description
order by count(*) desc;
```
</details>

<details>
  <summary>Procedure Count by Clinical Domain</summary>

```sql
select
      clinical_domain
    , count(*)
from ccsr.long_procedure_category
group by clinical_domain
order by count(*) desc;
```
</details>

<details>
  <summary>Procedure Count by CCSR Category</summary>

```sql
select
      ccsr_category_description
    , count(*)
from ccsr.long_procedure_category
group by ccsr_category_description
order by count(*) desc;
```
</details>

<details>
  <summary>ED Visits by CCSR Category and Body System</summary>

```sql
select
      p.ccsr_category
    , p.ccsr_category_description
    , p.ccsr_parent_category
    , b.body_system
    , count(*) as visit_count
    , sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
    , cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e
    left join ccsr.dx_vertical_pivot p
        on e.primary_diagnosis_code = p.Code
        and p.ccsr_category_rank = 1
    left join ccsr._value_set_dxccsr_v2023_1_body_systems b
        on p.ccsr_parent_category = b.ccsr_parent_category
group by
      p.ccsr_category
    , p.ccsr_category_description
    , p.ccsr_parent_category
    , b.body_system
order by visit_count desc;
```
</details>
