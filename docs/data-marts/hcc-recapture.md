---
id: hcc-recapture
title: "HCC Recapture"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## What is HCC Recapture?

The HCC Recapture mart enables organizations to track HCCs which have been coded in a prior year and determine if they have been 'recaptured' (i.e. the diagnosis has been coded) in the year after the prior year (i.e. the payment year). This is important because:
- It accurately codes the chronic conditions for a patient 
- It affects that patient's risk score
- The risk score affects reimbursement for value-based care contracts

This mart not only tracks HCCs which were previously coded, but also automatically includes any suspect HCCs from the suspect HCC mart and flags them using the `suspect_hcc_flag`.

Additionally, the mart provides recapture rates and a lot of detail into the type of gap closure.

## Methods

[Code on Github](https://github.com/tuva-health/tuva/tree/main/models/hcc_recapture)

The HCC Recapture data mart identifies gap closures for patients who had an HCC coded in a collection year
or are suspected of an HCC in a prior year.

### Gap Closure
The type of gap closure if provided using the `gap_status` field. Here are the gap status definitions based on the `hcc_recapture__gap_status` model:
    - 'closed using higher coefficient hcc in hierarchy group': An HCC in the same group was closed, but its coefficient is greater than the prior year HCC
    - 'closed': the specific HCC in question has been observed in a risk adjustable claim during the collection year.
    - 'closed using lower coefficient hcc in hierarchy group': An HCC in the same group was closed, but its coefficient is less than the prior year HCC
    - 'new': defined as an hcc that has not been coded in the past 2 years
    - 'open': for gaps and claims, it's a chronic condition appropriate for recapture that has not been documented in current collection year
    - 'inappropriate for recapture': the specific HCC in question is “Open” and no related/equivalent HCC has been closed, but it is not appropriate for risk adjustment because it’s not a chronic diagnosis.

Instead of just listing an HCC as closed, more detail is provided which presents an opportunity to improve future HCC recapture initiatives.

### Recapture Curves
When calculating HCC gap closure, often YTD recapture curves are used. This is supported within this mart and can be built off of the `hcc_recapture__recapture_rates_monthly_ytd` model.

## Data Dictionary

All of the models below are the final models output from the HCC recapture data mart.

### gap_status

Displays the HCCs gap status for a given patient.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_recapture__gap_status.columns" />

### hcc_status

Combines claims data with HCC gap status.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_recapture__hcc_status.columns" />

### recapture_rates

HCC recapture rates by payment year.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_recapture__recapture_rates.columns" />

### recapture_rates_monthly

HCC recapture rates by payment year month.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_recapture__recapture_rates_monthly.columns" />

### recapture_rates_monthly_ytd

HCC recapture rates by payment month year-to-date.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.hcc_recapture__recapture_rates_monthly_ytd.columns" />

## Example SQL

<details>
  <summary>Get Data for Recapture Rate Curve</summary>

```sql
select
      payer
    , payment_year
    , payment_year_month
    , monthly_closed_hccs
    , monthly_open_hccs
    , monthly_total_hccs
    , monthly_recapture_rate
    , ytd_closed_hccs
    , ytd_open_hccs
    , yearly_total_hccs
    , ytd_recapture_rate
from hcc_recapture.recapture_rates_monthly_ytd
order by payment_year_month
;
```
</details>

<details>
  <summary>Get Count of All Open HCCs</summary>

```sql
select
      payer
    , payment_year
    , model_version
    , max(suspect_hcc_flag) as suspect_hcc_flag   
    , count(hcc_code) as hcc_count
from hcc_recapture.gap_status
where gap_status = 'open'
group by
      payer
    , payment_year
    , model_version
;
```
</details>

<details>
  <summary>Get All Open Suspect HCCs</summary>

```sql
select
      payer
    , payment_year
    , model_version
    , count(hcc_code) as hcc_count
from hcc_recapture.gap_status
where gap_status = 'open' and suspect_hcc_flag = 1
group by
      payer
    , payment_year
    , model_version
;
```
</details>
