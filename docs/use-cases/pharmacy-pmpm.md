---
id: pharmacy-pmpm
title: "Pharmacy PMPM"
---
Examining retail pharmacy spend data is essential for understanding population health, as it reveals prescription trends, identifies potential gaps in care, and helps healthcare organizations develop targeted disease management programs.


## Pharmacy Claims and Enrollment


<details>
  <summary>Members with Pharmacy Claims by Month</summary>

```sql
with pharmacy_claim as 
(
select 
  data_source
  , patient_id
  , to_char(paid_date, 'YYYYMM') AS year_month
  , cast(sum(paid_amount) as decimal(18,2)) AS paid_amount
from core.pharmacy_claim
GROUP BY data_source
, patient_id
, to_char(paid_date, 'YYYYMM')
)

select mm.data_source
, mm.year_month
, sum(case when mc.patient_id is not null then 1 else 0 end) as members_with_claims
, count(*) as total_member_months
, cast(sum(case when mc.patient_id is not null then 1 else 0 end) / count(*) as decimal(18,2)) as percent_members_with_claims
from financial_pmpm.member_months mm 
left join pharmacy_claim mc on mm.patient_id = mc.patient_id
and
mm.data_source = mc.data_source
and
mm.year_month = mc.year_month
group by mm.data_source
, mm.year_month
order by data_source
,year_month
```
</details>

<details>
  <summary>Members with Pharmacy Claims</summary>

```sql
with pharmacy_claim as (
select 
  data_source
  , patient_id
  , cast(sum(paid_amount) as decimal(18,2)) AS paid_amount
from core.pharmacy_claim
GROUP BY data_source
, patient_id
)

, members as (
select distinct patient_id
,data_source
from financial_pmpm.member_months
)

select mm.data_source
,sum(case when mc.patient_id is not null then 1 else 0 end) as members_with_claims
,count(*) as members
,sum(case when mc.patient_id is not null then 1 else 0 end) / count(*) as percentage_with_claims
from members mm
left join pharmacy_claim mc on mc.patient_id = mm.patient_id
and
mc.data_source = mm.data_source
group by mm.data_source
```
</details>

<details>
  <summary>Pharmacy Claims with Enrollment</summary>
  The inverse of the above. Ideally this number will be 100%, but there could be extenuating reasons why not all claims have a corresponding member with enrollment.

  ```sql
select 
  mc.data_source
  , sum(case when mm.patient_id is not null then 1 else 0 end) as claims_with_enrollment
  , count(*) as claims
  , cast(sum(case when mm.patient_id is not null then 1 else 0 end) / count(*) as decimal(18,2)) as percentage_claims_with_enrollment
from core.pharmacy_claim mc
left join financial_pmpm.member_months mm on mc.patient_id = mm.patient_id
and
mc.data_source = mm.data_source
and
to_char(mc.paid_date, 'YYYYMM') = mm.year_month
GROUP BY mc.data_source

```
</details>

## Understanding Retail Pharmacy Utilization

<details>
  <summary>Prescibing Providers</summary>

```sql
select 
data_source
,prescribing_provider_npi
,sum(paid_amount) as pharmacy_paid_amount
,sum(days_supply) as pharmacy_days_supply
from core.pharmacy_claim
group by 
data_source
,prescribing_provider_npi
order by pharmacy_paid_amount desc

```
</details>

<details>
  <summary>Pharmacy Names</summary>

```sql
select 
data_source
,dispensing_provider_npi
,sum(paid_amount) as pharmacy_paid_amount
,sum(days_supply) as pharmacy_days_supply
from core.pharmacy_claim
group by dispensing_provider_npi
,data_source
order by pharmacy_paid_amount desc
```
</details>
