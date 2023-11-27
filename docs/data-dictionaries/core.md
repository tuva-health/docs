---
id: core
title: "Core Data Model"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## condition

A condition is any sort of symptom, problem, complaint, admitting diagnosis, or billing diagnosis as reported by the patient, a clinician, or as otherwise generated (e.g. by the billing process).  Key ancillary data related to condition includes the date it was reported, it's rank (i.e. primary or secondary), and whether or not it was present during admission for an acute inpatient encounter.

Conditions can only be generated during encounters (i.e. every condition must have an encounter_id).  

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__condition.columns" />

## eligibility

The eligibility table includes information about a patient's health insurance coverage and demographics (note: we use the word patient as a synonym for member).  Every claims dataset should include some sort of eligibility data, otherwise it's impossible to calculate member months, which are needed to calculate measures like PMPM.

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__eligibility.columns" />

## encounter

The encounter table is intended to store information that represents a unique patient interaction with the healthcare system.  It's intended to be synonymous with a healthcare visit (e.g. hospital admission, office visit, etc.).  All healthcare analytics use cases involving utilization require an encounter concept.  Not only is it important to know about each unique encounter a patient has with the healthcare system, but it's also important to know the type of visit (e.g. acute inpatient, ED, office visit, inpatient rehab, etc.), the start and end dates for the visit, the total amount paid for the visit, and other pieces of information about the visit.  The encounter table stores all of this important information in a single table.

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__encounter.columns" />

## lab_result

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__lab_result.columns" />

## location

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__location.columns" />

## medical_claim

The medical_claim table contains information on healthcare services and supplies provided to patients, billed by providers, and paid for by health insurers.  It includes information on the provider who rendered the service, the amount paid for the service by the health insurer, and the underlying reason for the service (i.e. diagnosis).  

The medical_claim table in core has been enhanced with concepts like service category and encounter that are useful for analytics.

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__medical_claim.columns" />

## medication

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__medication.columns" />

## observation

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__observation.columns" />

## patient

The patient table describes the attributes of a patient that are unchanging over time (e.g. biological sex, birth date, etc.).  The vast majority of healthcare analytics use cases involve analyzing things that happen to patients, so it's critical to have a clean patient table that contains this information.

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__patient.columns" />

## pharmacy_claim

The pharmacy_claim table includes information about retail and specialty drug prescriptions that have been filled by a patient, billed by a pharmacy, and paid by an insurer.  The pharmacy_claim table is at the claim-line grain.

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__pharmacy_claim.columns" />

## practitioner

The practitioner table includes information about individual practitioners (e.g. physicians) and organizations.  

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__practitioner.columns" />

## procedure

Procedures are treatments performed by clinicians for patients to help manage or alleviate conditions.  Important ancillary data related to procedures includes the date performed and the performing clinician.  Common procedure codes include ICD-10-PCS and HCPCS.

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__procedure.columns" />