---
id: condition
title: "Condition"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

A condition is any sort of symptom, problem, complaint, admitting diagnosis, or 
billing diagnosis as reported by the patient, a clinician, or as otherwise 
generated (e.g. by the billing process).  Key ancillary data related to 
condition includes the date it was reported, it's rank (i.e. primary or 
secondary), and whether or not it was present during admission for an acute 
inpatient encounter.

Conditions can only be generated during encounters (i.e. every condition must 
have an encounter_id).  

The core.condition table can be populated from claims or clinical data. 

### Populating core.condition from claims data
The core.condition table contains all diagnosis codes present in a claims dataset. These diagnosis codes come from the fields diagnosis_code_1, diagnosis_code_2, …, diagnosis_code_25 present in the claims input layer table input_layer.medical_claim. So the core.condition table simply has one row for each of those diagnosis codes. The logic used for populating those conditions into the core.condition table is the following:

1. To every claim_id in input_layer.medical_claim we assign a date that is associated with the diagnosis codes on that claim. These dates will be the recorded_date for all of these conditions when they populate the core.condition table. We assign these dates to each claim_id as follows:

```sql
select
  claim_id,
  coalesce( min(admission_date),
            min(claim_start_date),
            min(discharge_date),
            min(claim_end_date)
          ) as recorded_date
from input_layer.medical_claim
group by claim_id
```
2. To every claim_id in input_layer.medical_claim we assign 25 conditions as follows:

```sql
select
  claim_id,
  max(diagnosis_code_1) as diagnosis_code_1,
  max(diagnosis_code_2) as diagnosis_code_2,  
  max(diagnosis_code_3) as diagnosis_code_3, 
  max(diagnosis_code_4) as diagnosis_code_4,  
  max(diagnosis_code_5) as diagnosis_code_5, 
  max(diagnosis_code_6) as diagnosis_code_6,   
  max(diagnosis_code_7) as diagnosis_code_7, 
  max(diagnosis_code_8) as diagnosis_code_8,   
  max(diagnosis_code_9) as diagnosis_code_9, 
  max(diagnosis_code_10) as diagnosis_code_10,   
  max(diagnosis_code_11) as diagnosis_code_11, 
  max(diagnosis_code_12) as diagnosis_code_12,   
  max(diagnosis_code_13) as diagnosis_code_13, 
  max(diagnosis_code_14) as diagnosis_code_14,  
  max(diagnosis_code_15) as diagnosis_code_15, 
  max(diagnosis_code_16) as diagnosis_code_16,   
  max(diagnosis_code_17) as diagnosis_code_17, 
  max(diagnosis_code_18) as diagnosis_code_18,  
  max(diagnosis_code_19) as diagnosis_code_19, 
  max(diagnosis_code_20) as diagnosis_code_20,   
  max(diagnosis_code_21) as diagnosis_code_21, 
  max(diagnosis_code_22) as diagnosis_code_22,  
  max(diagnosis_code_23) as diagnosis_code_23, 
  max(diagnosis_code_24) as diagnosis_code_24, 
  max(diagnosis_code_25) as diagnosis_code_25
from tuva_synthetic.input_layer.medical_claim
group by claim_id
```

Note that we the fields `diagnosis_code_1`, `diagnosis_code_2`, … `diagnosis_code_25` in `input_layer.medical_claim` are header level fields that should have the same value for all lines on a claim, but there could be data quality problems in the input layer, so by taking the max value of each diagnosis code for each `claim_id` (as in the query above) we ensure that each claim_id gets exactly 25 diagnosis codes and not more. Some of these diagnosis codes might be `null`, in which case they do not populate the `core.condition table`, but for any non-null value of `diagnosis_code_1` through `diagnosis_code_25` there will be a row in `core.condition` representing that condition. 

Keep in mind:

- The number of rows in `core.condition` populated from a claims dataset is at most 25 times the number of distinct `claim_id`s in input_layer.medical_claim. There will be at most 25 distinct diagnosis codes per claim. There could be less because any diagnosis codes that are null in the input layer do not populate `core.condition`.
- If for a given claim_id two distinct diagnosis codes are the same (for example, `diagnosis_code_1` = `diagnosis_code_2` = R93.1, there will be distinct rows for each of those in `core.condition`, each row having a distinct value of `condition_rank`.
- All diagnosis codes coming from claims are either ICD-9-CM or ICD-10-CM because the only allowed values for the field `diagnosis_code_type` in `input_layer.medical_claim` are `icd-9-cm` or `icd-10-cm`.
- If a diagnosis code in the claims input layer has an invalid value (i.e. a value that is not a real ICD-9-CM or ICD-10-CM code, for example `diagnosis_code_1` = ‘XXXXX’), a row will still be created in `core.condition` for that diagnosis code. That row in `core.condition` will have a populated value for `source_code` (namely, the invalid diagnosis code, for example source_code = ‘XXXXX’) but it will have a null value for `normalized_code`.

### Populating core.condition from clinical data



**Primary Keys:**
  * condition_id

**Foreign Keys:**
  * person_id
  * member_id
  * patient_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__condition.columns" />



