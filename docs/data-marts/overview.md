---
id: overview
title: "Overview"
---

Data marts are code (SQL) that runs on top of (or in the case of claims preprocessing before) the Core Data Model.  Data marts often use clinical concepts or other value sets to define concepts of interest.  

| Data Mart | Description |
| --------- | ----------------------------- |
| [CCSR](../data-marts/ccsr) | AHRQ's Clinical Classification Software Refined diagnosis and procedure grouper |
| [Chronic Conditions](../data-marts/chronic-conditions) | Two chronic condition groupers: CMS and Tuva |
| [Claims Preprocessing](../data-marts/claims-preprocessing) | Groups claims into distinct encounters and assigns service categories |
| [CMS-HCC](../data-marts/cms-hccs) | The v24 and v28 CMS-HCC models |
| [ED Classification](../data-marts/ed-classification) | The NYU ED classification algorithm |
| [Financial PMPM](../data-marts/financial-pmpm) | Computes member months and data tables for analyzing PMPM |
| [HCC Suspecting](../data-marts/hcc-suspecting) | Computes suspected HCCs based on historical problems, diagnoses, labs, and medications |
| [Quality Measures](../data-marts/quality-measures) | Computes various publicly available quality measures |
| [Readmissions](../data-marts/readmissions) | CMS's readmission measure |