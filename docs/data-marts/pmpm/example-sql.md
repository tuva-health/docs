---
id: example-sql
title: "Example SQL"
---

<details><summary>Trending PMPM over time by service category</summary>

```sql
select 
  year_month
, member_month_count as member_months
, medical_pmpm
, inpatient_pmpm
, outpatient_pmpm
, office_visit_pmpm
, ancillary_pmpm
, other_pmpm
from pmpm.pmpm_trends
order by 1
```

</details>