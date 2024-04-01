---
id: data-marts
title: "Data Marts"
---

Data marts are code (SQL) that runs on top of (or in the case of claims preprocessing before) the Core Data Model.  Data marts often use clinical concepts or other value sets to define concepts of interest.  

| Data Mart | Description |
| --------- | ----------------------------- |
| [CCSR](#ccsr) | AHRQ's Clinical Classification Software Refined diagnosis and procedure grouper |
| [Chronic Conditions](#chronic-conditions) | Two chronic condition groupers: CMS and Tuva |
| [Claims Preprocessing](#claims-preprocessing) | Groups claims into distinct encounters and assigns service categories |
| [CMS-HCC](#cms-hcc) | The v24 and v28 CMS-HCC models |
| [ED Classification](#ed-classification) | The NYU ED classification algorithm |
| [Financial PMPM](#financial-pmpm) | Computes member months and data tables for analyzing PMPM |
| [HCC Suspecting](#hcc-suspecting) | Computes suspected HCCs based on historical problems, diagnoses, labs, and medications |
| [Quality Measures](#quality-measures) | Computes various publicly available quality measures |
| [Readmissions](#readmissions) | CMS's readmission measure |
| [Service Categories](#service-categories) | Assigns claims a mutually exclusive and exhaustive service category |

## CCSR
- [Data Dictionary](../data-dictionaries/ccsr)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/ccsr)

The CCSR data mart implements [AHRQ's Clinical Classification Software Refined](https://hcup-us.ahrq.gov/toolssoftware/ccsr/ccs_refined.jsp) diagnosis and procedure grouper.  This is a very commonly used tool to group ICD-10-CM and ICD-10-PCS diagnosis and procedure codes into higher-level categories.

## Chronic Conditions
- [Data Dictionary](../data-dictionaries/chronic-conditions)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/chronic_conditions)

The chronic conditions data mart builds two different chronic condition groupers: one defined by CMS and the other defined by Tuva.

## Claims Preprocessing
- [Data Dictionary](../data-dictionaries/claims-preprocessing)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/claims_preprocessing)

The Claims Preprocessing data mart groups claims into distinct encounters and assigns each claim to a mutually exclusive and exhaustive service category.

## CMS-HCC
- [Data Dictionary](../data-dictionaries/cms-hccs)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/cms_hcc)

The CMS-HCC data mart implements v24 and v28 versions of the CMS-HCC risk model.

## ED Classification
- [Data Dictionary](../data-dictionaries/ed-classification)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/ed_classification)

The ED Classification data mart implements the 2017 update to the original NYU ED Classification algorithm to identify potentially preventable ED visits.


## Financial PMPM
- [Data Dictionary](../data-dictionaries/financial-pmpm)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/financial_pmpm)

The Financial PMPM data mart computes member months and stratifies population spend by member month and service category across various payers and plans.

## HCC Suspecting
- [Data Dictionary](../data-dictionaries/hcc-suspecting)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/hcc_suspecting)

The HCC Suspecting data mart identifies patients that are suspected to have an HCC in the payment year but don't presently have one recorded based on historical problems, medications, and lab test results.

## Quality Measures
- [Data Dictionary](../data-dictionaries/quality-measures)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/quality_measures)

The Quality Measures data mart is where we're building publicly available quality measures.  We're adding as many publicly available measures as we can to the Tuva Project.  You can see the roadmap in this section. If there is a publicly available 
measure you would like to see added you can [submit an issue](https://github.com/tuva-health/the_tuva_project/issues) 
on GitHub.

| Measure Name                                                                                                                  | Measure ID                                  | Status       | 
|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|--------------|
| [Breast Cancer Screening](https://github.com/tuva-health/tuva/tree/main/models/quality_measures)                              | CMS Star Rating C01, MIPS CQM 112, NQF 2372 | Released     |
| [Colorectal Cancer Screening](https://github.com/tuva-health/tuva/tree/main/models/quality_measures)                          | CMS Star Rating C02, MIPS CQM 113, NQF 0034 | Released     |
| [Controlling High Blood Pressure](https://github.com/tuva-health/tuva/tree/main/models/quality_measures)                                                                                           | CMS Star Rating C12, MIPS CQM 236           | Released     |
| Diabetes: Eye Exam                                                                                                            | CMS Star Rating C09, MIPS CQM 117, NQF 0055 | Planned 2024 |
| [Diabetes: Hemoglobin A1c (HbA1c) Poor Control (> 9%)](https://github.com/tuva-health/tuva/tree/main/models/quality_measures) | CMS Star Rating C11, MIPS CQM 001, NQF 0059 | Released     |
| Diabetes: Medical Attention for Nephropathy                                                                                   | CMS Star Rating C10, NQF 0062               | Planned 2024 |
| Falls: Screening for Future Fall Risk                                                                                         | CMS Star Rating C13, MIPS CQM 318, NQF 0101 | Planned 2024 |
| [Hospital-Wide All-Cause Readmission (HWR)](https://github.com/tuva-health/tuva/tree/main/models/readmissions)                | MIPS CQM 479                                | Released     |
| Influenza Immunization                                                                                                        | CMS Star Rating C03, MIPS CQM 110, NQF 0041 | Planned 2024 |
| Medication Adherence for Cholesterol (Statins)                                                                                | CMS Star Rating D10, NQF 0541               | Planned 2024 |
| Medication Adherence for Diabetes Medications                                                                                 | CMS Star Rating D08, NQF 0541               | Planned 2024 |
| Medication Adherence for Hypertension (RAS antagonists)                                                                       | CMS Star Rating D09, NQF 0541               | Planned 2024 |
| Medication Reconciliation Post-Discharge                                                                                      | CMS Star Rating C15, NQF 0097               | Planned 2024 |
| Osteoporosis Management in Women Who Had a Fracture                                                                           | CMS Star Rating C08, MIPS CQM 418, NQF 0053 | Planned 2024 |
| Statin Therapy for the Prevention and Treatment of Cardiovascular Disease                                                     | CMS Star Rating C16, MIPS CQM 438           | Planned 2024 |
| Statin Use in Persons with Diabetes (SUPD)                                                                                    | CMS Star Rating D12                         | Planned 2024 |

## Readmissions
- [Data Dictionary](../data-dictionaries/readmissions)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/readmissions)

The Readmissions data mart computes the 30-day hospital readmission measure defined by CMS.
