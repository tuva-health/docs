---
id: cms-chronic-conditions
title: "CMS Chronic Conditions"
---

There are two main output tables from this data mart:
- **Union Calculation:** A "long" table with all qualifying encounters per patient-condition
- **Condition Pivot:** A "wide" table with one record per patient and each condition flag is a separate column

## Union Calculation

### Description
This table contains one record per patient per chronic condition.  For example, if a patient has 3 chronic conditions they will have 3 records in this table.  Each record includes the condition category, condition, date of onset, most recent diagnosis, and the total count of diagnosis codes that were recorded that are relevant for the condition.

### Mapping Guidelines
This table is created by running the chronic conditions data mart on data that's been mapped to the core data model.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar |  | Unique ID for each patient. |
| condition_category | varchar | yes | The category of the condition (e.g. physicial health, behavioral health). |
| condition | varchar | yes | The name of the condition. |
| condition_onset_date | date |  | The date the condition was first diagnosed based on available data. |
| condition_recent_date | date |  | The date the condition was most recently diagnosed based on available data. |
| condition_count | int |  | The number of conditions for the patient. |
| data_source | varchar |  | Indicates the name of the source dataset (e.g. Medicare Claims). |

## Condition Pivot

### Description
This table contains a single record per patient with separate binary (i.e. 0 or 1) columns for every chronic condition.  If a patient has a particular chronic condition they will have a 1 in that particular column and 0 otherwise.

### Mapping Guidelines
This table is created by running the chronic conditions data mart on data that's been mapped to the core data model.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique ID for each patient. |
| acquired_hypothyroidism | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| acute_myocardial_infarction | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| adhd_conduct_disorders_and_hyperkinetic_syndrome | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| alcohol_use_disorders | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| alzheimers_disease | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| alzheimers_disease_and_related_disorders_or_senile_dementia | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| anemia | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| anxiety_disorders | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| asthma | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| atrial_fibrillation | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| autism_spectrum_disorders | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| benign_prostatic_hyperplasia | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| bipolar_disorder | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| cataract | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| cerebral_palsy | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| chronic_kidney_disease | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| chronic_obstructive_pulmonary_disease_and_bronchiectasis | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| colorectal_cancer | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| cystic_fibrosis_and_other_metabolic_developmental_disorders | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| depression | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| diabetes | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| drug_use_disorders | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| endometrial_cancer | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| epilepsy | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| female_male_breast_cancer | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| fibromyalgia_and_chronic_pain_and_fatigue | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| glaucoma | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| heart_failure | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hepatitis_a | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hepatitis_b | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hepatitis_c_acute | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hepatitis_c_chronic | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hepatitis_c_unspecified | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hepatitis_d | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hepatitis_e | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hip_pelvic_fracture | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| human_immunodeficiency_virus | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hyperlipidemia | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| hypertension | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| intellectual_disabilities_and_related_conditions | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| ischemic_heart_disease | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| learning_disabilities | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| leukemias_and_lymphomas | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| liver_disease_cirrhosis_and_other_liver_conditions_except_viral_hepatitis | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| lung_cancer | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| migraine_and_chronic_headache | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| mobility_impairments | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| multiple_sclerosis_and_transverse_myelitis | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| muscular_dystrophy | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| obesity | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| opioid_use_disorder | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| osteoporosis | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| other_developmental_delays | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| peripheral_vascular_disease_pvd | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| personality_disorders | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| post_traumatic_stress_disorder_ptsd | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| pressure_and_chronic_ulcers | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| prostate_cancer | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| rheumatoid_arthritis__osteoarthritis_ra_oa | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| schizophrenia | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| schizophrenia_and_other_psychotic_disorders | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| sensory_blindness_and_visual_impairment | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| sensory_deafness_and_hearing_impairment | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| sickle_cell_disease | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| spina_bifida_and_other_congenital_anomalies_of_the_nervous_system | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| spinal_cord_injury | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| stroke_transient_ischemic_attack | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| tobacco_use | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| traumatic_brain_injury_and_nonpsychotic_mental_disorders | int | no | Flag (0 or 1) indicating whether the patient was diagnosed with the condition. |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims). |
