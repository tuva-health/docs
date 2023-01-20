---
id: chronic-conditions
title: "Chronic Conditions"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Key Questions
<details><summary>Which chronic diseases are most prevalent in my patient population?</summary>

```sql
select
    condition,
    count(distinct patient_id) as count
From CMS_CHRONIC_CONDITIONS.CHRONIC_CONDITIONS_UNIONED
group by condition
order by count(distinct PATIENT_ID) desc
limit 20
select * from
CMS_CHRONIC_CONDITIONS.CHRONIC_CONDITIONS_UNIONED
```
</details>
<details><summary>How many new patients are diagnosed with type 2 diabetes each month?</summary>
<Tabs>
<TabItem value="cms" label="CMS">

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
</TabItem>
<TabItem value="tuva" label="Tuva">this is a test, tuva</TabItem>
</Tabs>
</details>
<details><summary>How many patients have chronic kidney disease stratified by disease stage?</summary>

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
            else null end as stage
    from TUVA_CHRONIC_CONDITIONS.CHRONIC_CONDITIONS_HIERARCHY
    where CONDITION = 'Chronic Kidney Disease'
)
, ccd_patients as (
select PATIENT_ID,max(stages.stage) max_stage From  core.CONDITION c
inner join stages
on c.CODE = stages.ICD_10_CM_CODE and c.CODE_TYPE = 'icd-10-cm'
group by PATIENT_ID)

select case max_stage
    when 0 then 'Snspecified'
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
</details>
