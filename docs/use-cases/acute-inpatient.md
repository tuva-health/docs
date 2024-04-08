---
id: acute-inpatient
title: "Acute Inpatient"
---

The acute inpatient care setting is one of the biggest drivers of health care expenditure and as a result a primary target for research and analysis.

## Acute Inpatient Visits
Here we show a variety of different ways to analyze the total number of acute inpatient visits.

<details>
  <summary>Total Number of Acute IP Visits</summary>

```sql
select count(1)
from core.encounter
where encounter_type = 'acute inpatient'
```
</details>

<details>
  <summary>Total Number of Acute IP Visits by Month</summary>

```sql
select 
  date_part(year, encounter_end_date) || lpad(date_part(month, encounter_end_date),2,0) as year_month
, count(1) as count
from core.encounter
where encounter_type = 'acute inpatient'
group by 1
order by 1
```
</details>

<details>
  <summary>Total Number of Acute IP Visits by Admit Type</summary>

```sql
select
  admit_type_code
, admit_type_description
, count(1) as count
, cast(100 * count(distinct encounter_id)/sum(count(distinct encounter_id)) over() as numeric(38,1)) as percent
from core.encounter
where encounter_type = 'acute inpatient'
group by 1,2
order by 1,2
```
</details>

<details>
  <summary>Total Number of Acute IP Visits by Discharge Disposition</summary>

```sql
select
  discharge_disposition_code
, discharge_disposition_description
, count(1) as count
, cast(100 * count(distinct encounter_id)/sum(count(distinct encounter_id)) over() as numeric(38,1)) as percent
from core.encounter
where encounter_type = 'acute inpatient'
group by 1,2
order by 1,2
```
</details>

<details>
  <summary>Total Number of Acute IP Visits by DRG</summary>

```sql
select
  ms_drg_code
, ms_drg_description
, count(1) as count
, cast(100 * count(distinct encounter_id)/sum(count(distinct encounter_id)) over() as numeric(38,1)) as percent
from core.encounter
where encounter_type = 'acute inpatient'
group by 1,2
order by 4 desc
```
</details>

<details>
  <summary>Total Number of Acute IP Visits by Facility</summary>

```sql
select
  a.facility_npi
, b.provider_organization_name
, count(1) as count
, cast(100 * count(distinct encounter_id)/sum(count(distinct encounter_id)) over() as numeric(38,1)) as percent
from core.encounter a
left join terminology.provider b
 on a.facility_npi = b.npi
where encounter_type = 'acute inpatient'
group by 1,2
order by 1,2
```
</details>

## Acute Inpatient Visits PKPY
If you have claims data, and specifically eligibility and enrollment data, you can calculate acute inpatient visits per 1,000 members per year (PKPY).  This metric normalizes the visit metric with the total number of eligible members each month.  

<details>
  <summary>Total Number of Acute IP Visits PKPY</summary>

```sql
with acute_inpatient as (
select 
  data_source
, date_part(year, encounter_end_date) || lpad(date_part(month, encounter_end_date),2,0) as year_month
, count(1) as acute_inpatient_visits
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
, cast(acute_inpatient_visits / member_months *12000 as numeric(38,2)) as aip_visits_pkpy
from acute_inpatient a
inner join member_months b
  on a.year_month = b.year_month
  and a.data_source = b.data_source
order by 1,2
```
</details>

## Acute Inpatient Days PKPY 
Besides looking at the total number of visits normalized for eligibility, it's common to analyze the number of acute inpatient days per 1,000 members per year (PKPY).

<details>
  <summary>Trending Visits, Length of Stay, and Total Cost</summary>

```sql
with acute_inpatient as (
select 
  data_source
, date_part(year, encounter_end_date) || lpad(date_part(month, encounter_end_date),2,0) as year_month
, sum(length_of_stay) as sum_length_of_stay
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
, cast(sum_length_of_stay / member_months *12000 as numeric(38,2)) as aip_days
from acute_inpatient a
inner join member_months b
  on a.year_month = b.year_month
  and a.data_source = b.data_source
order by 1,2
```
</details>

## Paid and Allowed Amounts
If you have claims data, you can calculate the paid and allowed amounts spent on acute inpatient visits.  Because the encounter grouper in [Claims Preprocessing](../data-marts/claims-preprocessing) groups multiple claims into distinct visits, this allows you to analyze the paid and allowed amounts per visit, as opposed to per claim.

<details>
  <summary>Total Paid and Allowed Amounts</summary>

```sql
select
  sum(paid_amount) as paid_amount
, sum(allowed_amount) as allowed_amount
from core.encounter
where encounter_type = 'acute inpatient'
```
</details>

<details>
  <summary>Total Paid and Allowed Amounts by Month</summary>

```sql
select
  date_part(year, encounter_end_date) || lpad(date_part(month, encounter_end_date),2,0) as year_month
, sum(paid_amount) as paid_amount
, sum(allowed_amount) as allowed_amount
from core.encounter
where encounter_type = 'acute inpatient'
group by 1
order by 1
```
</details>

## Length of Stay
Length of stay is computed as the difference between discharge date and admission date and typically reported as an average.

<details>
  <summary>Average Length of Stay by Month</summary>

```sql
select 
  date_part(year, encounter_end_date) || lpad(date_part(month, encounter_end_date),2,0) as year_month
, avg(length_of_stay) as alos
from core.encounter
where encounter_type = 'acute inpatient'
group by 1
order by 1
```
</details>

## Mortality
Mortality is computed by counting the number of discharges with a discharge disposition = 20 (the numerator) and dividing this number by the total number of acute inpatient visits (the denominator).  It's important to exclude patients that have not been discharged or for which a discharge disposition is not available.

<details>
  <summary>Mortality Rate by Month</summary>

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
  and discharge_disposition_code is not null
  and encounter_end_date is not null
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

## Readmissions
The 30-day readmission rate is calculated by following CMS's readmission methodology which is computed via the [Readmission data mart](../data-marts/readmissions).

<details>
  <summary>30-day Readmission Rate by Month</summary>

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