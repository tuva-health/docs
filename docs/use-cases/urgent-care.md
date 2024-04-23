---
id: urgent-care
title: "Urgent Care"
---

Urgent Care serves as a low-cost solution when compared to the Emergency Department. Analyzing the frequency and circumstances of Urgent Care use, and comparing these to Emergency Department statistics, provides a useful perspective on how people use immediate care options.

## Urgent Care Usage

<details>
  <summary>Urgent Care by Facility</summary>

```sql
select 
mc.billing_npi
,l.name
,count(distinct concat(mc.patient_id,mc.data_source,claim_start_date)) as visits
,sum(coalesce(mc.paid_amount,0)) as paid_amount
from core.medical_claim mc
left join core.location l on mc.billing_npi=l.npi
where service_category_2 = 'Urgent Care'
group by mc.billing_npi
,l.name
order by paid_amount desc
```
</details>

<details>
  <summary>Urgent Care PMPM and PKPY</summary>

```sql
with uc as 
(
select mc.patient_id
,mc.data_source
,to_char(claim_start_date, 'yyyy') as year_nbr
,count(distinct concat(mc.patient_id,mc.data_source,claim_start_date)) as visits
,sum(mc.paid_amount) as paid_amount
from core.medical_claim mc
where service_category_2 = 'Urgent Care'
group by mc.patient_id
,mc.data_source
,to_char(claim_start_date, 'yyyy')
)

,member_year as (
select data_source
,patient_id
,left(year_month,4) as year_nbr
,count(*) as member_months
from financial_pmpm.pmpm_prep pmpm
group by 
 data_source
,patient_id
,left(year_month,4) 
)

select my.data_source
,my.year_nbr
,sum(member_months) as member_months
,cast(sum(uc.visits)/sum(member_months) * 12000 as decimal(18,2)) as urgent_care_pkpy
,cast(sum(uc.paid_amount)/sum(member_months) as decimal(18,2)) as urgent_care_pmpm
,sum(uc.visits) as urgent_care_absolute_visits
,cast(sum(uc.paid_amount) as decimal(18,2)) as urgent_care_absolute_paid
from member_year my 
left join uc on uc.data_source = my.data_source
and
uc.patient_id = my.patient_id
group by my.data_source
,my.year_nbr
order by data_source
,my.year_nbr

```
</details>

<details>
  <summary>Members with at least One Urgent Care Visit</summary>

```sql

with enc as 
(
select mc.patient_id
,to_char(claim_start_date, 'yyyy') as year_nbr
,mc.data_source
,count(distinct concat(mc.patient_id,mc.data_source,claim_start_date)) as urgent_care
,sum(mc.paid_amount) as paid_amount
from core.medical_claim mc
where service_category_2 = 'Urgent Care'
group by mc.patient_id
,mc.data_source
,to_char(claim_start_date, 'yyyy')
)

,member_year as (
select distinct data_source
,left(year_month,4) as year_nbr
,patient_id
from financial_pmpm.pmpm_prep pmpm
)

select my.data_source
,my.year_nbr
,sum(case when enc.urgent_care >=1 then 1 else 0 end) as members_with_at_least_one_uc
,count(*) as total_members
,sum(case when enc.urgent_care >=1 then 1 else 0 end)/count(*) as at_least_one_percent_total
,sum(enc.paid_amount)/sum(enc.urgent_care) as avg_cost_urgent_care
from member_year my 
left join enc on my.year_nbr = enc.year_nbr
and
enc.data_source = my.data_source
and
enc.patient_id = my.patient_id
group by my.data_source
,my.year_nbr
```
</details>



## Urgent Care and ED Comparison

<details>
  <summary>ED and Urgent Care Visits by Year</summary>

