---
id: pharmacy
title: "Pharmacy"
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
  <summary>Prescribing Providers</summary>

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

## Brand vs Generic
<details>
  <summary>Brand Generic Dollar Opportunity</summary>
  
We can view the total dollar opportunity from switching brands to generics with this query.

```sql
select
    data_source
  , sum(generic_available_total_opportunity) as generic_available_total_opportunity
from pharmacy.pharmacy_claim_expanded
group by 
    data_source

```
</details>
<details>
  <summary>Opportunity by Brand Name</summary>
  
To view the drugs that would yield the most savings by switching to generic, we can group by brand name and sort high to low on opportunity.

```sql
select
    data_source
  , brand_name
  , sum(generic_available_total_opportunity) as generic_available_total_opportunity
from pharmacy.pharmacy_claim_expanded
where 
  generic_available_total_opportunity > 0
group by 
    brand_name
  , data_source
order by generic_available_total_opportunity desc

```
</details>
<details>
  <summary>Generic NDCs Available</summary>
  
To view the generic ndcs that exist for a particular brand drug (Concerta in this example), we can join to the generic_available_list table.

```sql
select
    e.data_source
  , e.ndc_code
  , e.ndc_description
  , g.generic_ndc
  , g.generic_ndc_description
  , g.generic_prescribed_history
  , g.brand_paid_per_unit
  , g.generic_cost_per_unit
  , sum(g.generic_available_total_opportunity) as generic_available_total_opportunity
from pharmacy.pharmacy_claim_expanded as e
inner join pharmacy.generic_available_list as g
  on e.generic_available_sk = g.generic_available_sk
where 
  e.brand_name = 'Concerta'
group by 
    e.data_source
  , e.ndc_code
  , e.ndc_description
  , g.generic_ndc
  , g.generic_ndc_description
  , g.generic_prescribed_history
  , g.brand_paid_per_unit
  , g.generic_cost_per_unit
order by generic_available_total_opportunity desc

```
</details>
<details>
  <summary>Generics Available in Prescribed History</summary>
  
To view only the generics that have been prescribed in the pharmacy claims data history (for a given data source), we can set a filter in the where clause for the generic_prescribed_history flag.

```sql
select
    e.data_source
  , e.ndc_code
  , e.ndc_description
  , g.generic_ndc
  , g.generic_ndc_description
  , g.generic_prescribed_history
  , g.brand_paid_per_unit
  , g.generic_cost_per_unit
  , sum(g.generic_available_total_opportunity) as generic_available_total_opportunity
from pharmacy.pharmacy_claim_expanded as e
inner join pharmacy.generic_available_list as g
  on e.generic_available_sk = g.generic_available_sk
where 
  e.brand_name = 'Concerta'
  and g.generic_prescribed_history = 1
group by 
    e.data_source
  , e.ndc_code
  , e.ndc_description
  , g.generic_ndc
  , g.generic_ndc_description
  , g.generic_prescribed_history
  , g.brand_paid_per_unit
  , g.generic_cost_per_unit
order by generic_available_total_opportunity desc

```
</details>