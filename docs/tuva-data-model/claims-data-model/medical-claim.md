---
id: medical-claim
title: "MEDICAL_CLAIM"
---
## Description
The medical_claim table contains information on healthcare services and supplies provided to patients, billed by providers, and paid for by health insurers.  It includes information on the provider who rendered the service or supply, the amount paid for the service or supply by the health insurer, and the underlying reason for the service (i.e. diagnosis).  

## Mapping Guidelines
The medical_claim table is at the claim-line grain i.e. it has one record per claim-line.  It combines professional claims (i.e. services billed on a CMS-1500 claim form) and institutional claims (i.e. services billed on a UB-04 claim form) into a single table.  

Both professional and institutional claims have header information and line information on them.  Header information (e.g. MS-DRG) occurs a specific number of times (typically once) per claim, whereas line information (e.g. revenue codes) may occur an unlimited number of times per claim.  Some claims data models separate header and line information into distinct tables.  However it's more common for this information to exist in a single table, which is why we chose this approach for the medical_claims table.  

If your medical claims data already exists in a single table, you'll likely find it easy to map to medical_claims.  However if your claims data is separated into multiple tables, for example separate tables for professional and institutional claims, or separate tables for header and line information, you'll need to transform the data into a single table as part of your mapping to medical_claim.

In medical_claim, every header data element that occurs only one time (e.g. bill_type_code on institutional claims) is repeated for every line on that claim.  