```sql

with uc as 
(
select mc.patient_id
,to_char(claim_start_date, 'yyyy') as year_nbr
,mc.data_source
,count(distinct concat(mc.patient_id,mc.data_source,claim_start_date)) as visits
,sum(mc.paid_amount) as paid_amount
from core.medical_claim mc
where service_category_2 = 'Urgent Care'
group by mc.patient_id
,mc.data_source
,to_char(claim_start_date, 'yyyy')
)

,ed as (
select e.patient_id
,to_char(encounter_start_date, 'yyyy') as year_nbr
,data_source
,count(distinct e.encounter_id) as visits
,sum(e.paid_amount) as paid_amount
from core.encounter e 
group by e.patient_id
,data_source
,to_char(encounter_start_date, 'yyyy')
)

,member_year as (
select distinct data_source
,left(year_month,4) as year_nbr
,patient_id
from financial_pmpm.pmpm_prep pmpm
)

select my.data_source
,my.year_nbr
,sum(uc.visits) urgent_care_visits
,sum(ed.visits) ed_visits
from member_year my 
left join ed on my.year_nbr = ed.year_nbr
and
ed.data_source = my.data_source
and
ed.patient_id = my.patient_id
left join uc on my.year_nbr = uc.year_nbr
and
uc.data_source = my.data_source
and
uc.patient_id = my.patient_id
group by my.data_source
,my.year_nbr
```
</details>

<details>
  <summary>ED and Urgent Care Utilization by Member</summary>

```sql

with uc as 
(
select mc.patient_id
,mc.data_source
,count(distinct concat(mc.patient_id,mc.data_source,claim_start_date)) as visits
,sum(mc.paid_amount) as paid_amount
from core.medical_claim mc
where service_category_2 = 'Urgent Care'
group by mc.patient_id
,mc.data_source
)

,ed as (
select e.patient_id
,data_source
,count(distinct e.encounter_id) as visits
,sum(e.paid_amount) as paid_amount
from core.encounter e 
group by e.patient_id
,data_source
)

,member_year as (
select distinct data_source
,patient_id
from financial_pmpm.pmpm_prep pmpm
)

select my.data_source
,my.patient_id
,coalesce(uc.visits,0) as urgent_care_visits
,coalesce(ed.visits,0) as ed_visits
,cast(coalesce(uc.paid_amount,0) as decimal(18,2)) as urgent_care_paid_amount
,cast(coalesce(ed.paid_amount,0) as decimal(18,2)) as ed_paid_amount
from member_year my 
left join ed on ed.data_source = my.data_source
and
ed.patient_id = my.patient_id
left join uc on uc.data_source = my.data_source
and
uc.patient_id = my.patient_id
where uc.patient_id is not null
OR
ed.patient_id is not null
order by ed_visits desc

```
</details>

<details>
  <summary>Members with an ED Visit and no Urgent Care</summary>

```sql

with uc as 
(
select mc.patient_id
,to_char(claim_start_date, 'yyyy') as year_nbr
,mc.data_source
,count(distinct concat(mc.patient_id,mc.data_source,claim_start_date)) as visits
,sum(mc.paid_amount) as paid_amount
from core.medical_claim mc
where service_category_2 = 'Urgent Care'
group by mc.patient_id
,mc.data_source
,to_char(claim_start_date, 'yyyy')
)

,ed as (
select e.patient_id
,to_char(encounter_start_date, 'yyyy') as year_nbr
,data_source
,count(distinct e.encounter_id) as visits
,sum(e.paid_amount) as paid_amount
from core.encounter e 
group by e.patient_id
,data_source
,to_char(encounter_start_date, 'yyyy')
)

,member_year as (
select distinct data_source
,left(year_month,4) as year_nbr
,patient_id
from financial_pmpm.pmpm_prep pmpm
)

select my.data_source
,my.year_nbr
,sum(case when uc.visits >= 1 then 1 else 0 end) members_with_at_least_one_uc
,sum(case when ed.visits >= 1 then 1 else 0 end) members_with_at_least_one_ed
,sum(case when ed.visits >= 1 and coalesce(uc.visits,0) = 0  then 1 else 0 end) members_with_ed_no_uc
from member_year my 
left join ed on my.year_nbr = ed.year_nbr
and
ed.data_source = my.data_source
and
ed.patient_id = my.patient_id
left join uc on my.year_nbr = uc.year_nbr
and
uc.data_source = my.data_source
and
uc.patient_id = my.patient_id
group by my.data_source
,my.year_nbr
```
</details>