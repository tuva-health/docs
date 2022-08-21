---
sidebar_position: 1
---

# Readmission Analytics

Doing proper readmission analytics or building a readmission machine learning model is a complex task.  But with the Tuva Project the key data elements you need are all available in a few tables.

## Querying the Readmission DAG

The Tuva Project readmission mart creates several tables/views in your data warehouse.  Many of these tables are intermediate tables, i.e. tables that are part of the data transformation pipeline but aren't designed to query for analysis.  The tables that are designed to query for analytics are called output tables and there are 3 main output tables:
- encounter_augmented: lists all acute inpatient encounters with fields that give extra information about the encounter (e.g. length_of_stay, index_admission_flag, planned_flag, specialty_cohort, etc.), as well as data quality flags.
- readmission_summary: lists all encounters that are not discarded due to data quality problems, together with fields giving extra information about the encounter and it's associated readmission (if the encounter had a readmission).
- encounter_data_quality: lists potential data quality issues with every inpatient encounter in the dataset.  Encounters that are disqualified from being used in the readmissions analysis due to data quality issues have disqualified_encounter_flag = 1.Other columns in this table give a more granular view of which data quality problems are present for a given encounter.

To calculate the 30-day readmission rate you must count how many rows in the readmission_symmary table were index admissions that had an unplanned 30-day readmission and divide that by the number of rows in that table that were index admissions:

```
select 
(select count(*)
 from readmission_summary
 where index_admission_flag = 1 and unplanned_readmit_30_flag = 1)
/
(select count(*)
 from readmission_summary
 where index_admission_flag = 1)
```