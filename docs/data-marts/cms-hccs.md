---
id: cms-hccs
title: "CMS-HCCs"
---

- [Data Dictionary](../data-dictionaries/cms-hccs)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/cms_hcc)

The CMS-HCC data mart implements v24 and v28 versions of the CMS-HCC risk model.

There are many tedious steps to map HCCs and calculate risk scores. Most of the critical information is not easy to use since CMS distributes rate announcements annually in PDFs and mappings in Excel files. Many existing tools, such as the SAS program from CMS, require you to have the patient data preprocessed.

Additionally, the new CMS-HCC model V28 will be phased in over three years, requiring organizations to run both models V24 and V28 to create blended risk scores.

* Payment year 2024 risk scores will be blended using 67% of the risk score calculated from V24 and 33% from V28.
* Payment year 2025 risk scores will be blended using 33% of the risk score calculated from V24 and 67% from V28.
* Beginning in payment year 2026 risk scores will be 100% from V28.

## Data Requirements

In order to run the CMS-HCC data mart you need to map the following data elements to the [Input Layer](../data-dictionaries/input-layer).  These are the only data elements required.

**Eligibility:**
- patient_id
- gender
- birth_date
- death_date
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
- diagnosis_code_type
- diagnosis_code_1* 

**Up to 25 diagnosis codes are allowable, but only 1 is required.*

## Variables

The data mart includes logic that allows you to choose which payment year you want to use to calculate the risk scores.

- `cms_hcc_payment_year` defaults to the current year
- `snapshots_enabled` is an *optional* variable that can be enabled

To run the data mart, simply update the payment year in your dbt_project.yml file or use the `--vars` dbt command, if you want to change the payment year from the current year default. See examples below.

dbt_project.yml:

```yaml
vars:
    cms_hcc_payment_year: 2020
    snapshots_enabled: true
```

dbt command:

```bash
# Uses defaults or vars from project yml, runs all marts
dbt build

# Runs only the CMS HCC mart using defaults or vars from project yml
dbt build --select tag:cms_hcc

# Overrides vars from project yml, executes snapshots
dbt build --select tag:cms_hcc --vars '{cms_hcc_payment_year: 2020, snapshots_enabled: true}'
```

## Data Mart Structure

The data mart is built on top of the [Core Data Model](../data-dictionaries/core).  If you map the data elements listed above to the Input Layer and run Tuva, the Core Data Model will be created and you will be able to run the data mart.

In the diagram below we provide an overview explanation of how the data mart works.

<iframe width="780" height="520" src="https://miro.com/app/live-embed/uXjVNq_Lq74=/?moveToViewport=-555,-812,2164,1037&embedId=161883269913" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## Analytics

Now that you have run your data through the CMS-HCC data mart, you are ready to begin risk analysis on your population. Below are a few examples of common questions you may want to ask of your data.

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
