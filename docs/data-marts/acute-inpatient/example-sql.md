---
id: example-sql
title: "Example SQL"
---

<details><summary>Top 10 most prevalent chronic conditions</summary>

```sql
select
    condition
,   count(distinct patient_id) as total_patients
,   cast(count(distinct patient_id) * 100.0 / (select count(distinct patient_id) from core.patient) as numeric(38,2)) as percent_of_patients
From chronic_conditions.tuva_chronic_conditions_long
group by 1
order by 2 desc
limit 10
```
The following is example output from this query from the Tuva Claims Demo dataset.  

![Tuva Condition Prevalence](/img/tuva_condition_prevalence.jpg)
</details>

<details><summary>New patients diagnosed with type 2 diabetes by month</summary>

```sql
with first_month_diabetes as (
select
  patient_id
, 'Type 2 Diabetes' as condition
, min(first_diagnosis_date) as start_date
from chronic_conditions.tuva_chronic_conditions_long
where condition in ('Type 2 Diabetes')
group by patient_id
)

select 
  condition
, year(start_date) as year
, month(start_date) as month
, count(*) as count
From first_month_diabetes
group by 1,2,3
order by 2 desc, 3 desc

```
The following is example output from this query from the Tuva Claims Demo dataset.  

![The Tuva Project](/img/chronic_conditions/TCC-new_diabetes_by_month.png)
</details>