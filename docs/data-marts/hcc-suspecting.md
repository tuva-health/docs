---
id: hcc-suspecting
title: "HCC Suspecting"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

[Code](https://github.com/tuva-health/tuva/tree/main/models/hcc_suspecting)

The HCC Suspecting data mart identifies patients who are suspected to have an 
HCC in the payment year but don't presently have one recorded based concepts 
that evaluate historical conditions and problems, comorbidities, lab test 
results, medications, and observations.

The 2024 CMS HCC model has 115 HCCs. Each condition category requires suspecting
logic definitions. So far, we have built out the logic for the following 
conditions:

* Chronic Kidney Disease
  * 326, ”Chronic Kidney Disease, Stage 5”
  * 327, "Chronic Kidney Disease, Severe (Stage 4)"
  * 328, "Chronic Kidney Disease, Moderate (Stage 3B)"
  * 329, "Chronic Kidney Disease, Moderate (Stage 3, Except 3B)"
* Depression
  * 155, "Major Depression, Moderate or Severe, without Psychosis"
* Diabetes
  * 37, "Diabetes with Chronic Complications"
* Morbid Obesity
  * 48, ”Morbid Obesity”

The terminology set SNOMED-CT to ICD-10-CM Map is used to capture additional 
suspecting conditions coded in a system not part of the CMS HCC model. 
This use case follows the default mapping guidance from NLM, which specifies 
that the map priority rule of “TRUE” or “OTHERWISE TRUE” should be applied if 
nothing further is known about the patient’s condition.

## Data Requirements

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

## Running the Data Mart

```bash
# Runs all marts
dbt build

# Runs only the HCC Suspecting mart
dbt build --select tag:hcc_suspecting
```

## Data Mart Structure

**Staging**

The staging tables show what tables and fields are used from the Core data model.

**Intermediate**

The intermediate tables contain the mapping and suspecting logic.

**Final**

The final tables include an actionable list of all patients with suspecting
HCCs and a summary.

- **List:** The list of suspecting conditions per patient, data_source, hcc, 
  and diagnosis code with the reason and contributing factors.
- **List Rollup:** The list of suspecting conditions per patient and hcc with 
  the latest contributing factor rolled up.
- **Summary:** A summary of suspecting conditions per patient.

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

