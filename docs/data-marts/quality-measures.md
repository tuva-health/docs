---
id: quality-measures
title: "Quality Measures"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Methods

[Code on Github](https://github.com/tuva-health/tuva/tree/main/models/quality_measures)

The Quality Measures data mart is where we are building publicly available quality measures. You can see the roadmap in this section. If there is a publicly available measure you would like to see added you can [submit an issue](https://github.com/tuva-health/the_tuva_project/issues) on GitHub.

Check out the Knowledge Base [article](../knowledge/quality-measures) for an overview of the data mart and a walkthrough example for calculating a quality measure.

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

## Data Dictionary

### summary_counts

Reporting measure counts with performance rates.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_counts.columns"  />

### summary_long

Long view of the results for the reporting version of all measures. Each row 
represents the results a measure per patient. A null for the denominator 
indicates that the patient was not eligible for that measure.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_long.columns"  />

### summary_wide

Wide view of the results for the reporting version of all measures. This model 
pivots measures on the patient level (i.e. one row per patient with flags for 
each measure. The false flags can be treated as care gaps as exclusions have 
been included in the pivot logic.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_wide.columns"  />

### Intermediate Tables

The intermediate tables contain the logic for calculating each quality measure. 
The subfolder for each quality measure contains that measure's specific logic 
for calculating the denominator, numerator, and exclusions. Many measures use 
the same logic for calculating exclusions, such as dementia or hospice. This 
shared logic can be found in the shared exclusions subfolder.


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
