---
id: medical-claim
title: "Medical Claim"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The medical_claim table contains information on healthcare services and supplies 
provided to patients, billed by providers, and paid for by health insurers.  
It includes information on the provider who rendered the service, the amount 
paid for the service by the health insurer, and the underlying reason for the 
service (i.e. diagnosis).  

The medical_claim table in core has been enhanced with concepts like service 
category and encounter that are useful for analytics.

**Primary Keys:**
  * claim_id
  * claim_line_number
  * data_source

**Foreign Keys:**
  * person_id
  * member_id
  * encounter_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__medical_claim.columns" />