## Data Dictionary
| Column | Data Type | Terminology | Description |
| --- | :---: | :---: | --- |
| claim_id | varchar | no | Unique identifier for each claim. |
| claim_line_number | int | no | Indicates the line number for the particular line of the claim. |
| claim_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__claim_type.csv) | Indicates whether the claim is professional (CMS-1500), institutional (UB-04), dental, or vision. |
| patient_id | varchar | no | Unique identifier for each patient in the dataset. |
| member_id | varchar | no | Identifier that links a patient to a particular insurance product or health plan.  A patient can have more than one member_id because they can have more than one insurance product/plan. |
| claim_start_date | date | no | Start date for the claim. |
| claim_end_date | date | no | End date for the claim. |
| claim_line_start_date | date | no | Start date for the claim line. |
| claim_line_end_date | date | no | End date for the claim line. |
| admission_date | date | no | Admission date for the claim (inpatient claims only). |
| discharge_date | date | no | Discharge date for the claim (inpatient claims only). |
| admit_source_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__admit_source.csv) | Indicates where the patient was before the healthcare encounter (inpatient claims only). |
| admit_type_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__admit_type.csv) | Indicates the type of admission (inpatient claims only). |
| discharge_disposition_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__discharge_disposition.csv) | Indicates the type of setting the patient was discharged to (institutional inpatient claims only). |
| place_of_service_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__place_of_service.csv) | Place of service for the claim (professional claims only). |
| bill_type_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__bill_type.csv) | Bill type code for the claim (institutional claims only). |
| ms_drg_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__ms_drg.csv) | MS-DRG for the claim (inpatient claims only). |
| revenue_center_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__revenue_center.csv) | Revenue center code for the claim line (institutional only and typically multiple codes per claim). |
| service_unit_quantity | int | no | The number of units for the particular revenue center code. | 
| hcpcs_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__hcpcs_level_2.csv) | HCPCS level 1 or level 2 code for the claim line. |
| hcpcs_modifier_1 | varchar | yes | 1st modifier for HCPCS code. |
| hcpcs_modifier_2 | varchar | yes | 2nd modifier for HCPCS code. |
| hcpcs_modifier_3 | varchar | yes | 3rd modifier for HCPCS code. |
| hcpcs_modifier_4 | varchar | yes | 4th modifier for HCPCS code. |
| hcpcs_modifier_5 | varchar | yes | 5th modifier for HCPCS code. |
| rendering_npi | varchar | yes | Rendering NPI for the claim (typically represents the physician or entity providing services). |
| billing_npi | varchar | yes | Billing NPI for the claim (typically represents organization billing the claim). |
| facility_npi | varchar | yes | Facility NPI for the claim (typically represents the facility where services were performed). |
| paid_date | date | no | The date the claim was paid. |
| paid_amount | float | no | The total amount paid on the claim by the insurer.|
| allowed_amount | float | no | The total amount allowed (includes amount paid by the insurer and patient) on the claim. |
| charge_amount | float | no | The total amount charged on the claim by the provider. |
| diagnosis_code_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__code_type.csv) | Indicates the type of diagnosis code (e.g. ICD-10-CM). |
| diagnosis_code_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 1st ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 2nd ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 3rd ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 4th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 5th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 6th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 7th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 8th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 9th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 10th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 11th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 12th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 13th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 14th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 15th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 16th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 17th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 18th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 19th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 20th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 21st ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 22nd ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 23rd ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 24th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_code_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) | 25th ICD (9 or 10) CM diagnosis code on the claim. |
| diagnosis_poa_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 1st diagnosis on the claim. |
| diagnosis_poa_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 2nd diagnosis on the claim. |
| diagnosis_poa_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 3rd diagnosis on the claim. |
| diagnosis_poa_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 4th diagnosis on the claim. |
| diagnosis_poa_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 5th diagnosis on the claim. |
| diagnosis_poa_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 6th diagnosis on the claim. |
| diagnosis_poa_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 7th diagnosis on the claim. |
| diagnosis_poa_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 8th diagnosis on the claim. |
| diagnosis_poa_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 9th diagnosis on the claim. |
| diagnosis_poa_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 10th diagnosis on the claim. |
| diagnosis_poa_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 11th diagnosis on the claim. |
| diagnosis_poa_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 12th diagnosis on the claim. |
| diagnosis_poa_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 13th diagnosis on the claim. |
| diagnosis_poa_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 14th diagnosis on the claim. |
| diagnosis_poa_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 15th diagnosis on the claim. |
| diagnosis_poa_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 16th diagnosis on the claim. |
| diagnosis_poa_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 17th diagnosis on the claim. |
| diagnosis_poa_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 18th diagnosis on the claim. |
| diagnosis_poa_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 19th diagnosis on the claim. |
| diagnosis_poa_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 20th diagnosis on the claim. |
| diagnosis_poa_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 21st diagnosis on the claim. |
| diagnosis_poa_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 22nd diagnosis on the claim. |
| diagnosis_poa_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 23rd diagnosis on the claim. |
| diagnosis_poa_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 24th diagnosis on the claim. |
| diagnosis_poa_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv) | Present on admission code for the 25th diagnosis on the claim. |
| procedure_code_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__code_type.csv) | Indicates the type of procedure code (e.g. ICD-10-PCS). |
| procedure_code_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 1st ICD (9 or 10) procedure code on the claim. |
| procedure_code_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 2nd ICD (9 or 10) procedure code on the claim. |
| procedure_code_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 3rd ICD (9 or 10) procedure code on the claim. |
| procedure_code_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 4th ICD (9 or 10) procedure code on the claim. |
| procedure_code_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 5th ICD (9 or 10) procedure code on the claim. |
| procedure_code_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 6th ICD (9 or 10) procedure code on the claim. |
| procedure_code_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 7th ICD (9 or 10) procedure code on the claim. |
| procedure_code_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 8th ICD (9 or 10) procedure code on the claim. |
| procedure_code_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 9th ICD (9 or 10) procedure code on the claim. |
| procedure_code_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 10th ICD (9 or 10) procedure code on the claim. |
| procedure_code_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 11th ICD (9 or 10) procedure code on the claim. |
| procedure_code_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 12th ICD (9 or 10) procedure code on the claim. |
| procedure_code_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 13th ICD (9 or 10) procedure code on the claim. |
| procedure_code_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 14th ICD (9 or 10) procedure code on the claim. |
| procedure_code_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 15th ICD (9 or 10) procedure code on the claim. |
| procedure_code_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 16th ICD (9 or 10) procedure code on the claim. |
| procedure_code_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 17th ICD (9 or 10) procedure code on the claim. |
| procedure_code_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 18th ICD (9 or 10) procedure code on the claim. |
| procedure_code_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 19th ICD (9 or 10) procedure code on the claim. |
| procedure_code_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 20th ICD (9 or 10) procedure code on the claim. |
| procedure_code_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 21st ICD (9 or 10) procedure code on the claim. |
| procedure_code_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 22nd ICD (9 or 10) procedure code on the claim. |
| procedure_code_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 23rd ICD (9 or 10) procedure code on the claim. |
| procedure_code_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 24th ICD (9 or 10) procedure code on the claim. |
| procedure_code_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_pcs.csv) | 25th ICD (9 or 10) procedure code on the claim. |
| procedure_date_1 | date | no | Date of the 1st procedure on the claim. |
| procedure_date_2 | date | no | Date of the 2nd procedure on the claim. |
| procedure_date_3 | date | no | Date of the 3rd procedure on the claim. |
| procedure_date_4 | date | no | Date of the 4th procedure on the claim. |
| procedure_date_5 | date | no | Date of the 5th procedure on the claim. |
| procedure_date_6 | date | no | Date of the 6th procedure on the claim. |
| procedure_date_7 | date | no | Date of the 7th procedure on the claim. |
| procedure_date_8 | date | no | Date of the 8th procedure on the claim. |
| procedure_date_9 | date | no | Date of the 9th procedure on the claim. |
| procedure_date_10 | date | no | Date of the 10th procedure on the claim. |
| procedure_date_11 | date | no | Date of the 11th procedure on the claim. |
| procedure_date_12 | date | no | Date of the 12th procedure on the claim. |
| procedure_date_13 | date | no | Date of the 13th procedure on the claim. |
| procedure_date_14 | date | no | Date of the 14th procedure on the claim. |
| procedure_date_15 | date | no | Date of the 15th procedure on the claim. |
| procedure_date_16 | date | no | Date of the 16th procedure on the claim. |
| procedure_date_17 | date | no | Date of the 17th procedure on the claim. |
| procedure_date_18 | date | no | Date of the 18th procedure on the claim. |
| procedure_date_19 | date | no | Date of the 19th procedure on the claim. |
| procedure_date_20 | date | no | Date of the 20th procedure on the claim. |
| procedure_date_21 | date | no | Date of the 21st procedure on the claim. |
| procedure_date_22 | date | no | Date of the 22nd procedure on the claim. |
| procedure_date_23 | date | no | Date of the 23rd procedure on the claim. |
| procedure_date_24 | date | no | Date of the 24th procedure on the claim. |
| procedure_date_25 | date | no | Date of the 25th procedure on the claim. |
| data_source | varchar | no | User-configured field that indicates the data source (e.g. typically named after the payer and state "BCBS Tennessee"). |