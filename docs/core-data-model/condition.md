---
id: condition
title: "Condition"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

A condition is any sort of symptom, problem, complaint, admitting diagnosis, or billing diagnosis as reported by the patient, a clinician, or as otherwise 
generated (e.g. by the billing process).  Key ancillary data related to condition includes the date it was reported, it's rank (i.e. primary or 
secondary), and whether or not it was present during admission for an acute inpatient encounter.

Conditions can only be generated during encounters (i.e. every condition must have an encounter_id).  

The core.condition table can be populated from claims or clinical data. 

## Methods

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVILLRYXQ=/?embedMode=view_only_without_ui&moveToViewport=-1342,-2124,11213,11213&embedId=35682346313" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## Data Dictionary

**Primary Keys:**
  * condition_id

**Foreign Keys:**
  * person_id
  * member_id
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__condition.columns" />



