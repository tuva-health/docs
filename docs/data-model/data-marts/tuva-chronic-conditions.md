---
id: tuva-chronic-conditions
title: "Tuva Chronic Conditions"
---


import { JsonDataTable } from '@site/src/components/JsonDataTable';

There are two main output tables from this data mart:
- **Tuva Chronic Conditions Long:** A unioned table with all qualifying encounters per patient-condition
- **Tuva Chronic Conditions Wide:** A pivoted table with one record per patient and each condition flag is a separate column

## Tuva Chronic Conditions Long

This table contains one record per patient per chronic condition.  For example, if a patient has 3 chronic conditions they will have 3 records in this table.  Each record includes the condition category, condition, date of onset, most recent diagnosis, and the total count of diagnosis codes that were recorded that are relevant for the condition.

<JsonDataTable  jsonPath="nodes.model\.tuva_chronic_conditions\.tuva_chronic_conditions__tuva_chronic_conditions_long.columns" />

## Tuva Chronic Conditions Wide

This table contains a single record per patient with separate binary (i.e. 0 or 1) columns for every chronic condition.  If a patient has a particular chronic condition they will have a 1 in that particular column and 0 otherwise.

<JsonDataTable  jsonPath="nodes.model\.tuva_chronic_conditions\.tuva_chronic_conditions__tuva_chronic_conditions_wide.columns"  />
