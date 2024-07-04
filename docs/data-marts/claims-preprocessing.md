---
id: claims-preprocessing
title: "Claims Preprocessing"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

[Code](https://github.com/tuva-health/tuva/tree/main/models/claims_preprocessing)

The Claims Preprocessing data mart assigns each claim to a mutually exclusive and exhaustive service category and groups multiple claims into distinct encounters.

| **Service Category 1** | **Service Category 2** |
| --- | --- |
| Inpatient | Acute Inpatient |
| Inpatient | Skilled Nursing |
| Inpatient | Inpatient Psychiatric |
| Inpatient | Inpatient Rehabilitation |
| Inpatient | Hospice |
| Inpatient | Other |
| Outpatient | Emergency Department |
| Outpatient | Urgent Care |
| Outpatient | Outpatient Hospital/Clinic |
| Outpatient | Outpatient Psychiatric |
| Outpatient | Outpatient Rehabilitation |
| Outpatient | Ambulatory Surgery |
| Outpatient | Dialysis |
| Outpatient | Hospice |
| Outpatient | Home Health |
| Outpatient | Other |
| Office Visit | Office Visit |
| Ancillary | Ambulance |
| Ancillary | DME |
| Ancillary | Lab |
| Other | Other |

## service_category_grouper

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.service_category__service_category_grouper.columns" />

## acute_inpatient_summary

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.acute_inpatient__summary.columns" />

## emergency_department_summary

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.emergency_department__summary.columns" />