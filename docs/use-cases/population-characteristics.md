---
id: population-characteristics
title: "Population Characteristics"
---

<details>
  <summary>Chronic Disease Prevalence</summary>

```sql
select
    condition
,   count(distinct patient_id) as total_patients
,   cast(count(distinct patient_id) * 100.0 / (select count(distinct patient_id) from core.patient) as numeric(38,2)) as percent_of_patients
From chronic_conditions.tuva_chronic_conditions_long
group by 1
order by 2 desc
```

</details>

<details>
  <summary>Age Distribution</summary>

```sql
with patient_age as (
select
  data_source
, patient_id
, floor(datediff(day, birth_date, current_date)/365) as age
from core.patient
)

, age_groups as (
select
  data_source
, patient_id
, age
, case 
    when age >= 0 and age < 2 then '00-02'
    when age >= 2 and age < 18 then '02-18'
    when age >= 18 and age < 30 then '18-30'
    when age >= 30 and age < 40 then '30-40'
    when age >= 40 and age < 50 then '40-50'
    when age >= 50 and age < 60 then '50-60'
    when age >= 60 and age < 70 then '60-70'
    when age >= 70 and age < 80 then '70-80'
    when age >= 80 and age < 90 then '80-90'
    when age >= 90 then '>= 90'
    else 'Missing Age' 
  end as age_group
from patient_age
)

select
  data_source
, age_group
, count(distinct patient_id) as patient_count
, cast(100 * count(distinct patient_id)/sum(count(distinct patient_id)) over() as numeric(38,1)) as percent
from age_groups
group by 1,2
order by 1,2
```
</details>

<details>
  <summary>Sex Distribution</summary>

```sql
select
  sex
, count(distinct patient_id) as count
, cast(100 * count(distinct patient_id)/sum(count(distinct patient_id)) over() as numeric(38,1)) as percent
from core.patient
group by 1
order by 1
```
</details>