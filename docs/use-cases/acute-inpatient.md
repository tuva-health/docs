---
id: acute-inpatient
title: "Acute Inpatient"
---

<details>
  <summary>Trending Visits, Length of Stay, and Total Cost</summary>

```sql
with acute_inpatient as (
select 
  data_source
, date_part(year, encounter_end_date) || lpad(date_part(month, encounter_end_date),2,0) as year_month
, count(1) as acute_inpatient_visits
, avg(paid_amount) as avg_paid_amount
, avg(length_of_stay) as avg_length_of_stay
from core.encounter
where encounter_type = 'acute inpatient'
group by 1,2
)
, member_months as (
select
  data_source
, year_month
, count(1) as member_months
from financial_pmpm.member_months
group by 1,2
)
select
  a.data_source
, a.year_month
, b.member_months
, acute_inpatient_visits
, cast(avg_paid_amount as numeric(38,2)) as avg_paid_amount
, cast(avg_length_of_stay as numeric(38,2)) as avg_length_of_stay
, cast(acute_inpatient_visits / member_months *12000 as numeric(38,2)) as aip_visits_pkpy
from acute_inpatient a
inner join member_months b
  on a.year_month = b.year_month
  and a.data_source = b.data_source
order by 1,2
```
</details>

<details>
  <summary>Trending Mortality Rate</summary>

```sql
with mortality_flag as (
select
  data_source
, date_part(year, encounter_end_date) || lpad(date_part(month, encounter_end_date),2,0) as year_month
, case
    when discharge_disposition_code = 20 then 1
    else 0
  end mortality_flag
from core.encounter
where encounter_type = 'acute inpatient'
)

select
  data_source
, year_month
, count(1) as acute_inpatient_visits
, sum(mortality_flag) as mortality_count
, sum(mortality_flag) / count(1) as mortality_rate
from mortality_flag
group by 1,2
order by 1,2
```
</details>

<details>
  <summary>Trending 30-day Readmission Rate</summary>

```sql
-- readmission rate by month
with index_admissions as (
select
    date_part(year, discharge_date) || '-' || lpad(date_part(month, discharge_date),2,0) as year_month
,   count(1) as index_admissions
from readmissions.readmission_summary
where index_admission_flag = 1
group by 1
)

, readmissions as (
select 
    date_part(year, discharge_date) || '-' || lpad(date_part(month, discharge_date),2,0) as year_month
,   count(1) as readmissions
from readmissions.readmission_summary
where index_admission_flag = 1 
    and unplanned_readmit_30_flag = 1
group by 1
)

select
    a.year_month
,   a.index_admissions
,   coalesce(b.readmissions,0) as readmissions
,   cast(coalesce(b.readmissions,0) / a.index_admissions as numeric(38,2)) as readmission_rate
from index_admissions a
left join readmissions b
    on a.year_month = b.year_month
order by 1
```
</details>

<details>
  <summary>30-day Readmission Rate by MS-DRG</summary>

```sql
with index_admissions as (
select
    a.ms_drg_code 
,   ms_drg_description
,   count(1) as index_admissions
from readmissions.readmission_summary a
left join terminology.ms_drg b
    on a.ms_drg_code = b.ms_drg_code
where index_admission_flag = 1
group by 1,2
)

, readmissions as (
select 
    ms_drg_code
,   count(1) as readmissions
from readmissions.readmission_summary
where index_admission_flag = 1 
    and unplanned_readmit_30_flag = 1
group by 1
)

select
    a.ms_drg_code
,   a.ms_drg_description
,   a.index_admissions
,   coalesce(b.readmissions,0) as readmissions
,   cast(coalesce(b.readmissions,0) / a.index_admissions as numeric(38,2)) as readmission_rate
from index_admissions a
left join readmissions b
    on a.ms_drg_code = b.ms_drg_code
order by 3 desc
```
</details>