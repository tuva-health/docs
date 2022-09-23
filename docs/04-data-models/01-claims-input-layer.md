---
sidebar_position: 1
---

# Claims Input Layer
Claims Input Layer is a general purpose claims data model that's part of the Tuva Project.  We designed it based on our work with dozens of claims datasets, from Medicare to Medicaid to commericial claims datasets.  We call it Claims Input Layer because once your claims data source has been mapped to it you can automatically run any other part of the Tuva Project.  For example, you can automatically run claims preprocessing, data profiling, readmissions, chronic conditions, etc.

Claims Input Layer was designed with two goals in mind:
1. Make it simple to map claims datasets to Claims Input Layer
2. Support a wide variety of downstream healthcare analytics use cases, such as health economics and outcomes research and value-based care analytics

Below is an overview of Claims Input Layer.  The data model includes 3 main tables: **eligibility**, **medical_claim**, and **rx_claim**.

## Eligibility

### Description
The eligibility table includes information about a patient's (note: we use the word patient as a synonym for member) health insurance coverage and demographics.  Every claims dataset should include some sort of eligibility data, otherwise it's impossible to calculate member months, which are needed to calculate measures like PMPM.

### Mapping Guidelines
Insurance eligibility information is usually formatted in 1 of 2 ways: 

- **Coverage Format:** Every patient has a single record per eligibility span (i.e. eligibility start and end date).  The span can be for a single month or for multiple months.
- **Member Months Format:** Every patient has one record for every month of eligibility for every type of insurance product.  For example, if a patient had 12 months of medical coverage they would have 12 records, one for each month of eligibility.

The eligibility table in Claims Input Layer uses the member months format.  If your eligibility data is already in this format then you can map it directly (i.e. very little transformation should be needed).  However if your data is in the coverage format you will first need to transform it into member months before it can be mapped.

**Unique Patient ID:** Ensure this ID uniquely identifies an individual patient in the dataset.

**Demographic Fields:** Ensure these fields (e.g. gender) have been normalized to the appropriate terminologies.  For each field that has a "yes" for normalized terminology in the table below, you can click the link to see the exact terminology values.

### Data Dictionary
| Column | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique identifier for each patient (i.e. member) in the dataset |
| gender | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/gender.csv) | Biological sex of the patient |
| birth_date | date | no | Birthdate of the patient |
| race | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/race.csv) | Race of the patient |
| zip_code | varchar | yes | Zip code the patient lives in (most recent known address) |
| state | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/state.csv) | State the patient lives in (most recent known address) |
| deceased_flag | int | yes ∈ {0,1} | Indicates whether the patient has died |
| deceased_date | date | no | Date the patient died |
| payer | varchar | no | Name of the primary payer (i.e. health insurer) for the patient |
| payer_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/payer_type.csv) | Type of payer the patient's primary payer is |
| dual_status | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/medicare_dual_eligibility.csv) | Indicates whether the patient is a dual eligible for Medicare and Medicaid |
| medicare_status | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/medicare_status_code.csv) | Indicates how the patient became eligible for Medicare |
| month | int | no | Indicates the month of eligibility for the given patient |
| year | int | no | Indicates the year of eligibility for the given patient |

## Medical Claim

### Description
The medical_claim table contains information on healthcare services and supplies provided to patients, billed by providers, and paid for by health insurers.  It includes information on the provider who rendered the service, the amount paid for the service by the health insurer, and the underlying reason for the service (i.e. diagnosis).  

### Mapping Guidelines
The medical_claim table is at the claim-line grain i.e. it has one record per claim-line.  It combines professional claims (i.e. services billed on a CMS-1500 claim form typically by physicians) and institutional claims (i.e. services billed on a UB-04 claim form typically by hospitals or other institutions) into a single table.  

A typical medical claims dataset includes claims header information and claims line information.  Header information (e.g. DRG) only occurs once per claim whereas line information (e.g. revenue code) may occur many times per claim.  Some claims datasets have header and line information separated into distinct tables while other datasets have the information combined into a single table.  When you combine header and line information into a single table you need to repeat the values of the header data elements for every line on the claim.  

