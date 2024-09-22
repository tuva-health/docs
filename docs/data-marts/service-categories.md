---
id: service-categories
title: "Service Categories"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Overview

[Code on Github](https://github.com/tuva-health/tuva/tree/main/models/claims_preprocessing)

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

## Instructions

### Input Layer Field Requirements

### dbt Configuration

No special dbt configurations are required to run this data mart.

## Data Dictionary

### service_category_grouper

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.service_category__service_category_grouper.columns" />

## Methodology

## Example SQL