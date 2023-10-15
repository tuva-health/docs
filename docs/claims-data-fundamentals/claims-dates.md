---
id: claims-dates
title: "Claims Dates"
---
Claims data is longitudinal in nature i.e. it captures conditions, services and other healthcare events that occur over time to patients.  This makes claims data extremely useful for analyzing sequences of events e.g. did patients who received drug X have better or worse outcomes?  However the ability to reliably use claims data in this matter is predicated by the completeness and accuracy of a variety of key date fields found in claims data.

The date fields listed below are the names we give to these fields in the Tuva Project, but there can be all sorts of different names for these fields in different claims datasets.  For example, in Medicare LDS the claim_end_date field is called clm_thru_dt.

## Medical Claims

To understand the key date fields in medical claims, it's useful to consider an example of a patient who's been receiving care in a long-term care (i.e. skilled nursing) facility for 1 year, from January 1st to December 31st, and suppose the facility bills the insurer every month on the beginning of the month.


- **claim_start_date:** The start date of the billable period for the claim.  In the example above this date would always be the first date of the month.
- **claim_end_date:** The end date of the billable period for the claim.  In the example above this date would always be the last date of the month.
- **admission_date:** The date the patient was first admitted to the facility.  In the example above this date would be January 1st.  This field only exists on institutional claims, not professional.
- **discharge_date:**  The date the patient was discharged from the facility.  In the example above this date would be December 31st.  This field only exists on institutional claims, not professional.
- **paid_date:**  The date the claim was paid by the insurance company.  This date could be any date after the claim_end_date.  Often this date is within a couple weeks of claim_end_date.

There are 2 other date fields in medical claims.  They are claim_line_start_date and claim_line_end_date.  These date fields are less important - in fact we don't currently use them in any analytics in the Tuva Project.

## Pharmacy Claims

- **dispensing_date:** The date when the prescription was filled by the pharmacy and given to the patient.
- **paid_date:**  The date the claim was paid.  Often this date lags the dispensing_date by days or weeks.

## Eligibility

- **enrollment_start_date:** The date when a patient became enrolled in a health plan (i.e. insurance).  Patients can gain and lose enrollment over time, so a given patient may have more than one enrollment_start_date.
- **enrollment_end_date:** The date when a patient loses enrollment in a health plan (i.e. insurance).  Patients can gain and lose enrollment over time, so a given patient may have more than one enrollment_end_date.  Patients who are currently enrolled will not have an enrollment_end_date, or they may have a long-dated enrollment_end_date e.g. 12/31/9999, which is meant to indicate they are still enrolled.
- **birth_date:**  The date the patient was born.  
- **death_date:**  The date the patient died (if applicable).  Just because a patient does not have a death date does not mean they aren't deceased!  Many deaths do not occur in a healthcare facility and therefore are not captured in claims.  Sometimes the death date is captured in eligibility data, but often it is inferred by discharge_disposition_code = 20 (this field is found in institutional claims). 

## Data Quality Issues

As you might expect, the date fields in claims often suffer from data quality issues.  For example, date fields can be missing, or the dates can exist unnaturally far into the past or into the future.

Identifying these sorts of problems across all the key date fields can be challenging and require a lot of ad hoc querying.  We've figured out a good way to look for these sorts of data quality problems and built it into the Tuva Project.  Check out the code and video below for more info.

```sql
select *
from insights.count_claim_by_date_column
order by 1
```

<iframe width="640" height="400" src="https://www.youtube.com/embed/QE9N5FqeNd4?si=iRPvidLj43JwY7ag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
