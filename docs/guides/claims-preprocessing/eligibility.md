---
id: eligibility
title: "Eligibility"
hide_title: false
description: This guide demonstrates
toc_max_heading_level: 2
---

This section describes how to map your raw claims data to the [eligibility](../../data-dictionaries/input-layer#eligibility) 
table in the Input Layer.  The eligibility table contains enrollment and demographic data of health plan members.

Raw eligibility data is typically modeled in one of two formats:

1. Enrollment Span Format
2. Member Month Format

The Enrollment Span Format includes one record per member per enrollment span.  An enrollment span is a specific time period,
including start date and end date when a specific patient had health insurance coverage with a specific health plan.  Sometimes 
the enrollment end date is left blank or has a very distant future date (e.g. 12/31/9999) in the case enrollment has not ended.

The Member Month Format includes one record per member per month of eligibility.  For example, if a patient had an enrollment 
span with start data of 1/1/2022 and end date of 6/30/2022, this would result in 6 records for that patient in the member month format, 
one record for each month of eligibility between January and June of 2022.  You can read more about member months on Knowledge Base [here](../../knowledge-base/claims-data-fundamentals/member-months).

## patient_id

### Mapping

- **Description:** a unique identifier for each patient in the dataset.
- **Data Type:** varchar
- **Expectations:**
  - `patient_id` is populated on every row
  - `patient_id` is unique per `data_source`

The need to crosswalk patient identifiers is obvious when working with multiple data sets that have an overlapping population.
In this scenario, `patient_id` should unify the same person and different `member_id` roll up to the same `patient_id`.
It is less clear if a crosswalk is needed when working with one data source.  A person may change plans which could generate
a new identifier in the source system.  In this scenario, it's important to consult with the data provider and/or the data
dictionary.

### Transformation

None.

## member_id

### Mapping

- **Description:** an identifier that links a patient to a particular insurance product or health plan.
- **Data Type:** varchar
- **Expectations:**
  - `member_id` is populated on every row

### Transformation

None.

## gender

### Mapping

- **Description:** The biological sex of the patient.
- **Data Type:** varchar
- **[Terminology](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__gender.csv)**

### Transformation

None.

## race

### Mapping

- **Description:** The race of the patient.
- **Data Type:** varchar
- **[Terminology](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__race.csv)**


### Transformation

None.

## birth_date

### Mapping

- **Description:** date the patient was born
- **Data Type:** date
- **Expectations:**
  - `birth_date` is in the format `YYYY-MM-DD`
- **Data Marts:**
  - CMS Hierarchical Condition Categories (HCCs)
  - Quality Measures

### Transformation

The Tuva Project will validate `birth_date` against the [calendar](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__calendar.csv)
table to confirm it is a valid value.


## death_date

### Mapping

- **Description:** date the patient died.
- **Data Type:** date
- **Expectations:**
  - `death_date` is in the format `YYYY-MM-DD`

### Transformation

The Tuva Project will validate `death_date` against the [calendar](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__calendar.csv)
table to confirm it is a valid value.

## death_flag

### Mapping

- **Description:** a 1 (yes) or 0 (no) to indicate whether the patient has died
- **Data Type:** int
- **Terminology:** N/A
- **Expectations:**
  - `death_flag` = 1 if `death_date` is populated

`death_flag` can also be equal to 1 if the source does not contain a `death_date` but provides a boolean instead.

### Transformation

None.

## enrollment_start_date

### Mapping

- **Description:** depending on the grain, `enrollment_start_date` is the first day of one month of enrollment (i.e. member month) 
or `enrollment_start_date` is the first month of an enrollment period (i.e. enrollment span)
- **Data Type:** date
- **Expectations:**
  - `enrollment_start_date` is in the format `YYYY-MM-DD`
  
### Transformation

The Tuva Project will validate `enrollment_start_date` against the [calendar](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__calendar.csv)
table to confirm it is a valid value.


## enrollment_end_date

### Mapping

- **Description:** depending on the grain, `enrollment_end_date` is the first day of one month of enrollment (i.e. member month) 
or `enrollment_end_date` is the first month of an enrollment period (i.e. enrollment span)
- **Data Type:** date
- **Expectations:**
  - `enrollment_end_date` is in the format `YYYY-MM-DD`

If the source field contains `NULL` this usually represents the member is actively enrolled.  Confirm this with assumpion
with the data provide then map `NULL` to the last day of the current year. 

### Transformation

The Tuva Project will validate `enrollment_end_date` against the [calendar](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__calendar.csv)
table to confirm it is a valid value.

## payer

### Mapping

- **Description:** name of the payer (i.e. health insurer) providing coverage.
- **Data Type:** varchar
- **Expectations:**
  - `payer` is populated on every row

### Transformation

None.

## payer_type

### Mapping

- **Description:** type of payer (e.g. commercial, medicare, medicaid, etc.).
- **Data Type:** varchar
- **[Terminology](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__payer_type.csv)**


### Transformation

None.

## plan

### Mapping

- **Description:** the plan (i.e. sub contract) providing coverage.
- **Data Type:** varchar
- **Expectations:**
  - `payer` is populated on every row

### Transformation

None.

## original_reason_entitlement_code

### Mapping

- **Description:** the original reason a patient qualified for Medicare entitlement.
- **Data Type:** varchar
- **[Terminology](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__medicare_orec.csv)**
- **Data Marts:**
  - CMS Hierarchical Condition Categories (HCCs) - default value 'Aged'

### Transformation

## dual_status_code

### Mapping

- **Description:** whether a patient is dually eligible for Medicare and Medicaid.
- **Data Type:** varchar
- **[Terminology](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__medicare_dual_eligibility.csv)**
- **Data Marts:**
  - CMS Hierarchical Condition Categories (HCCs) - default value 'Non'

### Transformation

None.

## medicare_status_code

### Mapping

- **Description:** the current reason a patient qualifies for Medicare.
- **Data Type:** varchar
- **[Terminology](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__medicare_status.csv)**
- **Data Marts:**
  - CMS Hierarchical Condition Categories (HCCs)

### Transformation

None.

## first_name

### Mapping

- **Description:** a patient's first name
- **Data Type:** varchar
- **Terminology:** N/A

### Transformation

None.

## last_name

### Mapping

- **Description:** a patient's last name
- **Data Type:** varchar
- **Terminology:** N/A

### Transformation

None.

## address

### Mapping

- **Description:** the patient's street address
- **Data Type:** varchar
- **Data Marts:**
  - Geocoding

### Transformation

None.

## city

### Mapping

- **Description:** the patient's city
- **Data Type:** varchar
- **Data Marts:**
  - Geocoding

### Transformation

None.

## state

### Mapping

- **Description:** the patient's state
- **Data Type:** varchar
- **Data Marts:**
  - Geocoding

### Transformation

None.

## zip_code

### Mapping

- **Description:** the patient's zip code
- **Data Type:** varchar
- **Data Marts:**
  - Geocoding

`zip_code` is preferably a zip or zip+4.  A three digit zip can be used but may not result in a location match.  
### Transformation

None.

## phone

### Mapping

- **Description:** the patient's phone number
- **Data Type:** varchar

### Transformation

None.

## data_source

### Mapping

- **Description:** user-configured field that indicates the data source
- **Data Type:** varchar
- **Expectations:**
  - unique per `data_source`

### Transformation

None.

