---
id: pmpm
title: "PMPM"
---
The PMPM data mart transforms data from the Claims Common Data Model into a table that makes it easy to calculate spend and utilization measures over any time period and for any patient population.  It does this by 1) transforming eligibility data into member months and 2) using the encounter grouper logic from the Claims Preprocessing data mart to bucket spend and utilization by encounter type (e.g. emergency department).

The PMPM data mart outputs a single data table called pmpm_builder.

## PMPM Builder

### Description
The readmission summary table is the output table from the readmissions data mart.  It contains all the columns needed to do hospital readmission analytics in a single table.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique identifier for each patient in the dataset. |
| year_month | varchar | no | Concatenation of the year and month for the record. Each patient has one record per year_month of their eligibility, or in other words, one record per member month. |
| total_spend | float | no | This metric sums the total paid amounts for pharmacy and medical claims for each member month. |
| medical_spend | float | no | This metric sums the medical claims paid amounts for each member month. |
| pharmacy_spend | float | no | This metric sums the pharmacy claims paid amounts for each member month. |
