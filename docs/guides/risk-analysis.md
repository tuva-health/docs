---
id: risk-analysis
title: "Risk Analysis"
---

## Overview

There are many tedious steps to map HCCs and calculate risk scores. Most of the 
critical information is not easy to use since CMS distributes rate announcements 
annually in PDFs and mappings in Excel files. Many existing tools, such as the SAS 
program from CMS, require you to have the patient data preprocessed.

Additionally, the new CMS-HCC model V28 will be phased in over three years, 
requiring organizations to run both models V24 and V28 to create blended risk 
scores.

* Payment year 2024 risk scores will be blended using 67% of the risk score 
  calculated from V24 and 33% from V28.
* Payment year 2025 risk scores will be blended using 33% of the risk score 
  calculated from V24 and 67% from V28.
* Beginning in payment year 2026 risk scores will be 100% from V28.

The [CMS HCC](https://github.com/tuva-health/tuva/tree/main/models/cms_hcc) 
data mart in the Tuva Project uses standard claims and eligibility data in your 
chosen data warehouse. All you need 
to do is choose the payment year, and the mart will use the appropriate ICD-10 
mappings and calculate the blended risk score depending on the selected payment 
year.

## Data Requirements

**Condition\*:**
- claim_id
- patient_id
- recorded_date
- condition_type
- normalized_code_type
- normalized_code

**Eligibility:**
- patient_id
- enrollment_start_date
- enrollment_end_date
- original_reason_entitlement_code
- dual_status_code
- medicare_status_code 

**Medical claim:**
- claim_id
- claim_line_number
- claim_type
- patient_id
- claim_start_date
- claim_end_date
- bill_type_code
- hcpcs_code

**Patient\*:**
- patient_id
- sex
- birth_date
- death_date


*The Tuva Project will generate these tables. You just need to run mapped
medical claims and eligibility through the project.*

## Variables

The data mart includes logic that allows you to choose which payment year you 
want to use to calculate the risk scores.

- `cms_hcc_payment_year` defaults to the current year
- `snapshots_enabled` is an *optional* variable that can be enabled

To run the data mart, simply update the payment year in your dbt_project.yml 
file or use the `--vars` dbt command. See examples below.

dbt_project.yml:

```yaml
vars:
    cms_hcc_payment_year: 2020
```

dbt command:

```bash
dbt build --vars '{cms_hcc_payment_year: 2020}'
```

## Data Mart Structure

### Staging

The staging tables show what tables and fields are used from the Core data model.

### Intermediate

The intermediate tables contain the complex logic to prepare eligibility and 
medical claims data, map to the risk factor seeds, and apply the condition 
hierarchy where some conditions may be dropped if a more severe manifestation of 
the condition is found. The model `cms_hcc__int_hcc_mapping` (aliased as 
`_int_hcc_mapping`) shows all eligible conditions mapped to the HCCs before the 
hierarchy is applied.

### Final

The final tables are `patient_risk_factors` and `patient_risk_scores`, along 
with optional snapshots. 

Patient Risk Factors display the final contributing demographic and disease risk 
factors, interactions, and HCCs for each enrollee in the payment year.

Patient Risk Scores show each enrollee's raw risk score (or blended risk score
depending on the payment year used), normalized risk score, and payment risk 
score for the payment year.

The snapshot tables are a "look back in time." You can use these tables to see 
the historical runs of the mart. This is helpful when you want to run multiple 
payment years to compare and trend. Snapshots are disabled by default. To enable
them, add the variable `snapshots_enabled: true` to your dbt_project.yml file.

## Analytics

Now that you have run your data through the CMS HCC data mart, you are ready to 
begin risk analysis on your population. Below are a few examples of common
questions you may want to ask of your data.

```sql
--Top 10 conditions
select
      risk_factor_description
    , count(*) patient_count
from cms_hcc.patient_risk_factors
where factor_type = 'Disease'
group by risk_factor_description
order by count(*) desc
limit 10;
```

```sql
--Stratified risk scores
select
      (select count(*) from cms_hcc.patient_risk_scores where payment_risk_score <= 1.00) as low_risk
    , (select count(*) from cms_hcc.patient_risk_scores where payment_risk_score = 1.00) as average_risk
    , (select count(*) from cms_hcc.patient_risk_scores where payment_risk_score > 1.00) as high_risk
    , (select avg(payment_risk_score) from cms_hcc.patient_risk_scores) as total_population_average;
```

```sql
--Averages by patient location
select
      patient.state
    , patient.city
    , patient.zip_code
    , avg(risk.payment_risk_score) as average_risk_score
from cms_hcc.patient_risk_scores as risk
    inner join core.patient as patient
        on risk.patient_id = patient.patient_id
group by
      patient.state
    , patient.city
    , patient.zip_code;
```
