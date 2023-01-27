---
id: chronic-conditions
title: "Chronic Conditions"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<details><summary>What are the top 10 most prevalent chronic conditions in my patient population?</summary>
<Tabs groupId="cc_package">
<TabItem value="cms" label="CMS">

```sql
select
    condition
,   cast(count(distinct patient_id) * 100.0 / (select count(distinct patient_id) from core.patient) as numeric(38,2)) as percent_of_patients
From cms_chronic_conditions.chronic_conditions_unioned
group by 1
order by 2 desc
limit 10
```
The following is example output from this query from the Tuva Claims Demo dataset.  

![CMS Condition Prevalence](/img/cms_condition_prevalence.jpg)
</TabItem>
<TabItem value="tuva" label="Tuva">

```sql
select
    condition
,   cast(count(distinct patient_id) * 100.0 / (select count(distinct patient_id) from core.patient) as numeric(38,2)) as percent_of_patients
From tuva_chronic_conditions.final_chronic_conditions_long
group by 1
order by 2 desc
limit 10
```
The following is example output from this query from the Tuva Claims Demo dataset.  

![Tuva Condition Prevalence](/img/tuva_condition_prevalence.jpg)
</TabItem>
</Tabs >
</details>
<details><summary>How many new patients are diagnosed with type 2 diabetes each month?</summary>
<Tabs groupId="cc_package">
<TabItem value="cms" label="CMS">

:::caution warning

The CMS Condition grouper does not differentiate Type 1 and Type 2 diabetes.  The following query and graph show combined stats for both types of diabetes.  To run analytics a specific type of diabetes, use the Tuva Chronic Conditions data mart.

:::

```sql
with first_month_diabetes as
    (
    select
        PATIENT_ID,
        CONDITION,
        min(ENCOUNTER_START_DATE) as start_date
        from CMS_CHRONIC_CONDITIONS.CHRONIC_CONDITIONS_UNIONED
    where condition in ('Diabetes')
    group by PATIENT_ID, CONDITION
    )
select condition,
       year(start_date) as year,
       month(start_date) as month,
       count(*) as count
From first_month_diabetes
group by condition,year(start_date) , month(start_date)
order by year(start_date) desc , month(start_date) desc

```
The following is example output from this query from the Tuva Claims Demo dataset.  

![The Tuva Project](/img/chronic_conditions/CCC-new_diabetes_by_month.png)

</TabItem>
<TabItem value="tuva" label="Tuva">

```sql
with first_month_diabetes as
    (
    select
        PATIENT_ID,
        'Diabetes' as condition,
        min(FIRST_DIAGNOSIS_DATE) as start_date
        from TUVA_CHRONIC_CONDITIONS.FINAL_CHRONIC_CONDITIONS_LONG
    where condition in ('Type 2 Diabetes')
    group by PATIENT_ID
    )
select condition,
       year(start_date) as year,
       month(start_date) as month,
       count(*) as count
From first_month_diabetes
group by condition,year(start_date) , month(start_date)
order by year(start_date) desc , month(start_date) desc

```
The following is example output from this query from the Tuva Claims Demo dataset.  

![The Tuva Project](/img/chronic_conditions/TCC-new_diabetes_by_month.png)
</TabItem>
</Tabs>
</details>
<details><summary>How many patients have chronic kidney disease stratified by disease stage?</summary>
<Tabs groupId="cc_package">
<TabItem value="cms" label="CMS">

```sql
with stages as (
select icd.ICD_10_CM as ICD_10_CM_code,
       case
               -- indeterminate
               when LONG_DESCRIPTION like '%stage 1%' and LONG_DESCRIPTION like '%unspecified%' then 0
               when LONG_DESCRIPTION like '%stage 5%' and LONG_DESCRIPTION like '%end stage%' then 5
               --determinate
                when LONG_DESCRIPTION like '%stage 1%' then 1
               when LONG_DESCRIPTION like '%stage 2%' then 2
               when LONG_DESCRIPTION like '%stage 3%' then 3
               when LONG_DESCRIPTION like '%stage 4%' then 4
               when LONG_DESCRIPTION like '%stage 5%' then 5
               when LONG_DESCRIPTION like '%End stage%' then 6
               when LONG_DESCRIPTION like '%unspecified%' then 0
            else 0 end as stage
from TERMINOLOGY.CMS_CHRONIC_CONDITIONS ccc
inner join TERMINOLOGY.ICD_10_CM icd
        on ccc.CODE = icd.ICD_10_CM
where CONDITION like 'Chronic Kidney Disease'
)
, ccd_patients as (
select PATIENT_ID,max(stages.stage) max_stage From  core.CONDITION c
inner join stages
on c.CODE = stages.ICD_10_CM_CODE and c.CODE_TYPE = 'icd-10-cm'
group by PATIENT_ID)

select case max_stage
    when 0 then 'Unspecified'
    when 1 then 'Stage 1'
    when 2 then 'Stage 2'
    when 3 then 'Stage 3'
    when 4 then 'Stage 4'
    when 5 then 'Stage 5'
    when 6 then 'End Stage'
    else null end as Stage
    , count(*) as count
from ccd_patients
group by max_stage
order by max_stage

```
The following is example output from this query from the Tuva Claims Demo dataset.  

![The Tuva Project](/img/chronic_conditions/CCC-kidney_by_stage.png)

</TabItem>
<TabItem value="tuva" label="Tuva">

```sql
with stages as (
    select condition,
           icd_10_cm_code,
           case
               when ICD_10_CM_DESCRIPTION like '%stage 1%' then 1
               when ICD_10_CM_DESCRIPTION like '%stage 2%' then 2
               when ICD_10_CM_DESCRIPTION like '%stage 3%' then 3
               when ICD_10_CM_DESCRIPTION like '%stage 4%' then 4
               when ICD_10_CM_DESCRIPTION like '%stage 5%' then 5
               when ICD_10_CM_DESCRIPTION like '%End stage%' then 6
               when ICD_10_CM_DESCRIPTION like '%unspecified%' then 0
            else 0 end as stage
    from TUVA_CHRONIC_CONDITIONS.CHRONIC_CONDITIONS_HIERARCHY
    where CONDITION = 'Chronic Kidney Disease'
)
, ccd_patients as (
select PATIENT_ID,max(stages.stage) max_stage From  core.CONDITION c
inner join stages
on c.CODE = stages.ICD_10_CM_CODE and c.CODE_TYPE = 'icd-10-cm'
group by PATIENT_ID)

select case max_stage
    when 0 then 'Unspecified'
    when 1 then 'Stage 1'
    when 2 then 'Stage 2'
    when 3 then 'Stage 3'
    when 4 then 'Stage 4'
    when 5 then 'Stage 5'
    when 6 then 'End Stage'
    else null end as Stage
    , count(*) as count
from ccd_patients
group by max_stage
order by max_stage

```
The following is example output from this query from the Tuva Claims Demo dataset.  

![The Tuva Project](/img/chronic_conditions/TCC-kidney_by_stage.png)
</TabItem>
</Tabs>
</details>

