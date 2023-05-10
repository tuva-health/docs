---
id: example-sql
title: "Example SQL"
---

<details><summary>Count of distinct claims by service category</summary>

Use the query below to compute the number of distinct claims by service category 1 and 2.

```sql
select
  service_category_1
, service_category_2
, count(distinct claim_id) as distinct_claims
from claims_preprocessing.service_categories
group by 1,2
order by 1,2
```

![Claims by Service Category](/img/claims_by_service_category.jpg)

</details>