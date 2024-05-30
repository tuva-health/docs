---
id: reference-data
title: "Reference Data"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## ansi_fips_state

[FIPS state codes](https://www.census.gov/library/reference/code-lists/ansi.html) assigned by ANSI and used by the Census Bureau 

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.reference_data__ansi_fips_state.columns" />

## calendar

A table containing every calendar day from 1/1/1900 through 1/12/2119, along with other helpful metadata like day of week and first/last day of month

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.reference_data__calendar.columns" />


## code_type

A list of all standardized code type names used in the tuva project marts.  Input layer should
use these values for source_code_type or normalized_code_type in order for codes to be recognized
in marts.

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.reference_data__code_type.columns" />

## fips_county

A dictionary of all fips county codes

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.reference_data__fips_county.columns" />

[//]: # (## social vulnerability index)

[//]: # ()
[//]: # (two files need to go here)

[//]: # ()
[//]: # (<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.terminology__fips_county.columns" />)

## ssa_fips_state

A dictionary of all fips state codes maintained by the SSA

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.reference_data__ssa_fips_state.columns" />