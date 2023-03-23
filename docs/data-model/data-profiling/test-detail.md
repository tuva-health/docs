---
id: test-detail
title: "Test Detail"
---


import { JsonDataTable } from '@site/src/components/JsonDataTable';

A detaild table of all test failures. This table will contain a row for every record that failed a test, and can be joined back to the source_table via the foreign_key. The table also reports the test, test category, grain of the test, and relevant claim type of the test if applicable for the failed records.

<JsonDataTable jsonPath="nodes.model\.data_profiling\.data_profiling__test_detail.columns" />