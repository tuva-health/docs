---
id: hcc-suspecting
title: "HCC Suspecting"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Overview

[Code](https://github.com/tuva-health/tuva/tree/main/models/hcc_suspecting)

The HCC Suspecting data mart identifies patients who are suspected to have an 
HCC in the payment year but don't presently have one recorded based concepts 
that evaluate historical conditions and problems, comorbidities, lab test 
results, medications, and observations.

The 2024 CMS HCC model has 115 HCCs. Each condition category requires logic to 
identify suspecting conditions. So far, we have built out the logic for the following 
conditions:

* Chronic Kidney Disease
  * 326, "Chronic Kidney Disease, Stage 5"
  * 327, "Chronic Kidney Disease, Severe (Stage 4)"
  * 328, "Chronic Kidney Disease, Moderate (Stage 3B)"
  * 329, "Chronic Kidney Disease, Moderate (Stage 3, Except 3B)"
* Depression
  * 155, "Major Depression, Moderate or Severe, without Psychosis"
* Diabetes
  * 37, "Diabetes with Chronic Complications"
* Morbid Obesity
  * 48, "Morbid Obesity"

The terminology set SNOMED-CT to ICD-10-CM Map is used to capture additional 
suspecting conditions coded in a system not part of the CMS HCC model. 
This use case follows the default mapping guidance from NLM, which specifies 
that the map priority rule of “TRUE” or “OTHERWISE TRUE” should be applied if 
nothing further is known about the patient’s condition.

## Instructions

### Data Requirements

This data mart uses the following tables from the Tuva Core Data Model:
- condition
- lab_result
- medication
- observation
- patient
- pharmacy_claim

Check out the [DAG](https://tuva-health.github.io/tuva/#!/model/model.the_tuva_project.hcc_suspecting__stg_core__condition)
to see the list of fields used from each core table.

*Note: The Tuva Project will generate these Core tables. You just need to map 
your data to the [input layer](../connectors/input-layer) and run the project.*

### dbt Examples

```bash
# Runs all marts
dbt build

# Runs only the HCC Suspecting mart
dbt build --select tag:hcc_suspecting
```

## Data Dictionary

## list

This final model displays the list of suspecting conditions per patient with 
the reason and contributing factors.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_suspecting__list.columns" />

## list_rollup

This final model displays the list of suspecting conditions per patient and 
hcc with the latest contributing factor rolled up.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_suspecting__list_rollup.columns" />

## summary

This final model displays a rollup of suspecting conditions per patient.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_suspecting__summary.columns" />

## Analytics

<details>
  <summary>Total Suspected HCCs</summary>

```sql
select
      hcc_code
    , hcc_description
    , count(*) as gap_count
from hcc_suspecting.list
group by
      hcc_code
    , hcc_description
order by
      hcc_code
    , hcc_description;
```
</details>

<details>
  <summary>Total Suspected HCCs by Reason Category</summary>

```sql
select
      reason
    , count(*) as gap_count
from hcc_suspecting.list
group by reason
order by reason;
```
</details>

<details>
  <summary>Actionable Patient List</summary>

```sql
select
      patient_id
    , patient_birth_date
    , patient_age
    , patient_sex
    , suspecting_gaps
from hcc_suspecting.summary
order by suspecting_gaps desc;
```
</details>
