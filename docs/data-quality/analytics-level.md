---
id: analytics-level
title: "Analytics-level"
hide_title: false
---

Once you've completed the atomic-level data quality checks you're ready to move on the analytics-level.  Analytics-level data quality is all about understanding:

1. Which analyses your data is able to support 
2. Are the results your data generates for those analyses reasonable

Analytics-level includes the most commonly used types of analyses, but it doesn't include every analysis (this is impossible).  Like atomic-level, the analytics-level checks below are intended to be used as a checklist.  Every check exists as a data table in the Tuva Data Model and the documentation below describes why the check is important and how to use these tables to perform the check.

Since many of the analytics-level checks involve assessing reasonableness, it's important to have something to compare to.  For many of the checks we include benchmarks based on Medicare FFS claims data.  While not perfect for comparing to commercial and Medicaid populations, it still adds directional value (e.g. is a reasonable PMPM closer to $400 or $4,000).

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

Chronic diseases follow a very predictable distribution in patient populations.  Here we check the prevalence of the top 10 most chronic conditions in the dataset to ensure it's approximately what we would expect.  We include Medicare FFS benchmarks for comparison.

```sql
select *
from data_quality.chronic_condition_prevalence
```

## Service Categories

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

ED visit analysis is one of the most common types of analysis.  Here we assess whether the ED visit PKPY rate is reasonable and also whether the distribution of ED Visits by preventable classification is reasonable.

- ED Visits PKPY
- ED Classification
- ED to inpatient admit rate

```sql
select *
from data_quality.ed_visits
```

## Acute Inpatient Visits

Acute inpatient visits represent a significant portion of healthcare costs and are an important indicator of population health. This section analyzes various aspects of inpatient care, including visit rates, length of stay, costs, mortality rates, and case mix complexity. These metrics help in understanding the intensity and quality of inpatient care delivery.

- Acute IP PKPY
- ALOS
- Avg Paid Amount
- Avg Mortality Rate
- Top DRGs
- Case mix index

```sql
select *
from data_quality.acute_inpatient_visits
```

## Readmissions

Readmission rates are a key quality indicator in healthcare. This section focuses on 30-day readmission rates, both overall and for specific diagnoses. Understanding readmission patterns can help identify opportunities for improving care transitions and reducing unnecessary hospitalizations.

- 30-day readmission rate
- DRG specific readmission rates

```sql
select *
from data_quality.readmissions
```

## CMS-HCCs

The CMS Hierarchical Condition Category (HCC) risk adjustment model is widely used to predict healthcare costs. This section examines risk scores, comorbidity rates, and trends in risk scores over time. These analyses help in understanding the health status and predicted resource utilization of the population.

- Risk scores
- Comorbidity rates and associated risk scores
- Trend analysis of risk scores

```sql
select *
from data_quality.cms_hcc
```

## Quality Measures

Quality measures are essential for assessing the effectiveness and efficiency of healthcare delivery. This section looks at various quality measure rates, their trends over time, and gaps in care. These analyses provide insights into the quality of care being delivered and areas for potential improvement.

- Measure rates
- Trend analysis of measure rates
- Gaps in care rates

```sql
select *
from data_quality.quality_measures
```