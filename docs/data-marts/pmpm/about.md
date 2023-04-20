---
id: about
title: "PMPM"
---
The PMPM data mart transforms claims data so it's ready for "per-member-per-month" analysis, which is frequently used to analyze payments and utilization.  This involves two important steps:

1. Calculating Member Months
2. Assigning Claims to Member Months

**Relevant Links:**
- [GitHub Repo](https://github.com/tuva-health/pmpm)


## Calculating Member Months

In this section we use an example to describe how the PMPM data mart calculates member months.

The population of patients who are actively enrolled (i.e. have eligibility) in a given health insurance plan is always changing.  Patients gain and lose health insurance eligibility for a variety of reasons, including changes in employment, birth, and death.  It's important to normalize spend and utilization measures for these changes.  The standard approach to normalizing for patient population changes involves computing member months.

To calculate member months, you need to convert each patient's eligibility record (with start and end dates) into multiple records, with one record for each month of eligibility.  Let's take the same example given above and let's assume today's date is 01-31-2023.  Here's the table again:

| patient_id | payer | enrollment_start_date | enrollment_end_date |
| --- | --- | --- | --- |
| A1234 | Aetna | 01-01-2022 | 06-15-2022 |
| A1234 | Aetna | 08-10-2022 | |
| B2468 | Aetna | 01-01-2022 | 12-31-2022 |

In this example, patient B2468 has an enrollment span with 12 months of continuous eligibility, and so should be given 12 member months.  On the other hand, A1234 should also be given 12 member months, but the assignment isn't as straightforward.  To unpack it, we need to take a brief detour into partial eligibility.

Partial eligibility occurs whenever a patient does not have eligibility for an entire month.  A1234 has partial eligibility for the months of June 2022 and August 2022.  There are multiple methods for handling partial eligibility when computing member months, but the most common method is to assume full eligibility for the entire month.  Not every type of health insurance coverage works like this, but the majority do. In the example above we would give A1234 a full member month for both June 2022 and August 2022, following this method.  

After converting the above enrollment spans to member months (e.g. by using the SQL at the end of this section), the data would look like this:

| patient_id | year_month | payer | 
| --- | --- | --- | 
| A1234 | 2022-01 | Aetna | 
| A1234 | 2022-02 | Aetna | 
| A1234 | 2022-03 | Aetna | 
| A1234 | 2022-04 | Aetna | 
| A1234 | 2022-05 | Aetna | 
| A1234 | 2022-06 | Aetna | 
| A1234 | 2022-08 | Aetna | 
| A1234 | 2022-09 | Aetna | 
| A1234 | 2022-10 | Aetna | 
| A1234 | 2022-11 | Aetna | 
| A1234 | 2022-12 | Aetna | 
| A1234 | 2023-01 | Aetna | 
| B2468 | 2022-01 | Aetna | 
| B2468 | 2022-02 | Aetna | 
| B2468 | 2022-03 | Aetna | 
| B2468 | 2022-04 | Aetna | 
| B2468 | 2022-05 | Aetna | 
| B2468 | 2022-06 | Aetna | 
| B2468 | 2022-07 | Aetna | 
| B2468 | 2022-08 | Aetna | 
| B2468 | 2022-09 | Aetna | 
| B2468 | 2022-10 | Aetna | 
| B2468 | 2022-11 | Aetna | 
| B2468 | 2022-12 | Aetna | 

Notice that the last member month given to patient A1234 was for January 2023.  This is based on the current date when we calculated member months, which in this example was February 1, 2023.

**Data Quality Problems**
In order to correctly compute member months, it's important to take potential data quality issues into account, for example:

- Overlapping enrollment periods 
- Enrollment end dates before enrollment start dates
- Duplicate enrollment records
- Null values in enrollment start date
- Missing payer information 
- Double counting member months for any patient whose patient_id has changed due to change in employment, insurance product, or other eligibility status changes

## Assigning Claims to Member Months

The process of calculating PMPM is requires assigning claims to a particular member month.  We rely on claim service dates for this assignment.  Specifically, we use claim_start_date.  If claim_start_date does not exist, we use claim_end_date.  If neither claim_start_date nor claim_end_date exist, the claim is not assigned to a member month and is excluded from PMPM analysis.