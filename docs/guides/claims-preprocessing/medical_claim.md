---
id: medical-claim
title: "Medical Claim"
hide_title: false
description: This guide demonstrates
---

The `medical_claim` table contains the billing information submitted to the health insurer for medical services, supplies, and/or procedures rendered to a member of the health plan.  The primary keys for this table are:

- `claim_id`
- `claim_line_number`
- `data_source`

### claim_id

`claim_id` is a unique identifier for a set of services and supplies rendered by a healthcare provider that has been billed to insurance.  It is the most fundamental data element in the `medical_claim` table and every row should have a `claim_id`.  If the source data does not have claim IDs or is missing claim IDs for some rows in the data, then those rows should not be mapped to Tuva’s input layer.

**Tables related to claim_type to build in the connector:**

In the connector, we should also report if any rows do not make it to the input layer because they do not have a `claim_id`.   We do this in a dbt model called `[datasource]__int_claim_id_accounting` that looks like this:

| Description | Number | Percent |
| --- | --- | --- |
| Rows in raw data | 1,340,235 | 100 |
| Rows with no claim_id | 15,439 | 1.15 |
| Rows with claim_id | 1,324,796 | 98.85 |

#### **Mapping**

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `claim_id` is populated for every row
- `claim_id` is unique across all data_sources
- `claim_id` is unique across all lines within a claim

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `claim_id` is populated for every row
- `claim_id` is unique across all data_sources
- `claim_id` is unique across all lines within a claim

### claim_line_number

`claim_line_number` is a unique identifier within a claim that distinguishes each distinct service, supply, or procedure rendered.  

#### **Mapping**

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

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `integer`
- `claim_line_number` is populated for every row
- `claim_line_number` is a positive
- `claim_line_number` is sequential (1,2,3,…)
- The maximum value of `claim_line_number` for is equal to the total number of lines in a claim

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Lines with missing claim_id | 0 | 0 |
| Lines with missing claim_line_number | 0 | 0 |
| Claims with more than one data_source | 0 | 0 |
| Claims with non-sequential claim_line_numbers | 0 | 0 |

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

#### **Mapping**

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

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `claim_type` is populated for every row and contains one of the values in Tuva’s [claim_type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__claim_type.csv) terminology file
- `claim_type` is the same for all lines within the same `claim_id`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `claim_type` is populated for every row and contains one of the values in Tuva’s [claim_type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__claim_type.csv) terminology file
- `claim_type` is the same for all lines within the same `claim_id`

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Rows with no claim_type | 0 | 0 |
| Rows with non-standard claim_type | 0 | 0 |
| claims with non-unique claim_type | 0 | 0 |
| claims with a non-standard claim_type | 0 | 0 |

### patient_id and member_id

`patient_id` is a unique identifier that is designed to unify a patient’s records and provide a consistent reference for the specific individual.  It allows for the linking and tracking of a patient’s healthcare journey across different source data sets.

`member_id` is an identifier specific to the health insurer or health plan.  It is assigned by the insurance company to uniquely identify a specific individual only within their system.

#### **Mapping**

When mapping to the input layer, the source member identifiers should be examined to determine if a crosswalk needs to be created.  This crosswalk will aggregate different `member_id` to a single `patient_id`.  This is necessary whether working with a single data source or multiple data sources.

If using Tuva’s enterprise master patient index solution (EMPI) then a crosswalk is not necessary.

**Tables related to patient_id and member_id to build in the connector:**

If relevant, a crosswalk should be created in the connector.  The dbt model should be called `[datasource]__int_patient_crosswalk` and the primary key should be `data_source` and `member_id`.  It should look like this:

**🛑If this table was already created for pharmacy_claim or eligibility, append additional identifiers to the existing table**

| data_source | member_id | patient_id |
| --- | --- | --- |
| aetna | 1234 | 1234 |
| aetna | 3245 | 1234 |
| aetna | 2353 | 5432 |

