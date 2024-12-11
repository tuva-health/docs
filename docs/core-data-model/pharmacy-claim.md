---
id: pharmacy-claim
title: "Pharmacy Claim"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The pharmacy_claim table includes information about retail and specialty drug 
prescriptions that have been filled by a patient, billed by a pharmacy, and 
paid by an insurer.  The pharmacy_claim table is at the claim-line grain.

**Primary Keys:**
  * claim_id
  * claim_line_number
  * data_source

**Foreign Keys:**
  * person_id
  * member_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__pharmacy_claim.columns" />