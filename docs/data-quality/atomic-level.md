---
id: atomic-level
title: "Atomic-level"
hide_title: false
---

Atomic-level data quality is all about identifying problems in the raw data.  Some of these problems can result from how the data is mapped, so upon identifying any potential problem it's important to go back to the mapping and see if that is what is causing the problem.  Absent that, the problem is an artifact of the raw data.

For each claims data table in the Tuva Input Layer we analyze several domains of data quality problems.

**Medical Claim:**
- Primary Key
- Patient ID
- Date Fields
- Diagnosis and Procedure Fields
- Institutional Header Fields
- Professional Line Fields
- Provider NPI Fields
- Trended Claim Volume and Dollars
- Data Loss

**Pharmacy Claim:**
- Primary Key
- Patient ID
- Date Fields
- NDC
- Other Drug Fields
- NPI Fields
- Trended Claim Volume and Dollars
- Data Loss

**Eligibility:**
- Primary Key
- Patient ID
- Date Fields
- Patient Demographics
- Payer Info
- Trended Enrollment Volume
- Data Loss

## Medical Claim

### Primary Key

This is the most basic check that we need to perform on every table.  The primary key is comprised of 3 fields: claim_id, claim_line_number, and data_source.  Query the following table to check whether your data has any duplicate records.

```sql
select *
from data_quality.blah
```

### Patient ID

The vast majority of analyses revolve around patients.  Therefore it's important that we check a few things related to patient_id on every claim, specifically:

- Is patient_id populated on every claim?
- Is there more than 1 value for patient_id within a single claim (there shouldn't be)?
- Does the patient_id indicated on the claim have corresponding valid eligibility?

For the third data quality check listed above we check whether claim_start_date or claim_end_date falls within a valid enrollment date range (i.e. enrollment_start_date and enrollment_end_date) on the eligibility table.

```sql
select *
from data_quality.blah
```

### Date Fields

Most analyses are longitudinal in nature, that is, they look at trends over time.  To facilitate these trends we need reliable date fields.  In medical claims the following fields are the important date fields:

- claim_start_date
- claim_end_date
- claim_line_start_date
- claim_line_end_date
- admission_date
- discharge_date
- paid_date

The following are some basic checks we perform on claim dates.

Claim start and end dates, as well as claim line start and end dates, and paid dates should be populated on every single claim line.  So we check to ensure they aren't missing.

Additionally, admission and discharge dates should be populated on every institutional claim.

And finally, claim start and end, paid, and admission and discharge dates should be the same for every single line of a claim, so we check to ensure they don't vary across claim lines within a single claim.

```sql
select *
from data_quality.blah
```

Beyond these basic checks, we need to get a sense of if any of our date fields have problems over time.  For example, if we have a dataset that covers 3 calendar years, it's possible that claim_start_date is perfectly normal for the first two years, but then is completely missing thereafter.  The following query analyzes trends in each of the date fields by looking at the count of distinct claims over time for each date field:

```sql
select *
from insights.count_claim_by_date_column
order by 1
```

### Diagnosis and Procedure Fields

Most analyses we perform incorporate information about the condition of the patient and / or procedures performed on the patient.  Therefore it's critical that we have solid information on ICD-10-CM and ICD-10-PCS codes which encode this information.

For ICD-10-CM diagnosis codes we check the following properties.  To start with, every single claim should have 1 and only 1 valid primary diagnosis code (i.e. diagnosis_code_1).  So we check each claim to see whether diagnosis_code_1 is missing, is valid, and if there is more than 1.

Additionally, a good claims dataset should contain secondary diagnosis codes, although secondary dx codes are not required on every claim.  Therefore we check:
- For all secondary dx codes that are populated, are they valid?
- What is the average number of secondary dx codes per claim?

Institutional claims will often have 1 or more procedure codes (although they don't have to have any).  Therefore, for each ICD-10-PCS procedure code that exists on an institutional claim we check whether it is valid.  

The query below will display the results from each of these checks:

```sql
select *
from data_quality.blah
```

### Institutional Header Fields

There are several key fields in claims data that we use to determine site of care and type of care delivered.  On institutional claims each of claim should have 1 and only 1 valid value for each of these fields:

- bill_type_code
- revenue_center_code
- discharge_disposition_code
- ms_drg_code
- apr_drg_code

```sql
select *
from data_quality.blah
```

### Professional Line Fields

There are several key fields in claims data that we use to determine site of care and type of care delivered.  On professional claims each line should have 1 valid value for each of these fields:

- place_of_service_code
- hcpcs_code

### Provider NPI Fields

Often we wish to do analysis about the specific providers or facilities delivering care.  NPI is critical here.  Therefore we perform the following checks on NPI:

- Every claim should have 1 and only 1 billing_npi and it should be valid
- Every claim should have 1 or more rendering_npi values and they should be valid
- Every institutional claim should have 1 and only 1 facility_npi and it should be valid

### Trended Claim Volume and Dollars

Often we see anomalies where claim volume or dollars can change unexpectedly over time, possibly indicating a data quality problem.  Therefore we need to check whether this is the case.

### Data Loss

Often when we map data we perform complex filtering and other types of transformation operations.  In these scenarios it can be easy for unintended data loss to occur.  Therefore we need to confirm some basic statistics between the raw source data and the Tuva Input Layer to ensure unintended data loss hasn't occurred.

## Pharmacy Claim

## Eligibility