---
id: analytics-level
title: "Analytics-level"
hide_title: false
---

Once you've completed the atomic-level data quality checks you're ready to move on the analytics-level.  Analytics-level data quality is all about understanding:

1. Which analyses your data is able to support 
2. Are the results your data generates for those analyses reasonable

Analytics-level includes the most commonly used types of analyses, but it doesn't include every analysis (this is impossible).  Like atomic-level, the analytics-level checks below are intended to be used as a checklist.  Every check exists as a data table in the Tuva Data Model and the documentation below describes why the check is important and how to use these tables to perform the check.

Since many of the analytics-level checks involve assessing reasonableness, it's important to have something to compare to.  For many of the checks we include reference data points based on Medicare FFS claims data.  While not perfect for comparing to commercial and Medicaid populations, it still adds directional value (e.g. is a reasonable PMPM closer to $400 or $4,000).

We have organized most of the analytics data quality checks into two tables for ease of use.

The analytics reference summary table unions together the various analytics measures and their associated values in the Medicare FFS claims data set. 

```sql
select *
from data_quality.analytics_reference_summary
```

The analytics checks summary table unions together the different data quality checks and the count of results for each of those checks. Some of the checks are seen as "never events," meaning any result greater than zero is a problem worth looking into. Others are checks where results aren't a problem. The two different types of checks are separated with the "data check zero flag" in the data.

```sql
select *
from data_quality.analytics_checks_summary
```

## Core Populated

The most basic check we perform in the analytics-level is to confirm whether or not the Core Data Model is populated.  Sometimes Tuva will build all data tables in the data model but because of data quality problems a set of tables will end up with zero records (i.e. is not populated).  This check gives us a quick glance at whether or not this is happening in the Core Data Model.

```sql
select *
from data_quality.core_populated
```

## Analytics Populated

On top of the Core Data Model are the Data Marts.  We use these Data Marts to perform analytics.  However sometimes the tables are not populated because of data quality issues.  This table let's us see if this is happening at a glance.

```sql
select *
from data_quality.analytics_populated
```

## Chronic Conditions

Chronic diseases follow a very predictable distribution in patient populations.  Here we check the prevalence of the top 10 most common chronic conditions in the dataset to ensure it's approximately what we would expect.  We include Medicare FFS benchmarks for comparison.

```sql
select *
from data_quality.chronic_condition_prevalence
```

## Encounter Types and Service Categories

Service categories provide insight into the distribution of healthcare services across different types of care. This section examines the utilization rates, costs, and trends associated with various service categories. Understanding these patterns helps identify potential areas of concern or opportunity in healthcare delivery.

- Utilization rates per category
- Cost per service category
- Trend analysis of service category utilization

```sql
select *
from data_quality.service_category_utilization
```

## Financial PMPM

Per Member Per Month (PMPM) costs are a key metric in healthcare analytics. This section evaluates overall PMPM costs, as well as PMPM costs broken down by service category and specific chronic conditions. These analyses help in understanding the financial aspects of healthcare delivery and identifying cost drivers.

- Overall PMPM costs
- PMPM costs by service category
- PMPM costs for specific chronic conditions

```sql
select *
from data_quality.financial_pmpm
```

## ED Visits

ED visit analysis is one of the most common types of analysis.  The ED visit PKPY rate is covered under the encounter and service category sections. Here we specifically look at whether the distribution of ED Visits by preventable classification is reasonable and if each of the important categories are populated

In this table we check to make sure each of the avoidable or non avoidable categories of emergency department use are populated. If one or more of the sections is missing in the data, a 1 would appear in the result_count column. This would likely indicate an issue with diagnosis code mapping as the classification algorithm is diagnosis code based.

```sql
select *
from dev_brad.data_quality.data_quality_ed_classification
```

This table checks the distribution of each of the categories of the ED classification algorithm and compares it to the CMS FFS claims data distribution. If a larger portion of ED visits is "Not Classified" than the CMS data, it could indicate a data quality issue; specifically, with the primary diagnosis code.

```sql
select *
from dev_brad.data_quality.data_quality_ed_classification_reference
```



**Atomic Checks** 
The following atomic checks would be a good place to check for data quality issues if the analytics check surface any potential issues

- icd_diagnosis_code
- bill_type_code

## Acute Inpatient Visits

Acute inpatient visits represent a significant portion of healthcare costs and are an important indicator of population health. This section analyzes various aspects of inpatient care, including visit rates, length of stay, costs, mortality rates, and case mix complexity. These metrics help in understanding the intensity and quality of inpatient care delivery.

- ALOS
- Avg Mortality Rate
- Top DRGs

