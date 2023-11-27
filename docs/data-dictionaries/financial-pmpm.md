---
id: financial-pmpm
title: "Financial PMPM"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## pmpm

A table at the member month grain with total, medical, and pharmacy paid amounts broken out by service category.

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.financial_pmpm__pmpm.columns" />

## pmpm_prep

Member-month-level table (i.e. one record per member per month of eligibility).

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.financial_pmpm__pmpm_prep.columns" />