### Data Dictionary
| Column | Data Type | Normalized Terminology | Description |
| --- | :---: | :---: | --- |
| claim_id | varchar | no | Unique identifier for each claim |
| claim_line_number | int | no | Indicates the line number for the particular line of the claim |
| patient_id | varchar | no | Unique identifier for each patient in the dataset |
| claim_start_date | date | no | Start date for the claim |
| claim_end_date | date | no | End date for the claim |
| claim_line_start_date | date | no | Start date for the claim line |
| claim_line_end_date | date | no | End date for the claim line |
| admission_date | date | no | Admission date for the claim (typically inpatient claims only) |
| discharge_date | date | no | Discharge date for the claim (typically inpatient claims only) |
| claim_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/claim_type.csv) | Indicates whether the claim is professional (CMS-1500) or institutional (UB-04) |
| bill_type_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/bill_type.csv) | Bill type code for the claim (institutional claims only) |
| place_of_service_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/place_of_service.csv) | Place of service for the claim (professional claims only) |
| admit_source_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/admit_source.csv) | Indicates where the patient was before the healthcare encounter (typically inpatient claims only) |
| admit_type_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/admit_type.csv) | Indicates the type of admission (typically inpatient claims only) |
| discharge_disposition_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/discharge_disposition.csv) | Indicates the type of setting the patient was discharged to (typically inpatient claims only) |
| ms_drg | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/ms_drg.csv) | MS-DRG for the claim (typically inpatient claims only) |
| revenue_center_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/revenue_center_code.csv) | Revenue center code for the claim line (institutional only and typically multiple codes per claim) |
| service_unit_quantity | int | no | The number of units for the particular revenue center code | 
| hcpcs_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/hcpcs_level_2.csv) | HCPCS level 1 or level 2 code for the claim line |
| hcpcs_modifier_1 | varchar | yes | 1st modifier for HCPCS code |
| hcpcs_modifier_2 | varchar | yes | 2nd modifier for HCPCS code |
| hcpcs_modifier_3 | varchar | yes | 3rd modifier for HCPCS code |
| hcpcs_modifier_4 | varchar | yes | 4th modifier for HCPCS code |
| hcpcs_modifier_5 | varchar | yes | 5th modifier for HCPCS code |
| billing_npi | varchar | yes | Billing NPI for the claim (typically represents organization billing the claim) |
| rendering_npi | varchar | yes | Rendering NPI for the claim (typically represents the physician or entity providing services) |
| facility_npi | varchar | yes | Facility NPI for the claim (typically represents the facility where services were performed) |
| paid_date | date | no | The date the claim was paid |
| paid_amount | float | no | The total amount paid on the claim by the insurer |
| charge_amount | float | no | The total amount charged on the claim by the provider |
| adjustment_type_code | varchar | yes | Indicates whether the claim is original, adjusted, or final |
| diagnosis_code_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 1st ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 2nd ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 3rd ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 4th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 5th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 6th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 7th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 8th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 9th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 10th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 11th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 12th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 13th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 14th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 15th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 16th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 17th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 18th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 19th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 20th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 21st ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 22nd ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 23rd ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 24th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_code_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 25th ICD (9 or 10) CM diagnosis code on the claim |
| diagnosis_poa_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 1st diagnosis on the claim |
| diagnosis_poa_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 2nd diagnosis on the claim |
| diagnosis_poa_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 3rd diagnosis on the claim |
| diagnosis_poa_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 4th diagnosis on the claim |
| diagnosis_poa_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 5th diagnosis on the claim |
| diagnosis_poa_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 6th diagnosis on the claim |
| diagnosis_poa_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 7th diagnosis on the claim |
| diagnosis_poa_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 8th diagnosis on the claim |
| diagnosis_poa_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 9th diagnosis on the claim |
| diagnosis_poa_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 10th diagnosis on the claim |
| diagnosis_poa_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 11th diagnosis on the claim |
| diagnosis_poa_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 12th diagnosis on the claim |
| diagnosis_poa_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 13th diagnosis on the claim |
| diagnosis_poa_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 14th diagnosis on the claim |
| diagnosis_poa_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 15th diagnosis on the claim |
| diagnosis_poa_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 16th diagnosis on the claim |
| diagnosis_poa_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 17th diagnosis on the claim |
| diagnosis_poa_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 18th diagnosis on the claim |
| diagnosis_poa_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 19th diagnosis on the claim |
| diagnosis_poa_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 20th diagnosis on the claim |
| diagnosis_poa_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 21st diagnosis on the claim |
| diagnosis_poa_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 22nd diagnosis on the claim |
| diagnosis_poa_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 23rd diagnosis on the claim |
| diagnosis_poa_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 24th diagnosis on the claim |
| diagnosis_poa_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 25th diagnosis on the claim |
| diagnosis_code_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/code_type.csv) | Indicates the type of diagnosis code (e.g. ICD-10-CM) |
| procedure_code_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/code_type.csv) | Indicates the type of procedure code (e.g. ICD-10-PCS) |
| procedure_code_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 1st ICD (9 or 10) procedure code on the claim |
| procedure_code_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 2nd ICD (9 or 10) procedure code on the claim |
| procedure_code_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 3rd ICD (9 or 10) procedure code on the claim |
| procedure_code_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 4th ICD (9 or 10) procedure code on the claim |
| procedure_code_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 5th ICD (9 or 10) procedure code on the claim |
| procedure_code_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 6th ICD (9 or 10) procedure code on the claim |
| procedure_code_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 7th ICD (9 or 10) procedure code on the claim |
| procedure_code_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 8th ICD (9 or 10) procedure code on the claim |
| procedure_code_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 9th ICD (9 or 10) procedure code on the claim |
| procedure_code_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 10th ICD (9 or 10) procedure code on the claim |
| procedure_code_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 11th ICD (9 or 10) procedure code on the claim |
| procedure_code_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 12th ICD (9 or 10) procedure code on the claim |
| procedure_code_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 13th ICD (9 or 10) procedure code on the claim |
| procedure_code_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 14th ICD (9 or 10) procedure code on the claim |
| procedure_code_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 15th ICD (9 or 10) procedure code on the claim |
| procedure_code_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 16th ICD (9 or 10) procedure code on the claim |
| procedure_code_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 17th ICD (9 or 10) procedure code on the claim |
| procedure_code_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 18th ICD (9 or 10) procedure code on the claim |
| procedure_code_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 19th ICD (9 or 10) procedure code on the claim |
| procedure_code_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 20th ICD (9 or 10) procedure code on the claim |
| procedure_code_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 21st ICD (9 or 10) procedure code on the claim |
| procedure_code_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 22nd ICD (9 or 10) procedure code on the claim |
| procedure_code_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 23rd ICD (9 or 10) procedure code on the claim |
| procedure_code_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 24th ICD (9 or 10) procedure code on the claim |
| procedure_code_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 25th ICD (9 or 10) procedure code on the claim |
| procedure_date_1 | date | no | Date of the 1st procedure on the claim |
| procedure_date_2 | date | no | Date of the 2nd procedure on the claim |
| procedure_date_3 | date | no | Date of the 3rd procedure on the claim |
| procedure_date_4 | date | no | Date of the 4th procedure on the claim |
| procedure_date_5 | date | no | Date of the 5th procedure on the claim |
| procedure_date_6 | date | no | Date of the 6th procedure on the claim |
| procedure_date_7 | date | no | Date of the 7th procedure on the claim |
| procedure_date_8 | date | no | Date of the 8th procedure on the claim |
| procedure_date_9 | date | no | Date of the 9th procedure on the claim |
| procedure_date_10 | date | no | Date of the 10th procedure on the claim |
| procedure_date_11 | date | no | Date of the 11th procedure on the claim |
| procedure_date_12 | date | no | Date of the 12th procedure on the claim |
| procedure_date_13 | date | no | Date of the 13th procedure on the claim |
| procedure_date_14 | date | no | Date of the 14th procedure on the claim |
| procedure_date_15 | date | no | Date of the 15th procedure on the claim |
| procedure_date_16 | date | no | Date of the 16th procedure on the claim |
| procedure_date_17 | date | no | Date of the 17th procedure on the claim |
| procedure_date_18 | date | no | Date of the 18th procedure on the claim |
| procedure_date_19 | date | no | Date of the 19th procedure on the claim |
| procedure_date_20 | date | no | Date of the 20th procedure on the claim |
| procedure_date_21 | date | no | Date of the 21st procedure on the claim |
| procedure_date_22 | date | no | Date of the 22nd procedure on the claim |
| procedure_date_23 | date | no | Date of the 23rd procedure on the claim |
| procedure_date_24 | date | no | Date of the 24th procedure on the claim |
| procedure_date_25 | date | no | Date of the 25th procedure on the claim |

