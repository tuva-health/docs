---
id: medical-pmpm
title: "Medical PMPM"
---
Per Member Per Month (PMPM) spend is the starting point for any claims based analysis. 

<details>
  <summary>Calculate Member Months and Total Medical Spend</summary>

```sql
Select 
data_source
, year_month
, cast(sum(medical_paid) as decimal(18,2)) as medical_paid
, count(*) as member_months
, cast(sum(medical_paid)/count(*) as decimal(18,2)) as pmpm
from tuva_synthetic.financial_pmpm.pmpm_prep
group by 
data_source
, year_month
order by data_source
, year_month
```
</details>

<details>
  <summary>Trending PMPM by Service Category</summary>
The pmpm table already breaks out pmpm by service category and groups it at the member month level.

```sql
select *
from financial_pmpm.pmpm_payer
order by 1
```
</details>

<details>
  <summary>Trending PMPM by Claim Type</summary>
Here we calculate PMPM manually by counting member months and joining payments by claim type to them.

```sql
with mm as 
(
select 
data_source
,year_month
,count(*) as member_months
from financial_pmpm.member_months
group by 
data_source
,year_month
)

,medical_claims as (
select 
  mc.data_source
  , to_char(claim_start_date, 'YYYYMM') AS year_month
  , claim_type
  , cast(sum(paid_amount) as decimal(18,2)) AS paid_amount
from core.medical_claim mc
inner join financial_pmpm.member_months mm on mc.patient_id = mm.patient_id
and
mc.data_source = mm.data_source
and
to_char(mc.claim_start_date, 'YYYYMM') = mm.year_month
group by mc.data_source
, to_char(claim_start_date, 'YYYYMM')
, claim_type
)

select mm.data_source
,mm.year_month
,medical_claims.claim_type
,medical_claims.paid_amount
,mm.member_months
,cast(medical_claims.paid_amount / mm.member_months as decimal(18,2)) as pmpm_claim_type
from mm
left join medical_claims on mm.data_source = medical_claims.data_source
and
mm.year_month = medical_claims.year_month
order by mm.data_source
,mm.year_month
,medical_claims.claim_type
```
</details>


<details>
  <summary>PMPM by Chronic Condition</summary>
Here we calculate PMPM by chronic condition. Since members can and do have more than one chronic condition, payments and members months are duplicated. This is useful for comparing spend across chronic conditions, but should be used with caution given the duplication across conditions.

```sql

WITH chronic_condition_members as 
(
select distinct 
patient_id
from chronic_conditions.tuva_chronic_conditions_long
)

,chronic_conditions as (
select patient_id
, condition_family
, condition
from chronic_conditions.tuva_chronic_conditions_long

UNION 

select p.patient_id
, 'No Chronic Conditions' as condition_family
, 'No Chronic Conditions' as Condition
from core.patient p
left join chronic_condition_members ccm on p.patient_id=ccm.patient_id
where ccm.patient_id is null
)

,medical_claims as (
select 
  mc.data_source
  , mc.patient_id
  , to_char(claim_start_date, 'YYYYMM') AS year_month
  , cast(sum(paid_amount) as decimal(18,2)) AS paid_amount
from core.medical_claim mc
inner join financial_pmpm.member_months mm on mc.patient_id = mm.patient_id
and
mc.data_source = mm.data_source
and
to_char(mc.claim_start_date, 'YYYYMM') = mm.year_month
group by mc.data_source
, mc.patient_id
, to_char(claim_start_date, 'YYYYMM')
)

select 
mm.data_source
//,mm.year_month uncomment to view at month level
,cc.condition
,cc.condition_family
,count(*) as member_months
,sum(mc.paid_amount) as paid_amount
,cast(sum(mc.paid_amount) / count(*) as decimal(18,2)) as medical_pmpm
from financial_pmpm.member_months mm
left join chronic_conditions cc on mm.patient_id = cc.patient_id
left join medical_claims mc on mm.patient_id = mc.patient_id
and 
mm.year_month = mc.year_month
and
mm.data_source = mc.data_source
group by 
mm.data_source
//,mm.year_month
,cc.condition
,cc.condition_family
order by member_months desc
```
</details>

## Claims and Enrollment 

Understanding the relationship between enrollment and claims is paramount for in-depth claims and population health analysis. It is important to analyze the proportion of the enrolled population that is actively utilizing healthcare services and to identify the characteristics of those who have not accessed care at all. 


<details>
  <summary>Members with Claims by Month</summary>

```sql

with medical_claim as 
(
select 
  data_source
  , patient_id
  , to_char(claim_start_date, 'YYYYMM') AS year_month
  , cast(sum(paid_amount) as decimal(18,2)) AS paid_amount
from core.medical_claim
GROUP BY data_source
, patient_id
, to_char(claim_start_date, 'YYYYMM')
)

select mm.data_source
, mm.year_month
, sum(case when mc.patient_id is not null then 1 else 0 end) as members_with_claims
, count(*) as total_member_months
, cast(sum(case when mc.patient_id is not null then 1 else 0 end) / count(*) as decimal(18,2)) as percent_members_with_claims
from financial_pmpm.member_months mm 
left join medical_claim mc on mm.patient_id = mc.patient_id
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
  <summary>Members with Claims</summary>

```sql
with medical_claims as (
select 
  data_source
  , patient_id
  , cast(sum(paid_amount) as decimal(18,2)) AS paid_amount
from core.medical_claim
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
left join medical_claims mc on mc.patient_id = mm.patient_id
and
mc.data_source = mm.data_source
group by mm.data_source
```
</details>

<details>
  <summary>Claims with Enrollment</summary>
  The inverse of the above. Ideally this number will be 100%, but there could be extenuating reasons why not all claims have a corresponding member with enrollment.

  ```sql

select 
  mc.data_source
  , sum(case when mm.patient_id is not null then 1 else 0 end) as claims_with_enrollment
  , count(*) as claims
  , cast(sum(case when mm.patient_id is not null then 1 else 0 end) / count(*) as decimal(18,2)) as percentage_claims_with_enrollment
from core.medical_claim mc
left join financial_pmpm.member_months mm on mc.patient_id = mm.patient_id
and
mc.data_source = mm.data_source
and
to_char(mc.claim_start_date, 'YYYYMM') = mm.year_month
GROUP BY mc.data_source
```
</details>
