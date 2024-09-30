---
id: ccsr
title: "CCSR"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Methods
[Code on Github](https://github.com/tuva-health/tuva/tree/main/models/ccsr)

The CCSR data mart implements [AHRQ's Clinical Classifications Software Refined](https://hcup-us.ahrq.gov/toolssoftware/ccsr/ccs_refined.jsp) diagnosis and procedure grouper.  This is a very commonly used tool to group ICD-10-CM and ICD-10-PCS diagnosis and procedure codes into higher-level categories.  Full documentation for this grouper can be found on AHRQ's website via the link above.

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

## Example SQL

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
  <summary>Acute Inpatient Visits by CCSR Category and Body System</summary>

```sql
select
      p.ccsr_category
    , p.ccsr_category_description
    , p.ccsr_parent_category
    , p.body_system
    , count(*) as visit_count
    , sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
    , cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e
    left join ccsr.long_condition_category p
        on e.primary_diagnosis_code = p.normalized_code
        and p.condition_rank = 1
where e.encounter_type = 'acute inpatient'
group by
      p.ccsr_category
    , p.ccsr_category_description
    , p.ccsr_parent_category
    , p.body_system
order by visit_count desc;
```
</details>

<details>
  <summary>ED Visits by CCSR Category and Body System</summary>

```sql
select
      p.ccsr_category
    , p.ccsr_category_description
    , p.ccsr_parent_category
    , p.body_system
    , count(*) as visit_count
    , sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
    , cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e
    left join ccsr.long_condition_category p
        on e.primary_diagnosis_code = p.normalized_code
        and p.condition_rank = 1
where e.encounter_type = 'emergency department'
group by
      p.ccsr_category
    , p.ccsr_category_description
    , p.ccsr_parent_category
    , p.body_system
order by visit_count desc;
```
</details>