## Rx Claim

### Description
The rx_claim table includes information about retail and specialty drug prescriptions that have been filled by a patient, billed by a pharmacy, and paid by an insurer.

### Mapping Guidelines
The rx_claim table is at the claim-line grain.

### Data Dictionary
| Column | Data Type | Normalized Terminology | Description |
| --- | :---: | :---: | --- |
| claim_id | varchar | no | Unique ID for the claim |
| claim_line | int | no | Unique ID for the claim line |
| patient_id | varchar | no | Unique ID for the patient |
| prescribing_provider_npi | varchar | yes | NPI for the provider that wrote the prescription (e.g. priamry care physician) |
| prescribing_provider_name | varchar | no | Name of the provider that wrote the prescription |
| dispensing_provider_npi | varchar | yes | NPI for the provider that dispensed the prescription (e.g. pharmacy) |
| dispensing_provider_name | varchar | no | Name of the dispensing provider |
| dispensing_provider_address | varchar | no | Address of the dispensing provider |
| dispensing_provider_city | varchar | no | City of the dispensing provider's home address |
| dispensing_provider_state | varchar | yes | State of the dispensing provider's home address |
| dispensing_provider_zip_code | varchar | no | Zip code of the dispensing provider's home address |
| dispensing_date | date | no | Date the prescription was filled |
| ndc | varchar | no | National drug code on the claim |
| quantity | int | no | Number of doses |
| days_supply | int | no | Number of days supply |
| allowed_amount | float | no | Contractual amount allowed to be paid by the payer + patient |
| paid_amount | float | no | Amount paid by the health insurer |
| paid_date | date | no | Date the claim was paid |
| adjustment_type_code | varchar | no | Indicates whether the claim was adjusted or reversed |