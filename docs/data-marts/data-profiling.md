---
id: data-profiling
title: "Data Profiling"
---

<!-- import { CSVDataTable } from '@site/src/components/CSVDataTable'; -->

The Tuva Project's Data Profiling data mart includes approximately 250 data quality tests that are specific to healthcare claims data.  It summarizes the results into a few tables that make it easy to drill into the underlying drivers of your data quality problems.

**Relevant Links:**
- [Github Repo](https://github.com/tuva-health/data_profiling)
- [Data Dictionary](../data-model/data-marts/data-profiling.md)

## Claims Data Quality Issues

The process of generating claims data is heterogeneous and highly variable in nature.  As a result, the claims data you are using for analysis tends to suffer from many different types of data quality issues.  We've found that it's helpful to group the various types of data quality issues into 5 main categories: 

1. Duplicate Claims
2. Claim Type Issues
3. Header Issues
4. Invalid Values
5. Missing Values

### Duplicate Claims
Duplicate records in claims data can occur for different reasons and are very common.  You may have duplicate claims because the method used to transmit claims to you includes duplicate records.  Another cause of duplicate claims is claim adjustments, denials, and reversals.  

Whatever the cause, it's critical to ensure that each claim_id has one and only one value for each claim_line_number e.g. one line 1, one line 2, etc.

### Claim Type Issues
Every claim_id in your dataset should be assigned a valid claim_type, i.e. either 'institutional' or 'professional', and should be assigned one and only one claim_type.  The claim_type is analogous to the claim form.  A lot of downstream data transformation and analytics relies on each claim having an accurate claim_type. 

### Header Issues
As discussed in the previous section on claims data elements, a number of data elements reside on the header portion of the claim.  These data elements should only have a single value for each claim_id.  For example, each institutional claim should have one and only one bill_type_code.  Institutional claims with multiple values for bill_type_code will create problems for downstream processing and analytics.  There are approximately a dozen data elements that exist at the header level on institutional and professional claims that are important to check in this regard.

### Invalid Values
Many fields in claims data have specific reference terminology that determines their acceptable values.  For example, gender is only allowed to take 1 of 3 values: male, female, or unknown.  Downstream processing and analytics depend on the values in these fields being standardized.  

### Missing Values
Missing values are very common in claims data.  It's important to use the claim type to determine whether a value should be missing or not.  For example, bill_type_code should not be populated on professional claims, so a missing value in this case is expected, but it should always be populated on institutional claims.

## Using Data Profiling

### Summary
The Data Profiling data mart executes approximately 100 data quality tests against your claims data.  Each test is categorized into 1 of the 5 categories listed above.  After you successfully run the Data Profiling data mart on your claims data, start by using the query below to get a high-level summary of your claims data quality issues.  

```sql
select *
from data_profiling.summary
order by 1,3
```

![Data Profiling Summary](/img/data_profiling_summary.jpg)

In the example output above, you can see summary results of data quality for each table (column 1)  and each test category.  For example, on row 8 you can see that 8,235 claims from medical_claim had invalid values.  On row 10 you can see 66,196 claims had no data quality issues of any sort (i.e. their test category label was 'good').  

### Test Results

Next, you can drill into the specific data quality test results by using the query below.  This table is populated for every test that had at least 1 failure.  For example, on row 11 you can see ms_drg has invalid values on 100% of claims.

```sql
select *
from data_profiling.test_results
order by 1,3,4
```

![Data Profiling Test Results](/img/data_profiling_test_results.jpg)]

### Test Details

Next, you can drill into the specific records (e.g. claims) that have data quality issues by querying the test_detail table.  For example, the following query will return all the claim_ids that had an invalid ms_drg_code value.  You can easily join from this table back to your actual claims data in medical_claim to see what values are the issue.

```sql
select *
from data_profiling.test_detail
where test_name = 'ms_drg_code invalid'
```

## Data Profiling Test Catalog

The table below lists the data quality tests that are included in the Data Profiling repo.

<!-- <CSVDataTable csvUrl="https://raw.githubusercontent.com/tuva-health/data_profiling/main/seeds/data_profiling__test_catalog.csv" /> -->
