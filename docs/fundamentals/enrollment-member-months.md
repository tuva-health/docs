---
id: enrollment-member-months
title: "Enrollment and Member Months"
---
The eligible/enrolled population of patients in a given health insurance plan is always changing.  Patients gain and lose health insurance eligibility for a variety of reasons, including changes in employment, birth, and death.  It's important to normalize spend and utilization measures for these eligibility changes.  Normalizing for patient population changes involves computing member months.

## Key Questions
- How do you calculate member months?
- How do you identify patients with overlapping enrollment spans?
- What data quality problems can affect member month calculations?
- How do you calculate monthly churn rate (i.e. rate of members leaving a health plan)?
- What types of metrics use member months as a basis?

## How to Calculate
Sometimes claims data comes from health insurers with member months already included. In this case you don’t have to create them. It would come in a file or table with one record per member per month. Already done? Yay!!!

More often though, claims data comes in the enrollment span format, with an enrollment or eligibility table that has one record for each period of coverage for a patient. For example, there would be one record for a patient covered from January 1 to December 31 with a patient identifier, a start of coverage date of January 1, and an end of coverage date of December 31.

If a patient (i.e. member) had partial eligibility for a given month, they are assumed to have eligibility for the entire month. Not every type of health insurance coverage works like this, but the majority do. For example, if a patient had an enrollment span starting on Jan 1 2022 and ending on Mar 2 2022, they would be assigned 3 member months, i.e., 202201, 202202, and 202203.

## Data Quality Problems
In order to ensure correct member months, you have to take into account possible data quality issues with enrollment data. Basic logic that fails to account for these issues with enrollment data will produce incorrect member months
- Overlapping enrollment periods
- Enrollment end dates before enrollment begin dates
- Duplicate enrollment period records
- Null values in enrollment start or end dates
- Double counting member months for any member whose memberID has changed due to change in employment, insurance product, or other eligibility status changes.
- Missing the plan information on enrollment data.

Once you have calculated member months based on quality tested enrollment data, it's a good idea to check for some basic structure in the member months table. You want to check that there's one record per member per month per plan in the data table. 
The tuva project includes the pmpm package which builds a member month table for you. Using this table as your member month table, you can run the following query to check that the data is in this structure. (Note: We've assumed for simplicity that there is just one plan in the data.)

```sql
select 
    year_month
    ,patient_id
from pmpm.intermediate_member_months
group by 
    year_month
    ,patient_id
having count(patient_id) > 1;
```

## Analytics
### Trending Member Months 
Based on the tuva project member month table you can run the following query to produce a trend over time of member month counts per month.
```sql
select 
    year_month
    ,count(patient_id)
from pmpm.intermediate_member_months
group by year_month
order by year_month;
```

### Calculating Membership Churn Rates
The basic churn rate calculation takes the number of patients who left the plan in a time period and divides that by the number of patients in the plan during the same time period. Using the tuva project member month table, you can run the following query to get a basic member churn rate per month.

```sql
select 
    year_month
    ,count(patient_id) as cnt_patients
    ,count(patient_id) - coalesce(lag(count(patient_id)) over (order by year_month), 0) as overall_monthly_churn
    ,round(100*(count(patient_id) - coalesce(lag(count(patient_id)) over (order by year_month), 0))/count(patient_id),2) as overall_monthly_churn_rate
from pmpm.intermediate_member_months
group by year_month
order by year_month
```

