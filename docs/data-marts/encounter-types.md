---
id: encounter-types
title: "Encounters"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Overview

[Code on Github](https://github.com/tuva-health/tuva/tree/main/models/claims_preprocessing/encounters)

The Tuva Project organizes claims into encounters, assigning each claim and claim line to exactly one encounter. An encounter represents the interaction between a patient and a healthcare provider. For inpatient encounters, this encompasses the entire duration of an inpatient stay, which spans multiple days. The Tuva Project consolidates all claims billed intermittently throughout a patient's stay into a single encounter, regardless of the number of claims involved. In most outpatient and office-based settings, an encounter typically spans one day and groups together all claims that occurred on that day within that specific setting.

Encounters are summarized into encounter groups for organizational purposes. Here is a quick overview of the available encounter types and groups. 

| ENCOUNTER_GROUP | ENCOUNTER_TYPE                      |
|-----------------|-------------------------------------|
| inpatient       | acute inpatient                     |
| inpatient       | inpatient hospice                   |
| inpatient       | inpatient psych                     |
| inpatient       | inpatient skilled nursing           |
| inpatient       | inpatient substance use             |
| outpatient      | ambulatory surgery center           |
| outpatient      | dialysis                            |
| outpatient      | emergency department                |
| outpatient      | home health                         |
| outpatient      | outpatient hospital or clinic       |
| outpatient      | outpatient hospice                  |
| outpatient      | outpatient injections               |
| outpatient      | outpatient psych                    |
| outpatient      | outpatient pt/ot/st                 |
| outpatient      | outpatient radiology                |
| outpatient      | outpatient rehab                    |
| outpatient      | outpatient surgery                  |
| outpatient      | urgent care                         |
| office based    | office visit                        |
| office based    | office visit injections             |
| office based    | office visit pt/ot/st               |
| office based    | office visit radiology              |
| office based    | office visit surgery                |
| office based    | office visit - other                |
| office based    | telehealth                          |
| other           | ambulance - orphaned                |
| other           | dme - orphaned                      |
| other           | lab - orphaned                      |
| other           | orphaned claim                      |


The core.encounter table has flags associated with each encounter making it easy to find specific claims or claim lines that occurred during that encounter. Some flags apply only to specific encounter types, like delivery (acute inpatient). The available flags are:

- observation
- lab 
- dme
- ambulance
- pharmacy
- emergency department (for example an acute inpatient encounter where the patient came in through the ED)
- delivery 
- delivery_type (cesarean or vaginal)
- newborn
- nicu

To count the number of inpatient encounters where the patient was in observation status during the stay, you can sum the flag and count the encounter ids.

```sql
select sum(observation_flag) as encounters_with_observation
,count(encounter_id) as total_encounters
from core.encounter
where encounter_type = 'acute inpatient'
```

### Inpatient

Inpatient encounters are created when an institutional claim with the service category corresponding to one of the inpatient encounter types occurs. The Date/NPI continuity algorithm checks if a claim overlaps with another claim, with the same facility NPI, patient_id, and data_source. It also adds a specific check in the case where the end date and start date of two claims are within a day, checking if the discharge disposition code is 30 (still patient). This logic is in place to avoid grouping together claims where a patient is discharged and readmitted on the same day.


| ENCOUNTER_GROUP | ENCOUNTER_TYPE                      | Anchor Claim Type | Algorithm Type    |
|-----------------|-------------------------------------|-------------------|-------------------|
| inpatient       | acute inpatient                     |institutional only |date/npi continuity|
| inpatient       | inpatient hospice                   |institutional only |date/npi continuity|
| inpatient       | inpatient psych                     |institutional only |date/npi continuity|
| inpatient       | inpatient skilled nursing           |institutional only |date/npi continuity|
| inpatient       | inpatient substance use             |institutional only |date/npi continuity|

### Outpatient

Most outpatient encounters are formed with the combination of a patient_id, data_source, and date. The date of an encounter is determined using the following priority of date fields

- **start_date** -> admission_date / claim_line_start_date / claim_start_date
- **end_date** -> discharge_date / claim_line_end_date / claim_end_date

Most use the patient/date combination to form an encounter, with the exception being radiology. The reason for this is so that radiology contains only the claim lines associated with a specific imaging code. This will group together the institutional claim for the imaging event, and the professional claim with the read. This can then be used for rate analysis and compared to other sites of service (including professional locations).



| ENCOUNTER_GROUP | ENCOUNTER_TYPE                      | Anchor Claim Type | Algorithm Type    | Service Category Anchor     |
|-----------------|-------------------------------------|-------------------|-------------------|-----------------------------|
| outpatient      | ambulatory surgery center           | both prof and inst| date continuity   | ambulatory surgery center   |
| outpatient      | dialysis                            | both prof and inst| patient/date      | dialysis                    |
| outpatient      | emergency department                | both prof and inst| date/npi continuity| emergency department       |
| outpatient      | home health                         | both prof and inst| patient/date      | home health                 |
| outpatient      | outpatient hospital or clinic       | both prof and inst| patient/date      | outpatient hospital or clinic|
| outpatient      | outpatient hospice                  | both prof and inst| patient/date      | outpatient hospice          |
| outpatient      | outpatient injections               | both prof and inst| patient/date      | hcpc codes beginning with J |
| outpatient      | outpatient psych                    | both prof and inst| patient/date      | outpatient psychiatric      |
| outpatient      | outpatient pt/ot/st                 | both prof and inst| patient/date      | outpatient pt/ot/st         |
| outpatient      | outpatient radiology                | both prof and inst| patient/date/hcpc | outpatient radiology        |
| outpatient      | outpatient rehab                    | both prof and inst| patient/date      | outpatient rehabilitation   |
| outpatient      | outpatient surgery                  | both prof and inst| patient/date      | outpatient surgery          |
| outpatient      | urgent care                         | both prof and inst| patient/date      | urgent care                 |


### Office-Based

Office-based encounters use only professional claims as the anchor. Most use the patient/date combination to form an encounter, with the exception being radiology. The reason for this is so that radiology contains only the claim lines associated with a specific imaging code, which can then be used for rate analysis and compared to other sites of service.

| ENCOUNTER_GROUP | ENCOUNTER_TYPE                      | Anchor Claim Type | Algorithm Type    |Service Category Anchor  |
|-----------------|-------------------------------------|-------------------|-------------------|-------------------------|
| office based    | office visit                        |professional only  |patient/date       |office-based visit
| office based    | office visit injections             |professional only  |patient/date       |hcpc codes beginning with J
| office based    | office visit pt/ot/st               |professional only  |patient/date       |office-based pt/ot/st
| office based    | office visit radiology              |professional only  |patient/date/hcpc  |office-based radiology
| office based    | office visit surgery                |professional only  |patient/date       |office-based surgery
| office based    | office visit - other                |professional only  |patient/date       |remaining office-based claims
| office based    | telehealth                          |professional only  |patient/date       |telehealth visit

### Other

Ambulance, DME (durable medical equipment), and lab are typically part of a higher level encounter (such as inpatient or emergency department). If an ambulance claim occured outside the dates of the inpatient encounter it isn't joined and doesn't become associated with the encounter. In this case, an encounter is created for the orphaned ambulance claim. 

Other orphaned claims are claims that don't produce an anchor event on their own, and weren't attributed to one that does. This bucket is usually small, and if it is large is an indication of a data quality issue.

| ENCOUNTER_GROUP | ENCOUNTER_TYPE                      | Anchor Claim Type | Algorithm Type    |
|-----------------|-------------------------------------|-------------------|-------------------|
| other           | ambulance - orphaned                |both prof and inst |patient/date       |
| other           | dme - orphaned                      |patient/date       |patient/date       |
| other           | lab - orphaned                      |patient/date       |patient/date       |
| other           | orphaned claim                      |both prof and inst |no grouping        |


## Data Dictionary

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.core__encounter.columns"  />

## Example SQL

Since the core.encounter table is at the encounter grain already, calculating paid per encounter is straightforward.

<details>
  <summary>Encounter Summary</summary>

```sql
select
    encounter_group
  , encounter_type
  , sum(paid_amount) as paid_amount
  , count(*) as encounter_count
  , sum(paid_amount) / count(*) as paid_per_encounter
from core.encounter
group by
    encounter_group
  , encounter_type
order by encounter_count desc

```
</details>

We can use the delivery type and delivery flag to analyze labor and deliveries.
<details>
  <summary>Labor and Delivery</summary>


```sql
select 
    delivery_type
  , sum(paid_amount) as paid_amount
  , count(*) as encounter_count
  , sum(paid_amount) / count(*) as paid_per_encounter
from core.encounter
where delivery_flag = 1
group by 
    delivery_type
```
</details>

We will typically see observation on both inpatient and outpatient encounters. 

<details>
  <summary>Observation</summary>

```sql
select   
    encounter_type
  , sum(observation_flag)/count(*) percent_with_obs
  , sum(observation_flag) total_obs_encounters
  , count(*) as total_encounters
from core.encounter
where observation_flag is not null
group by 
    encounter_type
order by 
    total_encounters desc
```
</details>

Similarly, we can view the encounter flags across all encounters.

<details>
  <summary>Encounter Flags</summary>

```sql
select   
    encounter_type
  , sum(observation_flag)/count(*) percent_with_obs
  , sum(lab_flag)/count(*) percent_with_lab
  , sum(dme_flag)/count(*) percent_with_dme
  , sum(ambulance_flag)/count(*) percent_with_ambulance
  , sum(pharmacy_flag)/count(*) percent_with_pharmacy
  , sum(ed_flag)/count(*) percent_with_ed
  , count(*) as total_encounters
from core.encounter
group by 
    encounter_type
order by total_encounters desc
```
</details>

Since encounters merge together claims that were intermittantly billed during a long stay, we can accurately calculate the length of stay for encounter types where it is applicable.


<details>
  <summary>Length of Stay</summary>

```sql
select   
    encounter_type
  , avg(length_of_stay) as avg_los
  , count(*) as encounter_count
from core.encounter
where length_of_stay is not null
group by 
    encounter_type
order by 
    encounter_count desc
```
</details>





