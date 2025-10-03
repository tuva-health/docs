---
id: quality-measures
title: "Quality Measures"
---

<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>

  <small><em>Last updated: 09-29-2025</em></small>

</div>

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## What are Quality Measures?

Quality measures help us measure or quantify healthcare processes, outcomes, 
patient perceptions, organizational structure, and systems. These measures are 
related to one or more quality goals for health care (e.g., effective, safe, 
efficient, patient-centered, equitable, and timely care). CMS uses quality 
measures in its quality improvement, public reporting, and pay-for-reporting 
programs for specific healthcare providers.

However, value-based care has become synonymous with long lists of quality 
measures that healthcare providers must track and many overlapping programs and 
measure definitions. CMS has launched new “simplified” reporting programs to 
help address these administrative burdens, such as the 
[Alternative Payment Model Performance Pathway (APP)](https://mdinteractive.com/mips-blog/acos-transitioning-ecqm-and-mips-cqm-reporting-start-early-better-results) 
and [ACO REACH](https://www.cms.gov/priorities/innovation/innovation-models/aco-reach).

Quality measures are typically developed based on research and clinical practice 
evidence. Measures are developed by:

- Public agencies (e.g., CMS and the Agency for Healthcare Research and Quality)
- Private nonprofits (e.g., the National Committee for Quality Assurance)
- Professional medical associations
- Private groups

## Components of a Quality Measure

Quality measures have many standard sections:

- **Measure ID:** Measures can have several different identifiers. These are 
  created by the measure steward (i.e., the organization that authored and 
  maintains the measure). For example, the identifiers for Breast Cancer 
  Screening are NQF 2372, MIPS CQM Quality ID #112, and eCQM CMS125.
- **Measure Description:** A brief description of the purpose of the measure.
- **Denominator:** The population to which the measure applies (i.e., the number 
  of people who should have received a service or action such as a screening). 
  The denominator is the lower part of a fraction used to calculate a rate.
- **Numerator:** The portion of the denominator population that received the 
  service or action for which the measure is quantifying. The numerator is the 
  upper part of a fraction used to calculate a rate.
- **Exclusions/Exceptions:** An exclusion is a reason that removes a patient 
  from both the numerator and denominator because the measure would not 
  appropriately apply to them. Exceptions are due to medical reasons (e.g., 
  patient is comatose), patient reasons (e.g., patient refuses), and system 
  reasons (e.g., shortage of a vaccine).
- **Measure Period:** The timeframe in which the service or action should have 
  occurred.
- **Value Sets:** The healthcare codes used to define the clinical concepts used 
  in the measure. These codes are from standard systems such as ICD-10, CPT, 
  LOINC, RxNorm, SNOMED, etc.

## Methodology

Below is a simplified flow chart for calculating a quality measure.

![Quality Measure Methodology](/img/quality_measures/quality_measure_methodology.jpg)

Below is an example of the concepts and logic in the Breast Cancer Screening 
quality measure using the 2020 Medicare LDS 5% data set.

![Breast Cancer Screening Sankey Diagram](/img/quality_measures/breast_cancer_screening_sankey_diagram.png)

## Data Quality Issues

Many organizations that have the technical staff needed to build the logic for 
a quality measure may still run into data quality issues. Some common data 
quality issues are listed below.

- Aggregating and deduplicating data sources.
- Matching patients across these various data sources.
- Missing data or not having enough data:
    - Missing key data points required for the measure, such as date or birth or
      gender.
    - Missing types of data, such as labs or medications.
    - Some measures may go back several years for screening data, such as 
      Colorectal Cancer Screening).
    - Some measures may require other data sources, such as labs or survey data, 
      that are not easy to obtain or work with.
    - Merging claims into encounters to accurately look for institutional stays 
      or residing in a long-term care facility for more than 90 days during the 
      performance period.
- Normalizing healthcare codes to the value set required by the measure.
- Mapping custom data from an EMR, such as observations and report or document 
  tags, to a proper code from the measure value set.

## Introduction Video

In this video, we walk through the high-level concepts of the Breast Cancer 
Screening quality measure and common data quality issues that may come up when 
calculating a measure.

<iframe width="640" height="400" src="https://www.youtube.com/embed/pjAqmlx7HIs" title="Quality Measures Intro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Tuva Quality Measures Data Mart

[Code on Github](https://github.com/tuva-health/tuva/tree/main/models/quality_measures)

The Quality Measures data mart is where we are building publicly available quality measures. If there is a publicly available measure you would like to see added you can [submit an issue](https://github.com/tuva-health/the_tuva_project/issues) on GitHub.


| Measure Name                                                                   | Measure ID                               | Specification                                                                 | Status                           | 
|--------------------------------------------------------------------------------|------------------------------------------|-------------------------------------------------------------------------------|----------------------------------|
| Documentation of Current Medications in the Medical Record                     | CMS Star C06, MIPS CQM 130               | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/CQM-Measures/2023_Measure_130_MIPSCQM.pdf) | **Released**                     |
| Hospital-Wide All-Cause Readmission (HWR)                                      | CMS Star C15, MIPS CQM 479               | [Link](https://qualitynet.cms.gov/inpatient/measures/readmission/methodology) | **Released** (Readmissions mart) |
| Medication Adherence for Cholesterol (Statins)                                 | CMS Star D10, NQF 0541                   | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf#page=104) | **Released**                     |
| Medication Adherence for Diabetes Medications                                  | CMS Star D08, NQF 0541                   | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf#page=98) | **Released**                     |
| Medication Adherence for Hypertension (RAS antagonists)                        | CMS Star D09, NQF 0541                   | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf#page=101) | **Released**                     |
| Pain Assessment and Follow-Up                                                  | CMS Star C07, MIPS CQM 131               | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/CQM-Measures/2019_Measure_131_MIPSCQM.pdf) | **Released**                     |
| Statin Therapy for the Prevention and Treatment of Cardiovascular Disease      | CMS Star C16, MIPS CQM 438               | [Link](https://mdinteractive.com/files/uploaded/file/CMS2024/2024_Measure_438_MIPSCQM.pdf) | **Released**                     |
| Statin Use in Persons with Diabetes (SUPD)                                     | CMS Star D12                             | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf#page=109) | **Released**                     |

The data mart includes logic that allows you to choose a measurement period end date.

- `quality_measures_period_end` defaults to the current year-end
- `snapshots_enabled` is an *optional* variable that can be enabled to allow
  running the mart for multiple years

To run the data mart without the default, simply add the `quality_measures_period_end` variable to your dbt_project.yml file or use the `--vars` dbt command. See examples below.

dbt_project.yml:

```yaml
vars:
    quality_measures_period_end: "2020-12-31"
    snapshots_enabled: true
```

### Data Dictionary

#### summary_counts

Reporting measure counts with performance rates.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_counts.columns"  />

#### summary_long

Long view of the results for the reporting version of all measures. Each row 
represents the results a measure per patient. A null for the denominator 
indicates that the patient was not eligible for that measure.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_long.columns"  />

#### summary_wide

Wide view of the results for the reporting version of all measures. This model 
pivots measures on the patient level (i.e. one row per patient with flags for 
each measure. The false flags can be treated as care gaps as exclusions have 
been included in the pivot logic.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_wide.columns"  />

#### Intermediate Tables

The intermediate tables contain the logic for calculating each quality measure. 
The subfolder for each quality measure contains that measure's specific logic 
for calculating the denominator, numerator, and exclusions. Many measures use 
the same logic for calculating exclusions, such as dementia or hospice. This 
shared logic can be found in the shared exclusions subfolder.

### Optional Input Sources

In addition to the core claims and clinical data, the Quality Measures data mart can optionally incorporate data from HEDIS Digital Quality Measures (dQM). These optional inputs and outputs only run when the variable `hedis_enabled` is set to true. It is disabled by default.

**Prerequisite:** You must have HEDIS dQM results from NCQA or by purchasing the add-on from Tuva Health. 

```yaml
vars:
    hedis_enabled: true
    # snapshots_enabled: true  # can be enabled to snapshot all final tables
```

#### Source models

##### **hedis_cql_engine_log**
Optional mart input containing a detailed log of computations of the CQL produced from HEDIS dQM. This data is useful for auditing and understanding the specific logic applied during measure calculation.

<JsonDataTable jsonPath="nodes.model\.input_layer\.hedis_cql_engine_log.columns" />

##### **hedis_measure_report**
Optional mart input containing quality measure report data from HEDIS dQM. This provides standardized reporting outputs that can be aligned with external benchmarks.

<JsonDataTable jsonPath="nodes.model\.input_layer\.hedis_measure_report.columns" />

#### Additional Final models

##### **hedis_cql_engine_log**
Deduplicated CQL computations produced from the external HEDIS dQM source.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__hedis_cql_engine_log.columns"  />

##### **hedis_summary_counts**
Deduplicated quality measure results aggregated to the data source/measure level.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__hedis_summary_counts.columns"  />

##### **hedis_summary_long**
Deduplicated quality measure results at the patient/measure level. A null denominator indicates a patient was not eligible for that measure.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__hedis_summary_long.columns"  />

## Example SQL

<details>
  <summary>Quality Measure Performance</summary>

```sql
select
      measure_id
    , measure_name
    , performance_period_end
    , performance_rate
from quality_measures.summary_counts
order by performance_rate desc
```
</details>

<details>
  <summary>Exclusion Reason Breakdown</summary>

```sql
select
      measure_id
    , exclusion_reason
    , count(person_id) as patient_count
from quality_measures.summary_long
where exclusion_flag = 1
group by
      measure_id
    , exclusion_reason
order by
      measure_id
    , exclusion_reason
```
</details>

<details>
  <summary>Patient Pivot</summary>

```sql
select * from quality_measures.summary_wide
```
</details>
