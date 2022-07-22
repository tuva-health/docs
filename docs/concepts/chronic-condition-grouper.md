---
sidebar_position: 2
---

# Chronic Condition Grouper

Checkout out the code and terminology datasets for our chronic condition grouper on [GitHub](https://github.com/tuva-health/chronic_conditions).

## What Are Chronic Conditions?
The term “chronic condition” has a lot of variation in how it is defined and how it is used in various contexts such as discussions between patients and medical providers, professional communities, and in academic literature. Broadly speaking, chronic diseases are defined as conditions lasting longer than a specific amount of time and require ongoing medical attention and/or limited daily activities. Some of these chronic conditions such as heart disease, cancer, and diabetes are the leading causes of death and disability in the United States.

For the purposes of this article, we are going to discuss chronic conditions as defined by The Centers for Medicare and Medicaid Services. CMS has developed a set of algorithms to identify 30 chronic conditions and 40 other conditions which identify additional chronic health, mental health, and substance abuse conditions.

| Chronic Condition |
| ----------- |
| ADHD, Conduct Disorders, and Hyperkinetic Syndrome |
| Acute Myocardial Infarction |
| Alcohol Use Disorders |
| Alzheimer’s Disease |
| Anemia |
| Anxiety Disorders |
| Asthma |
| Atrial Fibrillation and Flutter |
| Autism Spectrum Disorders |
| Benign Prostatic Hyperplasia |
| Bipolar Disorder |
| Cancer, Breast |
| Cancer, Colorectal |
| Cancer, Endometrial |
| Cancer, Lung |
| Cancer, Prostate |
| Cancer, Urologic (Kidney, Renal Pelvis, and Ureter) |
| Cataract |
| Cerebral Palsy |
| Chronic Kidney Disease |
| Chronic Obstructive Pulmonary Disease |
| Cystic Fibrosis and Other Metabolic Developmental Disorders |
| Depression, Bipolar, or Other Depressive Mood Disorders |
| Depressive Disorders |
| Diabetes |
| Drug Use Disorders |
| Epilepsy |
| Fibromyalgia and Chronic Pain and Fatigue |
| Glaucoma |
| Heart Failure and Non-Ischemic Heart Disease |
| Hepatitis A |
| Hepatitis B (acute or unspecified) |
| Hepatitis B (chronic) |
| Hepatitis C (acute) |
| Hepatitis C (chronic) |
| Hepatitis C (unspecified) |
| Hepatitis D |
| Hepatitis E |
| Hip/Pelvic Fracture |
| Human Immunodeficiency Virus and/or Acquired Immunodeficiency Syndrome (HIV/AIDS) |
| Hyperlipidemia |
| Hypertension |
| Hypothyroidism |
| Intellectual Disabilities and Related Conditions |
| Ischemic Heart Disease |
| Learning Disabilities |
| Leukemias and Lymphomas |
| Liver Disease, Cirrhosis, and Other Liver Conditions (except Viral Hepatitis) |
| Migraine and Chronic Headache |
| Mobility Impairments |
| Multiple Sclerosis and Transverse Myelitis |
| Muscular Dystrophy |
| Non-Alzheimer’s Dementia |
| Obesity |
| Opioid Use Disorder (OUD) |
| Osteoporosis With or Without Pathological Fracture |
| Other Developmental Delays |
| Parkinson’s Disease and Secondary Parkinsonism |
| Peripheral Vascular Disease (PVD) |
| Personality Disorders |
| Pneumonia, All-cause |
| Post-Traumatic Stress Disorder (PTSD) |
| Pressure and Chronic Ulcers |
| Rheumatoid Arthritis/Osteoarthritis |
| Schizophrenia and Other Psychotic Disorders |
| Schizophrenia |
| Sensory — Blindness and Visual Impairment |
| Sensory — Deafness and Hearing Impairment |
| Sickle Cell Disease |
| Spina Bifida and Other Congenital Anomalies of the Nervous System |
| Spinal Cord Injury |
| Stroke/Transient Ischemic Attack |
| Tobacco Use |
| Traumatic Brain Injury and Nonpsychotic Mental Disorders due to Brain Damage |
| Viral Hepatitis (general) |

These chronic conditions help identify cohorts of patients that clinicians, insurance payers, policymakers, and researchers can use. This information can lead to better care and understanding of chronic conditions' burden on our health care system. 

You can find more information by checking out these resources:
- https://www.cms.gov/Research-Statistics-Data-and-Systems/Statistics-Trends-and-Reports/Chronic-Conditions
- https://www2.ccwdata.org/web/guest/condition-categories
- https://www.cdc.gov/chronicdisease/about/index.htm

## How Are Chronic Conditions Calculated?
A simplified explanation of how the high-level concept of chronic conditions can be calculated is by first identifying the target population (or patients or beneficiaries) by a list of diagnosis codes, procedure codes, MS DRG codes, or drug codes. Applicable exclusion or exception criteria for that condition are then applied. The condition may also have reference periods (range of years) and claims qualifications.

![Calculation](/img/chronic_conditions_calculation.png)

## Data Requirements
CMS developed the chronic condition algorithms to run on administrative claims data. The specifications may change slightly from year-to-year due to changing claims coding standards. The data elements needed to calculate the chronic conditions are listed below.

**Condition**
Description: Info about complaints, problems, admit diagnoses, discharge diagnoses, etc.
Columns:
- encounter_id
- condition_date
- code_type
- code
- diagnosis_rank

**Encounter**
Description: Visit-level information for all different encounter types (1 record per visit).
Columns:
- encounter_id
- patient_id
- encounter_start_date

**Medication**
Description: Info about medication requests, administrations, and prescriptions.
Columns:
- encounter_id
- patient_id
- filled_date
- paid_date
- ndc

**Procedure**
Description: Info about procedures including cpt and icd-10-pcs.
Columns:
- encounter_id
- procedure_date
- code_type
- code

## Terminology Datasets
The chronic condition algorithm requires two terminology datasets that are used as lookup tables to identify chronic conditions. The following is a complete list of the terminology datasets that are needed:

| Terminology Dataset | Description |
| --- | --- |
| Chronic Conditions Algorithms | A list of the 30 chronic conditions with associated reference periods, valid ICD-10 codes, exclusion criteria, and claims qualifications. Also included is an algorithm change history.|
| Other Chronic Health, Mental Health, and Potentially Disabling Conditions Algorithms | A list of the 40 other chronic health, mental health, and potentially disabling conditions with associated reference periods, valid ICD-9/ICD-10/MS-DRG/CPT4/HCPCS codes, exclusion criteria, and claims qualifications. Also included is an algorithm change history.|

CMS makes these terminology datasets available as files that can be downloaded on the Chronic Conditions Data Warehouse website:

1. [Chronic Conditions Algorithms](https://www2.ccwdata.org/web/guest/condition-categories-chronic)
2. [Other Chronic Health, Mental Health, and Potentially Disabling Conditions Algorithms](https://www2.ccwdata.org/web/guest/condition-categories-other)

These terminology datasets require significant transformation to be used as code lookup files in a data warehouse. They are already transformed and included in the Tuva Project.

## Running the Tuva Project and Querying the Data
The Chronic Condition concept package is available on The Tuva Health [GitHub](https://github.com/tuva-health/chronic_conditions). The project contains the terminology dataset, three staging models, and two main output tables.

Check out the [DAG](https://tuva-health.github.io/chronic_conditions/#!/overview?g_v=1).

Once you have successfully ran the Chronic Conditions mart, five tables will be populated in your data warehouse (they will appear in the database/schema you specified as variables, the default database/schema will be `tuva.chronic_conditions`). The main output tables are key for running analytics.

- **chronic_conditions_unioned**: This model unions condition flags from the three upstream stage models that calculate them. This table lists all qualifying encounters per patient-condition.
- **chronic_conditions_pivoted**: This model pivots conditions on the patient level (i.e. one record per patient) with flags for each chronic condition as separate columns.

Below is a useful query that can be ran against the mart to see the distribution of chronic conditions across your patient population.

```
select
      condition_category
    , condition
    , count(distinct patient_id) as distinct_patient_count
from tuva.chronic_conditions.chronic_conditions_unioned
group by
      condition_category
    , condition
order by count(distinct patient_id) desc;
```
These chronic conditions can now be used as groupers for your patient population.

*Sources:*

- [https://www.cdc.gov/chronicdisease/about/index.htm](https://www.cdc.gov/chronicdisease/about/index.htm)
- [https://www2.ccwdata.org/web/guest/condition-categories](https://www2.ccwdata.org/web/guest/condition-categories)
- [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4969287/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4969287/)
- [https://www.cms.gov/Research-Statistics-Data-and-Systems/Statistics-Trends-and-Reports/Chronic-Conditions](https://www.cms.gov/Research-Statistics-Data-and-Systems/Statistics-Trends-and-Reports/Chronic-Conditions)