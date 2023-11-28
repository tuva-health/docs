---
id: input-layer
title: "Input Layer"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The Tuva Input Layer is where raw data sources are transformed and mapped to 
the initial ingestion format before the Tuva Project can be run on healthcare 
data.

## Claims Input

### eligibility

The eligibility table includes information about a patient's health 
insurance coverage and demographics (note: we use the word patient as a 
synonym for member). Every claims dataset should include some sort of 
eligibility data, otherwise it's impossible to calculate member months, 
which are needed to calculate measures like PMPM.

<details>
<summary>eligibility fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.eligibility.columns" />

</details>

### medical_claim

The medical_claim table contains information on healthcare services and 
supplies provided to patients, billed by providers, and paid for by health 
insurers. It includes information on the provider who rendered the 
service, the amount paid for the service by the health insurer, and the 
underlying reason for the service (i.e. diagnosis).

<details>
<summary>medical_claim fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.medical_claim.columns" />

</details>

### pharmacy_claim

The pharmacy_claim table includes information about retail and specialty 
drug prescriptions that have been filled by a patient, billed by a 
pharmacy, and paid by an insurer.

<details>
<summary>pharmacy_claim fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.pharmacy_claim.columns" />

</details>

## Clinical Input

### condition

The condition table contains information related to medical conditions 
patients have, including problems and billable diagnosis codes.

<details>
<summary>condition fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.condition.columns" />

</details>

### encounter

The encounter table contains information about patients visits (i.e. 
encounters).  This includes office visits from clinical sources.

<details>
<summary>encounter fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.encounter.columns" />

</details>

### lab_result

The lab result table contains information about lab test results, 
including the LOINC code and description, units, reference range, and 
result.

<details>
<summary>lab_result fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.lab_result.columns" />

</details>

### location

The location table contains information on practice and facility locations 
where patients receive medical care.

<details>
<summary>location fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.location.columns" />

</details>

### medication

The medication table contains information on medications ordered and/or 
administered during a patient encounter.

<details>
<summary>medication fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.medication.columns" />

</details>

### observation

The observation table contains information on measurements other than lab 
tests e.g. blood pressure, height, and weight.

<details>
<summary>observation fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.observation.columns" />

</details>

### patient

The patient table contains demographic and geographic information on 
patients.

<details>
<summary>patient fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.patient.columns" />

</details>

### practitioner

The practitioner table contains information on the providers in the 
dataset e.g. physicians, physicians assistants, etc.

<details>
<summary>practitioner fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.practitioner.columns" />

</details>

### procedure

The procedure table contains information on procedures that were performed 
on patients in the dataset.

<details>
<summary>procedure fields</summary>

<JsonDataTable jsonPath="nodes.model\.input_layer\.procedure.columns" />

</details>