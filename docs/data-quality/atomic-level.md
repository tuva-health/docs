---
id: atomic-level
title: "Atomic-level"
hide_title: false
---

Atomic-level data quality focuses on identifying data quality problems that are inherent in your raw data without respect to specific analytics use cases.  For example, invalid ICD-10-CM diagnosis codes are an atomic-level data quality problem.  Obviously invalid codes like this will also impact analytics use cases, but at the atomic-level we focus on identifying and summarizing these problems across the dataset without linking them to specific analytics use cases.

There are two types of atomic-level data quality problems:

1. Mapping Problems
2. Inherent Problems

Mapping problems are data quality problems that are inadvertently introduced into the data when we transform it from source to the Tuva Data Model.  These problems can be corrected by fixing the mapping.

Inherent problems are data quality problems that are artifacts of the raw data that were not introduced during mapping and cannot be corrected by mapping.  They can only be corrected by acquiring better data from the source.

For each claims data table in the Tuva Input Layer we analyze several domains of data quality problems.  We have organized these domains in order of importance below.

## Medical Claim

### Primary Key

The most basic check we perform on each data table is a primary key check.  This ensures the data in the table is at the proper grain.  Modern data warehouses (e.g. Snowflake) don't always enforce primary keys.  If the primary key isn't set properly this could cause downstream queries to unintentionally explode in size and number of records.  

The primary key on the `medical_claim` table is comprised of 3 fields: `claim_id`, `claim_line_number`, and `data_source`.  The `primary_key_check` table verifies whether there are any duplicates across the primary key fields for each data table.  If any result in the duplicate_records column is greater than zero, then that table's primary key is not set properly and this needs to be corrected in the mapping.

```sql
select *
from data_quality.primary_key_check
```

![Primary Keys](/img/data_quality_primary_keys.jpg)

In the example above the pharmacy_claim table has 100 distinct claims that have multiple records with the same values for the primary key fields.  If any result in this table is non-zero you need to correct the mapping to fix it.

### Patient ID

The patient is at the center of the vast majority of the analyses we're interested in.  Therefore it's important that we check a few things related to the `patient_id` field on every medical claim, specifically:

