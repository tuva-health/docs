---
id: cms-hccs
title: "CMS-HCCs"
---

## What are HCCs?

“HCC” stands for Hierarchical Condition Categories. They are sets of medical 
codes linked to clinical diagnoses that represent costly acute and chronic 
health conditions. CMS designed this model to estimate future healthcare costs 
for patients. HCC coding relies on ICD-10-CM coding to assign risk scores to 
patients.

## What is risk adjustment?

HCCs are part of a risk-adjustment model that CMS uses to calculate payments to 
healthcare organizations for patients insured by Medicare Advantage, Accountable 
Care Organizations, and some Affordable Care Act plans. 

A Risk Adjustment Factor Score (”RAF score”) is a measure of the estimated cost 
of an individual’s care based on demographic factors such as age and gender and 
their associated HCCs. This RAF score is then used to calculate payments or 
reimbursements to these organizations.

## How are risk scores used?

Patients with high-risk scores or multiple chronic conditions are reimbursed at 
higher rates than those with low-risk scores because they are expected to 
require more costly medical interventions. By accounting for differences in 
patient complexity, quality and cost performance can be more appropriately 
measured.

## CMS Risk Adjustment Files

The Monthly Membership Detail Report (MMR) and Model Output Report (MOR) are two types of files that CMS sends to Medicare Advantage organizations (MAOs). The files, in additional to other resources from CMS, are used to calculate the CMS HCC risk adjustment factor (RAF) scores.

CMS shares these files through the Medicare Advantage Prescription Drug (MARx) system and through the Health Plan Management System (HPMS).

