---
id: atomic-level
title: "Atomic-level"
hide_title: false
---

Atomic-level data quality is all about identifying problems in the raw data.  Some of these problems can result from how the data is mapped, so upon identifying any potential problem it's important to go back to the mapping and see if that is what is causing the problem.  Absent that, the problem is an artifact of the raw data.

For each claims data table in the Tuva Input Layer we analyze several domains of data quality problems.  We have organized these domains in order of importance.

## Medical Claim

### Primary Key

The most basic check we perform on any table is a primary key check.  This ensures the data in this table is at the proper grain.  Modern data warehouses (e.g. Snowflake) don't always enforce primary keys.  If the primary key isn't set properly this could cause downstream queries to explode in size and number of records.  

The primary key on the `medical_claim` table is comprised of 3 fields: `claim_id`, `claim_line_number`, and `data_source`.  Query the following table to check whether your data has any duplicate records across these fields.  The `duplicate_records` column in this table should equal 0 for every table.  If it's not you have a primary key problem to fix.

```sql
select *
from data_quality.primary_key_check
```

### Patient ID

The vast majority of analyses involve analyzing patients.  Therefore it's important that we check a few things related to `patient_id` on every claim, specifically:

1. Does every line on each claim have a value for `patient_id` populated?
2. Is there more than 1 value for `patient_id` within a single claim (there shouldn't be)?
3. Does the `patient_id` value indicated on the claim have corresponding valid eligibility?

If a claim line does not have patient_id populated or if there are multiple patient_id values on a single claim, this will cause problems for a variety of analytics.  Steps should be taken to try to correct this in the mapping.

For the third data quality check listed above we check whether either claim_start_date or claim_end_date falls within a valid enrollment date range (i.e. enrollment_start_date and enrollment_end_date) on the eligibility table.  Claims that don't meet this criteria are considered orphaned claims.

None of these problems are severe enough that we would exclude claims with these problems from the dataset, but it's important to be aware of them.

```sql
select *
from data_quality.medical_claim_patient_id
```

### Date Fields

Most analyses are longitudinal in nature, that is, they look at trends or changes over time.  To make these sorts of analyses possible we need reliable date fields.  In medical claims the following fields are the important date fields:

- `claim_start_date`
- `claim_end_date`
- `claim_line_start_date`
- `claim_line_end_date`
- `admission_date`
- `discharge_date`
- `paid_date`

We need to check these fields for the following problems:

1. Every claim line should have a value populated for the following fields:
- `claim_start_date`
- `claim_end_date`
- `claim_line_start_date`
- `claim_line_end_date`
- `paid_date`

2. `admission_date` and `discharge_date` fields should have a value populated on every claim line for institutional claims.

3. Make sure there are not multiple values on claims for the following fields
- `claim_start_date`
- `claim_end_date`
- `admission_date`
- `discharge_date`

```sql
select *
from data_quality.medical_claim_date_checks
```

Beyond these basic checks, we need to check whether the values within our date fields are reasonable.  For example, if we have a dataset that covers 3 calendar years, it's possible that claim_start_date is perfectly normal for the first two years, but then is completely missing thereafter.  The following query analyzes trends in each of the date fields by looking at the count of distinct claims over time for each date field:

```sql
select *
from data_quality.medical_claim_date_trends
order by 1
```

### Diagnosis and Procedure Fields

Most analyses we perform incorporate information about the patient's health conditions and / or procedures performed on the patient.  Therefore it's critical that we have solid information on ICD-10-CM and ICD-10-PCS codes which encode this information.

For ICD-10-CM diagnosis codes we check the following properties.  To start with, every single claim should have 1 and only 1 valid primary diagnosis code (i.e. diagnosis_code_1).  So we check each claim to see whether diagnosis_code_1 is missing, is valid, and if there is more than 1.

Additionally, a good claims dataset should contain secondary diagnosis codes, although secondary dx codes are not required on every claim.  Therefore we check:
- For all secondary dx codes that are populated, are they valid?
- What is the average number of secondary dx codes per claim?

Institutional claims will often have 1 or more procedure codes (although they don't have to have any).  Therefore, for each ICD-10-PCS procedure code that exists on an institutional claim we check whether it is valid.  

The query below will display the results from each of these checks:

```sql
select *
from data_quality.dx_and_px
```

### Institutional Header Fields

There are several key fields in claims data that we use to determine site of care and type of care delivered.  On institutional claims each of claim should have 1 and only 1 valid value for each of these fields:

- bill_type_code
- discharge_disposition_code
- ms_drg_code
- apr_drg_code

```sql
select *
from data_quality.inst_header_fields
```

### Claim Line Fields

There are a few key fields in claims data that we use to determine site of care and type of care delivered.  This includes 3 fields at the claim line level.  We check to make sure these fields are not missing and contain valid values.

- revenue_center_code
- place_of_service_code
- hcpcs_code

```sql
select *
from data_quality.claim_line_fields
```

### Provider NPI Fields

Often we wish to do analysis about the specific providers or facilities delivering care.  NPI is critical here because it's how we identify providers, facilities, and health systemcs.  Therefore we perform the following checks on NPI:

- Every claim should have 1 and only 1 `billing_npi` and it should be valid
- Every claim should have 1 or more `rendering_npi` values and they should be valid
- Every institutional claim should have 1 and only 1 `facility_npi` and it should be valid

```sql
select *
from data_quality.medical_claim_npi
```

### Trended Claim Volume and Dollars

Often we see anomalies where claim volume or dollars can change unexpectedly over time, possibly indicating a data quality problem.  Therefore we need to check whether this is the case.

```sql
select *
from data_quality.trended_medical_claim_volume_and_dollars
```

### Data Loss

Often when we map data we perform complex filtering and other types of transformation operations.  In these scenarios it can be easy for unintended data loss to occur.  Therefore we need to confirm some basic statistics between the raw source data and the Tuva Input Layer to ensure unintended data loss hasn't occurred.

The table identified in the query below will only populate once you've created the data loss table in the Input Layer.  To create this table, you manually calculate the exact same metrics as the source data.

```sql
select *
from data_quality.medical_claim_data_loss
```

## Pharmacy Claim

### Primary Key

The most basic check we perform on any table is a primary key check.  This ensures the data in this table is at the proper grain.  Modern data warehouses (e.g. Snowflake) don't always enforce primary keys.  If the primary key isn't set properly this could cause downstream queries to explode in size and number of records.  

The primary key on the `pharmacy_claim` table is comprised of 3 fields: `claim_id`, `claim_line_number`, and `data_source`.  Query the following table to check whether your data has any duplicate records across these fields.  The `duplicate_records` column in this table should equal 0 for every table.  If it's not you have a primary key problem to fix.

```sql
select *
from data_quality.primary_key_check
```

### Patient ID

### Date Fields

### NDC

### Prescription Details

### NPI Fields

### Trended Claim Volume and Dollars

### Data Loss

## Eligibility

### Primary Key

The most basic check we perform on any table is a primary key check.  This ensures the data in this table is at the proper grain.  Modern data warehouses (e.g. Snowflake) don't always enforce primary keys.  If the primary key isn't set properly this could cause downstream queries to explode in size and number of records.  

The primary key on the `eligibility` table is comprised of 4 fields: `patient_id`, `enrollment_start_date`, `enrollment_end_date` and `data_source`.  Query the following table to check whether your data has any duplicate records across these fields.  The `duplicate_records` column in this table should equal 0 for every table.  If it's not you have a primary key problem to fix.

```sql
select *
from data_quality.primary_key_check
```

### Patient ID

### Date Fields

### Patient Demographics

### Payer Info

### Trended Enrollment Volume

### Data Loss
