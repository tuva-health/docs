---
id: provider
title: "Provider"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Description
Procedures are treatments performed by clinicians for patients to help manage or alleviate conditions.  Important ancillary data related to procedures includes the date performed and the performing clinician.  Common procedure codes include ICD-10-PCS and HCPCS.

## Mapping Guidelines 
This grain of this table is the encounter and procedure level.  Every procedure must have a corresponding encounter during which the procedure was performed.

## Data Dictionary

<JsonDataTable jsonPath="nodes.model\.claims_preprocessing\.claims_preprocessing__provider.columns" />
