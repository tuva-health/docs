---
id: patient-demographics
title: "Patient Demographics"
---

<details><summary>What is the age distribution of my patient population?</summary>

```sql
with patient as
(
select distinct
    patient_id
,   birth_date
from claims_data_model.eligibility
)

, age as
(
select
    patient_id
,   floor(datediff(day, birth_date, current_date)/365) as age
from patient
)

, age_groups as
(
select
    patient_id
,   age
,   case 
        when age <= 0 and age < 2 then '0-2'
        when age <= 2 and age < 18 then '2-18'
        when age <= 18 and age < 30 then '18-30'
        when age <= 30 and age < 40 then '30-40'
        when age <= 40 and age < 50 then '40-50'
        when age <= 50 and age < 60 then '50-60'
        when age <= 60 and age < 70 then '60-70'
        when age <= 70 and age < 80 then '70-80'
        when age <= 80 and age < 90 then '80-90'
        when age > 90 then '> 90'
        else 'Missing Age' 
    end as age_group
from age
)

select
    age_group
,   count(distinct patient_id) as patients
,   cast(100 * count(distinct patient_id)/sum(count(distinct patient_id)) over() as numeric(38,1)) as percent
from age_groups
group by age_group
order by 1
```
For example, here's what the distribution of ages looks like on Medicare SAF.

![Age Groups](/img/patient_age_group.jpg)

</details>

<details><summary>What is the gender distribution of my patient population?</summary>

```sql
select
    gender
,   count(distinct patient_id) as patients
,   cast(100 * count(distinct patient_id)/sum(count(distinct patient_id)) over() as numeric(38,1)) as percent
from claims_data_model.eligibility
group by 1
order by 1
```

For example, here's what the distribution of ages looks like on Medicare SAF.
![Age Groups](/img/gender_distribution_2.jpg)

</details>

