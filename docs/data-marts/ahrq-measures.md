---
id: ahrq-measures
title: "AHRQ Measures"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Overview

[Code](https://github.com/tuva-health/tuva/tree/main/models/ahrq_measures/)

The Agency for Healthcare Research and Quality (AHRQ) develops and maintains various measures to assess the quality, safety, and effectiveness of healthcare services [(AHRQ QIs)](https://qualityindicators.ahrq.gov/measures/qi_resources). These measures include the Prevention Quality Indicators [(PQIs)](https://qualityindicators.ahrq.gov/measures/pqi_resources), Inpatient Quality Indicators [(IQIs)](https://qualityindicators.ahrq.gov/measures/iqi_resources), Patient Safety Indicators [(PSIs)](https://qualityindicators.ahrq.gov/measures/psi_resources), and Pediatric Quality Indicators [(PDIs)](https://qualityindicators.ahrq.gov/measures/pdi_resources). They are used by healthcare providers, policymakers, and researchers to identify issues, monitor progress, and compare performance to improve patient outcomes and reduce costs. 

The PQIs are available now in The Tuva Project. The individual measures and definitions as of the 2023 update are:

<table class="ahrq-table">
  <thead>
    <tr>
      <th>PQI Number</th>
      <th>PQI Name</th>
      <th>PQI Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>01</td>
      <td>Diabetes Short-Term Complications Admission Rate</td>
      <td>Hospitalizations for a principal diagnosis of diabetes with short-term complications (ketoacidosis, hyperosmolarity, or coma) per 100,000 population, ages 18 years and older.</td>
    </tr>
    <tr>
      <td>03</td>
      <td>Diabetes Long-Term Complications Admission Rate</td>
      <td>Hospitalizations for a principal diagnosis of diabetes with long-term complications (renal, eye, neurological, circulatory, other specified, or unspecified) per 100,000 population, ages 18 years and older.</td>
    </tr>
    <tr>
      <td>05</td>
      <td>Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults</td>
      <td>Hospitalizations with a principal diagnosis of chronic obstructive pulmonary disease (COPD) or asthma per 100,000 population, ages 40 years and older.</td>
    </tr>
    <tr>
      <td>07</td>
      <td>Hypertension Admission Rate</td>
      <td>Hospitalizations with a principal diagnosis of hypertension per 100,000 population, ages 18 years and older.</td>
    </tr>
    <tr>
      <td>08</td>
      <td>Heart Failure Admission Rate</td>
      <td>Hospitalizations with a principal diagnosis of heart failure per 100,000 population, ages 18 years and older.</td>
    </tr>
    <tr>
      <td>11</td>
      <td>Community Acquired Pneumonia Admission Rate</td>
      <td>Hospitalizations with a principal diagnosis of community-acquired bacterial pneumonia per 100,000 population, ages 18 years or older.</td>
    </tr>
    <tr>
      <td>12</td>
      <td>Urinary Tract Infection Admission Rate</td>
      <td>Hospitalizations with a principal diagnosis of urinary tract infection per 100,000 population, ages 18 years and older.</td>
    </tr>
    <tr>
      <td>14</td>
      <td>Uncontrolled Diabetes Admission Rate</td>
      <td>Hospitalizations for a principal diagnosis of uncontrolled diabetes without mention of short-term (ketoacidosis, hyperosmolarity, or coma) or long-term (renal, eye, neurological, circulatory, other specified, or unspecified) complications per 100,000 population, ages 18 years and older.</td>
    </tr>
    <tr>
      <td>15</td>
      <td>Asthma in Younger Adults Admission Rate</td>
      <td>Hospitalizations for a principal diagnosis of asthma per 100,000 population, ages 18 to 39 years.</td>
    </tr>
    <tr>
      <td>16</td>
      <td>Lower-Extremity Amputation Among Patients with Diabetes Rate</td>
      <td>Hospitalizations for diabetes and a procedure of lower-extremity amputation (except toe amputations) per 100,000 population, ages 18 years and older.</td>
    </tr>
  </tbody>
</table>

## Instructions

## Data Dictionary

### pqi_denom_long

This model contains a row for each patient and data_source combination that is eligible for each pqi each year.

**Primary Key:**
  * patient_id
  * data_source
  * pqi_number
  * year_number

<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_denom_long.columns" />
</div>

### pqi_exclusion_long

This model contains a list of all the exclusions an encounter qualified for. An encounter can qualify for multiple exclusions for each pqi, which are listed here. Qualifying for an exclusion **does not necessarily** mean the encounter would have been in the numerator for the pqi, simply that it is excluded from being eligible to be in the numerator.

**Primary Key:**
  * data_source
  * encounter_id
  * exclusion_number
  * pqi_number

<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_exclusion_long.columns" />
</div>

### pqi_num_long

This model contains a list of all encounters that qualified for a pqi. The patient_id and data_source are brought in for reference as well.

**Primary Key:**
  * data_source
  * encounter_id
  * pqi_number

<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_num_long.columns" />
</div>

### pqi_rate

This model pre calculates the rate (as a per 100,000 members) for each pqi and year. The rate equals the numerator divided by denominator multiplied by 100,000. The AHRQ software typically calculates these as a per 100,000 population in a metropolitan area or county. However, when calculating for a population in a claims dataset, it can be useful to view the rates as a "per 100,000 members" instead.

**Primary Key:**
  * data_source
  * year_number
  * pqi_number

<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_rate.columns" />
</div>

### pqi_summary

This model is designed to be useful for analytics on pqis in your claims data set. It joins in data about the encounter for summarization, such as facility, drg, encounter start date etc...

**Primary Key:**
  * data_source
  * encounter_id
  * pqi_number
  * year_number

<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_summary.columns" />
</div>

## Analytics


