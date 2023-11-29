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

**Primary Keys:**
  * patient_id
  * member_id
  * enrollment_start_date
  * enrollment_end_date

<JsonDataTable jsonPath="nodes.model\.input_layer\.eligibility.columns" />

### medical_claim

The medical_claim table contains information on healthcare services and 
supplies provided to patients, billed by providers, and paid for by health 
insurers. It includes information on the provider who rendered the 
service, the amount paid for the service by the health insurer, and the 
underlying reason for the service (i.e. diagnosis).

**Primary Keys:**
  * claim_id
  * claim_line_number

**Foreign Keys:**
  * patient_id
  * member_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.medical_claim.columns" />

### pharmacy_claim

The pharmacy_claim table includes information about retail and specialty 
drug prescriptions that have been filled by a patient, billed by a 
pharmacy, and paid by an insurer.

**Primary Keys:**
  * claim_id
  * claim_line_number

**Foreign Keys:**
  * patient_id
  * member_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.pharmacy_claim.columns" />

## Clinical Input

### condition

The condition table contains information related to medical conditions 
patients have, including problems and billable diagnosis codes.

**Primary Keys:**
  * condition_id

**Foreign Keys:**
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.condition.columns" />

### encounter

The encounter table contains information about patients visits (i.e. 
encounters).  This includes office visits from clinical sources.

**Primary Keys:**
  * encounter_id

**Foreign Keys:**
  * patient_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.encounter.columns" />

### lab_result

The lab result table contains information about lab test results, 
including the LOINC code and description, units, reference range, and 
result.

**Primary Keys:**
  * lab_result_id

**Foreign Keys:**
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.lab_result.columns" />

### location

The location table contains information on practice and facility locations 
where patients receive medical care.

**Primary Keys:**
  * location_id

**Foreign Keys:**
  * patient_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.location.columns" />

### medication

The medication table contains information on medications ordered and/or 
administered during a patient encounter.

**Primary Keys:**
  * medication_id

**Foreign Keys:**
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.medication.columns" />

### observation

The observation table contains information on measurements other than lab 
tests e.g. blood pressure, height, and weight.

**Primary Keys:**
  * observation_id

**Foreign Keys:**
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.observation.columns" />

### patient

The patient table contains demographic and geographic information on 
patients.

**Primary Keys:**
  * patient_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.patient.columns" />

### practitioner

The practitioner table contains information on the providers in the 
dataset e.g. physicians, physicians assistants, etc.

**Primary Keys:**
  * practitioner_id

**Foreign Keys:**
  * practice_affiliation

<JsonDataTable jsonPath="nodes.model\.input_layer\.practitioner.columns" />

### procedure

The procedure table contains information on procedures that were performed 
on patients in the dataset.

**Primary Keys:**
  * procedure_id

**Foreign Keys:**
  * patient_id
  * encounter_id
  * practitioner_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.procedure.columns" />
