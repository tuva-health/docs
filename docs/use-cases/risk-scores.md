---
id: risk-scores
title: "Risk Scores"
---

<details>
  <summary>Average CMS-HCC Risk Scores</summary>

```sql
select
    count(distinct patient_id) as patient_count
    , avg(raw_risk_score) as average_raw_risk_score
    , avg(normalized_risk_score) as average_normalized_risk_score
    , avg(payment_risk_score) as average_payment_risk_score
from cms_hcc.patient_risk_scores
```
</details>

<details>
  <summary>Distribution of Risk Factors</summary>

```sql
select
      risk_factor_description
    , count(*) as total
    , cast(100 * count(*)/sum(count(*)) over() as numeric(38,1)) as percent
from cms_hcc.patient_risk_factors
group by risk_factor_description
order by 2 desc
```
</details>