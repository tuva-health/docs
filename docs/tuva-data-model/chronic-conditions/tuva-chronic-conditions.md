---
id: chronic-conditions
title: "CHRONIC_CONDITIONS_UNIONED"
---
The CMS Chronic Conditions data mart implements the CMS Chronic Condition grouper from the [CMS Chronic Condition Data Warehouse](https://www2.ccwdata.org/web/guest/condition-categories-chronic).  The data mart includes the value set of ICD-10-CM diagnosis codes related for each of the ~70 chronic conditions defined by CMS.  It also includes logic to assign condition flags to your patient population.

While implementing the CMS Chronic Condition logic we encountered several issues.  First, some of the condition categories aren't particularly specific.  For example, the condition category "Diabetes" includes both Type 1 and Type 2 Diabetes, which doesn't make a ton of sense given the heterogeneity in the underlying pathology of these two diseases (i.e. one is an autoimmune disease while the other is a metabolic diseaese).  Second, several of the condition categories are not mutually exclusive.  For example, schizophrenia is found in multiple condition categories.  

Both of these issues are troubling because the point of any grouper is to group patients into homogeneous cohorts to enable "apples-to-apples" comparisons and analytics.  We decided to keep this grouper as part of the Tuva Project, since it's a standard grouper used by many people doing healthcare analytics.  But we also decided to develop our own chronic disease grouper data mart with more precise and mutually exclusive categories.

There are two main output tables created by this data mart:

- **[Union Calculation](#chronic-conditions-unioned):** A "long" table with all qualifying encounters per patient-condition

- **[Condition Pivot](#chronic-conditions-pivoted):** A "wide" table with one record per patient and each condition flag is a separate column

## Chronic Conditions Unioned

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

## Chronic Conditions Pivoted

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

## Tuva Chronic Conditions

The Tuva Chronic Conditions data mart is a chronic condition grouper that includes ~40 homogeneous and mutually exclusive chronic condition categories.  We developed this grouper after working with the CMS Chronic Condition grouper and finding problems with it.  

There are 3 main output tables from this data mart:

- **[Chronic Condition Groups](#chronic-condition-groups):** This table contains the chronic condition hierarchy - use it if you're interested to see the distinct list of chronic conditions and condition families they map to.

- **[Chronic Conditions Long](#chronic-conditions-long):** This table contains 1 record for each patient for each chronic condition they have, along with the first and most recent dates of diagnosis.

- **[Chronic Conditions Wide](#chronic-conditions-wide):** This table contains 1 record per patient and a column for each chronic condition.  For each chronic condition column, the value will be 1 if the patient has that chronic condition, and 0 otherwise.

## Chronic Condition Groups

### Description
This table contains the list of chronic conditions included in this grouper, along with the condition families that they map to.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| condition_family | varchar |  | The disease family the condition belongs to e.g. cardiovascular, metabolic, etc. |
| condition | varchar | yes | The actual chronic condition. |

## Chronic Conditions Long

### Description
This table contains a single record per patient per chronic condition.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique ID for each patient. |
| condition_family | varchar | [yes](https://github.com/tuva-health/tuva_chronic_conditions/blob/main/seeds/tuva_chronic_conditions__chronic_conditions_hierarchy.csv) | The disease family the condition belongs to e.g. cardiovascular, metabolic, etc. |
| condition | varchar | [yes](https://github.com/tuva-health/tuva_chronic_conditions/blob/main/seeds/tuva_chronic_conditions__chronic_conditions_hierarchy.csv)] | Unique ID for each patient. |
| first_diagnosis_date | date | no | The date the patient was first diagnosed with the condition. |
| last_diagnosis_date | date | no | The date the patient was last diagnosed with the condition. |

## Chronic Conditions Wide

### Description
This table contains a single record per patient with columns for every chronic condition.  For each chronic condition column, the patient receives a '1' if the patient has been diagnosed with that chronic condition, and a '0' otherwise.

### Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique ID for each patient. |
| hypertension | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| hyperlipidemia | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| atherosclerosis | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| obesity | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| type 2 diabetes | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| anxiety | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| depression | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| chronic obstructive pulmonary disease (copd) | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| chronic kidney disease | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| atrial fibrillation | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| asthma | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| heart failure | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| stroke / transient ischemic attack | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| tobacco | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| dementia | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| breast cancer | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| rheumatoid arthritis | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| acute myocardial infarction | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| bipolar | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| metabolic syndrome | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| alzheimer's disease | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| type 1 diabetes | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| alcohol | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| opioid | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| parkinson's disease | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| colorectal cancer | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| personality disorder | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| lupus | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| schizophrenia | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| lung cancer | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| multiple sclerosis | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| post-traumatic stress disorder (ptsd) | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| crohn's disease | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| attention-deficit hyperactivity disorder (adhd) | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| ulcerative colitis | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| obsessive-compulsive disorder (ocd) | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| cystic fibrosis | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |
| cocaine | integer | no | Flag indicating whether the patient has ever been diagnosed with this disease. |

