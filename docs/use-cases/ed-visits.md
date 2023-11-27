---
id: ed-visits
title: "ED Visits"
---

<details>
  <summary>Trending ED Visit Volume, PKPY, and Cost</summary>


```sql
with ed as (
select 
  data_source
, date_part(year, encounter_end_date) || lpad(date_part(month, encounter_end_date),2,0) as year_month
, count(1) as ed_visits
, avg(paid_amount) as avg_paid_amount
from core.encounter
where encounter_type = 'emergency department'
group by 1,2
)
, member_months as (
select
  data_source
, year_month
, count(1) as member_months
from financial_pmpm.member_months
group by 1,2
)
select
  a.data_source
, a.year_month
, b.member_months
, ed_visits
, cast(ed_visits / member_months *12000 as numeric(38,2)) as ed_visits_pkpy
, cast(avg_paid_amount as numeric(38,2)) as avg_paid_amount
from ed a
inner join member_months b
  on a.year_month = b.year_month
  and a.data_source = b.data_source
order by 1,2
;
```
</details>