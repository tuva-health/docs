---
id: eligibility
title: "Eligibility"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The eligibility table includes information about a patient's health insurance 
coverage and demographics (note: we use the word patient as a synonym for 
member).  Every claims dataset should include some sort of eligibility data, 
otherwise it's impossible to calculate member months, which are needed to 
calculate measures like PMPM.

**Primary Keys:**
  * person_id
  * member_id
  * enrollment_start_date
  * enrollment_end_date
  * payer
  * plan
  * data_source

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__eligibility.columns" />