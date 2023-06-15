---
id: long-condition-category
title: "Long Condition Category"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

This table contains one record per patient per chronic condition.  For example, if a patient has 3 chronic conditions they will have 3 records in this table.  Each record includes the condition category, condition, date of onset, most recent diagnosis, and the total count of diagnosis codes that were recorded that are relevant for the condition.

This table is created by running the CMS chronic conditions data mart on data that's been mapped to the core data model.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.ccsr__long_condition_category.columns" />
