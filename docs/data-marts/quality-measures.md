---
id: quality-measures
title: "Quality Measures"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

[Code](https://github.com/tuva-health/tuva/tree/main/models/quality_measures)

The Quality Measures data mart is where we are building publicly available 
quality measures. You can see the roadmap in this section. If there is a 
publicly available measure you would like to see added you can [submit an issue](https://github.com/tuva-health/the_tuva_project/issues) 
on GitHub.

Check out the Knowledge Base [article](../knowledge-base/quality-measures)
for an overview of the data mart and a walkthrough example for calculating a 
quality measure.

| Measure Name                                                                   | Measure ID                               | Specification                                                                 | Status                           | 
|--------------------------------------------------------------------------------|------------------------------------------|-------------------------------------------------------------------------------|----------------------------------|
| Breast Cancer Screening                                                        | CMS Star C01, MIPS CQM 112, NQF/CBE 2372 | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/Claims-Registry-Measures/2023_Measure_112_MedicarePartBClaims.pdf) | **Released**                     |
| Care for Older Adults – Medication Review                                      | CMS Star C06                             | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf) | *Planned 2024 Q3*                |
| Care for Older Adults – Pain Assessment                                        | CMS Star C07                             | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf) | *Planned 2024 Q3*                |
| Colorectal Cancer Screening                                                    | CMS Star C02, MIPS CQM 113, NQF/CBE 0034 | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/CQM-Measures/2023_Measure_113_MIPSCQM.pdf) | **Released**                     |
| Controlling High Blood Pressure                                                | CMS Star C11, MIPS CQM 236               | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/CQM-Measures/2023_Measure_236_MIPSCQM.pdf) | **Released**                     |
| Diabetes: Eye Exam                                                             | CMS Star C09, MIPS CQM 117, NQF/CBE 0055 | [Link](https://mdinteractive.com/files/uploaded/file/CMS2024/2024_Measure_117_MIPSCQM.pdf) | **Released**                     |
| Diabetes: Hemoglobin A1c (HbA1c) Poor Control (> 9%)                           | CMS Star C10, MIPS CQM 001, NQF/CBE 0059 | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/CQM-Measures/2023_Measure_001_MIPSCQM.pdf) | **Released**                     |
| Falls: Plan of Care *(substitute for Reducing the Risk of Falling)*            | CMS Star C12, NQF/CBE 0101               | [Link](https://mdinteractive.com/files/uploaded/file/CMS2024/2024_Measure_155_MIPSCQM.pdf) | **Released**                |
| Follow-up after ED Visit for People with Multiple High-Risk Chronic Conditions | CMS Star C18                             | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf) | *Planned 2024 Q4*                |
| Hospital-Wide All-Cause Readmission (HWR)                                      | CMS Star C15, MIPS CQM 479               | [Link](https://qualitynet.cms.gov/inpatient/measures/readmission/methodology) | **Released** (Readmissions mart) |
| Influenza Immunization                                                         | CMS Star C03, MIPS CQM 110, NQF 0041     | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/CQM-Measures/2023_Measure_110_MedicarePartBClaims.pdf) | **Released**                     |
| Medication Adherence for Cholesterol (Statins)                                 | CMS Star D10, NQF 0541                   | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf) | *Planned 2024 Q3*                |
| Medication Adherence for Diabetes Medications                                  | CMS Star D08, NQF 0541                   | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf) | *Planned 2024 Q3*                |
| Medication Adherence for Hypertension (RAS antagonists)                        | CMS Star D09, NQF 0541                   | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf) | *Planned 2024 Q3*                |
| Medication Reconciliation Post-Discharge                                       | CMS Star C15, NQF 0097                   | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/Claims-Registry-Measures/2019_Measure_046_MedicarePartBClaims.pdf) | **Released**                     |
| Osteoporosis Management in Women Who Had a Fracture                            | CMS Star C08, MIPS CQM 418, NQF/CBE 0053 | [Link](https://mdinteractive.com/files/uploaded/file/CMS2023/2023_Measure_418_MIPSCQM.pdf) | **Released**                     |
| Statin Therapy for the Prevention and Treatment of Cardiovascular Disease      | CMS Star C16, MIPS CQM 438               | [Link](https://mdinteractive.com/files/uploaded/file/CMS2024/2024_Measure_438_MIPSCQM.pdf) | **Released**                     |
| Statin Use in Persons with Diabetes (SUPD)                                     | CMS Star D12                             | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf) | *Planned 2024 Q4*                |
| Transitions of Care                                                            | CMS Star C17                             | [Link](https://www.cms.gov/files/document/2024-star-ratings-technical-notes.pdf) | *Planned 2024 Q4*                |
| Urinary Incontinence *(substitute for Improving Bladder Control)*              | CMS Star C13, MIPS CQM 48                | [Link](https://qpp.cms.gov/docs/QPP_quality_measure_specifications/CQM-Measures/2024_Measure_048_MIPSCQM.pdf) | *Planned 2024 Q3*                |

## Data Requirements
This data mart uses the following tables from the Tuva Core Data Model:
- condition
- encounter
- lab_result
- medication
- observation
- patient
- procedure
- medical_claim
- pharmacy_claim

*Note: The Tuva Project will generate these Core tables. You just need to map 
your data to the Claims or Clinical Data Models and run the project.*

## Variables
The data mart includes logic that allows you to choose a measurement period 
end date.

- `quality_measures_period_end` defaults to the current year-end
- `snapshots_enabled` is an *optional* variable that can be enabled to allow
  running the mart for multiple years

To run the data mart without the default, simply add the 
`quality_measures_period_end` variable to your dbt_project.yml file 
or use the `--vars` dbt command. See examples below.

dbt_project.yml:

```yaml
vars:
    quality_measures_period_end: "2020-12-31"
    snapshots_enabled: true
```

dbt command:

```bash
# Uses defaults or vars from project yml, runs all marts
dbt build

# Runs only the Quality Mesures mart using defaults or vars from project yml
dbt build --select tag:quality_measures

# Overrides vars from project yml, executes snapshots
dbt build --select tag:quality_measures --vars '{quality_measures_period_end: "2020-12-31", snapshots_enabled: true}'
```

## Data Mart Structure

### Staging

The staging tables show what tables and fields are used from the Core data model.

### Intermediate

The intermediate tables contain the logic for calculating each quality measure. 
The subfolder for each quality measure contains that measure's specific logic for 
calculating the denominator, numerator, and exclusions. Many measures use the 
same logic for calculating exclusions, such as dementia or hospice. This shared 
logic can be found in the shared exclusions subfolder.

### Final

The final tables are an aggregated view of all quality measures and your 
population.

- **Summary Counts:**  Reporting measure counts with performance rates.
- **Summary Long:**  Long view of the results for the reporting version of all 
  measures. Each row represents the results a measure per patient. A null for 
  the denominator indicates that the patient was not eligible for that measure.
- **Summary Wide:**  Wide view of the results for the reporting version of all 
  measures. This model pivots measures on the patient level (i.e. one row per 
  patient with flags for each measure. The false flags can be treated as care 
  gaps as exclusions have been included in the pivot logic.

## summary_counts

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_counts.columns"  />

## summary_long

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_long.columns"  />

## summary_wide

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.quality_measures__summary_wide.columns"  />