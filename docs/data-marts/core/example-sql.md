---
id: example-sql
title: "Example SQL"
---

## Patient Demographics

<details><summary>Number of Unique Patients</summary>

```sql
select count(distinct patient_id)
from core.patient
```

</details>

<details><summary>Distribution of Patients by Age Group</summary>

```sql
with patient_age as (
select
    patient_id
,   floor(datediff(day, birth_date, current_date)/365) as age
from core.patient
)

, age_groups as (
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
from patient_age
)

select
    age_group
,   count(distinct patient_id) as patients
,   cast(100 * count(distinct patient_id)/sum(count(distinct patient_id)) over() as numeric(38,1)) as percent
from age_groups
group by age_group
order by 1
;
```
<!-- ![Patients Age Group](/img/example-sql/patients-age-group.jpg) -->

</details>

<details><summary>Distribution of Patients by Gender</summary>

```sql
select
    gender
,    count(1)
from core.patient
group by 1
;
```

</details>

<details><summary>Distribution of Patients by Race</summary>

```sql
select
    race
,    count(1)
from core.patient
group by 1
;
```

</details>

## Basic Claims Analytics

<details><summary>Number of Distinct Claims</summary>

```sql
select
    claim_type
,   count(distinct claim_id)
from core.medical_claim
group by 1

union

select 
    'pharmacy' as claim_type
,   count(distinct claim_id)
from core.pharmacy_claim
;
```

</details>

<details><summary>Distribution of Claims and Payments by Claim Type</summary>

```sql
select
    claim_type
,   count(distinct claim_id) as distinct_claims
,   sum(paid_amount) as total_payments
from core.medical_claim
group by 1
;
```
<!-- ![Claims by Claim Type](/img/example-sql/claim-count.jpg) -->

</details>

<details><summary>Distribution of Claims and Payments by Service Category</summary>

```sql
select
    service_category_1
,   service_category_2
,   count(distinct claim_id) as distinct_claims
,   sum(paid_amount) as total_payments
from core.medical_claim
group by 1,2
order by 1,2
;
```
<!-- ![Claims by Service Category](/img/example-sql/claims-by-service-category.jpg) -->

</details>

## Basic Encounter Analytics

<details><summary>Volume and Average Cost of Encounters by Type</summary>

```sql
select 
  encounter_type
, count(distinct encounter_id) as encounters
, avg(total_cost_amount) as avg_cost
from core.encounter
group by 1
```

</details>

<details><summary>Monthly Trends of Encounters by Type</summary>

```sql
select 
  date_part(year, encounter_start_date) || lpad(date_part(month, encounter_start_date),2,0) as year_month
, count(distinct encounter_id) as encounters
from core.encounter
group by 1
order by 1
```
</details>