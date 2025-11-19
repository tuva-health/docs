---
id: member-months
title: "Member Months"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The Member Months table is commonly used for cost and utilization analysis when you need to normalize metrics to the covered population (i.e. by dividing the metric by member months).  

**Primary Keys:**
  * member_month_key

**Foreign Keys:**
  * person_id

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.core__member_months.columns" />