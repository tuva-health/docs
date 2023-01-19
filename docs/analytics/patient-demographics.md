---
id: patient-demographics
title: "Patient Demographics"
---
## Key Questions
- What's the distribution of my patient population by age, gender, and race?

## Age

Age is an extremely important variable for almost any healthcare data analysis.  For example, it’s used in many risk adjustment and risk stratification algorithms.  Although birth_date is commonly provided in most claims datasets, data quality problems are common with this data element.

**Raw Claims Data Elements**

Patient age can be calculated from the birth_date field in the eligibility table in the Tuva Claims CDM.  Most claims datasets include a birth date field (even de-identified datasets).

- birth_date

**Methods**

There are two different methods that are commonly used to calculate age.  The appropriate method depends on your specific use case.  The two most common methods are 1) the current date method 2) the event-based method.

The current date method calculates a patient’s age based on the date when the SQL was run (e.g. today’s date if you run the SQL today).  This is a good method if your use case requires up-to-date info on the patient’s age.  For example, if you’re creating a patient cohort using age as a variable and want age calculated as of today’s date.

```sql
select distinct
    patient_id
,   floor(datediff(day, birth_date, current_date)/365) as age
from claims_common.eligibility
```

The event-based method calculates the patient’s age based on the date when some event occurred.  A common event is an inpatient admission.  For example, if you’re trying to predict the probability of a hospital readmission you would want to calculate a patient’s age at the time of the index (i.e. original) hospitalization

**Data Quality Problems**

- **Missing:** A given patient does not have a birth date.
- **Duplicate:** A given patient may have multiple birth dates, in which case it can be difficult to know which birth date to trust or use.
- **Inaccurate:** The birth date for a given patient may not be accurate.

The following SQL example generates a frequency distribution of patients by age group, including a category for patients that are missing birth_date.  If the distribution doesn’t match your expectation about the age of the patient population in your dataset you may have inaccurate information on patient birth_date.

```sql
with patient as
(
select distinct
    patient_id
,   birth_date
from claims_common.eligibility
)

, age as
(
select
    patient_id
,   floor(datediff(day, birth_date, current_date)/365) as age
from patient
)

, age_groups as
(
select
    patient_id
,   age
,   case 
        when age <= 0 and age < 2 then '0-2'
        when age <= 2 and age < 18 then '2-18'
        when age <= 18 and age < 30 then '18-30'
        when age <= 30 and age < 40 then '30-40'
        when age <= 40 and age < 50 then '40-50'
        when age <= 50 and age < 60 then '50-60'
        when age <= 60 and age < 70 then '60-70'
        when age <= 70 and age < 80 then '70-80'
        when age <= 80 and age < 90 then '80-90'
        when age > 90 then '> 90'
        else 'Missing Age' 
    end as age_group
from age
)

select
    age_group
,   count(distinct patient_id) as patients
,   cast(100 * count(distinct patient_id)/sum(count(distinct patient_id)) over() as numeric(38,1)) as percent
from age_groups
group by age_group
order by 1
```
Here's an example of what the results look like from the Tuva Claims Demo dataset.

![Patient Age Groups](/img/patient_age_groups.jpg)

The following SQL example identifies patients that have multiple birth_date values.

```sql
with patients as (
select distinct
    patient_id
,   birth_date
from claims_common.eligibility
)

select
    patient_id
,   count(1)
from patients
group by 1
having count(1) > 1
```

## Gender

- Do any patients have more than one gender?
    - For patients w/ more than one gender, is there evidence of gender-reassignment surgery?
    - For patients w/ more than one gender, do diagnosis and/or procedure codes provide clues as to the correct gender?