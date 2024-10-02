---
id: analytics-level
title: "Analytics-level"
hide_title: false
---

Once you've completed the Atomic-level data quality checks you're ready to move on the Analytics-level.  Analytics-level data quality is all about understanding a) which analyses your data is able to support and b) are the results your data generates for those analyses reasonable.

Analytics-level includes the most commonly used types of analyses, but it doesn't include every analysis (this is impossible).  Like atomic-level, the analytics-level checks below are intended to be used as a checklist.  Every check exists as a data table in the Tuva Data Model and the documentation below describes how to use these tables to perform the check.

Since many of the analytics-level checks involve assessing reasonableness, it's important to have something to compare to.  For many of the checks we include benchmarks based on Medicare FFS claims data.  While not perfect for comparing to commercial and Medicaid populations, it still adds directional value (e.g. is a reasonable PMPM closer to $400 or $4,000).

## Overview

The most basic check we perform in the analytics-level is to confirm whether or not each data mart is populated.  Sometimes Tuva will build all data tables in the data model but because of data quality problems a set of tables will end up with zero records.  This check gives us a first glance at whether or not this is happening.

```sql
select *
from data_quality.data_marts_populated
```

## Chronic Conditions

Chronic diseases follow a very predictable distribution in patient populations.  Here we check the prevalence of the top 20 most chronic conditions in the dataset.  We include Medicare FFS benchmarks for comparison.

```sql
select *
from data_quality.chronic_condition_prevalence
```

## ED Visits

ED visit analysis is one of the most common types of analysis.  Here we assess whether the ED visit PKPY rate is reasonable and also whether the distribution of ED Visits by preventable classification is reasonable.

- ED Visits PKPY
- ED Classification

## Acute Inpatient Stays

## Readmissions

## Service Categories

## Financial PMPM

## CMS-HCCs

## Quality Measures