---
id: eligibility
title: "Eligibility"
hide_title: false
description: This guide demonstrates
---

The eligibility table contains enrollment and demographic data of health plan members.  The primary key for this table is:

- `patient_id`
- `member_id`
- `payer`
- `plan`
- `enrollment_start_date`
- `enrollment_end_date`
- `data_source`

There are typically two formats used to transmit eligibility data: 

1. enrollment span format
2. member month format.  

The enrollment span format includes one record per member per enrollment span per health plan.  An enrollment span includes an enrollment start date and an enrollment end date.  Sometimes the enrollment end date is left blank or has a very distant future date e.g. 12/31/9999 in the case enrollment has not ended.

The member month format includes one record per member per month of eligibility per health plan.  This format can be created by translating the start and end dates from the enrollment span format into a set of months for each member.  For example, if a patient had an enrollment spand with start data of 1/1/2022 and end date of 6/30/2022, this would result in 6 records for that patient in the member month format, one record for each month of eligibility.  You can read more about member months on Knowledge Base [here](../../knowledge-base/claims-data-fundamentals/member-months).

Of these two formats the enrollment span format is the most common format in raw claims data.  The eligibility table also uses the enrollment span format.

## patient_id and member_id

`patient_id` is a unique identifier for an individual person.  If there are multiple data sources with an overlapping population, `patient_id` should unify the same individual.

`member_id` is an identifier for an individual that is specific to the data source.  If there are multiple data sources with an overlapping population, different `member_id` roll up to a single `patient_id`.

### Mapping
When mapping a raw data source to the input layer, we map the `member_id` from the raw data to both `patient_id` and `member_id` in the input layer. Later on, Tuva EMPI software will determine if people with different `patient_id`s are the same person and assign the same `patient_id` to those people.

**Tables related to patient_id and member_id to build in the connector:**

If relevant, a crosswalk should be created in the connector to map multiple `member_id`s to `patient_id`. The dbt model should be called `[datasource]__int_member_crosswalk` in the connector and should look like this:

**If this table was already created for medical_claim or pharmacy_claim, append additional identifiers to the existing table**

| data_source | member_id | patient_id |
| --- | --- | --- |
| aetna | 1234 | 1234 |
| aetna | 3245 | 1234 |
| aetna | 2353 | 5432 |

This table is one-to-many, i.e. the same `patient_id` may be related to more than one `member_id`.  The primary key for this table is `member_id` and `data_source`.

We should also report if any rows do not make it to the input layer because they do not have a `member_id` or do not have a unique `member_id`. We do this in a dbt model called `[datasource]__int_member_accounting` that looks like this:

| Description | Number | Percent |
| --- | --- | --- |
| Claims in raw data | 1,340,235 | 100 |
| Claims with no member_id | 0 | 0 |
| Claims with non-unique member_id | 0 | 0 |
| Claims with unique member_id | 1,340,235 | 100 |

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- `patient_id` and `member_id` are populated for every row
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized layer:**

- `patient_id` and `member_id` are populated for every row
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

**Data quality checks table**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claim lines with no member_id | 0 | 0 |
| Claim lines with no patient_id | 0 | 0 |
| Claims with no member_id | 0 | 0 |
| Claims with no patient_id | 0 | 0 |
| Claims with non-unique member_id | 0 | 0 |
| Claims with non-unique patient_id | 0 | 0 |

### gender

`gender` contains the biological sex of a member.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is string
- `gender` is mapped to one of the values in Tuva’s [gender terminology file](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__gender.csv).

**Transformations from the input layer to the normalized input layer:**

- No transformation occur in The Tuva Project.

**Expectations in the normalized input layer:**

- `gender` is mapped to one of the values in Tuva’s [gender terminology file](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__gender.csv).

### race

`race`contains the race of a member.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `race` is mapped to one of the values in Tuva’s [race terminology file](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__race.csv).

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `race` is mapped to one of the values in Tuva’s [race terminology file](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__race.csv).

### birth_date

This field contains the birth date of a member. 

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

>💡 `birth_date`is required for the Mart below.  The Tuva project will still run but no data will be produced:
>- HCCs
>- Quality Measures


**Expectations for birth_date in the input layer:**

- data type is `date`
- `birth_date` is in the format `YYYY-MM-DD`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `date`
- `birth_date` is in the format `YYYY-MM-DD`

### death_date

`death_date` contains the day a member died. 

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `date`
- `death_date` is in the format `YYYY-MM-DD`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `date`
- `death_date` is in the format `YYYY-MM-DD`

### death_flag

`death_flag` contains a flag indicating if a member died; 1 for yes 0 for no.  

