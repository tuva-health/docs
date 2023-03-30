---
id: data-profiling
title: "Data Profiling"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

There are three main output tables from this data mart:
- **Summary:** A high level table aggregating test failures by category
- **Test Detail:** A detailed row-level table containing a record for each failure
- **Test Result:** A table aggregating failure counts for every test

## Summary

A high level overview of all test failures. Shows aggregated counts of issues for every table and category of test.

<JsonDataTable jsonPath="nodes.model\.data_profiling\.data_profiling__summary.columns" />

## Test Detail

A detailed table of all test failures. This table will contain a row for every record that failed a test, and can be joined back to the source_table via the foreign_key. The table also reports the test, test category, grain of the test, and relevant claim type of the test if applicable for the failed records.

<JsonDataTable jsonPath="nodes.model\.data_profiling\.data_profiling__test_detail.columns" />

## Test Result

A Test-level table aggregating failures.  Every test being performed will have a record in this table, along with the number of failures and number of records to wich the test was applied (denominator).  It also records other metadata about theh test, such as the source table, grain of the test, category of the test, and type of claim to which the test is relevant if applicable.

<JsonDataTable jsonPath="nodes.model\.data_profiling\.data_profiling__test_result.columns" />