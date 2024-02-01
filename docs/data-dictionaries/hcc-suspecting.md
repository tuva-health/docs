---
id: hcc-suspecting
title: "HCC Suspecting"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The HCC Suspecting mart contains concepts to identify suspecting conditions for 
risk adjustment.

## list

This final model displays the list of suspecting conditions per patient with 
the reason and contributing factors.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_suspecting__list.columns" />

## summary

This final model displays a rollup of suspecting conditions per patient.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_suspecting__summary.columns" />
