---
id: hcc-suspecting
title: "HCC Suspecting"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

[Code](https://github.com/tuva-health/tuva/tree/main/models/hcc_suspecting)

The HCC Suspecting data mart identifies patients that are suspected to have an HCC in the payment year but don't presently have one recorded based on historical problems, medications, and lab test results.

The terminology set SNOMED-CT to ICD-10-CM Map is used to capture additional 
suspecting conditions coded in a system that is not part of the CMS HCC model. 
This use-case follows the default mapping guidance from NLM which specifies 
that the map priority rule of “TRUE” or “OTHERWISE TRUE” should be applied if 
nothing further is known about the patient’s condition.

## list

This final model displays the list of suspecting conditions per patient with 
the reason and contributing factors.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_suspecting__list.columns" />

## summary

This final model displays a rollup of suspecting conditions per patient.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_suspecting__summary.columns" />

