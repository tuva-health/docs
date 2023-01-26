---
id: mortality
title: "Mortality"
---

<details><summary>How do I calculate the monthly inpatient mortality rate?</summary>
Most measures in healthcare involve calculating a numerator and denominator.  The inpatient mortality rate is no exception.  A change in either numerator or denominator can drastically change the overall measure.  In this case the numerator is the number of patients that died during an inpatient hospital stay and the denominator is the total number of inpatient hospital stays.

```sql
with numerator as (
select 
    count(distinct patient_id) as patient_deaths
,   date_part(year,discharge_date) || lpad(date_part(month,discharge_date),2,0) as year_month
from claims_data_model.medical_claim
where discharge_disposition_code = '20'
    and claim_type = 'institutional'
    and ms_drg_code is not null
group by 2
)

, denominator as (
select
    count(distinct patient_id) as enrolled_population
,   date_part(year,discharge_date) || lpad(date_part(month,discharge_date),2,0) as year_month
from claims_data_model.medical_claim
where claim_type = 'institutional'
    and ms_drg_code is not null
group by 2
)

select
    b.year_month
,   coalesce(a.patient_deaths,0) as numerator
,   coalesce(b.enrolled_population,0) as denominator
,   cast((coalesce(a.patient_deaths,0) / coalesce(b.enrolled_population,0))*100 as numeric(38,2)) as mortality_rate
from denominator b
left join numerator a
    on b.year_month = a.year_month
order by 1
```
For example, in the 2020 Medicare SAF LDS dataset here's what the inpatient mortality rate looks like:

![Inpatient Mortality Rate](/img/inpatient_mortality_rate.jpg)

</details>

<details><summary>Do any patients die more than once in my dataset?</summary>
It's actually not uncommon for patients in a claims dataset to die more than once.  The cause of this is often data quality issues with `discharge_disposition_code`.  Whenever a patient is discharged with `discharge_disposition_code = 20` they are supposed to have died during the encounter.

```sql
with all_patients_who_died as (
select distinct
    patient_id
,   discharge_date as death_date
from claims_data_model.medical_claim
where discharge_disposition_code = '20'
)

, patients_with_multiple_deaths as (
select 
    patient_id
,   count(1) as number_of_deaths
from all_patients_who_died
group by 1
having count(1) > 1
)

select count(distinct patient_id)
from patients_with_multiple_deaths
```
For example, in the 2020 Medicare SAF LDS dataset there over 11,000 patients who died multiple times:

![Multiple Deaths](/img/multiple_deaths.jpg)
</details>