`death_flag` should be 1 if a `death_date` is populated.  `death_flag` can be 1 and `death_date` NULL if only an indicator is available in the source data.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is int
- `death_flag` is populated with a 1 or 0

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is int
- `death_flag` is populated with a 1 or 0

### enrollment_start_date and enrollment_end_date

The grain of this table will affect how these fields are populated:

- One row per member month - `enrollment_start_date` will be the beginning of the month and `enrollment_end_date` will be the last day of the month.
  - e.g. `enrollment_start_date` = 2023-01-01 `enrollment_end_date` = 2023-01-31
- One row per enrollment span - `enrollment_start_date` will be the first day of enrollment and `enrollment_end_date will` be the last day of enrollment.
  - e.g. `enrollment_start_date` = 2023-01-01 `enrollment_end_date` = 2023-12-31


#### Mapping

In the source data, enrollment end date may be `NULL` to indicate that the member is actively enrolled.  After confirming 
this with the data provider, `enrollment_end_date` should be populated with the last day of the current year.

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `date`
- `enrollment_start_date` and `enrollment_end_date` are populated in every row
- `enrollment_start_date` and `enrollment_end_date` are populated in the format `YYYY-MM-DD`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `date`
- `enrollment_start_date` and `enrollment_end_date` are populated in every row
- `enrollment_start_date` and `enrollment_end_date` are populated in the format `YYYY-MM-DD`
- `enrollment_start_date` ≤ `enrollment_end_date`

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


### payer_type

`payer_type` contains the type of insurance provided by the payer.  It must be one of the values in Tuva’s [payer_type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__payer_type.csv) terminology file.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `payer_type` is poopulated for every row

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `payer_type` is populated for every row

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

### original_reason_entitlement_code

`original_reason_entitlement_code` contains a member’s original reason for Medicare entitlement.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

>💡 `original_reason_entitlement_code` is needed for the CMS HCC mart. If unavailable, `medicare_status_code` is used.
> If neither is available, the mart will use a default value of “Aged”.


**Expectations in the input layer:**

- data type is `string`
- When available in the source data, `original_reason_entitlement_code` is one of the values in Tuva’s [OREC](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_orec.csv) terminology file.

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations for in the normalized input layer:**

- data type is `string`
- When available in the source data, `original_reason_entitlement_code` is one of the values in Tuva’s [OREC](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_orec.csv) terminology file.

### dual_status_code

`dual_status_code` indicates whether a member is enrolled in both Medicare and Medicaid.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

>💡 `dual_status_code` is needed for the CMS HCC mart. If unavailable, the mart will use a default value of “Non” (i.e., non-dual).

**Expectations in the input layer:**

- data type is `string`
- When available in the source data, `dual_status_code` is one of the values in Tuva’s [dual status](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_dual_eligibility.csv) terminology file.

**Transformations from the input layer to the normalized input layer:**

- No transformations occurs in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- When available in the source data, `dual_status_code` is one of the values in Tuva’s [dual status](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_dual_eligibility.csv) terminology file.

### medicare_status_code

`medicare_status_code` indicates how a member currently qualifies for Medicare.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

>💡 `medicare_status_code` is needed for the CMS HCC mart. It’s used when `original_reason_entitlement_code` is missing.

**Expectations in the input layer:**

- data type is `string`
- When available in the source data, `medicare_status_code` is one of the values in Tuva’s [medicare status](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_status.csv) terminology file.

**Transformations from the input layer to the normalized input layer:**

- No transformations occurs in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- When available in the source data, `medicare_status_code` is one of the values in  Tuva’s [medicare status](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_status.csv) terminology file.

### first_name and last_name

These fields are populated with the member’s name.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

### address

`address` is populated with the house and street name of a member’s address.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

> 💡 `address` is required to geocode a patient’s location and link them to social determinants.

**Expectations for address in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations for address in the normalized input layer:**

- Value is a string
- data type is `string`

### city

`city` is populated with the city of a member’s address. 

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

>💡 `city` is required to geocode a patient’s location and link them to social determinants.


**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

### state

`state` is populated with the state of a member’s address.  The value can be either the full state name or the code (e.g. Vermont or VT).

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

> 💡 `state` is required to geocode a patient’s location and link them to social determinants.


**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

### zip_code

`zip_code` is populated with the zip code of the member’s address.  The zip code can be 5 digits or 9 digits.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

>💡 `zip_code` is required to geocode a patient’s location and link them to social determinants. 
> In some de identified data sets, only the first 3 digits of a zip code may be available.  This can still be used but may not result in a location match.



**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

### phone

`phone` is populated with the member’s phone number.  

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

>💡 `phone` is a helpful component in enterprise master patient index (EMPI) and should be populated if the data is available. 
> Any format can be used.


**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

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