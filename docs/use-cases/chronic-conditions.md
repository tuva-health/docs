---
id: chronic-conditions
title: "Chronic Conditions"
---

Chronic diseases are one of the biggest drivers of healthcare utilization and expenditure.  Here we provide an examples of the types of analytics you can do with Tuva related to chronic conditions.

<details>
  <summary>Prevalence of Chronic Conditions</summary>

In this query we show how often each chronic condition occurs in the patient population.

```sql
select
  condition_family
, condition
, count(distinct patient_id) as total_patients
, cast(count(distinct patient_id) * 100.0 / (select count(distinct patient_id) from core.patient) as numeric(38,2)) as percent_of_patients
from chronic_conditions.tuva_chronic_conditions_long
group by 1,2
order by 3 desc
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
, b.condition_family
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
