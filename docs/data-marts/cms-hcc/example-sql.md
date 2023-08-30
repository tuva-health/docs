---
id: example-sql
title: "Example SQL"
---

<details><summary>Top 10 most prevalent risk factors</summary>

```sql
select
      risk_factor_description
    , count(*)
from cms_hcc.patient_risk_factors
group by risk_factor_description
order by count(*) desc
limit 10;
```

</details>

<details><summary>Top 10 most prevalent HCCs</summary>

```sql
select
      hcc_code
    , count(*)
from cms_hcc._int_hcc_hierarchy
group by hcc_code
order by count(*) desc
limit 10;
```

</details>

<details><summary>Average risk score</summary>

```sql
select
      avg(raw_risk_score) as average_raw_risk_score
    , avg(normalized_risk_score) as average_normalized_risk_score
    , avg(payment_risk_score) as average_payment_risk_score
from cms_hcc.patient_risk_scores;
```

</details>
