---
id: cms-hccs
title: "CMS-HCCs"
---

CMS-HCC is the risk adjustment model used by CMS.  Analyzing risk scores based on the output of this model is an important use case for value-based care analytics.

<details>
  <summary>Average CMS-HCC Risk Scores</summary>

```sql
select
    count(distinct patient_id) as patient_count
    , avg(blended_risk_score) as average_blended_risk_score
    , avg(normalized_risk_score) as average_normalized_risk_score
    , avg(payment_risk_score) as average_payment_risk_score
from cms_hcc.patient_risk_scores
```
</details>

<details>
  <summary>Average CMS-HCC Risk Scores by Patient Location</summary>

```sql
select
      patient.state
    , patient.city
    , patient.zip_code
    , avg(risk.payment_risk_score) as average_payment_risk_score
from cms_hcc.patient_risk_scores as risk
    inner join core.patient as patient
        on risk.patient_id = patient.patient_id
group by
      patient.state
    , patient.city
    , patient.zip_code;
```
</details>


<details>
  <summary>Distribution of CMS-HCC Risk Factors</summary>

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

<details>
  <summary>Stratified CMS-HCC Risk Scores</summary>

```sql
select
      (select count(*) from cms_hcc.patient_risk_scores where payment_risk_score <= 1.00) as low_risk
    , (select count(*) from cms_hcc.patient_risk_scores where payment_risk_score = 1.00) as average_risk
    , (select count(*) from cms_hcc.patient_risk_scores where payment_risk_score > 1.00) as high_risk
    , (select avg(payment_risk_score) from cms_hcc.patient_risk_scores) as total_population_average;
```
</details>

<details>
  <summary>Top 10 CMS-HCC Conditions</summary>

```sql
select
      risk_factor_description
    , count(*) patient_count
from cms_hcc.patient_risk_factors
where factor_type = 'Disease'
group by risk_factor_description
order by count(*) desc
limit 10;
```
</details>
