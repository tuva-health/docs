---
id: eligibility
title: "Eligibility"
---

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