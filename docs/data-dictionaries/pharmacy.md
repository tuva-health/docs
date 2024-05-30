---
id: pharmacy
title: "Pharmacy"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The pharmacy mart currently has 3 data tables, focused around brand and generic analysis.

## brand_generic_opportunity

This model contains a row for each claim and line number of each brand that had a generic available. It calculates an opportunity amount for claim and line.

**Primary Key:**
  * data_source
  * claim_id
  * claim_line_number
  
<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.pharmacy__brand_generic_opportunity.columns" />
</div>

## generic_available_list

This model contains a row for each generic ndc that is available (for a given brand ndc code). It can be joined back to the pharmacy_claim_expanded table on the generic_available_sk column.

**Primary Key:**
  * generic_available_sk
  * generic_ndc
    
<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.pharmacy__generic_available_list.columns" />
</div>

## pharmacy_claim_expanded

This model contains a row for pharmacy claim and line. It includes the columns from core.pharmacy_claim, but adds the output of the additional calculations done in the pharmacy mart.

**Primary Key:**
  * data_source
  * claim_id
  * claim_line_number
    
<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.pharmacy__pharmacy_claim_expanded.columns" />
</div>

