---
id: ed-visits
title: "Emergency Department Visits"
---

Analyzing ED claims data helps identify high utilizers of emergency services, often indicating overuse of EDs for conditions that can be managed with proper primary care. 

## ED Visits Trended
<details>
  <summary>Trending ED Visit Volume, PKPY, and Cost</summary>

```sql

with ed as (
select 
  data_source
  ,TO_CHAR(encounter_end_date, 'YYYYMM') AS year_month
  ,COUNT(*) AS ed_visits
  ,AVG(paid_amount) as avg_paid_amount
  ,sum(paid_amount) as total_paid_amount
from core.encounter
where encounter_type = 'emergency department'
group by data_source
 ,TO_CHAR(encounter_end_date, 'YYYYMM') 
)

, member_months as (
select
  data_source
, year_month
, count(1) as member_months
from financial_pmpm.member_months
group by 
  data_source
, year_month

)
select
  a.data_source
, a.year_month
, b.member_months
, ed_visits
, cast(ed_visits / member_months * 12000 as decimal(18,2)) as ed_visits_pkpy
, cast(avg_paid_amount as decimal(18,2)) as avg_paid_amount
, cast(total_paid_amount as decimal(18,2))as ed_total_paid_amount
from  member_months b
left join ed a
  on a.year_month = b.year_month
  and a.data_source = b.data_source
order by 1,2
;
```
</details>

<details>
  <summary>ED Spend as Percent of Total Spend</summary>

```sql
select data_source
,year_month
,sum(emergency_department_paid) as ed_paid
,sum(total_paid) as total_paid
,cast(sum(emergency_department_paid) as decimal(18,2))/cast(sum(total_paid) as decimal(18,2)) as ed_percent_of_total_paid
from financial_pmpm.pmpm_prep
group by data_source
,year_month
order by data_source
,year_month
```
</details>

<details>
  <summary>ED Visits by Member and Year</summary>

```sql
select 
data_source
, TO_CHAR(encounter_end_date, 'YYYY') AS year_nbr
, patient_id
, COUNT(*) AS ed_visits
from core.encounter
where encounter_type = 'emergency department'
group by data_source
, TO_CHAR(encounter_end_date, 'YYYY')
, patient_id
ORDER BY ed_visits desc
, year_nbr
, patient_id
;
```
</details>

<details>
  <summary>Frequency Distribution of ED Visits</summary>

```sql
with visits as (
select 
data_source
, patient_id
, COUNT(*) AS ed_visits
from core.encounter
where encounter_type = 'emergency department'
group by data_source
, patient_id
)

,members as (
select distinct patient_id
,data_source
from financial_pmpm.member_months
)

,members_total as (
select count(*) as total_member_count
from members
)

,members_with_visits as (
select m.patient_id
,m.data_source
,coalesce(v.ed_visits,0) as ed_visits
from members m
left join visits v on m.patient_id = v.patient_id
and
m.data_source = v.data_source
)

select ed_visits
,count(*) as member_count
,count(*) / cast(max(total_member_count) as real) as percent_of_total_members
from members_with_visits
cross join members_total 
group by ed_visits
order by ed_visits 
;
```
</details>

<details>
  <summary>Count of ED NPIs</summary>

```sql

select data_source
 ,count(distinct facility_npi) as ed_facilities_count
from core.encounter e
where encounter_type = 'emergency department'
group by 
 data_source
order by ed_facilities_count desc
```
</details>

<details>
  <summary>Visit by Facility</summary>

```sql
select 
 facility_npi
, COUNT(*) AS ed_visits
, sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
, cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e
where encounter_type = 'emergency department'
group by 
 facility_npi
ORDER BY ed_visits desc
;
```
</details>

<details>
  <summary>Admit Source and Type</summary>

```sql
select 
admit_source_code
, admit_source_description
, admit_type_code
, admit_type_description
, count(*) AS ed_visits
, sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
, cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e
where encounter_type = 'emergency department'
group by 
admit_source_code
, admit_source_description
, admit_type_code
, admit_type_description
ORDER BY ed_visits desc
;
```

</details>

## ED Classification
The Tuva Project utilizes the NYU algorithm to classify ED visits, helping to identify care patterns that are not being met by primary care providers.

Of the different classifications in the NYU algorithm, the categories usually classified as "potentially preventable" are:

- Emergent, Primary Care Treatable
- Non-Emergent
- Emergent, ED Care Needed, Preventable/Avoidable

<details>
  <summary>ED Classification</summary>

