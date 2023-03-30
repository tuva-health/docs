---
id: eligibility
title: "Eligibility"
---
This section explains what eligibility data is and how to use it to calculate member months, as well as membership growth and churn analytics.

## Understanding Eligibility Data

Eligibility information in claims data tells you when a patient was eligible to receive healthcare services and/or supplies that were covered by their insurer.  There are a few key pieces of information generally included in eligibility data:

- **patient_id:** Identifies a unique patient
- **payer:** Identifies the health insurance company the patient has/had insurance coverage through
- **enrollment_start_date:** The date when the patient first gained insurance coverage
- **enrollment_end_date:** The date when the patient's insurance coverage ended

Note: We use the words eligibility and enrollment interchangeably.  We also use the words patient and member interchangeably.

Eligibility data is most commonly modeled in what we call the **enrollment format**.  In this format, each patient has exactly one record per enrollment span.  An enrollment span is a record in an eligibility data table that includes both a start and end date for a specific patient.  For example, the following 3 records are each enrollment spans:

| patient_id | payer | enrollment_start_date | enrollment_end_date |
| --- | --- | --- | --- |
| A1234 | Aetna | 01-01-2022 | 06-15-2022 |
| A1234 | Aetna | 08-10-2022 | |
| B2468 | Aetna | 01-01-2022 | 12-31-2022 |

The example above includes eligibility data on two patients: A1234 and B2468.  A1234 has two enrollment spans.  The first span begins 01-01-2022 and ends 06-15-2022.  It ends in the middle of the month.  This patient may have lost eligibility during the middle of the month because they lost their job or changed to their spouse's health insurance.  The patient then regained eligibility on 08-10-2022, possibly by getting their job back or switching insurance from their spouse's back to their employer.  

Notice that there is no end date for the second enrollment span for patient A1234.  This isn't a data quality problem.  Rather, it's what's called an open enrollment span.  An open enrollment span is simply an enrollment span that has no end date.  It indicates the patient currently has insurance coverage.  It may be represented by a null value (as in the example above) in the enrollment_end_date, or it's also common to see this represented as 12-31-9999.

## Calculating Member Months

This [section](../../data-marts/pmpm.md) of the PMPM data mart describes how we calculate member months in the Tuva Project.


## Membership Growth / Churn Analytics

When performing membership growth / churn analytics, it's important to look at how many patients lost eligibility and how many new patients gained eligibility separately, so we can see whether high churn is being masked by high growth in membership at the same time. We may also want to see whether patients are leaving and then coming back, etc. 

The SQL further below includes a set of CTEs broken out into steps that you can run separately.  Immediately below we describe each step in detail.

**Step 1:** To make it simler to analyze over time, we'll associate simple integer time periods with each member month so we can add and subtract time periods easily. Below is a sample output of this first part of the query:

![The Tuva Project](/img/member_months/year_month_time_periods.png)

**Step 2:** In this step we calculate for each member and for each month of eligibility, we calculate whether the patient had eligibility the previous month and whether the patient had eligibility the following month. We also calculate the gap size between these months. This will allow us to tell if there are any gaps in enrollment indicating churn and/or returning patients. Below is a sample output of this second part of the query:

![The Tuva Project](/img/member_months/next_and_previous_gap_sizes.png)

Step 3: We can use the previous output to calculate whether a patient is new, already active, or returning after at least a month with no eligibility. We use logic about their previous gap sizes to calculate these. In addition, we use logic about the next month active gap size on these same records to determine wether the patient will churn during the following month. In this third step we start to group counts of patients in these different buckets. You'll notice in the output that there are multiple rows for active, new, and returning patients per month. This is because some of these are records with churn and some are records without churn. No worries. We account for this in the final grouping and aggregation. Below is a sample output of this third part of the query:

![The Tuva Project](/img/member_months/calculating_churn.png)

