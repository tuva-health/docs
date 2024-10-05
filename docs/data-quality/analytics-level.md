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

## Financial PMPM

## ED Visits

ED visit analysis is one of the most common types of analysis.  Here we assess whether the ED visit PKPY rate is reasonable and also whether the distribution of ED Visits by preventable classification is reasonable.

- ED Visits PKPY
- ED Classification

## Acute Inpatient Visits

- Acute IP PKPY
- ALOS
- Avg Paid Amount
- Avg Mortality Rate
- Top DRGs

## Readmissions

## CMS-HCCs

## Quality Measures