This table checks if any acute inpatient encouters don't have any matched professional claims associated with them. Professional claims are matched with institutional claims as part of the encounter building process. If there weren't any professional claims that could be matched (based on claim dates and patient_id) to institutional claims, they will be flagged here.

```sql
select *
from data_quality.data_quality_acute_inpatient
```

This table measures the average length of stay and mortality rate of inpatient encounters and compares it to the Medicare FFS claims data value. If there is any variance of +- 2 days on the length of stay, it warrants digging into the data to understand further. Mortality rate can vary based on the type of population.

```sql
select *
from data_quality.data_quality_acute_inpatient_reference
```

This table measures the prevelence of the top 10 DRGs in the data and compares their preveleance to the top 10 DRGs in Medicare data. If the most common from Medicare are not found in the data_source it could indicate a problem with the data. It could also mean the population is different from the Medicare population.

```sql
select *
from data_quality.data_quality_acute_inpatient_prevelence
```

**Atomic Checks** 
The following atomic checks would be a good place to check for data quality issues if the analytics check surface any potential issues

- icd_diagnosis_code
- ms_drg_code
- bill_type_code
- claim_line_start_date
- claim_line_end_date
- claim_start_date
- claim_end_date
- admit_date
- discharge_date

## Readmissions

Readmission rates are a key quality indicator in healthcare. This section focuses on 30-day readmission rates, both overall and for specific diagnoses. Understanding readmission patterns can help identify opportunities for improving care transitions and reducing unnecessary hospitalizations.

- 30-day readmission rate

This table checks the various reasons inpatient encounters weren't eligibile to be an index admission (and therefore excluded from the readmissions calculation). Some amount of encounters with data quality issues is unavoidable in claims data, but if the number of encounters is higher than a few percentage points of total encounters, it is worth digging into the issue.

```sql
select *
from data_quality.data_quality_readmissions
```

This table compares the readmission rate of the data_source with the readmission rate from the Medicare FFS claims data set. Normal variation of readmission rates are between 5% and 20%. Anything outside of that range is unusually high or low and should be researched further.


```sql
select *
from data_quality.data_quality_readmissions_reference
```



**Atomic Checks** 
The following atomic checks would be a good place to check for data quality issues if the analytics check surface any potential issues

- icd_diagnosis_code
- ms_drg_code
- bill_type_code
- admit_date
- discharge_date

## CMS-HCCs

The CMS Hierarchical Condition Category (HCC) risk adjustment model is widely used to predict healthcare costs. This section examines risk scores, comorbidity rates, and trends in risk scores over time. These analyses help in understanding the health status and predicted resource utilization of the population.

This table checks that both the demographic factors and disease factors are present in the cms-hcc mart. If there is an issue with enrollment or diagnosis codes, this can cause either factor to not be populated. A result count of 1 means that the factor was missing from the data.

```sql
select *
from data_quality.data_quality_cms_hcc
```

This table checks the average CMS HCC score for the data source and compares it to the average score from Medicare FFS claims data. This should be around 1 for Medicare populations. If there is significant deviance from 1 (<.7 or >1.5), this could inidicate a problem with your data. If a population is known to be very healthy or very sick, then that could explain the high variance. 

For commercial and medicaid populations, the risk score is unable to be compared as the CMS-HCC risk algorhythm was specifically trained on Medicare populations and their specific conditions. 

```sql
select *
from data_quality.data_quality_cms_hcc_reference
```

**Atomic Checks** 
The following atomic checks would be a good place to check for data quality issues if the analytics check surface any potential issues:

- icd_diagnosis_code
- enrollment_start_date
- enrollment_end_Date
- sex
- birth_date



## Quality Measures

Quality measures are essential for assessing the effectiveness and efficiency of healthcare delivery. This section looks at various quality measure rates, their trends over time, and gaps in care. These analyses provide insights into the quality of care being delivered and areas for potential improvement.

- Measure rates
- Trend analysis of measure rates
- Gaps in care rates

```sql
select *
from data_quality.data_quality_quality_measures
```

Here we check if the numerator or denominator of any of the measures are 0. While is is possible a population might have 0 in either category, it is unlikely, so we are flagging the number of quality measures that pertain to each, and recommend looking into possible reasons why that might be plausible or not.

```sql
select *
from data_quality.data_quality_quality_measures_reference
```

Here we compare the percent (numerator / denominator) on each measure against the Medicare FFS claims data set. This can be helpful to compare the value for each measure to see reasonableness. Some measures might have a very low percent, while others a very high percent. If results in yours data are drastically different, it might indicate a data quality issue.

**Atomic Checks** 
The following atomic checks would be a good place to check for data quality issues if the analytics check surface any potential issues:

- icd_diagnosis_code
- enrollment_start_date
- enrollment_end_Date
- sex
- birth_date
- hcpcs_code
- icd_procedure_code