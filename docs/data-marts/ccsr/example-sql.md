---
id: example-sql
title: "Example SQL"
---

<details><summary>Trending Average Length of Stay</summary>

```sql
select 
  date_part(year,encounter_end_date) || lpad(date_part(month,encounter_end_date),2,0) as year_month
, count(1) as discharges
, avg(length_of_stay) as ALOS
from acute_inpatient.acute_inpatient_summary
group by 1
order by 1
```
![acute-inpatient-example](/img/acute-inpatient-example.jpg)
</details>