---
id: claims-mapping
title: "Claims Mapping"
---

This guide provides advice on how to map claims data to the Tuva [Input Layer](../data-dictionaries/input-layer).  

This [spreadsheet](https://docs.google.com/spreadsheets/d/1tzLnmEB_Z-34QfkIiZhFpV2Zzr9pn-mBUotlvAZ5D7U/edit?usp=sharing) shows what columns in the Input Layer are needed for 
the various Tuva data marts.  Not mapping to a column needed for a data mart will result in no data being produced in that mart.

If you don't have all the columns in the Input Layer in your claims data, that's OK.  Just map them as NULL with the appropriate data type.

## Medical Claim

The `medical_claim` table contains the billing information submitted to the health insurer for medical services, supplies, and/or procedures rendered to a member of the health plan.  The primary keys for this table are:

- `claim_id`
- `claim_line_number`
- `data_source`

### claim_id

`claim_id` is a unique identifier for a set of services and supplies rendered by a healthcare provider that has been billed to insurance.  It is the most fundamental data element in the `medical_claim` table and every row should have a `claim_id`.  If the source data does not have claim IDs or is missing claim IDs for some rows in the data, then those rows should not be mapped to Tuva’s input layer.

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

- data type is `integer`
- `claim_line_number` is populated for every row
- `claim_line_number` is a positive
- `claim_line_number` is sequential (1,2,3,…)
- The maximum value of `claim_line_number` for is equal to the total number of lines in a claim

### claim_type

`claim_type` is the categorization of a claim based on the nature of the provider and where the services were rendered.  Every `claim_type` is associated with a distinct billing and reimbursement process.

Each `claim_id` must have a unique `claim_type` which should be one of these values:

- `institutional`
    - Providers - Typically healthcare institutions or facilities (e.g. hospitals, nursing homes, hospice, etc) providing healthcare services.
    - Billing - Uses a UB-04 (CMS-1450) form and includes information about room and board, facility fees, etc.
- `professional`
    - Providers - Typically healthcare professionals (e.g. physicians, therapists, practitioners) delivering direct care.
    - Billing - Uses a CMS-1500 form and includes information about specific procedures and services rendered by the healthcare professional.
- `dental`
    - Providers - Typically healthcare professionals credentialed in dentistry (dentists, oral surgeons, orthodontists).
    - Billing - Uses a ADA2012 and includes information about specific procedures and services rendered by the healthcare professional.
- `vision`
    - Providers - Typically healthcare professionals specializing in the field of eye care (ophthalmologists, optometrists, etc).
    - Billing - Uses a CMS-1500 form about specific procedures and services rendered by the healthcare professional.
- `undetermined`
    - This category is used when there is no way to determine the `claim_type` of a claim.

Ideally, `claim_type` is available in the raw medical claim data.  If `claim_type` is not present, other fields in the claim can be used to determine whether the claim is `institutional` or `professional`.

The following fields should only be found on institutional claims:

- `bill_type_code`
- `revenue_center_code`
- `ms_drg_code` or `apr_drg_code`
- `admission_date` and `discharge_date`

Since these fields should only be found on an institutional claim, a value present in any or all of these fields will indicate the `claim_type` should be mapped as `institutional`.

The following field should only be found on professional claims:

- `place_of_service_code`

Since this field should only be found on a professional claim, a value present in this field will indicate the `claim_type` should be mapped as `institutional`.

If both professional-only and institutional-only fields are present on the same claim, we do our best to come up with logic (specific to the data source) that determines the `claim_type` based on the presence of different institutional or professional fields. If it’s not possible to convincingly populate the correct `claim_type`, we map to `undetermined`. 

- data type is `string`
- `claim_type` is populated for every row and contains one of the values in Tuva’s [claim_type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__claim_type.csv) terminology file
- `claim_type` is the same for all lines within the same `claim_id`

### patient_id and member_id

`patient_id` is a unique identifier that is designed to unify a patient’s records and provide a consistent reference for the specific individual.  It allows for the linking and tracking of a patient’s healthcare journey across different source data sets.

`member_id` is an identifier specific to the health insurer or health plan.  It is assigned by the insurance company to uniquely identify a specific individual only within their system.

- `patient_id` and `member_id` are populated for every row in the input layer `medical_claim` table.
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

### payer

`payer` contains the name of the health insurance payer of the claim (Aetna, Blue Cross Blue Shield, etc).  This field should can be populated manually if not available already as a field in the source data.

- `payer` is populated for every row
- data type is `string`

### plan

`plan` contains the specific health insurance plan or sub-contract the member is enrolled in (e.g. Aetna Gold, Aetna Bronze 4, BCBS Chicago, etc).

`plan` may not be available in the source data and should be hardcoded (e.g. `select 'aetna bronze 1' as plan` and it can be the same as the payer if no plan is needed for analytics.

- data type is `string`
- `plan` is populated for every row

### claim_start_date, claim_end_date, claim_line_start_date, claim_line_end_date, admission_date, discharge_date

`claim_start_date` marks the starting point of healthcare services that were rendered to a patient.

`claim_end_date` marks the conclusions of healthcare services that were rendered to a patient.

`admission_date` is the date that a patient was formally admitted for inpatient care.  It makes the beginning of a patient’s stay in a facility during which they receive medical treatment, monitoring, and other services.

`discharge_date` is the date that a patient is formally released from a facility.

`claim_line_start_date` is the date that a specific line item or service occurred.  For example, during an inpatient stay a patient needs imaging so they are sent to radiology.  This procedure would be a line item on the claim and the date of the procedure would be specified in the `claim_line_start_date`. 

`claim_line_end_date` is the date that a specific line item or service occurred.  For example, during an inpatient stay a patient needs imaging so they are sent to radiology.  This procedure would be a line item on the claim and the date of the procedure would be specified in the `claim_line_end_date`. 

- data type is `date` in the format `YYYY-MM-DD`

### Institutional Header Fields: admit_source_code, admit_type_code, discharge_disposition_code, bill_type_code, ms_drg_code, apr_drg_code

On institutional claims, header-level fields are data elements that pertain to the claim as a whole rather than specific claim lines or individual services.  That means that the following fields should be unique per claim:

- `admit_source_code` - the specific location or circumstance from which a patient is admitted.
- `admit_type_code` - a category or description of the circumstance under which a patient is admitted.
- `discharge_disposition_code` - how a patient left a healthcare facility, often indicating where they went or what arrangements were made for post-discharge care.
- `bill_type_code` - a representation of the location and type of service provided to a patient.  In most cases, `bill_type_code` is provided as a 3-digit code but some CMS data sets (e.g. LDS) provide each digit separately.
- `ms_drg_code` - a classification system used by Medicare to categorize inpatient hospital stays and group them based on a patient’s diagnosis, procedures performed, age, sex, and complications or comorbidities.  It is necessary for Medicare reimbursement but often by hospitals as a standard for all inpatient stays.
- `apr_drg_code` - similar to `ms_drg_code` except more detailed and refined.  It is **not** required for Medicare reimbursement and its presence will vary greatly within a data source.

To map these fields to the input layer, there are three elements in the source data that can be used:
- column name - the source data has named their column similar to the Tuva Project
- column description - the source data dictionary provides column descriptions
- column content - the values inside a column match the contents of one of the Tuva terminology files listed above

- data type is `string`
- values are mapped to Tuva’s terminology:
    - [admit source](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_source.csv)
    - [admit type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_type.csv)
    - [discharge disposition](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__discharge_disposition.csv)
    - [bill type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__bill_type.csv)
    - [ms drg](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__ms_drg.csv)
    - [apr drg](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__apr_drg.csv)


### place_of_service_code

`place_of_service_code` is contains a 2 digit code that specifies a specific location where the medical service was provided.  

`place_of_service` is only found on `professional` claims and is a line-level field that should be populated on all claim lines.

- data type is `string`
- value is mapped to one of the values found to Tuva’s [place of service](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__place_of_service.csv) terminology file.

### revenue_center_code

`revenue_center_code` is a 4 digit code that used to classify and identify different departments or units within a healthcare facility.

`revenue_center_code` is only found on `institutional` claims and is a line-level field.  It is generally required for billing so payers understand the nature of a service and can determine proper reimbursement but it can be omitted from source data sets.

- data type is `string`
- value is ‘similar’ to one of the values found to Tuva’s [revenue center](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__revenue_center.csv) terminology file.

### service_unit_quantity

`service_unit_quanity` provides a measurement or quantification of health services provided to a a patient.  It plays a role in calculating costs and is important for reimbursement.

`service_unit_quanity` is a line level field that can be found on any claim type.ß

- data type is `integer`

### hcpcs_code

`hcpcs_code` stands for Healthcare Common Procedure Coding System and represent procedures, services, and supplies provided to a patient.  HCPCS is broken out into two categories:

- Level I - are also known as Current Procedural Terminology (CPT) codes.  CPT codes are crated and managed through the American Medical Association (AMA).  They are often found on professional claims
- Level II - these codes are maintained be the Centers for Medicare and Medicaid Services (CMS).  They cover a wider range of services such as durable medical equipment (DME) and ambulance services.  These are often found on institutional claims

- data type is `string`

### hcpcs modifiers

This includes the following fields: `hcpcs_modifier_1` , … , `hcpcs_modifier_5`

A `hcpcs_modifier` can be an additional code to `hcpcs_code` that provides more information about the circumstances surrounding the service.  They represent specific details about the service.  Some examples are:

- LT - service was performed on left side of body
- 76 - service was repeated by the same physician on the same day
- 77 - service was repeated by another physician on same day

- data type is `string`

### rendering_npi, facility_npi, billing_npi

`rendering_npi`, `facility_npi`, and `billing_npi` is populated with the Nation Provider Identifier (NPI) for a provider.

`rendering_npi` represent the practitioner who performed or rendered the specific service.  This value can be populated on either institutional or professional claims.

`facility_npi` represents the healthcare facility or institutional where a specific service was rendered.  This value should only be populated on institutional claims.

`billing_npi` represent the individual or organization responsible for billing and receving payment for healthcare services.

If only one NPI field is provided in the source data, then reference the NPI in Tuva’s provider terminology file to 
determine if it is a person or a place. If it is a person, then the NPI should be mapped to `rendering_npi` in the input 
layer.  If it is a person and it’s an professional claim then also map to `billing_npi`.  If it is a location and the claim type is institutional, then map to`facility_npi`.

- data type is `string`

### paid_date

`paid_date` contains the date on which the claim was paid by the health insurer. 

- data type is `date` in the format `YYYY-MM-DD`

### paid_amount

`paid_amount` is the dollar amount that the health insurer paid for the covered service.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### allowed_amount

`allowed_amount` is the maximum dollar amount a health insurer will reimburse for a covered service.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### coinsurance_amount

`coinsurance_amount` is the dollar amount a member has paid for a covered service as part of cost-sharing with the health insurance provider.  After a deductible is met, covered services may still require a member to pay for a percentage of the cost (e.g. 80/20 - 80% paid by the health insurer and 20% paid by the member)

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### deductible_amount

`deductible_amount` is the dollar amount a member has paid for a covered service before the health insurer will pay the cost for covered services.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### total_cost_amount

`total_cost_amount` is the total amount for a member’s cost of care.  Based on the source data set, it may equal the sum of the other payment fields or it may include Medicare’s [claim pass-through per diem amount](https://resdac.org/cms-data/variables/claim-pass-thru-diem-amount).

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### diagnosis_code_type

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

### diagnosis_code_1, …, diagnosis_code_25

`diagnosis_code` represents the patient’s medical conditions and/or diagnosis and communicates information about the their health and why healthcare services were provided.

`diagnosis_code_1` contains the primary condition for which the patient is seeking care.  It is the primary medical issue that is the focus of the visit.

`diagnosis_code` is a header-level field for all claim types which means they should be unique per claim.

The number of `diagnosis_code` fields available in the data will vary by source and data provider.  There can be up to 25 codes 
but it is not unexpected to see only 1-5 codes.  When mapping `diagnosis_code_1` any field in the source data labeled ‘primary’ or as ‘diagnosis_1’ is acceptable.

- data type is `string`

### diagnosis_poa_1, …, diagnosis_poa_25

`diagnosis_poa` refers to the patient’s condition at the time they were admitted to the hospital.  It indicates whether the condition was already present and active or if it developed during their hospitalization.

`diagnosis_poa` is a header-level field for all claim types which means they should be unique per claim.

The number of `diagnosis_poa` fields available in the data will vary by source and data provider.  There can be up to 25 
codes to describe each `diagnosis_code` but it is not unexpected to see only 1-5 codes or none at all.

- data type is `string`

### procedure_code_type

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

### procedure_code_1, …, procedure_code_25

`procedure_code` represents inpatient surgical, diagnosis, or therapeutic procedures rendered during a patient’s visit.

`procedure_code` is a header-level field for all claim types which means they should be unique per claim.

The number of `procedure_code` fields available in the data will vary by source and data provider.  There can be up to 25 codes but it is not unexpected to see only 1-5 codes. 

- data type is `string`

### Procedure Dates

This includes the following fields: `procedure_date_1`, …, `procedure_date_25`

`procedure_date` represents the date the corresponding procedure occurred (e.g. `procedure_date_1` is the date for `procedure_code_1`).

`procedure_date` is a header-level field for all claim types which means they should be unique per claim.

The number of `procedure_date` fields available in the data will vary by source and data provider.  There can be up to 25 codes but it is not unexpected to see only 1-5 codes. 

- data type is `date` in the format `YYYY-MM-DD`

### data_source

`data_source` is populated with the name of the entity providing the data.  It may come from the health insurer directly (e.g. Aetna, BCBS) or a third party (e.g. HealthVerity, Datavant).  You can map this field manually.

- data type is `string`
- `data_source` is populated for every row

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

### patient_id and member_id

`patient_id` is a unique identifier for an individual person.  If there are multiple data sources with an overlapping population, `patient_id` should unify the same individual.

`member_id` is an identifier for an individual that is specific to the data source.  If there are multiple data sources with an overlapping population, different `member_id` roll up to a single `patient_id`.

- `patient_id` and `member_id` are populated for every row
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

### gender

`gender` contains the biological sex of a member.

- data type is string
- `gender` is mapped to one of the values in Tuva’s [gender terminology file](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__gender.csv).

### race

`race` contains the race of a member.

- data type is `string`
- `race` is mapped to one of the values in Tuva’s [race terminology file](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__race.csv).

### birth_date

This field contains the birth date of a member. 

- data type is `date` in the format `YYYY-MM-DD`

### death_date

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

In the source data, enrollment end date may be `NULL` to indicate that the member is actively enrolled.  After confirming 
this with the data provider, `enrollment_end_date` should be populated with the last day of the current year.

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