```sql
select coalesce(s.ed_classification_description,'Not Classified') as ed_classification_category
, count(*) as visit_count
, sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
, cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e 
left join ed_classification.summary s on e.encounter_id = s.encounter_id
group by coalesce(s.ed_classification_description,'Not Classified')
order by visit_count desc
```
</details>

<details>
  <summary>Members with at least One Potentially Preventable ED Visit</summary>

```sql
with enc as 
(
select e.patient_id
,left(year_month,4) as year_nbr
,data_source
,count(distinct e.encounter_id) as potentially_preventable
,sum(e.paid_amount) as paid_amount
from core.encounter e 
inner join ed_classification.summary s on e.encounter_id = s.encounter_id
where ed_classification_description in ('Emergent, Primary Care Treatable','Non-Emergent','Emergent, ED Care Needed, Preventable/Avoidable')
group by e.patient_id
,data_source
,left(year_month,4) 
)

,member_year as (
select distinct data_source
,left(year_month,4) as year_nbr
,patient_id
from financial_pmpm.pmpm_prep pmpm
)

select my.data_source
,my.year_nbr
,sum(case when enc.potentially_preventable >=1 then 1 else 0 end) as members_with_potentially_preventable
,count(*) as total_members
,sum(case when enc.potentially_preventable >=1 then 1 else 0 end)/count(*) as potentially_preventable_percent_of_total
,sum(enc.paid_amount)/sum(enc.potentially_preventable) as avg_cost_potentially_preventable
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

<details>
  <summary>Primary Diagnosis Codes for Avoidable Categories</summary>

```sql
select coalesce(s.ed_classification_description,'Not Classified') as ed_classification_category
, e.primary_diagnosis_code
, e.primary_diagnosis_description
, count(*) as visit_count
, sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
, cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e 
left join ed_classification.summary s on e.encounter_id = s.encounter_id
where ed_classification_description in ('Emergent, Primary Care Treatable','Non-Emergent','Emergent, ED Care Needed, Preventable/Avoidable')
group by coalesce(s.ed_classification_description,'Not Classified')
, e.primary_diagnosis_code
, e.primary_diagnosis_description
order by ed_classification_category
, visit_count desc
;
```
</details>

## ED Diagnosis Grouping
The Tuva Project provides several ways of grouping diagnosis codes. 
CCSR (AHRQ) provides a hierarchy grouping of diagnosis codes, and is useful for recognizing patterns of care by what the patient was diagnosed with at the ED.

Chronic Conditions are a way of grouping members by conditions that they have been diagnosed with (within the relevant timespan, usually the last 1 or 2 years.)

<details>
  <summary>ED Visits by CCSR Category and Body System</summary>

```sql

select     
P.ccsr_category
, P.ccsr_category_description
, P.ccsr_parent_category
, B.body_system
, count(*) as visit_count
, sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
, cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e 
left join ccsr.dx_vertical_pivot P ON e.primary_diagnosis_code = p.Code
    and p.ccsr_category_rank = 1
left join CCSR._value_set_dxccsr_v2023_1_body_systems B ON P.CCSR_PARENT_CATEGORY = B.CCSR_PARENT_CATEGORY
group by P.ccsr_category
, P.ccsr_category_description
, P.ccsr_parent_category
, B.body_system
order by visit_count desc

```
</details>

<details>
  <summary>ED Visits by Chronic Condition Category</summary>

Since members often have more than one chronic condition, encounters are duplicated for each chronic condition causing the total amount to be inflated. The division of encounters by chronic condition is useful for comparision across disease states, and less so from the total standpoint.

```sql


WITH chronic_condition_members as 
(
SELECT DISTINCT 
patient_id
FROM chronic_conditions.tuva_chronic_conditions_long
)

,chronic_conditions as (
SELECT patient_id
, condition_family
, condition
FROM chronic_conditions.tuva_chronic_conditions_long

UNION 

SELECT p.patient_id
, 'No Chronic Conditions' as condition_family
, 'No Chronic Conditions' as Condition
FROM core.patient p
LEFT JOIN chronic_condition_members ccm on p.patient_id=ccm.patient_id
where ccm.patient_id is null
)

select cc.condition
, cc.condition_family
, count(*) as visit_count
, sum(cast(e.paid_amount as decimal(18,2))) as paid_amount
, cast(sum(e.paid_amount)/count(*) as decimal(18,2))as paid_per_visit
from core.encounter e 
left join chronic_conditions cc on e.patient_id = cc.patient_id
where encounter_type = 'emergency department'
group by 
cc.condition
, cc.condition_family
order by visit_count desc
;
```
</details>

