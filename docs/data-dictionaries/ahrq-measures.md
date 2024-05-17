---
id: ahrq-measures
title: "AHRQ Measures"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

The AHRQ Measures data mart implements the AHRQ quality indicator measures in the Tuva Project.

## pqi_denom_long

This model contains a row for each patient and data_source combination that is eligible for each pqi each year.

**Primary Key:**
  * patient_id
  * data_source
  * pqi_number
  * year_number



<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_denom_long.columns" />
</div>

## pqi_exclusion_long

This model contains a list of all the exclusions an encounter qualified for. An encounter can qualify for multiple exclusions for each pqi, which are listed here. Qualifying for an exclusion **does not necessarily** mean the encounter would have been in the numerator for the pqi, simply that it is excluded from being eligible to be in the numerator.

**Primary Key:**
  * data_source
  * encounter_id
  * exclusion_number
  * pqi_number



<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_exclusion_long.columns" />
</div>

## pqi_num_long

This model contains a list of all encounters that qualified for a pqi. The patient_id and data_source are brought in for reference as well.

**Primary Key:**
  * data_source
  * encounter_id
  * pqi_number

<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_num_long.columns" />
</div>

## pqi_rate

This model pre calculates the rate (as a per 100,000 members) for each pqi and year. The rate equals the numerator divided by denominator multiplied by 100,000. The AHRQ software typically calculates these as a per 100,000 population in a metropolitan area or county. However, when calculating for a population in a claims dataset, it can be useful to view the rates as a "per 100,000 members" instead.

**Primary Key:**
  * data_source
  * year_number
  * pqi_number


<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_rate.columns" />
</div>

## pqi_summary

This model is designed to be useful for analytics on pqis in your claims data set. It joins in data about the encounter for summarization, such as facility, drg, encounter start date etc...

**Primary Key:**
  * data_source
  * encounter_id
  * pqi_number
  * year_number


<div class="data_dictionary_table">
  <JsonDataTable jsonPath="nodes.model\.the_tuva_project\.ahrq_measures__pqi_summary.columns" />
</div>


