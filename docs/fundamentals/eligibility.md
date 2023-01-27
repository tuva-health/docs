---
id: eligibility
title: "Eligibility"
---
The eligible/enrolled population of patients in a given health insurance plan is always changing.  Patients gain and lose health insurance eligibility for a variety of reasons, including changes in employment, birth, and death.  It's important to normalize spend and utilization measures for these eligibility changes.  Normalizing for patient population changes involves computing member months.

## Key Questions
- How do you calculate member months?
- What data quality problems can affect member month calculations?
- What types of metrics use member months as a basis?
- How do you calculate monthly churn rate (i.e. rate of members leaving a health plan)?

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
The tuva project includes the pmpm package which builds a member month table for you, taking into account all these possible data quality issues at the enrollment level. Based on this tuva project member month table, you can run the following query to check that the data is in the correct structure for futher analysis. This query should return zero records if your data is in the correct structure. (Note: We've assumed for simplicity that there is just one plan in the data.)

```sql
select 
    year_month
    ,patient_id
from tuva_claims_demo_full.pmpm.intermediate_member_months
group by 
    year_month
    ,patient_id
having count(patient_id) > 1;
```

## Analytics
Many healthcare metrics are normalized using member months. Usually you'll see spend metrics using member months directly as a denominator in per member per month calculations (pmpm), broken out by different dimensions such as encounter type or different types of patient population. The other type of metric you'll see using member months are utilization metrics denoted as something like utilization per 1000 lives covered. Lives covered are equivalent to 12 member months for a year. So if you had 2 patients who each were covered in a plan for 6 months of the year, you would have the equivalent of 1 life covered for that year. Utilization metrics range from radiology imaging per 1000 lives to office visits or even flu shots per thousand lives. Any service or procedure provided by the healthcare system that can be counted can be normalized using this 1000 lives denonminator. Look in the PMPM section of Knowledge Base to learn more about analyzing pmpm and utilization metrics.
### Trending Member Months 
It is also useful to look at member months directly to analyze plan membership trends. Based on the tuva project member month table you can run the following query to produce a trend over time of member month counts per month.
```sql
select 
    year_month
    ,count(patient_id)
from tuva_claims_demo_full.pmpm.intermediate_member_months
group by year_month
order by year_month;
```
The following is example output from the above query run on the Tuva Claims Demo dataset:

![The Tuva Project](/img/member_months/plan_membership_trend_by_month.png)


### Membership Growth Rate
Adding the growth rate to the membership trend allows you to benchmark and monitor the growth rate to make sure it is reasonable or in line with projections, etc. The growth rate calculation takes the difference between the number of patients enrolled in a plan at the beginning of a time period and the end of that time period and divides that difference by the number of patients in the plan at the beginning of the same time period. Using the tuva project member month table, you can run the following query to get a basic member growth rate per month. 

```sql
select 
    year_month
    ,count(patient_id) as cnt_patients
    ,count(patient_id) - coalesce(lag(count(patient_id)) over (order by year_month), 0) as overall_monthly_growth
    ,round(100*(count(patient_id) - coalesce(lag(count(patient_id)) over (order by year_month), 0))/count(patient_id),2)||'%' as overall_monthly_growth_rate
from tuva_claims_demo_full.pmpm.intermediate_member_months
group by year_month
order by year_month;
```

The following is example output from the above query run on the Tuva Claims Demo dataset. You can see for each month the change in the number of patients in the plan and the rate of growth or decline.

![The Tuva Project](/img/member_months/membership_growth_rate.png)

### Churn and other Drivers of Membership Growth Rate

The above membership growth rate doesn't take into account cohorts, or in other words, specific patients staying in the plan over time or coming and going. It just shows directionally whether the plan is increasing or decreasing in membership over time. A more complete analysis includes looking at how many patients left a plan and how many new patients are added to a plan during a time period so we can see whether high churn is being masked by high growth in membership at the same time. We may also want to see whether patients are leaving and then coming back, etc. To do this, we'll use window functions in sql and follow a few steps to analyze churn to get to a more complete picture. 

Step 1: To make it simler to analyze over time, we'll associate simple integer time periods with each member month so we can add and subtract time periods easily. Below is a sample output of this first part of the query:

![The Tuva Project](/img/member_months/year_month_time_periods.png)

Step 2: We create a cte that shows for each member per month the previous month where they were enrolled in the plan, and the next month where they were enrolled in the plan. We'll also include the gap size between these months. This will allow us to tell if there are any gaps in enrollment indicating churn and/or returning patients. Below is a sample output of this second part of the query:

![The Tuva Project](/img/member_months/next_and_previous_gap_sizes.png)

Step 3: We can use the previous output to calculate whether a patient is new, already active, or returning after at least a month with no enrollment to a plan. We use logic about their previous gap sizes to calculate these. In addition, we use logic about the next month active gap size on these same records to determine wether the patient will churn during the following month. In this third step we start to group counts of patients in these different buckets. You'll notice in the output that there are multiple rows for active, new, and returning patients per month. This is because some of these are records with churn and some are records without churn. No worries. We account for this in the final grouping and aggregation. Below is a sample output of this third part of the query:

![The Tuva Project](/img/member_months/calculating_churn.png)

Step 4: Finally we put it all together by summing up the counts for each category using the previous gap, and then union that with a set of records summing up the counts for all the churning records. The churning happens in the following time period so we add one time period to the current time period to denote the month when the churn happens. Below is the final query will all the steps included and a sample output of the whole query based on the tuva project sample dataset:

```sql
--Step 1--
with distinct_member_months as
(
    select distinct year_month
    from tuva_claims_demo_full.pmpm.intermediate_member_months
    order by year_month
)
,member_month_time_periods as
(
select 
    year_month
    ,row_number() over(order by year_month asc) as time_period
from distinct_member_months 
)
--Step 2--
,previous_next_year_month_active as 
(
    select 
        imm.patient_id
        ,imm.year_month
        ,mmtp.time_period
        ,mmtp2.year_month as next_calendar_year_month
        ,lag(mmtp.time_period,1) over (partition by imm.patient_id order by imm.patient_id, mmtp.time_period) as previous_time_period_active
        ,lead(mmtp.time_period,1) over (partition by imm.patient_id order by imm.patient_id, mmtp.time_period) as next_time_period_active
    from tuva_claims_demo_full.pmpm.intermediate_member_months imm
    inner join member_month_time_periods mmtp on imm.year_month = mmtp.year_month
    left join member_month_time_periods mmtp2 on mmtp.time_period + 1 = mmtp2.time_period
)
,previous_next_with_diffs as 
(
    select 
        patient_id
        ,year_month
        ,time_period
        ,next_calendar_year_month
        ,previous_time_period_active
        ,next_time_period_active 
        ,time_period - previous_time_period_active as previously_active_gap_size 
        ,next_time_period_active - time_period as next_active_gap_size 
    from previous_next_year_month_active
)
--Step 3--
,new_active_return_calcs as 
(
    select 
        year_month
        ,time_period
        ,next_calendar_year_month
        ,case 
            when time_period = 1 then 'ACTIVE'
            when previous_time_period_active is null then 'NEW'
            when previously_active_gap_size = 1 then 'ACTIVE'
            when previously_active_gap_size > 1 then 'RETURN'
            end as this_month_value
        ,case 
            when time_period = (select max(time_period) from member_month_time_periods) then NULL
            when (next_active_gap_size > 1 OR next_active_gap_size IS NULL) then 'CHURN'
            else NULL
            end as next_month_churn
        ,count(distinct patient_id) as count_patients
    from previous_next_with_diffs
    group by 
        1,2,3,4,5
)
--Step 4--
select 
    year_month
    ,time_period
    ,this_month_value
    ,sum(count_patients) as count_patients
from new_active_return_calcs 
group by 
    year_month
    ,time_period
    ,this_month_value

union

select 
    next_calendar_year_month
    ,time_period + 1
    ,'CHURN'
    ,sum(count_patients) as count_patients 
from new_active_return_calcs
where next_month_churn = 'CHURN' --is not null
group by 1,2,3
order by 2
;
```
Here's some sample output of the whole query put together based on the tuva project demo dataset:

![The Tuva Project](/img/member_months/grouped_churn_counts_per_month.png)

This final example is based on the tuva project demo dataset and is not toally realistic, but you can see how this chart might help you monitor churn in your real populations.

![The Tuva Project](/img/member_months/churn_graph.png)