---
id: primary-care
title: "Primary Care"
---

Analyzing primary care utilization in claims data is crucial for understanding healthcare access, quality, and costs, as it provides insights into the frequency and types of services patients receive from their primary care providers. By examining claims data, researchers and policymakers can identify patterns, disparities, and potential areas for improvement in primary care delivery.


## Primary Care Spend and PMPM


<details>
  <summary>Primary Care Spend, % of Total, and PMPM </summary>

```sql
with primary_care as (
select 
m.data_source
,TO_CHAR(claim_start_date, 'YYYYMM') AS year_month
,sum(paid_amount) as primary_care_paid_amount
from core.medical_claim m
inner join core.practitioner p on coalesce(m.rendering_npi,m.billing_npi) = p.npi
inner join financial_pmpm.member_months mm on m.patient_id = mm.patient_id
and
m.data_source = mm.data_source
and
to_char(m.claim_start_date, 'YYYYMM') = mm.year_month
where service_category_2 in ('Office Visit','Outpatient Hospital or Clinic')
and
p.specialty in ('Family Medicine','Internal Medicine','Obstetrics & Gynecology','Pediatric Medicine','Physician Assistant','Nurse Practitioner')
group by TO_CHAR(claim_start_date, 'YYYYMM')
,m.data_source
)

,total_cost as 
(
select data_source
,year_month
,sum(total_paid) as total_paid
from financial_pmpm.pmpm_prep
group by data_source
,year_month
)

select pmpm.data_source
,pmpm.year_month
,cast(pc.primary_care_paid_amount as decimal(18,2)) as primary_care_paid_amount
,cast(tc.total_paid as decimal(18,2)) as total_paid
,cast(pc.primary_care_paid_amount/tc.total_paid  as decimal(18,2)) primary_care_percent_of_total
,cast(pc.primary_care_paid_amount/pmpm.member_months as decimal(18,2)) as primary_care_pmpm
from financial_pmpm.pmpm pmpm
left join primary_care pc on pmpm.data_source = pc.data_source
and
pmpm.year_month = pc.year_month
left join total_cost tc on pmpm.data_source = tc.data_source
and
pmpm.year_month = tc.year_month
order by 
pmpm.data_source
,pmpm.year_month
```
</details>


## Primary Care Visits

<details>
  <summary>Average Primary Care Visits per Member </summary>

```sql
with primary_care as 
(
select 
m.data_source
,TO_CHAR(claim_start_date, 'YYYY') AS year_nbr
,count(distinct claim_id) as visit_count
,m.patient_id
from core.medical_claim m
inner join core.practitioner p on coalesce(m.rendering_npi,m.billing_npi) = p.npi
inner join financial_pmpm.member_months mm on m.patient_id = mm.patient_id
and
m.data_source = mm.data_source
and
to_char(m.claim_start_date, 'YYYYMM') = mm.year_month
where service_category_2 in ('Office Visit','Outpatient Hospital or Clinic')
and
p.specialty in ('Family Medicine','Internal Medicine','Obstetrics & Gynecology','Pediatric Medicine','Physician Assistant','Nurse Practitioner')
group by TO_CHAR(claim_start_date, 'YYYY')
,m.data_source
,m.patient_id
)

,member_year as (
select distinct data_source
,left(year_month,4) as year_nbr
,patient_id
from financial_pmpm.pmpm_prep pmpm
)

select my.data_source
,my.year_nbr
,sum(pc.visit_count) as primary_visit_count
,count(distinct my.patient_id) as member_count
,sum(pc.visit_count)/count(distinct my.patient_id) as primary_care_visits_per_member
from member_year my
left join primary_care pc on my.data_source = pc.data_source
and
my.year_nbr = pc.year_nbr
and
my.patient_id = pc.patient_id
group by 
my.data_source
,my.year_nbr
```
</details>

<details>
  <summary>Members with at Least One Primary Care Visit</summary>

```sql

with primary_care as 
(
select 
m.data_source
,TO_CHAR(claim_start_date, 'YYYY') AS year_nbr
,count(distinct claim_id) as visit_count
,m.patient_id
from core.medical_claim m
inner join core.practitioner p on coalesce(m.rendering_npi,m.billing_npi) = p.npi
inner join financial_pmpm.member_months mm on m.patient_id = mm.patient_id
and
m.data_source = mm.data_source
and
to_char(m.claim_start_date, 'YYYYMM') = mm.year_month
where service_category_2 in ('Office Visit','Outpatient Hospital or Clinic')
and
p.specialty in ('Family Medicine','Internal Medicine','Obstetrics & Gynecology','Pediatric Medicine','Physician Assistant','Nurse Practitioner')
group by TO_CHAR(claim_start_date, 'YYYY')
,m.data_source
,m.patient_id
)

,member_year as (
select distinct data_source
,left(year_month,4) as year_nbr
,patient_id
from financial_pmpm.pmpm_prep pmpm
)

select my.data_source
,my.year_nbr
,sum(case when pc.visit_count >= 1 then 1 else 0 end) as at_least_one_pc_visit
,count(*) as member_count
,sum(case when pc.visit_count >= 1 then 1 else 0 end)/count(*)  as percent_at_least_one_pc_visit
from member_year my
left join primary_care pc on my.data_source = pc.data_source
and
my.year_nbr = pc.year_nbr
and
my.patient_id = pc.patient_id
group by 
my.data_source
,my.year_nbr
;
```

</details>

## Primary Care Providers

<details>
  <summary>Primary Care Providers</summary>

```sql
select 
coalesce(m.rendering_npi,m.billing_npi) as primary_care_provider_npi
,p.provider_first_name || ' '|| provider_last_name as primary_care_provider_name
,count(distinct claim_id) as visit_count
,sum(paid_amount) as paid_amount
from core.medical_claim m
inner join core.practitioner p on coalesce(m.rendering_npi,m.billing_npi) = p.npi
where service_category_2 in ('Office Visit','Outpatient Hospital or Clinic')
and
p.specialty in ('Family Medicine','Internal Medicine','Obstetrics & Gynecology','Pediatric Medicine','Physician Assistant','Nurse Practitioner')
group by coalesce(m.rendering_npi,m.billing_npi) 
,p.provider_first_name || ' '|| provider_last_name
order by visit_count desc
```
</details>