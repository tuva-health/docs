---
id: input-layer
title: "Input Layer"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The `Input Layer` is like the API for the Tuva data model.  Once raw data sources (e.g. claims and medical records) are mapped to the `Input Layer` code automatically transforms that data into the Tuva data model (i.e. core data model and all the data marts).  

The `Input Layer` is designed to accomodate both claims and clinical data sources.

## Claims Input

### eligibility

The eligibility table includes information about a patient's health insurance coverage and demographics (note: we use the word patient as a synonym for member). Every claims dataset should include some sort of eligibility data, otherwise it's impossible to calculate member months, which are needed to calculate measures like PMPM.  Each record in the table is intended to represent a unique eligibility (i.e. enrollment) span for a patient with a specific health plan.

**Primary Key:**
   * person_id
   * member_id
   * enrollment_start_date
   * enrollment_end_date
   * payer
   * plan
   * data_source

<JsonDataTable jsonPath="nodes.model\.input_layer\.eligibility.columns" />

### medical_claim

The medical_claim table contains information on healthcare services and supplies provided to patients, billed by providers, and paid for by health insurers. It includes information on the provider who rendered the service, the amount paid for the service by the health insurer, and the underlying reason for the service (i.e. diagnosis).  Each record in the table is intended to represent a unique claim line.

**Primary Key:**
  * claim_id
  * claim_line_number

**Foreign Keys:**
  * person_id
  * member_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.medical_claim.columns" />

### pharmacy_claim

The pharmacy_claim table includes information about retail and specialty drug prescriptions that have been filled by a patient, billed by a pharmacy, and paid by an insurer.  Each record in the table is intended to represent a unique claim line.

**Primary Key:**
  * claim_id
  * claim_line_number

**Foreign Keys:**
  * person_id
  * member_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.pharmacy_claim.columns" />

### person_id
A new patient identifier field named `person_id` has been added to the Tuva data model for both claims and clinical sources. This is a required field and cannot be null. If you bought the Tuva MPI Engine or have your own patient matching solution, this field should be populated with the UUID (Universally Unique Identifier). If you do not have a UUID, we recommend mapping the source patient identifier to this field (`member_id` for claims, patient_id for `clincal`).


## Clinical Input

### condition

The condition table contains information related to medical conditions patients have, including problems and billable diagnosis codes.  Each record in the table is intended to document the occurrence of a unique condition for a specific patient at a specific point in time.

**Primary Key:**
  * condition_id

**Foreign Keys:**
  * patient_id
  * person_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.condition.columns" />

### encounter

The encounter table contains information about patients visits (i.e. encounters).  This includes office visits from clinical sources.  Each record in the encounter table is intended to represent a unique patient visit with a healthcare provider of a unique type (e.g. acute inpatient).

**Primary Key:**
  * encounter_id

**Foreign Keys:**
  * patient_id
  * person_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.encounter.columns" />

### lab_result

The lab result table contains information about lab test results, including the LOINC code and description, units, reference range, and result.  Each record in the table is intended to represent a unique lab result.

**Primary Key:**
  * lab_result_id

**Foreign Keys:**
  * patient_id
  * person_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.lab_result.columns" />

### location

The location table contains information on practice and facility locations where patients receive medical care.  Each record in the table is intended to represent a unique location.

**Primary Keys:**
  * location_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.location.columns" />

### medication

The medication table contains information on medications ordered and/or administered during a patient encounter.  Each record in the table is intended to represent a unique order or administration of a medication to a patient.

**Primary Key:**
  * medication_id

**Foreign Keys:**
  * patient_id
  * person_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.medication.columns" />

### observation

The observation table contains information on measurements other than lab tests e.g. blood pressure, height, and weight.  Each record in the table is intended to represent a unique observation.

**Primary Keys:**
  * observation_id

**Foreign Keys:**
  * patient_id
  * person_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.observation.columns" />

### patient

The patient table contains demographic and geographic information on patients.  Each record in the table is intended to represent a unique patient.

**Primary Key:**
  * patient_id
  * person_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.patient.columns" />

### practitioner

The practitioner table contains information on the providers in the dataset (e.g. physicians, physicians assistants, etc.).  Each record in the table is intended to represent a unique provider.

**Primary Key:**
  * practitioner_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.practitioner.columns" />

### procedure

The procedure table contains information on procedures that were performed on patients in the dataset.  Each record in the table is intended to represent a unique procedure performed on a unique patient by a unique provider at a unique time.

**Primary Key:**
  * procedure_id

**Foreign Keys:**
  * patient_id
  * person_id
  * encounter_id
  * practitioner_id

<JsonDataTable jsonPath="nodes.model\.input_layer\.procedure.columns" />

### person_id
A new patient identifier field named `person_id` has been added to the Tuva data model for both claims and clinical sources. This is a required field and cannot be null. If you bought the Tuva MPI Engine or have your own patient matching solution, this field should be populated with the UUID (Universally Unique Identifier). If you do not have a UUID, we recommend mapping the source patient identifier to this field (`member_id` for claims, patient_id for `clincal`).
