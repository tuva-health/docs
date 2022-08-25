---
sidebar_position: 3
---

# Data Sources

This section describes the types of healthcare data sources the Tuva Project works with.  There are two types of healthcare data formats: standard and non-standard.  We provide an overview of how the Tuva Project works with standard and non-standard formats below.

Additionally there are many different types of healthcare data sources.  The two main types the Tuva Project currently works with are claims data and medical record data.

## Standard Data Formats

Standard data formats are typically maintained by a governing organization and follow a well-specified schema.  A well-specified schema explains precisely the tables and columns that are allowed in the data format.  Because the schema is well-specified for standard formats, we can build connectors that directly take healthcare data in standard formats and connect them to the rest of the Tuva Project.

Here is a list of the standard data formats we currently support.

| Data Source | Maintaining Organization | Tuva Connector on GitHub |
| --- | --- | --- |
| [Medicare CCLF Claims Data](https://www.cms.gov/files/document/cclf-file-data-elements-resource.pdf) | CMS | [Medicare CCLF Connector](https://github.com/tuva-health/medicare_cclf_connector) |
| [Medicare SAF Claims Data](https://www.cms.gov/Research-Statistics-Data-and-Systems/Files-for-Order/LimitedDataSets/StandardAnalyticalFiles) | CMS | [Medicare SAF Connector](https://github.com/tuva-health/medicare_saf_connector) |
| [Flexpa](https://www.flexpa.com/docs) | Flexpa | Under Development |

## Non-standard Data Formats

Unfortunately non-standard data formats are the norm in healthcare.  This is slowly changing thanks to interoperability regulations (Flexpa has a great explanation of these regulations and how they enable patient data access [here](https://www.flexpa.com/docs/guides/patient-access)), but the most common way organizations share data is through non-standard data dumps over SFTP.

What do we mean by "non-standard"?  We mean that the schema (i.e. the tables and columns the data is organized into) is non-standard.  Non-standard formats have all or most the common fields you would expect in healthcare data, but the fields are not organized in a standard schema.

Non-standard formats are incredibly common with both medical record data and claims data.  If you are getting a data dump from a data partner (e.g. payer or provider), chances are they are sending you that data over SFTP in a non-standard (custom) format.

### Claims Input Layer

The Claims Input Layer is a claims data model that's part of the Tuva Project.  Any non-standard claims dataset that has been mapped to the Claims Input Layer will not automatically work with all other parts of the Tuva Project.  The Claims Input Layer can also be used as a common claims data model that you map your non-standard claims datasets to.

Below is an overview of the Claims Input Layer data model.  It includes two main tables: eligibility and medical_claim.  

- **eligibility:** The eligibility table is at the member month grain i.e. it has one record per member per month of eligibility.  
- **medical_claim:** The medical_claim table is at the claim-line grain i.e. it has one record per claim-line.

| Table | Column | Data Type | Normalized Terminology | Description |
| --- | --- | --- | :---: | --- |
| eligibility | patient_id | varchar | no | Unique identifier for each member or patient |
| eligibility | gender | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/gender.csv) | Biological sex of the patient |
| eligibility | birth_date | date | no | Birthdate of the patient |
| eligibility | race | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/race.csv) | Race of the patient |
| eligibility | zip_code | varchar | yes | Zip code the patient lives in (most recent known address) |
| eligibility | state | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/state.csv) | State the patient lives in (most recent known address) |
| eligibility | deceased_flag | int | yes ∈ {0,1} | Indicates whether the patient has died |
| eligibility | death_date | date | no | Date the patient died |
| eligibility | payer | varchar | no | Primary payer for the patient |
| eligibility | payer_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/payer_type.csv) | Type of payer the patient's primary payer is |
| eligibility | dual_status | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/medicare_dual_eligibility.csv) | Whether the patient is a dual eligible |
| eligibility | medicare_status | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/medicare_status_code.csv) | Indicates how the patient became eligible for Medicare |
| eligibility | month | int | no | Indicates the month of eligibility for the given patient |
| eligibility | year | int | no | Indicates the year of eligibility for the given patient |
| medical_claim | claim_id | varchar | no | Unique Identifier for each claim |
| medical_claim | claim_line_number | int | no | Indicates the line number for the particular line of the claim |
| medical_claim | patient_id | varchar | no | Unique identifier for each member or patient |
| medical_claim | claim_start_date | date | no | Start date for the claim |
| medical_claim | claim_end_date | date | no | End date for the claim |
| medical_claim | claim_line_start_date | date | no | Start date for the claim line |
| medical_claim | claim_line_end_date | date | no | End date for the claim line |
| medical_claim | admission_date | date | no | Admission date for the claim (typically inpatient claims only) |
| medical_claim | discharge_date | date | no | Discharge date for the claim (typically inpatient claims only) |
| medical_claim | claim_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/claim_type.csv) | Indicates whether the claim is professional (CMS-1500) or institutional (UB-04) |
| medical_claim | bill_type_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/bill_type.csv) | Bill type code for the claim (institutional claims only) |
| medical_claim | place_of_service_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/place_of_service.csv) | Place of service for the claim (professional claims only) |
| medical_claim | admit_source_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/admit_source.csv) | Indicates where the patient was before the healthcare encounter (typically inpatient claims only) |
| medical_claim | admit_type_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/admit_type.csv) | Indicates the type of admission (typically inpatient claims only) |
| medical_claim | discharge_disposition_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/discharge_disposition.csv) | Indicates the type of setting the patient was discharged to (typically inpatient claims only) |
| medical_claim | ms_drg | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/ms_drg.csv) | MS-DRG for the claim (typically inpatient claims only) |
| medical_claim | revenue_center_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/revenue_center_code.csv) | Revenue center code for the claim line (institutional only and typically multiple codes per claim) |
| medical_claim | service_unit_quantity | int | no | The number of units for the particular revenue center code | 
| medical_claim | hcpcs_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/hcpcs_level_2.csv) | HCPCS level 1 or level 2 code for the claim line |
| medical_claim | hcpcs_modifier_1 | varchar | yes | 1st modifier for HCPCS code |
| medical_claim | hcpcs_modifier_2 | varchar | yes | 2nd modifier for HCPCS code |
| medical_claim | hcpcs_modifier_3 | varchar | yes | 3rd modifier for HCPCS code |
| medical_claim | hcpcs_modifier_4 | varchar | yes | 4th modifier for HCPCS code |
| medical_claim | hcpcs_modifier_5 | varchar | yes | 5th modifier for HCPCS code |
| medical_claim | billing_npi | varchar | yes | Billing NPI for the claim (typically represents organization billing the claim) |
| medical_claim | rendering_npi | varchar | yes | Rendering NPI for the claim (typically represents the physician or entity providing services) |
| medical_claim | facility_npi | varchar | yes | Facility NPI for the claim (typically represents the facility where services were performed) |
| medical_claim | paid_date | date | no | The date the claim was paid |
| medical_claim | paid_amount | float | no | The total amount paid on the claim by the insurer |
| medical_claim | charge_amount | float | no | The total amount charged on the claim by the provider |
| medical_claim | adjustment_type_code | varchar | yes | Indicates whether the claim is original, adjusted, or final |
| medical_claim | diagnosis_code_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 1st ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 2nd ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 3rd ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 4th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 5th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 6th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 7th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 8th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 9th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 10th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 11th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 12th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 13th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 14th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 15th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 16th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 17th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 18th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 19th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 20th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 21st ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 22nd ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 23rd ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 24th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_code_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_cm.csv) | 25th ICD (9 or 10) CM diagnosis code on the claim |
| medical_claim | diagnosis_poa_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 1st diagnosis on the claim |
| medical_claim | diagnosis_poa_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 2nd diagnosis on the claim |
| medical_claim | diagnosis_poa_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 3rd diagnosis on the claim |
| medical_claim | diagnosis_poa_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 4th diagnosis on the claim |
| medical_claim | diagnosis_poa_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 5th diagnosis on the claim |
| medical_claim | diagnosis_poa_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 6th diagnosis on the claim |
| medical_claim | diagnosis_poa_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 7th diagnosis on the claim |
| medical_claim | diagnosis_poa_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 8th diagnosis on the claim |
| medical_claim | diagnosis_poa_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 9th diagnosis on the claim |
| medical_claim | diagnosis_poa_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 10th diagnosis on the claim |
| medical_claim | diagnosis_poa_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 11th diagnosis on the claim |
| medical_claim | diagnosis_poa_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 12th diagnosis on the claim |
| medical_claim | diagnosis_poa_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 13th diagnosis on the claim |
| medical_claim | diagnosis_poa_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 14th diagnosis on the claim |
| medical_claim | diagnosis_poa_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 15th diagnosis on the claim |
| medical_claim | diagnosis_poa_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 16th diagnosis on the claim |
| medical_claim | diagnosis_poa_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 17th diagnosis on the claim |
| medical_claim | diagnosis_poa_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 18th diagnosis on the claim |
| medical_claim | diagnosis_poa_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 19th diagnosis on the claim |
| medical_claim | diagnosis_poa_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 20th diagnosis on the claim |
| medical_claim | diagnosis_poa_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 21st diagnosis on the claim |
| medical_claim | diagnosis_poa_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 22nd diagnosis on the claim |
| medical_claim | diagnosis_poa_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 23rd diagnosis on the claim |
| medical_claim | diagnosis_poa_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 24th diagnosis on the claim |
| medical_claim | diagnosis_poa_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/present_on_admission.csv) | Present on admission code for the 25th diagnosis on the claim |
| medical_claim | diagnosis_code_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/code_type.csv) | Indicates the type of diagnosis code (e.g. ICD-10-CM) |
| medical_claim | procedure_code_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/code_type.csv) | Indicates the type of procedure code (e.g. ICD-10-PCS) |
| medical_claim | procedure_code_1 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 1st ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_2 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 2nd ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_3 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 3rd ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_4 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 4th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_5 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 5th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_6 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 6th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_7 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 7th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_8 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 8th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_9 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 9th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_10 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 10th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_11 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 11th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_12 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 12th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_13 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 13th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_14 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 14th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_15 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 15th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_16 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 16th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_17 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 17th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_18 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 18th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_19 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 19th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_20 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 20th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_21 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 21st ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_22 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 22nd ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_23 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 23rd ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_24 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 24th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_code_25 | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/icd_10_pcs.csv) | 25th ICD (9 or 10) procedure code on the claim |
| medical_claim | procedure_date_1 | date | no | Date of the 1st procedure on the claim |
| medical_claim | procedure_date_2 | date | no | Date of the 2nd procedure on the claim |
| medical_claim | procedure_date_3 | date | no | Date of the 3rd procedure on the claim |
| medical_claim | procedure_date_4 | date | no | Date of the 4th procedure on the claim |
| medical_claim | procedure_date_5 | date | no | Date of the 5th procedure on the claim |
| medical_claim | procedure_date_6 | date | no | Date of the 6th procedure on the claim |
| medical_claim | procedure_date_7 | date | no | Date of the 7th procedure on the claim |
| medical_claim | procedure_date_8 | date | no | Date of the 8th procedure on the claim |
| medical_claim | procedure_date_9 | date | no | Date of the 9th procedure on the claim |
| medical_claim | procedure_date_10 | date | no | Date of the 10th procedure on the claim |
| medical_claim | procedure_date_11 | date | no | Date of the 11th procedure on the claim |
| medical_claim | procedure_date_12 | date | no | Date of the 12th procedure on the claim |
| medical_claim | procedure_date_13 | date | no | Date of the 13th procedure on the claim |
| medical_claim | procedure_date_14 | date | no | Date of the 14th procedure on the claim |
| medical_claim | procedure_date_15 | date | no | Date of the 15th procedure on the claim |
| medical_claim | procedure_date_16 | date | no | Date of the 16th procedure on the claim |
| medical_claim | procedure_date_17 | date | no | Date of the 17th procedure on the claim |
| medical_claim | procedure_date_18 | date | no | Date of the 18th procedure on the claim |
| medical_claim | procedure_date_19 | date | no | Date of the 19th procedure on the claim |
| medical_claim | procedure_date_20 | date | no | Date of the 20th procedure on the claim |
| medical_claim | procedure_date_21 | date | no | Date of the 21st procedure on the claim |
| medical_claim | procedure_date_22 | date | no | Date of the 22nd procedure on the claim |
| medical_claim | procedure_date_23 | date | no | Date of the 23rd procedure on the claim |
| medical_claim | procedure_date_24 | date | no | Date of the 24th procedure on the claim |
| medical_claim | procedure_date_25 | date | no | Date of the 25th procedure on the claim |