We should also report if any rows do not make it to the input layer because there is no `member_id` or it is not unique per claim.  We do this in a dbt model called `[datasource]__int_patient_accounting`that looks like this:

| Description | Number | Percent |
| --- | --- | --- |
| Claims in raw data | 1,340,235 | 100 |
| Claims with no member_id | 0 | 0 |
| Claims with non-unique member_id | 0 | 0 |
| Claims with unique member_id | 1,340,235 | 100 |

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- `patient_id` and `member_id` are populated for every row in the input layer `medical_claim` table.
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- `patient_id` and `member_id` are populated for every row in the input layer `medical_claim` table.
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claim lines with no member_id | 0 | 0 |
| Claim lines with no patient_id | 0 | 0 |
| Claims with no member_id | 0 | 0 |
| Claims with no patient_id | 0 | 0 |
| Claims with non-unique member_id | 0 | 0 |
| Claims with non-unique patient_id | 0 | 0 |

### payer

`payer` contains the name of the health insurance payer of the claim (Aetna, Blue Cross Blue Shield, etc)

#### **Mapping**

`payer` may not be available in the source data and should be hardcoded (e.g. `select 'aetna' as payer`

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- `payer` is populated for every row
- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- `payer` is populated for every row

**Data Quality Checks:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claim lines with no payer | 0 | 0 |
| Claims with no payer | 0 | 0 |
| Claims with non-unique payer | 0 | 0 |

### plan

`plan` contains the specific health insurance plan or sub-contract the member is enrolled in (e.g. Aetna Gold, Aetna Bronze 4, BCBS Chicago, etc).

#### **Mapping**

`plan` may not be available in the source data and should be hardcoded (e.g. `select 'aetna bronze 1' as plan` and it can be the same as the payer if no plan is needed for analytics.

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `plan` is populated for every row

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `plan` is populated for every row

**Data quality checks:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claim lines with no payer | 0 | 0 |
| Claim lines with no plan | 0 | 0 |
| Claims with no payer | 0 | 0 |
| Claims with no plan | 0 | 0 |
| Claims with non-unique payer | 0 | 0 |
| Claims with non-unique plan | 0 | 0 |

### claim_start_date, claim_end_date, claim_line_start_date, claim_line_end_date, admission_date, discharge_date

`claim_start_date` marks the starting point of healthcare services that were rendered to a patient.

`claim_end_date` marks the conclusions of healthcare services that were rendered to a patient.

`admission_date` is the date that a patient was formally admitted for inpatient care.  It makes the beginning of a patient’s stay in a facility during which they receive medical treatment, monitoring, and other services.

`discharge_date` is the date that a patient is formally released from a facility.

`claim_line_start_date` is the date that a specific line item or service occurred.  For example, during an inpatient stay a patient needs imaging so they are sent to radiology.  This procedure would be a line item on the claim and the date of the procedure would be specified in the `claim_line_start_date`. 

`claim_line_end_date` is the date that a specific line item or service occurred.  For example, during an inpatient stay a patient needs imaging so they are sent to radiology.  This procedure would be a line item on the claim and the date of the procedure would be specified in the `claim_line_end_date`. 

 **Mapping**

**Tables related to claim dates to build in the connector:**

In the connector, we build a table to keep track of what dates cannot be mapped to the input layer because they cannot be 
cast as dates.  One dbt model should be calculated at the line level and be called `[data_source]__int_claim_line_dates_accounting`:

| Field | populated_count | castable_count | castable_percent |
| --- |-----------------|----------------|------------------|
| claim_start_date |                 |                |                  |
| claim_end_date |                 |                |                  |
| claim_line_start_date |                 |                |                  |
| claim_line_end_date |                 |                |                  |
| admission_date |                 |                |                  |
| discharge_date |                 |                |                  |

Another dbt model should be calculated at the claim level and be called `[data_source]__int_claim_dates_accounting`:

| Field | populated_count | castable_count | castable_percent |
| --- |-----------------|----------------|------------------|
| claim_start_date |                 |                |                  |
| claim_end_date |                 |                |                  |
| claim_line_start_date |                 |                |                  |
| claim_line_end_date |                 |                |                  |
| admission_date |                 |                |                  |
| discharge_date |                 |                |                  |

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer**

When mapping to the input layer, 

- data type is `date`
- The format of the date is ‘YYYY-MM-DD’

**Transformations from the input layer to the normalized input layer**

Based on claim type, The Tuva Project applies certain rules to specific dates columns:

- Institutional claims - `claim_start_date`, `claim_end_date`, `admission_date`, and `discharge_date` date should be the same within each field for a single claim.  The Tuva Project performs the following transformations:
    - `min(claim_start_date)`
    - `max(claim_end_date)`
    - `min(admission_date)`
    - `max(discharge_date)`
- Professional claims -  `claim_start_date` and `claim_end_date` date should be the same within each field for a single claim.  `admission_date` and `discharge_date` should not be present since those concepts don’t apply to professional claims.  The Tuva Project performs the following transformations:
    - `min(claim_start_date)`
    - `max(claim_end_date)`
    - `NULL as admission_date`
    - `NULL as discharge_date`
- Undetermined claims - no rules can be applied since the claim type is unknown.  Whatever data is populated in  `claim_start_date`, `claim_end_date`, `admission_date`, and `discharge_date` is left untransformed in the normalized layer.
- After aggregation, dates are then joined to Tuva’s [calendar](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__calendar.csv).  If a date from the source data does not exist in the calendar table th`e`n it is set to `NULL`

**Expectations for claim dates in the normalized input layer:**

- data type is `date`
- The format of the date is ‘YYYY-MM-DD’
- `claim_start_date`,  `claim_end_date` , `admission_date`, and `discharge_date` is unique per claim
- `admission_date`, and `discharge_date` is only populated for institutional and undetermined claims
- `claim_start_date`,  `claim_end_date` , `admission_date`, and `discharge_date` are dates within Tuva’s [calendar](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__calendar.csv) terminology file.

**Data quality checks:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claim lines with invalid claim_start_date | 0 | 0 |
| Claim lines with invalid claim_end_date | 0 | 0 |
| Claim lines with invalid claim_line_start_date | 0 | 0 |
| Claim lines with invalid claim_line_end_date | 0 | 0 |
| Claims with non-unique claim_start_date | 0 | 0 |
| Claims with non-unique claim_end_date | 0 | 0 |
| Claim lines with invalid admission_date | 0 | 0 |
| Claim lines with invalid discharge_date | 0 | 0 |
| Claims with non-unique admission_date | 0 | 0 |
| Claims with non-unique discharge_date | 0 | 0 |
| Claims with populated admission or discharge date that should not have one | 0 | 0 |

### Institutional Header Fields: admit_source_code, admit_type_code, discharge_disposition_code, bill_type_code, ms_drg_code, apr_drg_code

On institutional claims, header-level fields are data elements that pertain to the claim as a whole rather than specific claim lines or individual services.  That means that the following fields should be unique per claim:

- `admit_source_code` - the specific location or circumstance from which a patient is admitted.
- `admit_type_code` - a category or description of the circumstance under which a patient is admitted.
- `discharge_disposition_code` - how a patient left a healthcare facility, often indicating where they went or what arrangements were made for post-discharge care.
- `bill_type_code` - a representation of the location and type of service provided to a patient.  In most cases, `bill_type_code` is provided as a 3-digit code but some CMS data sets (e.g. LDS) provide each digit separately.
- `ms_drg_code` - a classification system used by Medicare to categorize inpatient hospital stays and group them based on a patient’s diagnosis, procedures performed, age, sex, and complications or comorbidities.  It is necessary for Medicare reimbursement but often by hospitals as a standard for all inpatient stays.
- `apr_drg_code` - similar to `ms_drg_code` except more detailed and refined.  It is **not** required for Medicare reimbursement and its presence will vary greatly within a data source.

#### **Mapping**

To map these fields to the input layer, there are three elements in the source data that can be used:
- column name - the source data has named their column similar to the Tuva Project
- column description - the source data dictionary provides column descriptions
- column content - the values inside a column match the contents of one of the Tuva terminology files listed above

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce errors.  Any 
row of data that does not meet the requirements must be omitted from the input layer.

**Expectations for these header-level fields in the input layer:**

- data type is `string`
- values are ‘similar’ to Tuva’s terminology.  (The Tuva project will pad some codes with extra zeros but it cannot transform a source code to a Terminolgy code.  More details availabe in the next section.)
    - [admit source](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_source.csv)
    - [admit type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_type.csv)
    - [discharge disposition](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__discharge_disposition.csv)
    - [bill type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__bill_type.csv)
    - [ms drg](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__ms_drg.csv)
    - [apr drg](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__apr_drg.csv)

**Transformations from the input layer to populate the normalized input layer**

In a perfect world, the source data would have unique header-levels per claim.  However, we live in the real world of messy data so The Tuva Project applies the following steps to all of the above header-level fields on institutional claims:

1. Normalize - The source code is joined to the corresponding Terminology file and the normalized code (i.e. the code from Terminology) is used for downstream processing and analytics.
2. Aggregation - Per claim, the number of distinct header-level fields are calculated.  For example, a claim with 10 lines has `bill_type_code = 111` on 5 lines, `bill_type_code = 121` 3 lines and `bill_type_code = 999` on 2 lines.  The aggregation would produce an occurrence count of each code for that claim.
3. Voting - To determine which code gets populated on the claim, The Tuva Project uses the frequency of the code as a ‘vote’.  Whichever code has the most ‘votes’ is the winner.  Using the previous example, the occurrence of 5 is compared to the occurence of 3.  Since 5 is greater than 3 than the `bill_type_code = 111` wins.
    1. If there is a tie in occurrence counts then the code is undeterminable and it set to `NULL`.

**Expectations for these header-level fields in the normalized input layer:**

- data type is `string`
- values is one of the values found to Tuva’s terminology:
    - [admit source](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_source.csv)
    - [admit type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_type.csv)
    - [discharge disposition](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__discharge_disposition.csv)
    - [bill type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__bill_type.csv)
    - [ms drg](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__ms_drg.csv)
    - [apr drg](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__apr_drg.csv)
- value is unique per claim
- value is only populated for `institutional` or `undetermined` claim types

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid value for institutional header-level field | 0 | 0 |
| Claims with non-unique header-level value | 0 | 0 |
| Claims with populated institutional header-level fields that should not have one | 0 | 0 |

### place_of_service_code

`place_of_service_code` is contains a 2 digit code that specifies a specific location where the medical service was provided.  

`place_of_service` is only found on `professional` claims and is a line-level field that should be populated on all claim lines.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations for in the input layer:**

- data type is `string`
- value is ‘similar’ to one of the values found to Tuva’s [place of service](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__place_of_service.csv) terminology file. (The Tuva project will pad the with a leading zero but it cannot transform a source code to a Terminolgy code.)

**Transformations from the input layer to populate the normalized input layer:**

- The source `place_of_service_code` is padded with a zero to ensure the code is 2 digits in length
- The source `place_of_service_code` is joined to the Terminology file and the normalized code (i.e. the code from Terminology) is used for downstream processing and analytics.

**Expectations for place_of_service_code in the normalized input layer:**

- data type is `string`
- value is only populated for institutional claims
- value is one of values found to Tuva’s [place of service](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__place_of_service.csv) terminology file

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid value for place_of_service_code | 0 | 0 |
| Claims with populated place_of_service_code that should not have one | 0 | 0 |

### revenue_center_code

`revenue_center_code` is a 4 digit code that used to classify and identify different departments or units within a healthcare facility.

`revenue_center_code` is only found on `institutional` claims and is a line-level field.  It is generally required for billing so payers understand the nature of a service and can determine proper reimbursement but it can be omitted from source data sets.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- value is ‘similar’ to one of the values found to Tuva’s [revenue center](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__revenue_center.csv) terminology file. (The Tuva project will pad the with a leading zero but it cannot transform a source code to a Terminolgy code.)

**Transformations from the input layer to populate the normalized input layer:**

- The source `revenue_center_code`is padded with a zeros to ensure the code is 4 digits in length
- The source `revenue_center_code`is joined to the Terminology file and the normalized code (i.e. the code from Terminology) is used for downstream processing and analytics.

**Expectations for place_of_service_code in the normalized input layer:**

- data type is `string`
- value is only populated for institutional claims
- value is one of values found to Tuva’s [revenue center](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__revenue_center.csv) terminology file

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid value for revenue_center_code | 0 | 0 |
| Claims with populated revenue_center_code that should not have one | 0 | 0 |

### service_unit_quantity

`service_unit_quanity` provides a measurement or quantification of health services provided to a a patient.  It plays a role in calculating costs and is important for reimbursement.

`service_unit_quanity` is a line level field that can be found on any claim type.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `integer`

**Transformations from the input layer to populate the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations  in the normalized input layer:**

- data type is `integer`

### hcpcs_code

`hcpcs_code` stands for Healthcare Common Procedure Coding System and represent procedures, services, and supplies provided to a patient.  HCPCS is broken out into two categories:

- Level I - are also known as Current Procedural Terminology (CPT) codes.  CPT codes are crated and managed through the American Medical Association (AMA).  They are often found on professional claims
- Level II - these codes are maintained be the Centers for Medicare and Medicaid Services (CMS).  They cover a wider range of services such as durable medical equipment (DME) and ambulance services.  These are often found on institutional claims

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to populate the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

### hcpcs modifiers

This includes the following fields: `hcpcs_modifier_1` , … , `hcpcs_modifier_5`

A `hcpcs_modifier` can be an additional code to `hcpcs_code` that provides more information about the circumstances surrounding the service.  They represent specific details about the service.  Some examples are:

- LT - service was performed on left side of body
- 76 - service was repeated by the same physician on the same day
- 77 - service was repeated by another physician on same day

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to populate the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

### rendering_npi, facility_npi, billing_npi

`rendering_npi`, `facility_npi`, and `billing_npi` is populated with the Nation Provider Identifier (NPI) for a provider.

`rendering_npi` represent the practitioner who performed or rendered the specific service.  This value can be populated on either institutional or professional claims.

`facility_npi` represents the healthcare facility or institutional where a specific service was rendered.  This value should only be populated on institutional claims.

`billing_npi` represent the individual or organization responsible for billing and receving payment for healthcare services.

#### Mapping
If only one NPI field is provided in the source data, then reference the NPI in Tuva’s provider terminology file to 
determine if it is a person or a place. If it is a person, then the NPI should be mapped to `rendering_npi` in the input 
layer.  If it is a person and it’s an professional claim then also map to `billing_npi`.  If it is a location and the claim type is institutional, then map to`facility_npi`.

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid rendering_npi | 0 | 0 |
| Claims with invalid facility_npi | 0 | 0 |
| Claims with invalid billing_npi | 0 | 0 |

### paid_date

`paid_date` contains the date on which the claim was paid by the health insurer. 

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations for these fields in the input layer:**

- data type is `date`
- `date` is in format YYYY-MM-DD

**Transformations from the input layer to populate the normalized input layer:**

- No transformations occur in The Tuva Project

**Expectations for these fields in the normalized input layer:**

- data type is `date`
- `date` is in format YYYY-MM-DD

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid paid_date | 0 | 0 |
| Claim lines with invalid paid_date | 0 | 0 |

### paid_amount

`paid_amount` is the dollar amount that the health insurer paid for the covered medication.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### allowed_amount

`allowed_amount` is the maximum dollar amount a health insurer will reimburse for a covered medication.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### coinsurance_amount

`coinsurance_amount` is the dollar amount a member has paid for a covered medication as part of cost-sharing with the health insurance provider.  After a deductible is met, covered services may still require a member to pay for a percentage of the cost (e.g. 80/20 - 80% paid by the health insurer and 20% paid by the member)

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### deductible_amount

`deductible_amount` is the dollar amount a member has paid for a covered medication before the health insurer will pay the cost for covered services.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### total_cost_amount

`total_cost_amount` is the total amount for a member’s cost of care.  Based on the source data set, it may equal the sum of the other payment fields or it may include Medicare’s [claim pass-through per diem amount](https://resdac.org/cms-data/variables/claim-pass-thru-diem-amount).

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### diagnosis_code_type

`diagnosis_code_type` contains the coding system for the diagnosis codes contained on the claims.

#### Mapping
On October 1, 2015 the U.S. healthcare industry switched from using ICD-9 to ICD-10.  If the source data does not contain information about the `diagnosis_code_type` then the switch over date can be used to classify the diagnosis codes.  It should be compared against the `claim_end_date`for example:

```sql
case 
	when claim_end_date < 2015-10-01
		then 'icd-9-cm'
	else 'icd-10-cm'
```

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce errors.  Any 
row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `diagnosis_code_type` is popualated when any `diagnosis_code` is populated
- `diagnosis_code_type` is a value from Tuva’s [code type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv) terminology file

**Transformations from the input layer to the normalized input layer:**

- No transformation occur in The Tuva Project

**Expectations in the normalized input layer:**

- data type is `string`
- `diagnosis_code_type` is popualated when any `diagnosis_code` is populated
- `diagnosis_code_type` is a value from Tuva’s [code type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv) terminology file

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid diagnosis_code_type | 0 | 0 |
| Claim lines with invalid diagnosis_code_type | 0 | 0 |

### diagnosis_code_1, …, diagnosis_code_25

`diagnosis_code` represents the patient’s medical conditions and/or diagnosis and communicates information about the their health and why healthcare services were provided.

`diagnosis_code_1` contains the primary condition for which the patient is seeking care.  It is the primary medical issue that is the focus of the visit.

`diagnosis_code` is a header-level field for all claim types which means they should be unique per claim.

#### Mapping

The number of `diagnosis_code` fields available in the data will vary by source and data provider.  There can be up to 25 codes 
but it is not unexpected to see only 1-5 codes.  When mapping `diagnosis_code_1` any field in the source data labeled ‘primary’ or as ‘diagnosis_1’ is acceptable.

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

In a perfect world, the source data would have unique header-levels per claim.  However, we live in the real world of messy data so The Tuva Project applies the following steps to all of the above header-level fields on claims that are not `undetermined`:

1. Normalize - Any periods in the source code is removed and then joined to the corresponding Terminology file based on `diagnosis_code_type` and the normalized code (i.e. the code from Terminology) is used for downstream processing and analytics.
2. Aggregation - Per claim, the number of distinct header-level fields are calculated.  For example, a claim with 10 lines has `diagnosis_code_1 = E08` on 5 lines, `diagnosis_code_1 = I10` 3 lines and `diagnosis_code_1 = E11`  on 2 lines.  The aggregation would produce an occurrence count of each code for that claim.
3. Voting - To determine which code gets populated on the claim, The Tuva Project uses the frequency of the code as a ‘vote’.  Whichever code has the most ‘votes’ is the winner.  Using the previous example, the occurrence of 5 is compared to the occurrence of 3.  Since 5 is greater than 3 than the `diagnosis_code_1 = E08` wins.
    1. If there is a tie in occurrence counts then the code is undeterminable and it set to `NULL`.

**Expectations in the normalized input layer:**

- data type is `string`
- `diagnosis_code` does not contain any periods
- `diagnosis_code` is a value from Tuva’s [icd-9-cm](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_9_cm.csv) or [icd-10-cm](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_10_cm.csv) terminology file

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid diagnosis_code | 0 | 0 |
| Claims with non-unique diagnosis code | 0 | 0 |

### diagnosis_poa_1, …, diagnosis_poa_25

`diagnosis_poa` refers to the patient’s condition at the time they were admitted to the hospital.  It indicates whether the condition was already present and active or if it developed during their hospitalization.

`diagnosis_poa` is a header-level field for all claim types which means they should be unique per claim.

#### Mapping

The number of `diagnosis_poa` fields available in the data will vary by source and data provider.  There can be up to 25 
codes to describe each `diagnosis_code` but it is not unexpected to see only 1-5 codes or none at all.

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

In a perfect world, the source data would have unique header-levels per claim.  However, we live in the real world of messy data so The Tuva Project applies the following steps to all of the above header-level fields on claims that are not `undetermined`:

1. Normalize - The source code is joined to the [present on admit](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__present_on_admission.csv) Terminology file and the normalized code (i.e. the code from Terminology) is used for downstream processing and analytics.
2. Aggregation - Per claim, the number of distinct header-level fields are calculated.  For example, a claim with 10 lines has `diagnosis_poa_1 = Y` on 5 lines, `diagnosis_poa_1 = U` 3 lines and `diagnosis_poa_1 = W` on 2 lines.  The aggregation would produce an occurrence count of each code for that claim.
3. Voting - To determine which code gets populated on the claim, The Tuva Project uses the frequency of the code as a ‘vote’.  Whichever code has the most ‘votes’ is the winner.  Using the previous example, the occurrence of 5 is compared to the occurrence of 3.  Since 5 is greater than 3 than the `diagnosis_poa_1 = Y` wins.
    1. If there is a tie in occurrence counts then the code is undeterminable and it set to `NULL`.

**Expectations in the normalized input layer:**

- data type is `string`
- `diagnosis_poa` is a value from Tuva’s [present on admit](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__present_on_admission.csv) terminology file

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid diagnosis_poa | 0 | 0 |
| Claims with non-unique diagnosis poa. | 0 | 0 |

### procedure_code_type

`procedure_code_type` contains the coding system for the procedure codes contained on the claims.

#### Mapping
On October 1, 2015 the U.S. healthcare industry switched from using ICD-9 to ICD-10.  If the source data does not contain information about the `procedure_code_type` then the switch over date can be used to classify the diagnosis codes.  It should be compared against the `claim_end_date`for example:

```sql
case 
	when claim_end_date < 2015-10-01
		then 'icd-9-pcs'
	else 'icd-10-pcs'
```

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `procedure_code_type` is populated when any `procedure_code` is populated
- `diagnosis_code_type` is a value from Tuva’s [code type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv) terminology file

**Transformations from the input layer to the normalized input layer:**

- No transformation occur in The Tuva Project

**Expectations in the normalized input layer:**

- data type is `string`
- `diagnosis_code_type` is popualated when any `diagnosis_code` is populated
- `diagnosis_code_type` is a value from Tuva’s [code type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv) terminology file

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid procedure_code_type | 0 | 0 |
| Claim lines with invalid procedure_code_type | 0 | 0 |

### procedure_code_1, …, procedure_code_25

`procedure_code` represents inpatient surgical, diagnosis, or therapeutic procedures rendered during a patient’s visit.

`procedure_code` is a header-level field for all claim types which means they should be unique per claim.

#### Mapping

The number of `procedure_code` fields available in the data will vary by source and data provider.  There can be up to 25 codes but it is not unexpected to see only 1-5 codes. 

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

In a perfect world, the source data would have unique header-levels per claim.  However, we live in the real world of messy data so The Tuva Project applies the following steps to all of the above header-level fields on claims that are not `undetermined`:

1. Normalize - Any periods in the source code is removed and then joined to the corresponding Terminology file based on `procedure_code_type` and the normalized code (i.e. the code from Terminology) is used for downstream processing and analytics.
2. Aggregation - Per claim, the number of distinct header-level fields are calculated.  For example, a claim with 10 lines has `procedure_code_1 = 0JH60DZ` on 5 lines, `procedure_code_1 = 0W9NXZZ` 3 lines and `procedure_code_1 = 3E033GC` on 2 lines.  The aggregation would produce an occurrence count of each code for that claim.
3. Voting - To determine which code gets populated on the claim, The Tuva Project uses the frequency of the code as a ‘vote’.  Whichever code has the most ‘votes’ is the winner.  Using the previous example, the occurrence of 5 is compared to the occurrence of 3.  Since 5 is greater than 3 than the `procedure_code_1 = 0JH60DZ` wins.
    1. If there is a tie in occurrence counts then the code is undeterminable and it set to `NULL`.

**Expectations in the normalized input layer:**

- data type is `string`
- `procedure_code` does not contain any periods
- `procedure_code` is a value from Tuva’s [icd-9-pcs](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_9_pcs.csv) or [icd-10-pcs](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_10_pcs.csv) terminology file

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid procedure_code | 0 | 0 |
| Claims with non-unique procedure code | 0 | 0 |

### Procedure Dates

This includes the following fields: `procedure_date_1`, …, `procedure_date_25`

`procedure_date` represents the date the corresponding procedure occurred (e.g. `procedure_date_1` is the date for `procedure_code_1`).

`procedure_date` is a header-level field for all claim types which means they should be unique per claim.

#### Mapping

The number of `procedure_date` fields available in the data will vary by source and data provider.  There can be up to 25 codes but it is not unexpected to see only 1-5 codes. 

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `date`
- `procedure_date` is in the format YYYY-MM-DD

**Transformations from the input layer to the normalized input layer:**

In a perfect world, the source data would have unique header-levels per claim.  However, we live in the real world of messy data so The Tuva Project applies the following steps to all of the above header-level fields on claims that are not `undetermined`:

1. Normalize - `procedure_date` is compared to Tuva’s calendar table.  If the `procedure_date` is not contained within the calendar dates then the `procedure_date` is set to `NULL`.
2. Aggregation - Per claim, the number of distinct header-level fields are calculated.  For example, a claim with 10 lines has `procedure_date_1 = 2022-01-02` on 5 lines, `procedure_date_1 = 2022-01-03` 3 lines and `procedure_date_1 = 2022-01-01` on 2 lines.  The aggregation would produce an occurrence count of each code for that claim.
3. Voting - To determine which code gets populated on the claim, The Tuva Project uses the frequency of the code as a ‘vote’.  Whichever code has the most ‘votes’ is the winner.  Using the previous example, the occurrence of 5 is compared to the occurrence of 3.  Since 5 is greater than 3 than the `procedure_date_1 = 2022-01-02` wins.
    1. If there is a tie in occurrence counts then the code is undeterminable and it set to `NULL`.

**Expectations in the normalized input layer:**

- data type is `date`
- `procedure_date` is in the format YYYY-MM-DD
- `procedure_date` is a date within Tuva’s [calendar](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__calendar.csv) terminology file.

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claims with invalid procedure dates | 0 | 0 |
| Claims with non-unique procedure dates | 0 | 0 |

### data_source

`data_source` is populated with the name of the entity providing the data.  It may come from the health insurer directly (e.g. Aetna, BCBS) or a third party (e.g. HealthVerity, Datavant).

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `data_source` is populated for every row

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `data_source` is populated for every row

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claim lines with no data_source | 0 | 0 |
| Claims with no data_source | 0 | 0 |