Step 4: Finally we put it all together by summing up the counts for each category using the previous gap, and then union that with a set of records summing up the counts for all the churning records. The churning happens in the following time period so we add one time period to the current time period to denote the month when the churn happens. Below is the final query will all the steps included and a sample output of the whole query based on the tuva project sample dataset:

```sql
--Step 1--
with distinct_member_months as
(
    select distinct year_month
    from pmpm.intermediate_member_months
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
    from pmpm.intermediate_member_months imm
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

This final example is based on the tuva project demo dataset, and is not toally realistic, but you can see how this chart might help you monitor churn in your real populations.

![The Tuva Project](/img/member_months/churn_graph.png)

## Tuva Project Queries
The following queries will run on any dataset that is running on the latest Tuva Project data model.

<details><summary>Calculating Member Months</summary>

```sql
with src as (
select
    patient_id,
    enrollment_start_date as start_date,
    enrollment_end_date as end_date,
    payer,
    payer_type
from claims_data_model.eligibility
)

, months as (
    select 1 as month
    union all 
    select 2 as month
    union all 
    select 3 as month
    union all 
    select 4 as month
    union all 
    select 5 as month
    union all 
    select 6 as month
    union all 
    select 7 as month
    union all 
    select 8 as month
    union all 
    select 9 as month
    union all 
    select 10 as month
    union all 
    select 11 as month
    union all 
    select 12 as month
)

, years as (
    select 2013 as year
    union all 
    select 2014 as year
    union all 
    select 2015 as year
    union all 
    select 2016 as year
    union all 
    select 2017 as year
    union all 
    select 2018 as year
    union all 
    select 2019 as year
    union all 
    select 2020 as year
    union all 
    select 2021 as year
    union all 
    select 2022 as year
    union all 
    select 2023 as year
)

, dates as (
select
    year
,   month
,   cast((cast(year as TEXT)||'-'||cast(month as TEXT)||'-01') as date) as month_start
,   cast(dateadd(day,-1,dateadd(month,1,date_trunc('month', cast((cast(year as TEXT)||'-'||cast(month as TEXT )||'-01') as date)))) as date) as month_end
from years
cross join months
)
select distinct
    patient_id,
    concat(cast(year as TEXT ),lpad(cast(month as TEXT),2,'0')) as year_month,
    payer,
    payer_type
from src
inner join dates
    on src.start_date <= dates.month_end 
    and  src.end_date >= dates.month_start
```

</details>

<details><summary>Trending Member Months</summary>

```sql
select 
    year_month
,   count(1) as members
from pmpm.intermediate_member_months
group by 1
order by 1
```
The following is example output from the above query run on the Tuva Claims Demo dataset:
![The Tuva Project](/img/member_months/plan_membership_trend_by_month.png)
</details>

<details><summary>Membership Growth Rate</summary>
This simple example does not separate out new members from churning members, like the section above on membership growth / churn analytics.

```sql
select 
    year_month
,   count(patient_id) as cnt_patients
,   count(patient_id) - coalesce(lag(count(patient_id)) over (order by year_month), 0) as overall_monthly_growth
,   round(100*(count(patient_id) - coalesce(lag(count(patient_id)) over (order by year_month), 0))/count(patient_id),2)||'%' as overall_monthly_growth_rate
from pmpm.intermediate_member_months
group by 1
order by 1
```
The following is example output from the above query run on the Tuva Claims Demo dataset. You can see for each month the change in the number of patients in the plan and the rate of growth or decline.

![The Tuva Project](/img/member_months/membership_growth_rate.png)
</details>

<details><summary>Members with Overlapping Enrollment Spans</summary>
You can query the member months table in the PMPM data mart to check whether any patient has more than one record for any particular month.  This query should return zero records unless you have patients with overlapping enrollment spans.  Note: this query awesomes each patient belongs to one and only one health plan at a time.

```sql
select 
    patient_id
,   year_month
,   count(1)
from pmpm.intermediate_member_months
group by 1,2
having count(1) > 1
```
</details>