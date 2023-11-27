---
id: chronic-conditions
title: "Chronic Conditions"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## cms_chronic_conditions_long

This table contains one record per patient per chronic condition.  For example, if a patient has 3 chronic conditions they will have 3 records in this table.  Each record includes the condition category, condition, date of onset, most recent diagnosis, and the total count of diagnosis codes that were recorded that are relevant for the condition.

This table is created by running the CMS chronic conditions data mart on data that's been mapped to the core data model.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__cms_chronic_conditions_long.columns" />

## cms_chronic_conditions_wide

This table contains a single record per patient with separate binary (i.e. 0 or 1) columns for every chronic condition.  If a patient has a particular chronic condition they will have a 1 in that particular column and 0 otherwise.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__cms_chronic_conditions_wide.columns"  />

## tuva_chronic_conditions_long

This table contains one record per patient per chronic condition.  For example, if a patient has 3 chronic conditions they will have 3 records in this table.  Each record includes the condition category, condition, date of onset, most recent diagnosis, and the total count of diagnosis codes that were recorded that are relevant for the condition.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__tuva_chronic_conditions_long.columns" />

## tuva_chronic_conditions_wide

This table contains a single record per patient with separate binary (i.e. 0 or 1) columns for every chronic condition.  If a patient has a particular chronic condition they will have a 1 in that particular column and 0 otherwise.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__tuva_chronic_conditions_wide.columns"  />