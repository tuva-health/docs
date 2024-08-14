---
id: chronic-conditions
title: "Chronic Conditions"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Overview

[Code](https://github.com/tuva-health/tuva/tree/main/models/chronic_conditions)

The Chronic Conditions data mart implements two different chronic condition groupers: one defined by [CMS](https://www2.ccwdata.org/web/guest/condition-categories-chronic) and the other defined by Tuva.  We started defining chronic conditions in Tuva after struggling to use the CMS logic, either because certain chronic conditions were missing (e.g. non-alcoholic fatty liver disease, MASH, etc.) or because existing definitions were unsatisfactory (e.g. type 1 and type 2 diabetes are considered the same condition by CMS).  

Tuva Chronic Conditions are defined and/or reviewed by medically-trained clinical informaticists.

The Chronic Conditions data mart implements two groupers for classifying chronic condition categories:

**CMS:** This version uses the logic created by CMS. There are 30 CCW Chronic Condition 
categories, available for file years 2017 forward, and 40 other chronic health, 
mental health, substance abuse, and potentially disabling condition categories 
available for file years 2000 forward. These reference only ICD-10 diagnosis 
codes and have modified look-back periods, qualifying claims, and codes. You 
can read more about CMS's logic [here](https://www2.ccwdata.org/web/guest/home/).

**Tuva:** Our own classification.  We were unsatisified with some of the CMS definitions and therefore created our own version with the input of medically trained clinical informaticists.

## Instructions

### Data Requirements

The CMS grouper uses the following tables from the Tuva Core 
Data Model:
- condition
- patient
- procedure
- medical_claim
- pharmacy_claim

The Tuva grouper uses the following tables from the Tuva Core 
Data Model:
- condition
- patient

*Note: The Tuva Project will generate these Core tables. You just need to map 
your data to the [input layer](../connectors/input-layer) and run the project.*

### dbt Examples

```bash
# Runs all marts
dbt build

# Runs only the Chronic Conditions mart
dbt build --select tag:chronic_conditions

# Runs only the CMS grouper
dbt build --cms_chronic_conditions

# Runs only the Tuva grouper
dbt build --tuva_chronic_conditions

```


## Data Dictionary

### cms_chronic_conditions_long

This table contains one record per patient per chronic condition. For example, 
if a patient has 3 chronic conditions they will have 3 records in this table. 
Each record includes the condition category, condition, date of onset, most 
recent diagnosis, and the total count of diagnosis codes that were recorded 
that are relevant for the condition.

This table is created by running the CMS chronic conditions data mart on data 
that's been mapped to the core data model.

**Primary Keys:**
  * patient_id
  * condition

**Foreign Keys:**
  * claim_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__cms_chronic_conditions_long.columns" />

### cms_chronic_conditions_wide

This table contains a single record per patient with separate binary 
(i.e. 0 or 1) columns for every chronic condition. If a patient has a 
particular chronic condition they will have a 1 in that particular column and 
0 otherwise.

**Primary Keys:**
  * patient_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__cms_chronic_conditions_wide.columns"  />

### tuva_chronic_conditions_long

This table contains one record per patient per chronic condition. For example, 
if a patient has 3 chronic conditions they will have 3 records in this table. 
Each record includes the condition category, condition, date of onset, most 
recent diagnosis, and the total count of diagnosis codes that were recorded 
that are relevant for the condition.

**Primary Keys:**
  * patient_id
  * condition

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__tuva_chronic_conditions_long.columns" />

### tuva_chronic_conditions_wide

This table contains a single record per patient with separate binary 
(i.e. 0 or 1) columns for every chronic condition. If a patient has a 
particular chronic condition they will have a 1 in that particular column and 
0 otherwise.

**Primary Keys:**
  * patient_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__tuva_chronic_conditions_wide.columns"  />

## Analytics

<details>
  <summary>Prevalence of Tuva Chronic Conditions</summary>

In this query we show how often each chronic condition occurs in the patient population.

```sql
select
  condition
, count(distinct patient_id) as total_patients
, cast(count(distinct patient_id) * 100.0 / (select count(distinct patient_id) from core.patient) as numeric(38,2)) as percent_of_patients
from chronic_conditions.tuva_chronic_conditions_long
group by 1
order by 3 desc
```

</details>

<details>
  <summary>Prevalence of CMS Chronic Conditions</summary>

In this query we show how often each chronic condition occurs in the patient population.

```sql
select
  condition_category
, condition
, count(distinct patient_id) as total_patients
, cast(count(distinct patient_id) * 100.0 / (select count(distinct patient_id) from core.patient) as numeric(38,2)) as percent_of_patients
from chronic_conditions.cms_chronic_conditions_long
group by 1,2
order by 4 desc
```

</details>

<details>
  <summary>Distribution of Chronic Conditions</summary>

In this query we show how many patients have 0 chronic conditions, how many patients have 1 chronic condition, how many patients have 2 chronic conditions, etc.

```sql
with patients as (
select patient_id
from core.patient
)

, conditions as (
select distinct
  a.patient_id
, b.condition
from patients a
left join chronic_conditions.tuva_chronic_conditions_long b
 on a.patient_id = b.patient_id
)

, condition_count as (
select
  patient_id
, count(distinct condition) as condition_count
from conditions
group by 1
)

select 
  condition_count
, count(1)
, cast(100 * count(distinct patient_id)/sum(count(distinct patient_id)) over() as numeric(38,1)) as percent
from condition_count
group by 1
order by 1
```

</details>