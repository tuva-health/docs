---
id: chronic-conditions
title: "Chronic Conditions"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The Chronic Conditions data mart implements two versions for classifying chronic
condition categories.

**CMS:** This version uses the logic created by CMS. There are 30 CCW Chronic Condition 
categories, available for file years 2017 forward, and 40 other chronic health, 
mental health, substance abuse, and potentially disabling condition categories 
available for file years 2000 forward. These reference only ICD-10 diagnosis 
codes and have modified look-back periods, qualifying claims, and codes. You 
can read more about CMS's logic [here](https://www2.ccwdata.org/web/guest/home/).

**Tuva:** A less strict interpretation of chronic conditions relying on Core 
Patient and Condition only. 

## cms_chronic_conditions_long

This table contains one record per patient per chronic condition. For example, 
if a patient has 3 chronic conditions they will have 3 records in this table. 
Each record includes the condition category, condition, date of onset, most 
recent diagnosis, and the total count of diagnosis codes that were recorded 
that are relevant for the condition.

This table is created by running the CMS chronic conditions data mart on data 
that's been mapped to the core data model.

**Primary Keys:**
  * patient_id
  * condition

**Foreign Keys:**
  * claim_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__cms_chronic_conditions_long.columns" />

## cms_chronic_conditions_wide

This table contains a single record per patient with separate binary 
(i.e. 0 or 1) columns for every chronic condition. If a patient has a 
particular chronic condition they will have a 1 in that particular column and 
0 otherwise.

**Primary Keys:**
  * patient_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__cms_chronic_conditions_wide.columns"  />

## tuva_chronic_conditions_long

This table contains one record per patient per chronic condition. For example, 
if a patient has 3 chronic conditions they will have 3 records in this table. 
Each record includes the condition category, condition, date of onset, most 
recent diagnosis, and the total count of diagnosis codes that were recorded 
that are relevant for the condition.

**Primary Keys:**
  * patient_id
  * condition

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__tuva_chronic_conditions_long.columns" />

## tuva_chronic_conditions_wide

This table contains a single record per patient with separate binary 
(i.e. 0 or 1) columns for every chronic condition. If a patient has a 
particular chronic condition they will have a 1 in that particular column and 
0 otherwise.

**Primary Keys:**
  * patient_id

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.chronic_conditions__tuva_chronic_conditions_wide.columns"  />

## value sets

See the value set data dictionaries [here](value-sets#chronic-conditions).
