---
id: readmissions
title: "Readmissions"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## readmission_summary

The readmission summary table is the output table from the readmissions data mart.  It contains all the columns needed to do hospital readmission analytics in a single table.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.readmissions__readmission_summary.columns"  />

## encounter_augmented

A table detailing all encounters with extra information related to the encoutner, and flags for infromation that might readmission affect the readmission calculations.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.readmissions__encounter_augmented.columns"  />