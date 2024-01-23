---
id: cms-hccs
title: "CMS HCCs"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## patient_risk_factors

This final model displays the contributing demographic and disease risk 
factors, interactions, and HCCs for each enrollee in the payment year.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.cms_hcc__patient_risk_factors.columns" />

## patient_risk_scores

This final model calculates the CMS HCC raw risk score, normalized risk score, 
and payment risk score for each enrollee in the payment year.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.cms_hcc__patient_risk_scores.columns" />