MAOs can refer to the Plan Communications User Guide ([PCUG](https://www.cms.gov/files/document/plan-communications-user-guide-august-31-2023-v172.pdf)) for additional details on the files exchanged through the MARx system.

### Monthly Membership Detail Report (MMR)

The MMRs contain member eligibility, risk scores, and prospective payments the MAO receives for each member in the upcoming month. They also contain retroactive adjustments to prior months’ records. This file contains the data for both Part C and Part D members. The key pieces of data to get from the MMR are:

* **Eligibility**: Understanding eligibility is a pre-requisite for modeling risk adjustment. The MMR has very detailed information regarding eligibility, including retrospective enrollments and disenrollment data. Just because a member exists in the MMR file, does not mean that they are eligible and should be included in risk adjustment. 
* **Segment / Risk Model**: Depending on the risk adjustment model being used (most commonly v24 and v28), different co-efficients are used for the member based on if they are newly enrolled, are dual status, and their [medicare status code](https://resdac.org/cms-data/variables/medicare-status-code-january). This information needs to be gathered from the MMR to calculate risk adjustment
* **Risk Scores**: The MMR will also disclose risk scores for a patient but only for certain time periods (start of the year, mid-year, and final). This can be used to understand funded premium, or validate calculated risk scores. 

### MAO-004

Not all medical claims are eligible for documenting HCCs for medicare risk adjustment. 
To address this, CMS provides a  report called the MAO-004 which 
will inform Medicare Advantage organizations if a given diagnosis code submitted is eligible for risk adjustment.
This file can be helpful for tying out risk score calculations to the MMR.

### Model Output Report (MOR)

Similar to MMRs, the MORs contain a record for each member. That record shows the Hierarchical Condition Codes (HCCs) for each member used by the Risk Adjustment System (RAS) to calculate Part C or Part D risk adjustment factors for each beneficiary. There are two varieties of MORs, for Parts C and D respectively, as each uses different models. 

In addition to these monthly files, CMS issues “final” MORs once per year with updated information after the year has ended and planned runout data has been collected.

## Risk Score Models

CMS has implemented multiple models to address differences in program costs and 
the beneficiary population. For example, Medicare Part C versus Medicare Part D 
plans, the ESRD population (End-Stage Renal Disease) versus members without 
ESRD, or members enrolled in the Program of All Inclusive Care for the Elderly 
(PACE). CMS also segments each model, creating subpopulations with distinct cost 
patterns, such as dual enrollment in Medicaid or living in the community versus 
an institution. 

The full list of models are:

- CMS-HCC
- CMS-HCC-ESRD
- PACE
- RxHCC

In addition to models for different populations, CMS has released versions of 
these models over the years, which include new HCC mappings and added or removed 
ICD-10-CM codes. Version 24 has been in use since 2020. An advanced notice of 
Version 28 was published this year. CMS has finalized a phased transition 
from version 24 to 28, which will begin in 2024 and be completed in 2026. CMS 
also performs model calibration based on diagnostic and expenditure data. These 
changes can be found in the annual rate announcements on [cms.gov](https://www.cms.gov/Medicare/Health-Plans/MedicareAdvtgSpecRateStats/Announcements-and-Documents).

These models generate risk scores by adding relative risk factors, demographics, 
and disease information. Additionally, they use hierarchies where the most 
severe manifestation of a condition is considered for risk scores.

## Risk Score Calculation

Several resources are needed to calculate risk scores.

- Annual Rate Announcements for the applicable payment year (found on 
  [cms.gov](https://www.cms.gov/Medicare/Health-Plans/MedicareAdvtgSpecRateStats/Announcements-and-Documents))
- ICD-10-CM to HCC mapping (found on [cms.gov](https://www.cms.gov/medicare/health-plans/medicareadvtgspecratestats/risk-adjustors))
- Risk adjustment model software (CMS makes a SAS program available on 
  [cms.gov](https://www.cms.gov/medicare/health-plans/medicareadvtgspecratestats/risk-adjustors))
- Model Output Report (MOR) or claims data
- Monthly Membership Detail Report or eligibility data

Once you have gathered the resources needed to calculate risk scores, you can 
begin identifying and calculating scores for your patients. A brief overview 
of the steps:

1. Identify demographic and enrollment information for each patient and 
   cross-reference the risk factor value from the appropriate payment year’s 
   rate announcement document.
2. Identify disease information for each patient, apply the condition hierarchy, 
   and cross-reference the risk factor value from the appropriate payment year’s 
   rate announcement document.
3. Identify additional relative and adjustment factors, such as disease and 
   disabled interactions, and cross-reference the risk factor value from the 
   appropriate payment year’s rate announcement document.
4. Calculate the raw risk scores for each patient, then apply the normalization 
   factors and the MA coding pattern adjustment factors from the appropriate 
   payment year’s rate announcement document to calculate the normalized and 
   payment risk scores.

### Sample Risk Score Calculation of a single patient

Let's walk through a single example with a single patient as to how the risk score
is calculated in the context of medicare advantage for the year 2024. 

![Overview](/img/cms_hccs/risk_adj_overview_single_patient_example.drawio.svg)

Here's some information about this patient.

* Patient is Female ([BENE_SEX_CD](https://resdac.org/cms-data/variables/sex-beneficiary) = 2)
* Patient is 76 years old
* Patient is a partial dual patient ([DUAL_ELGBL_CD_01](https://resdac.org/cms-data/variables/medicare-medicaid-dual-eligibility-code-january) = 03)
* Patient is aged without ESRD ([MDCR_STATUS_CODE_01](https://resdac.org/cms-data/variables/medicare-status-code-january) = 10)
* Patient was originally disabled ([MDCR_OREC](https://resdac.org/cms-data/variables/medicare-original-reason-entitlement-code-orec) = 1)
* Patient has the following diagnosis documented in medical claims submitted to cms:

| Diagnosis Code | Description                                                                                                                    |
|----------------|--------------------------------------------------------------------------------------------------------------------------------|
| E10641         | Type 1 diabetes mellitus with hypoglycemia with coma                                                                           |
| E083293        | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy without macular edema, bilateral |
| E139           | Other specified diabetes mellitus without complications                                                                        |
| E139           | Other specified diabetes mellitus without complications                                                                        |

Walking through the steps listed above:

#### Calculate the demographic score

To calculate the demographics portion of the risk score, we need to look at the demographics information for the patient
provided above. Let's take a look at a table from the [2024 final rule](https://www.cms.gov/files/document/2024-announcement-pdf.pdf) 
that contains the raw factors related to demographics.

![2024_Final_Rule_Demographics_Table](/img/cms_hccs/Demographics_Score_2024_Final_Rule.png)

* The demographic score for a female patient 76 years of age with partial dual status is 0.485.
* Given the patient has been originally disabled, they get an additional 0.103.

The final raw risk from demographics is (0.485 + 0.103) = **0.588**

If the patient was an end stage renal disease (ESRD) patient, we would use a separate demographics 
table that uses the ESRD risk adjustment model. 

#### Calculate the Disease Score

The disease score can be sourced from multiple places, either the MOR or claims data in combination
with MAO-004 report. This example will be looking at calculating risk from claims data. 

![disease_score_calculation](/img/cms_hccs/risk_adj_disease_score_single_patient_example.drawio.svg)

In the sample patient, the diagnosis codes for that patient are provided above from claims data.
Not all diagnosis are accepted for risk adjustment, so in this example we will say the diagnosis
E10.641, (Type 1 diabetes mellitus with hypoglycemia with coma) is not accepted when checking the
MAO-004. That leaves two diagnosis of E08.3293 and E13.9. Even though E13.9 is present twice in 
claims data, having more than one of the same accepted diagnosis code is the same as having
a single instance of that diagnosis code being accepted. 

Next we need to cross-reference the diagnosis codes to get the HCCs for the model. The crosswalk
between diagnosis codes and HCCs can be found [here](https://www.cms.gov/medicare/health-plans/medicareadvtgspecratestats/risk-adjustors/2024-model-software/icd-10-mappings)
under "2024 Initial ICD-10 Mappings".

![diagnosis_to_hcc_crosswalk_example](/img/cms_hccs/diagnosis_to_hcc_crosswalk_example.png)

When looking up the two diagnosis codes in the crosswalk, we see they are both valid and
map to two HCCs for the 2024 v28 risk adjustment model (37 and 38).

Next we need to check the hierarchy to drop HCCs that exist within the hierarchy. This
hierarchy exists within the [announcement document](https://www.cms.gov/files/document/2024-announcement-pdf.pdf).

![hcc_hierarchy_2024_final_rule](/img/cms_hccs/hcc_hierarchy_2024_final_rule.png)

Based on this table, we see that HCC-37 is on the left hand side "If the Disease Group is listed in this column…"
and on the right hand side "…Then drop the CMS-HCC listed in this column " there is a match on HCC-38.
This means that we drop the HCC-38 and are left with a single remaining HCC (HCC-37) for this patient.

Once we have our remaining HCCs after the hierarchy is applied, we need to find the score related to HCC-37
for this single patient example. If there was more than one HCC remaining, the values would be summed, 

![disease_coefficients_v28_2024_announcement](/img/cms_hccs/disease_coefficients_v28_2024_announcement.png)

For this patient the score is **0.166**.

Next we need to evaluate disease interactions. Since we are left with only a single HCC, disease interactions
don't apply for this specific example patient. However, please see below for the disease interactions
that exist within the v28 model. This is also in the [announcement document](https://www.cms.gov/files/document/2024-announcement-pdf.pdf).

![disease_interactions_2024_final_rule](/img/cms_hccs/disease_interactions_2024_final_rule.png)
![disease_interaction_v28_2024_announcement](/img/cms_hccs/disease_interaction_v28_2024_announcement.png)


Finally, we need to count the number of HCCs remaining after the application of the hierarchy. In
this example, we only have a single HCC, so there is no additional score applied.

![hcc_counts_2024_announcement](/img/cms_hccs/hcc_counts_2024_announcement.png)


#### Bringing it all together

We sum both the demographic score and the disease score to get the final raw raf for the patient.
(0.588 + 0.166) = **0.754**. This score is the raw risk score for the patient. To get the final risk
score for a patient, the formula is (raw_risk_score / normalization_factor).

For 2024, the CMS-HCC risk adjustment model normalization factor is **1.015** meaning. For **medicare
advantage** organizations, another Coding Pattern Difference Adjustment (aka Coding Intensity Factor CIF)
of [5.9%](https://uscode.house.gov/view.xhtml?req=(title:42%20section:1395w-23%20edition:prelim)) 
should be applied on top of the normalization factor. 

So the final risk score for this single patient would be (0.754 / 1.015) * (1 - 0.059) = **0.699**


#### But wait! There's more

In the above example, it only looked the scores and weights for a single risk adjustment model, v28.
However, for medicare advantage organizations in the year 2024, final funded risk is not based solely
on the outputs of the v28 risk adjustment model. There is a transition period where risk will be 
determined with a blended model, where 33% of the risk score will be weighted with the v28 model
and 67% of the risk score will be weighted with the v24 risk adjustment model. 

What does this mean? This means we have to go back and repeat the steps prior to "Bringing it all together"
for the v24 risk adjustment model, then apply the 33% and 67% weighting for v28 and v24 risk scores respectively,
then apply normalization factor and CIF to get the final risk score for the patient.


#### Additional notes

* In this specific example, this was looking at the risk adjustment model for Medicare Advantage. Different
programs and different use cases can use different risk adjustment models. 
* Different years going forward (2025 and 2026) have different weighting of the v24 vs v28 risk adjustment models.
* This can all be subject to change if there is new legislation or final rules for 2025 and 2026.
* In the context of some CMMI programs, the terms of "coding intensity factor" and "normalization factor" can seem to 
be the same as the Medicare Advantage definitions, but can be derived in different ways specific to that program.

## CMS-HCC Mart in the Tuva Project

As you can see, many resources must be gathered, and the steps to calculate HCCs 
and risk scores are tedious. Most of this important information is not easy to 
find and use since it’s distributed yearly in PDFs from CMS. Many existing 
tools, such as the SAS program or the open-source Python code, were built to 
process one patient at a time. Not to mention that these tools require you to 
have the patient data preprocessed in a certain way.

The CMS HCC data mart is an easy-to-use data mart that can be run with standard 
claims and eligibility data in your chosen data warehouse. We have done all the 
work for you by converting the numerous rate announcement PDFs into CSV seed 
files referenced by the data mart. We created logic to determine a patient's 
demographic risk factors, disease risk factors, interaction factors, and 
hierarchical conditions. All you need to do is choose the payment year you want 
to calculate and the model you want to use.

### Data Requirements

**Eligibility:**

- patient_id
- gender
- birth_date
- enrollment_start_date
- enrollment_end_date
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

**Condition\*:**

- claim_id
- patient_id
- normalized_code_type
- normalized_code

*Note: The Tuva Project will generate this table. You just need to run medical claims and eligibility through the project.*

### Variables

The data mart has two variables that allow you to choose which payment year you 
want to calculate and which model you want to use to calculate the risk scores.

- `cms_hcc_payment_year` defaults to the current year
- `cms_hcc_model_version` defaults to Version 24\* (CMS-HCC-V24)

*Note: Version 28 will soon be added as an option.*

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

### Data Mart Structure

#### Staging

The staging tables show what tables and fields are used from the Core data model.

#### Intermediate

The intermediate tables contain the complex logic to prepare eligibility and 
medical claims data, map to the risk factor seeds, and apply the condition 
hierarchy where some conditions may be dropped if a more severe manifestation of 
the condition is found. The model `cms_hcc__int_hcc_mapping` (aliased as 
`_int_hcc_mapping`) shows all eligible conditions mapped to the HCCs before the 
hierarchy is applied.

#### Final

The final tables are `patient_risk_factors` and `patient_risk_scores`, along 
with snapshots. 

Patient Risk Factors display the final contributing demographic and disease risk 
factors, interactions, and HCCs for each enrollee in the payment year.

Patient Risk Scores show each enrollee's raw risk score, normalized risk score, 
and payment risk score for the payment year.

The snapshot tables are a "look back in time.” You can use these tables to see 
the historical runs of the mart. This is helpful when you want to run multiple 
payment years to compare and trend.

## References 
* https://www.milliman.com/en/insight/medicare-advantage-and-the-encounter-data-processing-system-be-prepared
* https://www.cms.gov/files/document/2024-advance-notice-pdf.pdf
