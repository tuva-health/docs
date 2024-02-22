---
id: financial-pmpm
title: "Financial PMPM"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The Financial PMPM data mart implements the Tuva Project's methodology for 
calculating member months. 

## member_months

A table at the member month grain (i.e. one record per member per month of eligibility).

**Primary Keys:**
  * patient_id 
  * year_month 
  * payer 
  * plan 
  * data_source

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.financial_pmpm__member_months.columns" />

## pmpm_prep

A table that computes all the paid and allowed statistics for every patient_id and year_month combination.

**Primary Keys:**
  * patient_id 
  * year_month 
  * payer 
  * plan 
  * data_source

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.financial_pmpm__pmpm_prep.columns" />

## pmpm_payer_plan

A table that computes per member per month statistics for every service category by aggregating across patients from pmpm_prep. This table is at the payer, plan grain.

**Primary Keys:**
  * year_month 
  * payer 
  * plan 
  * data_source

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.financial_pmpm__pmpm_payer_plan.columns" />

## pmpm_payer

A table that computes per member per month statistics for every service category by aggregating across patients from pmpm_prep. This table is at the payer grain.

**Primary Keys:**
  * year_month 
  * payer
  * data_source

<JsonDataTable jsonPath="nodes.model\.the_tuva_project\.financial_pmpm__pmpm_payer.columns" />