1. Does every line on each claim have a value for `patient_id` populated?
2. Is there more than 1 value for `patient_id` within a single claim (there shouldn't be)?
3. Does the `patient_id` value indicated on the claim have corresponding valid eligibility during the time period when claim was rendered?

The `medical_claim_patient_id` table verifies whether any of these data quality problems occur in the `medical_claim` table.  You can query it as follows:

```sql
select *
from data_quality.medical_claim_patient_id
```

This query returns the number of unique claim IDs that have each of these data quality problems.

![Medical Claim Patient ID](/img/data_quality_medical_claim_patient_id.jpg)

In the example table above we observe the following:

1. patient_id is populated for every single record in the medical_claim table 
2. 50 claim IDs have more than 1 patient_id.  This can occur when two or more distinct lines on the claim have different values for patient_id.
3. 1,000 claim IDs are considered "orphaned claims".  This means that the claim_start_date or claim_end_date occur during a month when the patient does not have insurance eligibility.

If any of these problems occur in your data you should attempt to correct them in mapping.  However the specific techniques to do this will vary by dataset and it may not be possible to correct the problems.  If the problems can't be correct we still include these records in the dataset, but there will be limitations in terms of how useful they are for analytics.

### Date Fields

The majority of analyses are longitudinal in nature, meaning they look at trends or changes over time.  To make these sorts of analyses possible we need reliable date fields.  In medical claims the following fields are the important date fields:

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

2. Every institutional claim should have an `admission_date` and `discharge_date` field populated.

3. The following fields should have 1 and only 1 value on the claim when they are populated.
- `claim_start_date`
- `claim_end_date`
- `admission_date`
- `discharge_date`

It's possible and expected for claim line dates to be different for different records on a single claim.

The following table returns the count of distinct claims that violate the rules outlined above.

```sql
select *
from data_quality.medical_claim_date_checks
```

![Medical Claim Basic Dates](/img/data_quality_medical_claim_basic_dates.jpg)

In the example table above we can see that 50 medical claims are missing a claim_end_date and 1,000 claims are missing a claim_line_start_date.

Beyond these basic date checks, we need to check whether the values within our date fields are reasonable over time.  For example, if we have a dataset that covers 3 calendar years, it's possible that claim_start_date is perfectly normal for the first two years, but then is completely missing thereafter.  The following query analyzes trends in each of the date fields by looking at the count of distinct claims over time for each date field:

```sql
select *
from data_quality.medical_claim_date_trends
order by 1
```

![Medical Claim Date Trends](/img/data_quality_medical_claim_date_trends.jpg)

In the example table above we see that the first 3 months of 2021 have claim start and end dates populated, but no admission, discharge, or paid dates.  This indicates we are missing date information on these fields during these months.

### Diagnosis and Procedure Fields

Most analyses we perform incorporate information about the patient's health conditions and / or procedures performed on the patient.  Therefore it's critical that we have solid information on the ICD-10-CM and ICD-10-PCS codes which encode this information.

Specifically we check to ensure the following:

1. Every claim line should have a value populated for diagnosis_code_1
2. Every value in the diagnosis_code_1 field should be a valid ICD-10-CM code
3. Every claim should have 1 and only 1 value for diagnosis_code_1
4. For any secondary diagnosis codes that are populated (e.g. diagnosis_code_2, diagnosis_code_3, etc.) these values should be valid ICD-10-CM codes
5. We also want to know the percent of claims that have 1 or more secondary diagnosis codes
6. For any procedure codes (e.g. procedure_code_1, procedure_code_2, etc.) that are populated these values should be valid ICD-10-PCS codes


The query below will display the results from each of these checks:

```sql
select *
from data_quality.dx_and_px
```

![Dx and Px](/img/data_quality_dx_and_px_checks.jpg)

In the example table above, we see that 50 claims have 1 or more invalid primary diagnosis codes and that 1,000 claims have more than 1 primary diagnosis code, making it impossible to use the primary diagnosis code from these claims in analysis.

### Institutional Header Fields

There are several key fields on institutional claims that we use to identify the type of service being delivered and to group claims into encounters.  These fields include the following:

- bill_type_code
- discharge_disposition_code
- ms_drg_code
- apr_drg_code

For each of these fields we need to check institutional claims to ensure the following is true:

1. Every claim line has a value populated
2. The value populated is valid
3. There is 1 and only 1 value for each claim across all claim lines

The following code returns the results of these checks:

```sql
select *
from data_quality.inst_header_fields
```

![Inst Header Fields](/img/data_quality_inst_header_fields.jpg)

In the example output above we see that 50 claims have an invalid bill_type_code, meaning it does not match a code in the terminology table, and that 1,000 claims have multiple values for bill_type_code.

### Claim Line Fields

There are a few key fields across both professional and institutional claims that we use to assign service categories and to group claims into encounters.  These including the following fields:

- revenue_center_code
- place_of_service_code
- hcpcs_code

We need to check these fields to see if the values of these fields are missing or invalid.  The following table returns the results of this.

```sql
select *
from data_quality.claim_line_fields
```

![Medical Claim Line Checks](/img/data_quality_medical_claim_line_checks.jpg)

In the example table above we see that 1,000 claims are missing revenue_center_code.


### Provider NPI Fields

Often we wish to do analysis about the specific providers or facilities delivering care.  NPI is critical here because it's how we identify providers, facilities, and health systemcs.  Therefore we perform the following checks on NPI:

- Every claim should have 1 and only 1 `billing_npi` and it should be valid
- Every claim should have 1 or more `rendering_npi` values and they should be valid
- Every institutional claim should have 1 and only 1 `facility_npi` and it should be valid

```sql
select *
from data_quality.medical_claim_npi
```

![Provider NPI](/img/data_quality_provider_npi.jpg)

### Trended Claim Volume and Dollars

Often we see anomalies where claim volume or dollars can change unexpectedly over time, possibly indicating a data quality problem.  Therefore we need to check whether this is the case.

```sql
select *
from data_quality.trended_medical_claim_volume_and_dollars
```

![Medical Claim Volume and Dollars](/img/data_quality_medical_claim_volume_and_dollars.jpg)

In the example above we clearly have medical claims in the month of March 2021 but we have no paid amounts.

### Data Loss

Often when we map data we perform complex filtering and other types of transformation operations.  In these scenarios it can be easy for unintended data loss to occur.  Therefore we need to confirm some basic statistics between the raw source data and the Tuva Input Layer to ensure unintended data loss hasn't occurred.

The table identified in the query below will only populate once you've created the data loss table in the Input Layer.  To create this table, you manually calculate the exact same metrics as the source data and map these results to the data_loss table in the claims Input Layer.

```sql
select *
from data_quality.claims_data_loss
```

![Data Loss](/img/data_quality_data_loss.jpg)

In the example above we can compare several basic "table stakes" statistics for medical and pharmacy claims, as well as eligibility.  The highlighted rows all show data loss as we move from raw to input layer to core.  Some of this data loss might be expected and explainable.  You should work to understand any and all data loss that is not currently explainable before moving on.


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
