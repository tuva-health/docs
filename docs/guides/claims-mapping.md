---
id: claims-mapping
title: "Claims Mapping"
---

Claims mapping is the process of transforming raw claims data sources into Tuva by converting the data format to match the Tuva [Input Layer](../data-dictionaries/input-layer).  The Input Layer acts as an API for Tuva.  Once a healthcare data source has been mapped to the Input Layer you can run all of Tuva on that data source with a single command: `dbt build`.

Every claims dataset is different.  Every health plan has their own data model they store their adjudicated claims data in.

Mapping to the Input Layer involves creating dbt models (i.e. SQL statements in a dbt project).  While it is necessary to create a model for every table in the Input Layer, it is not necessary that you have source data to populate every table or column in the Input Layer.  For example, if you don't have pharmacy claims you still need to create the `pharmacy_claim` table in the Input Layer, but you can mapp null to every column.

This [spreadsheet](https://docs.google.com/spreadsheets/d/1tzLnmEB_Z-34QfkIiZhFpV2Zzr9pn-mBUotlvAZ5D7U/edit?usp=sharing) shows what columns in the Input Layer are needed for the various Tuva Data Marts.  Not mapping to a column needed for a data mart will result in no data being produced in that mart.

The notes that follow describe advice and heuristics for mapping claims data sources to the Input Layer.  Consult the Input Layer data dictionary (link above) for a complete list of fields in the Input Layer.

## Medical Claim
The `medical_claim` table contains the billing information submitted to health insurers for medical services, supplies, and/or procedures rendered to a member of the health plan.  Adjudicated claims from payers, health plans, self-insured employers, brokers, and third party administrators are the most common source of data.

### Admit Source and Type
`admit_source_code` is used in institutional claims to indicate where the patient was located prior to admission.  The field does not exist in professional claims.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

`admit_type_code` is used in institutional claims to indicate the priority of admission, e.g., urgent, emergent, elective, etc.  The field does not exist in professional claims.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

Admit source, along with admit type, is generally not considered very reliable because the accuracy of the code is not verified during the claims adjudication process (other than verifying that the code is in fact a valid code).

Despite this, it's possible to use admit source to help identify things like:
- transfers from another hospital
- inpatient stays that came through the emergency department

Admit type is commonly used to identify things like elective procedures.

Admit source and type codes are maintained by the National Uniform Billing Committee (NUBC).

### Bill Type
'bill_type_code' is by far the most complex of the administrative codes in medical claims.  Each digit has a distinct purpose and meaning:

- 1st digit: This is always "0" and often omitted.
- 2nd digit: Indicates the type of facility, e.g., skilled nursing facility 
- 3rd digit: Indicates the type of care, e.g., inpatient part A
- 4th digit: Indicates the sequence of the bill (also referred to as the frequency code)

The thing that makes this code complex is that the possible values of the 3rd and 4th digits depend on the value of the 2nd digit.  As a result, some claims datasets will separate out the digits of bill type code into distinct fields.  However, we find it preferable to work with bill type code as a single field.

Despite the complexity of this field, it's extremely useful.  'bill_type_code' is used extensively in the creation of service categories, including the identification of acute inpatient, outpatient, skilled nursing, and emergency department services, among many others.  The field is generally considered reliable because the accuracy and suitability of the code is verified during the claims adjudication process, i.e., a claim may be denied if the code doesn't make sense.

'bill_type_code' values are maintained by the National Uniform Billing Committee (NUBC).

### Claim ID
`claim_id` is intended to be a unique identifier for a set of services and supplies rendered by a healthcare provider that has been billed to insurance.  It is the most fundamental data element in the `medical_claim` table and every row in the table must have a `claim_id` populated.  If certain records do not have a claim ID populated these records should not be mapped to the Input Layer.

### Claim Line Number
A claim is often made up of multiple records.  `claim_line_number` is intended to be a unique identifier within a claim that distinguishes these records (i.e. each distinct service, supply, or procedure rendered on the claim).

Every record on a claim should have a unique `claim_line_number` and it should be a positive integer.  Generally speaking `claim_line_number` should be sequentially increasing starting with the number 1.  For example, a claim with 10 records with have `claim_line_number` populated starting a 1 and going up to 10 on the tenth record.  However we often encounter claims with strange line numbers e.g.:
- Not starting with 1
- Not sequential
- Repeating numbers

This weirdness isn't ideal and can indicate other problems in the dataset (e.g. duplicate records).  However it's not a problem in isolation.

`claim_line_number` can be created manually if it’s unavailable in the source data or if it’s not sequential positive integers.  For example:

```sql
row_number() over (partition by claim_id order by claim_end_date) as claim_line_number
```

### Claim Type

`claim_type` is the categorization of a claim based on the specific claim form used in billing i.e. institutional or professional.  It's an important field used in [Claims Preprocessing](../data-marts/claims-preprocessing) to assign service categories and group claims into encounters.

Each `claim_id` must have a unique `claim_type` which should be one of these values:
- **institutional:** For claims rendered using a UB-04 claim form
- **professional:** For claims rendered on a CMS-1500 claim form

Often `claim_type` is available in the source medical claim data.  If `claim_type` is not present, other fields on the claim can be used to determine whether the claim is `institutional` or `professional`.

In theory, the following fields should only be found on institutional claims:
- `bill_type_code`
- `revenue_center_code`
- `ms_drg_code` or `apr_drg_code`
- `admission_date` and `discharge_date`
- `discharge_disposition_code` and `admit_type_code` and `admit_source_code`

The following field should only be found on professional claims:
- `place_of_service_code`

Often a claims data source will have all of these fields populated simultaneously.  Technically this should not be possible, since the data elements are separated by claim form.  However, payers will merge claims from the two claims forms into a single table and then populate missing data elements based on logic they develop internally.  This can make it difficult to separate professional from institutional.  In these circumstances we start by looking for institutional data elements (listed above).  If `bill_type_code`,`revenue_center_code`, or `ms_drg_code` or `apr_drg_code` are present, we assign the claim an `institutional` claim type.  

If none of these fields are present then we assign the claim a `professional` claim type as long as a `place_of_service_code` is present.

If it’s not possible to determine the correct `claim_type`, we assign a `claim_type` of `undetermined`.

Whatever `claim_type` is assigned to a claim, it must be the same for all records (i.e. lines) within that claim.

### Dates
All dates should be formatted as `YYYY-MM-DD`.

To understand the key date fields in medical claims, it's useful to consider an example of a patient who's been receiving care in a long-term care (i.e. skilled nursing) facility for 1 year, from January 1st to December 31st, and suppose the facility bills the insurer every month on the beginning of the month.

- `claim_start_date`: The start date of the billable period for the claim.  In the example above this date would always be the first date of the month.
- `claim_end_date`: The end date of the billable period for the claim.  In the example above this date would always be the last date of the month.
- `admission_date`: The date the patient was first admitted to the facility.  In the example above this date would be January 1st.  This field only exists on institutional claims, not professional.
- `discharge_date`:  The date the patient was discharged from the facility.  In the example above this date would be December 31st.  This field only exists on institutional claims, not professional.
- `paid_date`:  The date the claim was paid by the insurance company.  This date could be any date after the claim_end_date.  Often this date is within a couple weeks of claim_end_date.

There are 2 other date fields in medical claims.  They are `claim_line_start_date` and `claim_line_end_date`.  These date fields are less important - in fact we don't currently use them in any analytics in Tuva.

### Discharge Disposition

'discharge_disposition_code' indicates where the patient was discharged following a stay at a facility.  The field only exists on institutional claims.  The field is sometimes called discharge status or patient status.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

The code is commonly used to identify things like:
- Patients that died during an institutional stay
- Patients who were transferred
- Patients who were discharged to home or home w/ home health services
- Patients who left against medical advice (LAMA)

Discharge disposition codes are maintained by the National Uniform Billing Committee (NUBC).

### DRG
`ms_drg_code` is a classification system used by Medicare to categorize inpatient hospital stays and group them based on a patient’s diagnosis, procedures performed, age, sex, and complications or comorbidities.  It is necessary for Medicare reimbursement but often used by hospitals as a standard for all inpatient stays.

`apr_drg_code` stands for "all patient refined DRG".  It was developed by 3M to extend DRGs to a more general patient population.

### Financial Data

`paid_amount` is the dollar amount that the health insurer paid for the covered service.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

`allowed_amount` is the maximum dollar amount a health insurer will reimburse for a covered service.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

`coinsurance_amount` is the dollar amount a member has paid for a covered service as part of cost-sharing with the health insurance provider.  After a deductible is met, covered services may still require a member to pay for a percentage of the cost (e.g. 80/20 - 80% paid by the health insurer and 20% paid by the member)

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

`deductible_amount` is the dollar amount a member has paid for a covered service before the health insurer will pay the cost for covered services.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

`total_cost_amount` is the total amount for a member’s cost of care.  Based on the source data set, it may equal the sum of the other payment fields or it may include Medicare’s [claim pass-through per diem amount](https://resdac.org/cms-data/variables/claim-pass-thru-diem-amount).

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### HCPCS

HCPCS codes indicate the services and supplies rendered by providers to patients.  These codes are used in both institutional and professional claims forms.  These codes exist at the line-level, meaning there can be many HCPCS codes on a single claim.  There are codes for many different types of supplies and services including:
- physician visits
- lab tests
- imaging reads
- durable medical equipment
- remote patient monitoring devices

And many many other types of things.  There are thousands of HCPCS codes spread across two levels.  Level 1 codes, also called CPT codes, are maintained by the American Medical Association (AMA).  Level 2 codes are maintained by CMS.

Professional contracted rates between payers and providers are established using HCPCS codes.  These rates are referred to as a fee schedule.  Conversely, institutional rates are often paid on a per encounter (e.g. DRG) or per diem basis.

HCPCS Modifiers include the following fields: `hcpcs_modifier_1` , … , `hcpcs_modifier_5`

A `hcpcs_modifier` can be an additional code to `hcpcs_code` that provides more information about the circumstances surrounding the service.  They represent specific details about the service.  Some examples are:

- LT - service was performed on left side of body
- 76 - service was repeated by the same physician on the same day
- 77 - service was repeated by another physician on same day

### Patient ID

`patient_id` is a unique identifier that is designed to unify a patient’s records and provide a consistent reference for the specific individual.  It allows for the linking and tracking of a patient’s healthcare journey across different source data sets.

`member_id` is an identifier specific to the health insurer or health plan.  It is assigned by the insurance company to uniquely identify a specific individual only within their system.

- `patient_id` and `member_id` are populated for every row in the input layer `medical_claim` table.
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

### Payer and Plan
`payer` contains the name of the health insurance payer of the claim (Aetna, Blue Cross Blue Shield, etc).  This field should can be populated manually if not available already as a field in the source data.

`plan` contains the specific health insurance plan or sub-contract the member is enrolled in (e.g. Aetna Gold, Aetna Bronze 4, BCBS Chicago, etc).

`plan` may not be available in the source data and should be hardcoded (e.g. `select 'aetna bronze 1' as plan`) and it can be the same as the payer if no plan is needed for analytics.

### Place of Service

Place of service codes indicate the type of care setting professional claim services were delivered in.  This field only exists on professional claims.  Place of service is coded at the line-level to reflect the fact that services during a particular encounter can occur in different locations.  Because of this, a single professional claim can have multiple place of service codes.

Place of service codes are used to assign claims to services categories.  For example, place of service code 11 indicates an office visit.

CMS maintains place of service codes.

`place_of_service_code` is contains a 2 digit code that specifies a specific location where the medical service was provided.  

`place_of_service_code` is only found on `professional` claims and is a line-level field that should be populated on all claim lines.

### Revenue Center

Revenue center codes are used to account for the services and supplies rendered to patients in institutional care settings.  These codes are only used in institutional claims.  Typically these codes will correspond to a facility's chargemaster, which is a listing of all charges used by the institution in billing.  Although a hospital will use these codes to "charge" the health insurer, they have no bearing on the contracted payment amount, i.e., the amount paid to the provider by the payer.  The payment amount is entirely determined by MS-DRG for inpatient claims and often a per diem rate for skilled nursing.

Many different categories of revenue center codes exist including for example:
- Room and Board
- Emergency
- IV Therapy

For a given institutional claim there may be dozens of revenue center codes used.  These codes are submitted at the line-level of the claim, so there is no limit to the number of revenue center codes that may be used on a given claim.

Revenue center codes play an important role in identifying different types of insitutional claims, including acute inpatient, emergency department, and others.

Revenue center codes are maintained by the National Uniform Billing Committee (NUBC).

`revenue_center_code` is a 4 digit code that used to classify and identify different departments or units within a healthcare facility.

`revenue_center_code` is only found on `institutional` claims and is a line-level field.  It is generally required for billing so payers understand the nature of a service and can determine proper reimbursement but it can be omitted from source data sets.





### Diagnosis Codes

`diagnosis_code` represents the patient’s medical conditions and/or diagnosis and communicates information about the their health and why healthcare services were provided.

`diagnosis_code_1` contains the primary condition for which the patient is seeking care.  It is the primary medical issue that is the focus of the visit.

`diagnosis_code` is a header-level field for all claim types which means they should be unique per claim.

The number of `diagnosis_code` fields available in the data will vary by source and data provider.  There can be up to 25 codes 
but it is not unexpected to see only 1-5 codes.  When mapping `diagnosis_code_1` any field in the source data labeled ‘primary’ or as ‘diagnosis_1’ is acceptable.

- data type is `string`

`diagnosis_code_type` contains the coding system for the diagnosis codes contained on the claims.

On October 1, 2015 the U.S. healthcare industry switched from using ICD-9 to ICD-10.  If the source data does not contain information about the `diagnosis_code_type` then the switch over date can be used to classify the diagnosis codes.  It should be compared against the `claim_end_date`for example:

```sql
case 
	when claim_end_date < 2015-10-01
		then 'icd-9-cm'
	else 'icd-10-cm'
```

- data type is `string`
- `diagnosis_code_type` is popualated when any `diagnosis_code` is populated
- `diagnosis_code_type` is a value from Tuva’s [code type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv) terminology file

### Present on Admission

`diagnosis_poa` refers to the patient’s condition at the time they were admitted to the hospital.  It indicates whether the condition was already present and active or if it developed during their hospitalization.

`diagnosis_poa` is a header-level field for all claim types which means they should be unique per claim.

The number of `diagnosis_poa` fields available in the data will vary by source and data provider.  There can be up to 25 
codes to describe each `diagnosis_code` but it is not unexpected to see only 1-5 codes or none at all.

- data type is `string`

### Procedure Codes

`procedure_code` represents inpatient surgical, diagnosis, or therapeutic procedures rendered during a patient’s visit.

`procedure_code` is a header-level field for all claim types which means they should be unique per claim.

The number of `procedure_code` fields available in the data will vary by source and data provider.  There can be up to 25 codes but it is not unexpected to see only 1-5 codes. 

- data type is `string`

`procedure_code_type` contains the coding system for the procedure codes contained on the claims.

On October 1, 2015 the U.S. healthcare industry switched from using ICD-9 to ICD-10.  If the source data does not contain information about the `procedure_code_type` then the switch over date can be used to classify the diagnosis codes.  It should be compared against the `claim_end_date`for example:

```sql
case 
	when claim_end_date < 2015-10-01
		then 'icd-9-pcs'
	else 'icd-10-pcs'
```

- data type is `string`
- `procedure_code_type` is populated when any `procedure_code` is populated
- `diagnosis_code_type` is a value from Tuva’s [code type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv) terminology file

### Procedure Dates

This includes the following fields: `procedure_date_1`, …, `procedure_date_25`

`procedure_date` represents the date the corresponding procedure occurred (e.g. `procedure_date_1` is the date for `procedure_code_1`).

`procedure_date` is a header-level field for all claim types which means they should be unique per claim.

The number of `procedure_date` fields available in the data will vary by source and data provider.  There can be up to 25 codes but it is not unexpected to see only 1-5 codes. 

- data type is `date` in the format `YYYY-MM-DD`

### Provider NPI

`rendering_npi`, `facility_npi`, and `billing_npi` is populated with the Nation Provider Identifier (NPI) for a provider.

`rendering_npi` represent the practitioner who performed or rendered the specific service.  This value can be populated on either institutional or professional claims.

`facility_npi` represents the healthcare facility or institutional where a specific service was rendered.  This value should only be populated on institutional claims.

`billing_npi` represent the individual or organization responsible for billing and receving payment for healthcare services.

If only one NPI field is provided in the source data, then reference the NPI in Tuva’s provider terminology file to 
determine if it is a person or a place. If it is a person, then the NPI should be mapped to `rendering_npi` in the input 
layer.  If it is a person and it’s an professional claim then also map to `billing_npi`.  If it is a location and the claim type is institutional, then map to`facility_npi`.


## Eligibility

The eligibility table contains enrollment and demographic data of health plan members.  Eligibility data typically exists in one of two formats:

- Enrollment Spans
- Member Months

The Tuva Input Layer Eligibility table uses the Enrollment Span format.  This is the most common format used in claims data.  If your eligibility data uses this format it will be relatively easy to complete the mapping.  If on the other hand your data uses the member months format, you'll need to convert it.

The primary keys for this table are:

- `patient_id`
- `member_id`
- `payer`
- `plan`
- `enrollment_start_date`
- `enrollment_end_date`
- `data_source`

### Gender
`gender` represents the biological sex of a member.  It is mapped to either male, female, or unknown.

### Race
`race` represents the physical race of a member.

### Birth Date
This field represents the birth date of a member. data type is `date` in the format `YYYY-MM-DD`

### Death Date

`death_date` contains the day a member died. 

- data type is `date` in the format `YYYY-MM-DD`

### death_flag

`death_flag` contains a flag indicating if a member died; 1 for yes 0 for no.  

`death_flag` should be 1 if a `death_date` is populated.  `death_flag` can be 1 and `death_date` NULL if only an indicator is available in the source data.

- data type is int
- `death_flag` is populated with a 1 or 0

### enrollment_start_date and enrollment_end_date

The grain of this table will affect how these fields are populated:

- One row per member month - `enrollment_start_date` will be the beginning of the month and `enrollment_end_date` will be the last day of the month.
  - e.g. `enrollment_start_date` = 2023-01-01 `enrollment_end_date` = 2023-01-31
- One row per enrollment span - `enrollment_start_date` will be the first day of enrollment and `enrollment_end_date will` be the last day of enrollment.
  - e.g. `enrollment_start_date` = 2023-01-01 `enrollment_end_date` = 2023-12-31

Enrollment end date may be `NULL` or an obviously fake future date like `2199-12-31` to indicate that the member is actively enrolled.  After confirming 
this with the data provider (when possible), `enrollment_end_date` should be populated with the last day of the current month.

- data type is `date` in the format `YYYY-MM-DD`
- `enrollment_start_date` and `enrollment_end_date` are populated in every row

### payer

`payer` contains the name of the health insurance payer of the claim (Aetna, Blue Cross Blue Shield, etc)

`payer` may not be available in the source data and should be hardcoded (e.g. `select 'aetna' as payer`)

- `payer` is populated for every row
- data type is `string`

### payer_type

`payer_type` contains the type of insurance provided by the payer.

- data type is `string`
- `payer_type` is populated for every row
- value is mapped to one of the values found to Tuva’s [payer_type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__payer_type.csv) terminology file.

### plan

`plan` contains the specific health insurance plan or sub-contract the member is enrolled in (e.g. Aetna Gold, Aetna Bronze 4, BCBS Chicago, etc).

`plan` may not be available in the source data and should be hardcoded (e.g. `select 'aetna bronze 1' as plan` and it can be the same as the payer if no plan is needed for analytics.

- data type is `string`
- `plan` is populated for every row

### original_reason_entitlement_code

`original_reason_entitlement_code` contains a member’s original reason for Medicare entitlement.

- `original_reason_entitlement_code` is helpful for the CMS HCC mart to provide a more accurate risk score.
- If it's unavailable, `medicare_status_code` is used. If neither are available, the mart will use a default value of “Aged”.
- data type is `string`
- value is mapped to one of the values found to Tuva’s [OREC](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_orec.csv) terminology file.

### dual_status_code

`dual_status_code` indicates whether a member is enrolled in both Medicare and Medicaid.

- `dual_status_code` is helpful for the CMS HCC mart to provide a more accurate risk score.
- If unavailable, the mart will use a default value of “Non” (i.e., non-dual).
- data type is `string`
- value is mapped to one of the values found to Tuva’s [dual status](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_dual_eligibility.csv) terminology file.

### medicare_status_code

`medicare_status_code` indicates how a member currently qualifies for Medicare.

- `medicare_status_code` is helpful for the CMS HCC mart to provide a more accurate risk score.
- It’s used when `original_reason_entitlement_code` is missing.
- data type is `string`
- value is mapped to one of the values found to Tuva’s [medicare status](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_status.csv) terminology file.

### data_source

`data_source` is populated with the name of the entity providing the data.  It may come from the health insurer directly (e.g. Aetna, BCBS) or a third party (e.g. HealthVerity, Datavant).

- data type is `string`
- `data_source` is populated for every row

## Pharmacy Claim

The pharmacy claim table contains the billing information submitted to the health insurer for medications dispensed to a member of the health plan.  The primary keys for this table are:

- `claim_id`
- `claim_line_number`
- `data_source`

### claim_id

`claim_id` is a unique identifier for a set of services and supplies rendered by a healthcare provider that have been billed to insurance.  It is the most fundamental data element in the `pharmacy_claim` table, and every row in the `pharmacy_claim` table should have a `claim_id`.  If the source data does not have claim IDs or is missing claim IDs for some rows in the data, then those rows should not be mapped to Tuva’s input layer.

- data type is `string`
- `claim_id` is populated for every row
- `claim_id` is unique across all data_sources
- `claim_id` is unique across all lines within a claim

### claim_line_number

`claim_line_number` is a unique identifier within a claim that distinguishes each distinct service, supply, or procedure rendered.  

Every row should have a `claim_line_number`; it must be a positive sequential integer.  `claim_line_number` can be created manually if it’s unavailable in the source data or if it’s not sequential positive integers.  For example:

```sql
row_number() over (partition by claim_id order by claim_end_date) as claim_line_number
```

The max(`claim_line_number`) for a given `claim_id` must be equal to the number of claim lines for that `claim_id`.

When mapping to the input layer the following expectations must be met or else The Tuva Project will not run and produce errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `integer`
- `claim_line_number` is populated for every row
- `claim_line_number` is a positive
- `claim_line_number` is sequential (1,2,3,…)
- The maximum value of `claim_line_number` for is equal to the total number of lines in a claim

### patient_id and member_id

`patient_id` is a unique identifier that is designed to unify a patient’s records and provide a consistent reference for the specific individual.  
It allows for the linking and tracking of a patient’s healthcare journey across different source data sets.

`member_id` is an identifier specific to the health insurer or health plan.  It is assigned by the insurance company to uniquely identify a specific individual only within their system.

- `patient_id` and `member_id` are populated for every row in the input layer `medical_claim` table.
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

### payer

`payer` contains the name of the health insurance payer of the claim (Aetna, Blue Cross Blue Shield, etc)

- `payer` is populated for every row
- data type is `string`

### plan

`plan` contains the specific health insurance plan or sub-contract the member is enrolled in (e.g. Aetna Gold, Aetna Bronze 4, BCBS Chicago, etc).

If no plan information is available, the payer should be populated in this field.  

- data type is `string`
- `plan` is populated for every row

### prescribing_provider_npi

`precribing_provider_npi` is populated with the national provider identifier (NPI) of the provider who prescribed the medication.

The National Plan & Provider Enumeration System ([NPPES](https://nppes.cms.hhs.gov/#/)) is used to create Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file.  (This file is blank in GitHub due to its size.  The data is stored in a public that is referenced in the [dbt_project.yml](https://github.com/tuva-health/the_tuva_project/blob/main/dbt_project.yml).)

- data type is `string`
- `prescribing_provider_npi` is a value from Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file

### dispensing_provider_npi

`dispensing_provider_npi` is populated with the national provider identifier (NPI) of the provider who dispensed the medication.  This NPI may represent the pharmacist or the pharmacy.

The National Plan & Provider Enumeration System ([NPPES](https://nppes.cms.hhs.gov/#/)) to used to create Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file.  (This file is blank in GitHub due to its size.  The data is stored in a public [S3 bucket](https://s3.console.aws.amazon.com/s3/buckets/tuva-public-resources?region=us-east-1&prefix=provider_data/&showversions=false).)

- data type is `string`
- `dispensing_provider_npi` is a value from Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file

### dispensing_date

`dispensing_date` is the date that the medication was given (i.e. filled).

- data type is `date` in the format `YYYY-MM-DD`

### ndc_code

`ndc_code` is the National Drug Code assigned to prescription and over-the-counter drugs.  NDC can be a 10 or 11 digits, which are broken out into 3 segments:

- Labeler (1-5) - The manufacturer or labeler of the drug
- Product (6-9) - The specific drug and it’s strength
- Package (10-11) - The package size and type

- data type is `string`

### paid_date

`paid_date` is the date that the health insurer processed the claim for payment.  It should coincide with the date that the pharmacy received reimbursement from the health insurer.

- data type is `date` in the format `YYYY-MM-DD`

### paid_amount

`paid_amount` is the dollar amount that the health insurer paid for the covered medication.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### allowed_amount

`allowed_amount` is the maximum dollar amount a health insurer will reimburse for a covered medication.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)


### coinsurance_amount

`coinsurance_amount` is the dollar amount a member has paid for a covered medication as part of cost-sharing with the health insurance provider.  After a deductible is met, covered services may still require a member to pay for a percentage of the cost (e.g. 80/20 - 80% paid by the health insurer and 20% paid by the member)

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### deductible_amount

`deductible_amount` is the dollar amount a member has paid for a covered medication before the health insurer will pay the cost for covered services.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)


### data_source

`data_source` is populated with the name of the entity providing the data.  It may come from the health insurer directly (e.g. Aetna, BCBS) or a third party (e.g. HealthVerity, Datavant).

- data type is `string`
- `data_source` is populated for every row
