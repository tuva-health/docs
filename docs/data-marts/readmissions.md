---
id: readmissions
title: "Readmissions"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Overview

[Code](https://github.com/tuva-health/tuva/tree/main/models/readmissions)

The Readmissions data model is designed to enable analysis of hospital readmissions in an acute inpatient care setting.  The data model includes concepts related to all-cause 30-day readmissions and dimensions useful to stratify readmission metrics.




## Instructions

The Readmissions data mart consists of two tables: `readmission_summary` and `encounter_augmented`.

The `encounter_augmented` table is at the encounter grain (i.e. each row represents a unique acute inpatient encounter from the `core.encounter` table). Use this table to look at all acute inpatient encounters and see the data elements associated with each encounter that are relevant for doing readmission analytics. The table also has data quality flags that indicate if each encounter (i.e. each row in this table) qualifies to be used for readmission analytics as well as the different data quality problems for which the encounter might be excluded from being used in readmission analytics.

The `readmission_summary` table is also at the encounter grain, but we exclude encounters having data quality problems preventing them from being used in readmission analytics. So this table has a subset of the encounters in the `encounter_augmented` table. For every encounter in this table (i.e. for every row in this table), we have columns representing data elements associated with the encounter as well as data elements associated with a potential readmission encounter. This is the table that is used to calculate readmission rate.


## Data Dictionary

### readmission_summary

Each record in this table represents a unique acute inpatient admission.  Acute inpatient encounters are excluded from this table if they don't meet certain data quality requirements.  This table is the primary table that should be used for analyzing readmissions.

**Primary Key:**
  * encounter_id

**Foreign Keys:**
- encounter_id (join to core.encounter)
- patient_id (join to core.patient)


<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.readmissions__readmission_summary.columns"  />



### encounter_augmented


Each record in this table represents a unique acute inpatient admission.  However, the main difference between this table and `readmission_summary` is that this table contains _every_ acute inpatient encounter found in `core.encounter` whereas `readmission_summary` filters out acute inpatient encounters that have data quality problems which prevent them from being included in readmission analytics.  A table detailing all encounters with extra information related to the encounter, and flags for information that might affect the readmission calculations.

This table includes columns for data quality tests related to readmissions, so you can see why admissions that are not in `readmission_summary` were excluded.

**Primary Key:**
  * encounter_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.readmissions__encounter_augmented.columns"  />


## Analytics



<details>
  <summary>Overall Readmission Rate</summary>
```sql
-- The numerator is the number of encounters that are index admissions 
-- (i.e. that are eligible to have a readmission count against them)
-- and DID have an unplanned 30-day readmission:
select 
(select count(*)
from medicare_lds_five_percent.readmissions.readmission_summary
where index_admission_flag = 1 and unplanned_readmit_30_flag = 1) * 100
/
-- The denominator is the number of encounters that are index admissions 
-- (i.e. that are eligible to have a readmission count against them):
(select count(*)
from readmissions.readmission_summary
where index_admission_flag = 1) as overall_readmission_rate
```
</details>




<details>
  <summary>30-day Readmission Rate by Month</summary>

```sql
with readmit as 
(
select
to_char(discharge_date, 'YYYYMM') as year_month
, sum(case when index_admission_flag = 1 then 1 else 0 end) as index_admissions
, sum(case when index_admission_flag = 1 and unplanned_readmit_30_flag = 1 then 1 else 0 end) as readmissions
from readmissions.readmission_summary
group by to_char(discharge_date, 'YYYYMM')
)

select 
year_month
,index_admissions
,readmissions
,case when index_admissions = 0 then 0 else readmissions / index_admissions end as readmission_rate
from readmit
order by year_month
```
</details>

<details>
  <summary>30-day Readmission Rate by MS-DRG</summary>

```sql
with readmit as 
(
select
rs.ms_drg_code
,drg.ms_drg_description
, sum(case when index_admission_flag = 1 then 1 else 0 end) as index_admissions
, sum(case when index_admission_flag = 1 and unplanned_readmit_30_flag = 1 then 1 else 0 end) as readmissions
from readmissions.readmission_summary rs
left join terminology.ms_drg drg on rs.ms_drg_code = drg.ms_drg_code
group by 
rs.ms_drg_code
,drg.ms_drg_description
)

select 
ms_drg_code
,ms_drg_description
,index_admissions
,readmissions
,case when readmissions = 0 then 0 else readmissions / index_admissions end as readmission_rate
from readmit
order by index_admissions desc
```
</details>



<details>
  <summary>Disqualified Encounters</summary>

Let's find how many encounters were disqualified.

```sql
select count(*) encounter_count
from readmissions.encounter_augmented
where disqualified_encounter_flag = 1
```
</details>

<details>
  <summary>Disqualification Reason</summary>
  
We can see the reason(s) why an encounter was disqualified by unpivoting the disqualification reason column.

```sql

with disqualified_unpivot as (
    select encounter_id
    , disqualified_reason
    , flagvalue
    from readmissions.encounter_augmented
    unpivot(
        flagvalue for disqualified_reason in (
            invalid_discharge_disposition_code_flag
            , invalid_ms_drg_flag
            , invalid_primary_diagnosis_code_flag
            , missing_admit_date_flag
            , missing_discharge_date_flag
            , admit_after_discharge_flag
            , missing_discharge_disposition_code_flag
            , missing_ms_drg_flag
            , missing_primary_diagnosis_flag
            , no_diagnosis_ccs_flag
            , overlaps_with_another_encounter_flag
        )
    ) as unpvt
)


select encounter_id
, disqualified_reason
, row_number () over (partition by encounter_id order by disqualified_reason) as disqualification_number
from disqualified_unpivot
where flagvalue = 1
```
</details>

