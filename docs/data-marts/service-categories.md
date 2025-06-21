---
id: service-categories
title: "Service Category Grouper"
toc_min_heading_level: 2
toc_max_heading_level: 4
---
<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 06-21-2025</em></small>
</div>

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Methods

[Code on Github](https://github.com/tuva-health/tuva/tree/main/models/claims_preprocessing/service_category)

In the Tuva Project, we've created a service category grouper to help us analyze payment and utilization metrics. We use it to categorize medical claim lines.

**Data Elements**
The data elements that we use to create this grouper are as follows:
- **bill_type_code:** Bill type code for the claim (institutional claims only).
- **revenue_center_code:** Revenue center code for the claim line (institutional only and typically multiple codes per claim).
- **ms_drg_code:** MS-DRG for the claim (inpatient claims only).
- **place_of_service_code:** Place of service for the claim (professional claims only).
- **hcpcs_code:** HCPCS level 1 or level 2 code for the claim line. Most definitions use the [CCS groupings](https://hcup-us.ahrq.gov/toolssoftware/ccs_svcsproc/ccssvcproc.jsp) of codes instead of referencing codes individually.
- **icd_diagnosis_code:** Typically referenced through [CCSR groupings](https://hcup-us.ahrq.gov/toolssoftware/ccsr/ccs_refined.jsp) instead of individual codes.
- **npi:** Used to reference the taxonomy code of a facility NPI and a provider's specialty.

The Tuva Project Service Category Grouper has three levels in a hierarchy with each subcategory rolling up to a high level category. Because all subcategories roll up to one and only one higher level category, the sum of all the logic for each subcategory in a category is the same as the logic for the category. As such, we'll describe the higher level categories conceptually without codes, and then we'll define each subcategory sharing the code sets. See table below for a quick view of the categories and subcategories:

| SERVICE_CATEGORY_1 | SERVICE_CATEGORY_2 | SERVICE_CATEGORY_3 |
| --- | --- | --- |
| inpatient | acute inpatient | l/d - cesarean delivery |
| inpatient | acute inpatient | l/d - newborn |
| inpatient | acute inpatient | l/d - newborn nicu |
| inpatient | acute inpatient | l/d - other |
| inpatient | acute inpatient | l/d - vaginal delivery |
| inpatient | acute inpatient | medical |
| inpatient | acute inpatient | surgical |
| inpatient | acute inpatient | acute inpatient - other |
| inpatient | inpatient hospice | inpatient hospice |
| inpatient | inpatient psychiatric | inpatient psychiatric |
| inpatient | inpatient rehabilitation | inpatient rehabilitation |
| inpatient | inpatient substance use | inpatient substance use |
| inpatient | skilled nursing | skilled nursing |
| office-based | office-based pt/ot/st | office-based pt/ot/st |
| office-based | office-based radiology | ct |
| office-based | office-based radiology | general |
| office-based | office-based radiology | mri |
| office-based | office-based radiology | pet |
| office-based | office-based surgery | office-based surgery |
| office-based | office-based visit | office-based visit |
| office-based | telehealth visit | telehealth visit |
| office-based | office-based other | office-based other |
| outpatient | ambulatory surgery center | ambulatory surgery center |
| outpatient | dialysis | dialysis |
| outpatient | emergency department | emergency department |
| outpatient | home health | home health |
| outpatient | observation | observation |
| outpatient | outpatient hospice | outpatient hospice |
| outpatient | outpatient hospital or clinic | outpatient hospital or clinic |
| outpatient | outpatient psychiatric | outpatient psychiatric |
| outpatient | outpatient pt/ot/st | outpatient pt/ot/st |
| outpatient | outpatient radiology | ct |
| outpatient | outpatient radiology | general |
| outpatient | outpatient radiology | mri |
| outpatient | outpatient radiology | pet |
| outpatient | outpatient rehabilitation | outpatient rehabilitation |
| outpatient | outpatient substance use | outpatient substance use |
| outpatient | outpatient surgery | outpatient surgery |
| outpatient | pharmacy | pharmacy |
| outpatient | urgent care | urgent care |
| ancillary | ambulance | ambulance |
| ancillary | durable medical equipment | durable medical equipment |
| ancillary | lab | lab |
| other | other | other |

When developing the service category grouper we kept the following principles in mind:
- **Cardinality is Key:** If there were hundreds of categories, it would be too hard for a human to make sense of what was going on. But if you only had 2 categories for example, it wouldn't be enlightening. Almost all insights would come from breaking it down further.
- **Mutually Exclusive and Exhaustive:** Every healthcare claims can be grouped into one service category and only one service category. This implies that summing the total payments for all service categories would equal the sum of all payments for each individual claim.
- **The "Other" Category Isn't Too Large:** In order to make the grouper Exhaustive, we group everything we can into meaningful categories and then put everything else in the "other" category. If this "other" category is too large, that means we need to break it out into additional meaningful categories.
- **Hierarchical:** It's a balancing act to try to create groups with low cardinality but providing enough homogeneity inside each group for analysis to be actionable. This often leads us to create hierarchical groupers so that you can see high level groups first and then drill in to get more specific while still keeping the broader context simple.
- **Feasible:** Any categorization grouper is only useful if you're able to group things into the categories using data elements that are readily available and populated reasonably consistently.

The Tuva Project Service Category Grouper categorizes most institutional claims at the claim level using the bill type code for each claim. All inpatient institutional claims are defined at the claim level, while some outpatient institutional service categories are grouped at the line level (such as radiology which is defined using HCPCS codes). 
Professional claims are also defined at the claim line level.

### Inpatient

Service Category 2 (Click to expand and see specific codes that make up each category. Service category 3 is listed where applicable.)

<details>
<summary><strong>Acute Inpatient</strong></summary>

##### Institutional Claims
- **DRG Codes**:
  - Any valid Diagnosis-Related Group (MS-DRG or APR-DRG) code: These classify hospital cases into groups expected to have similar hospital resource use.
- **Bill Type Codes**:
  - **11x**: General Inpatient 
  - **12x**: Inpatient Psychiatric Services 

##### Professional Claims
- **Place of Service Code**:
  - **21**: Inpatient Hospital 

##### Service Category 3
- **Medical**: 
  - DRGs designated as Medical per CMS DRG definition
- **Surgical**: 
  - DRGs designated as Surgical per CMS DRG definition
- **Acute Inpatient**: 
  - Any other acute inpatient claims that don't roll up to other service categories.
- **L/D Vaginal Delivery**:
  - **768**: Vaginal delivery with complicating diagnoses.
  - **796**: Vaginal delivery with other specified conditions.
  - **797**: Vaginal delivery with O.R. procedure except sterilization and/or D&C.
  - **798**: Vaginal delivery with sterilization and/or D&C.
  - **805**: Vaginal delivery without complicating diagnoses.
  - **806**: Vaginal delivery with tubal ligation/sterilization.
  - **807**: Vaginal delivery with antepartum conditions.
- **L/D Cesarean Delivery**:
  - **783**: Cesarean delivery with complicating diagnoses.
  - **784**: Cesarean delivery with sterilization and/or D&C.
  - **785**: Cesarean delivery with O.R. procedure except sterilization and/or D&C.
  - **786**: Cesarean delivery with other specified conditions.
  - **787**: Cesarean section without complicating diagnoses.
  - **788**: Cesarean section with tubal ligation/sterilization.
- **L/D Newborn**:
  - **795**: Normal newborn care.
- **L/D Newborn NICU**:
  - **789**: Neonate with other significant problems.
  - **790**: Extreme immaturity or respiratory distress syndrome, neonate.
  - **791**: Prematurity with major problems.
  - **792**: Neonate with other significant problems.
  - **793**: Full-term neonate with major problems.
  - **794**: Neonate with major anomalies.
  - **Revenue Codes 0173, 0174**: Intensive and sub-intensive newborn care.
- **L/D Other**:
  - **Major Diagnostic Categories (MDC) Codes 14 or 15**: Pregnancy, Childbirth, the Puerperium, and Newborns & Other Neonates with Conditions Originating in the Perinatal Period, which do not fit into the other specified categories.

</details>


<details>
<summary><strong>Inpatient Substance Use</strong></summary>

###### Institutional Claims
- **Taxonomy Codes**:
  - **324500000X**: Substance Abuse Rehabilitation Facility
  - **261QR0405X**: Substance Use Disorder Rehabilitation Facility
  - **101YA0400X**: Addiction (Substance Use Disorder)

- **CCSR Category Codes**:
  - **MBD026**: Substance Use Disorders
  - **SYM008**: Mental Health and Substance Use Interventions
  - **MBD025**: Alcohol Use Disorders
  - **SYM009**: Mental Health and Substance Use Assessment
  - **MBD034**: Drug Use Disorders

###### Professional Claims
- None

</details>


<details>
<summary><strong>Inpatient Hospice</strong></summary>

##### Institutional Claims
- **Bill Type Codes**:
  - **82x**: Inpatient hospice services

##### Professional Claims
- **Place of Service Code**:
  - **34**: Hospice facility

</details>



<details>
<summary><strong>Inpatient Psychiatric</strong></summary>

##### Institutional Claims
- **Taxonomy Codes**:
  - **283Q00000X**: Psychiatric Hospital
  - **273R00000X**: Psychiatric Residential Treatment Facility

##### Professional Claims
- **Place of Service Codes**:
  - **51**: Inpatient Psychiatric Facility
  - **55**: Residential Substance Abuse Treatment Facility
  - **56**: Psychiatric Residential Treatment Center

</details>


<details>
<summary><strong>Inpatient Rehabilitation</strong></summary>

##### Institutional Claims
- **Taxonomy Codes**:
  - **283X00000X**: Rehabilitation Hospital
  - **273Y00000X**: Physical Medicine and Rehabilitation Facility

##### Professional Claims
- **Place of Service Code**:
  - **61**: Comprehensive Outpatient Rehabilitation Facility (CORF)

</details>

<details>
<summary><strong>Skilled Nursing</strong></summary>

##### Institutional Claims
- **Bill Type Codes**:
  - **21x**: Inpatient Skilled Nursing (Part A)
  - **22x**: Inpatient Skilled Nursing (Part B)

##### Professional Claims
- **Place of Service Codes**:
  - **31**: Skilled Nursing Facility
  - **32**: Nursing Facility

</details>


### Outpatient

<details>
<summary><strong>Ambulatory Surgery Center</strong></summary>

##### Institutional Claims
- **Revenue Codes**:
  - **0490**: Ambulatory Surgical Care - General classification
  - **0499**: Ambulatory Surgical Care - Other
- **Taxonomy Code**:
  - **261QA1903X**: Ambulatory Surgical Center

##### Professional Claims
- **Place of Service Code**:
  - **24**: Ambulatory Surgical Center

</details>

<details>
<summary><strong>Dialysis</strong></summary>

##### Institutional Claims
- **Bill Type Codes**: 
    -**72**: Independent Renal Dialysis Center
- **Taxonomy Codes**:
  - **2472R0900X**: Nephrology Dialysis Technician
  - **163WD1100X**: Dialysis Registered Nurse
  - **163WH0500X**: Hemodialysis Technician
  - **261QE0700X**: End-Stage Renal Disease (ESRD) Treatment Facility
- **CCS Category Codes**:
  - **91**: Procedures related to dialysis
  - **58**: Dialysis (renal)
  - **57**: Acute renal failure
- **Revenue Center Codes**:
  - **082x**: Hemodialysis
  - **083x**: Peritoneal Dialysis
  - **084x**: Continuous Ambulatory Peritoneal Dialysis
  - **085x**: Continuous Cycling Peritoneal Dialysis
  - **088x**: Misc Dialysis


##### Professional Claims
- **Place of Service Code**:
  - **65**: End-Stage Renal Disease Treatment Facility
- **CCS Category Codes**:
  - **91**: Procedures related to dialysis
  - **58**: Dialysis (renal)
  - **57**: Acute renal failure

</details>

<details>
<summary><strong>Emergency Department</strong></summary>

##### Institutional Claims
- **Revenue Center Codes**:
  - **0450**: Emergency room - General
  - **0451**: Emergency room - Urgent care
  - **0452**: Emergency room - Critical care
  - **0459**: Emergency room - Other
  - **0981**: Professional fees - Emergency room
- **HCPCS Codes**:
  - **99281**: Emergency department visit, problem focused
  - **99282**: Emergency department visit, expanded problem focused
  - **99283**: Emergency department visit, moderately severe problem
  - **99284**: Emergency department visit, severe problem
  - **99285**: Emergency department visit, highly severe problem
  - **G0380**: Emergency department visit, problem with significant threat to life or function
  - **G0381**: Level 2 hospital emergency department visit
  - **G0382**: Level 3 hospital emergency department visit
  - **G0383**: Level 4 hospital emergency department visit
  - **G0384**: Level 5 hospital emergency department visit

##### Professional Claims
- **Place of Service Code**:
  - **23**: Emergency Room
- **HCPCS Codes**:
  - **99281**: Emergency department visit, problem focused
  - **99282**: Emergency department visit, expanded problem focused
  - **99283**: Emergency department visit, moderately severe problem
  - **99284**: Emergency department visit, severe problem
  - **99285**: Emergency department visit, highly severe problem
  - **G0380**: Emergency department visit, problem with significant threat to life or function
  - **G0381**: Level 2 hospital emergency department visit
  - **G0382**: Level 3 hospital emergency department visit
  - **G0383**: Level 4 hospital emergency department visit
  - **G0384**: Level 5 hospital emergency department visit

</details>

<details>
<summary><strong>Home Health</strong></summary>

##### Institutional Claims
- **Bill Type Codes**:
  - **31x**: Home Health Inpatient Part A
  - **32x**: Home Health Inpatient Part B 
  - **33x**: Home Health Outpatient

##### Professional Claims
- **Place of Service Code**:
  - **12**: Home

</details>

<details>
<summary><strong>Observation</strong></summary>

##### Institutional Claims
- **Revenue Center Code**:
  - **0762**: Observation Room
- **HCPCS Codes**:
  - **G0378**: Hospital observation service, per hour
  - **G0379**: Direct admission of patient for hospital observation care

##### Professional Claims
- **HCPCS Codes**:
  - **G0378**: Hospital observation service, per hour
  - **G0379**: Direct admission of patient for hospital observation care

</details>


<details>
<summary><strong>Outpatient Hospice</strong></summary>

##### Institutional Claims
- **Bill Type Codes**:
  - **81**: Hospice
- **HCPCS Codes** (not applicable for bill types '31x', '32x', or '33x'):
  - **Q5001**: Hospice facility, under arrangement (non-hospital-based)
  - **Q5002**: Hospice facility, under arrangement (hospital-based)
  - **Q5003**: Hospice care provided in a nursing facility, under arrangement
  - **Q5009**: Hospice in a patient's home/residence
- **Revenue Center Codes**:
  - **0651**: Hospice service (routine home care)
  - **0652**: Hospice service (continuous home care)

##### Professional Claims
- **HCPCS Codes**:
  - **Q5001**: Hospice facility, under arrangement (non-hospital-based)
  - **Q5002**: Hospice facility, under arrangement (hospital-based)
  - **Q5003**: Hospice care provided in a nursing facility, under arrangement
  - **Q5009**: Hospice in a patient's home/residence

</details>

<details>
<summary><strong>Outpatient Hospital or Clinic</strong></summary>

##### Institutional Claims
- **Bill Type Codes**:
  - **13x**: Outpatient Hospital 
  - **71x**: Clinic services
  - **73x**: Outpatient Hospital/Clinic

- **CCS Category**:
  - **227**: Consultation, evaluation, and preventative care

##### Professional Claims
- **Place of Service Codes**:
  - **15**: Mobile Unit
  - **17**: Walk-in Retail Health Clinic
  - **19**: Off Campus-Outpatient Hospital
  - **22**: On Campus-Outpatient Hospital
  - **49**: Independent Clinic
  - **50**: Federally Qualified Health Center
  - **60**: Mass Immunization Center
  - **71**: Public Health Clinic
  - **72**: Rural Health Clinic

</details>

<details>
<summary><strong>Outpatient Psychiatric</strong></summary>

##### Institutional Claims
- **Primary Taxonomy Codes**:
  - **283Q00000X**: Psychiatric Hospital
  - **273R00000X**: Psychiatric Residential Treatment Facility

##### Professional Claims
- **Place of Service Codes**:
  - **52**: Psychiatric Facility - Partial Hospitalization
  - **53**: Community Mental Health Center
  - **57**: Non-residential Substance Abuse Treatment Facility
  - **58**: Residential Substance Abuse Treatment Facility

</details>

<details>
<summary><strong>Outpatient PT/OT/ST</strong></summary>

##### Institutional Claims
- **CCS Category Codes**:
  - **213**: Physical Therapy
  - **212**: Occupational Therapy
  - **215**: Speech Therapy

##### Professional Claims (excluding claims with Place of Service code 11):
- **CCS Category Codes**:
  - **213**: Physical Therapy
  - **212**: Occupational Therapy
  - **215**: Speech Therapy
- **Primary Specialty Descriptions** :
  - **Occupational Health**
  - **Occupational Medicine**
  - **Occupational Therapist in Private Practice**
  - **Occupational Therapy Assistant**
  - **Physical Therapist**
  - **Physical Therapist in Private Practice**
  - **Physical Therapy Assistant**
  - **Speech Language Pathologist**
  - **Speech-Language Assistant**

</details>

<details>
<summary><strong>Outpatient Radiology</strong></summary>

##### Institutional Claims
- **HCPCS Codes**:
    - Part of the [NITOS list](https://www.neimanhpi.org/neiman-imaging-types-of-service-nitos/).

##### Professional Claims (excluding claims with Place of Service code 11):
- **HCPCS Codes**:
    - Part of the [NITOS list](https://www.neimanhpi.org/neiman-imaging-types-of-service-nitos/).

##### Service Category 3
- **PET**:
  - **NITOS Modality Nuclear Medicine**: Includes positron emission tomography services.
- **MRI**:
  - **NITOS Modality Nuclear Medicine**: Includes magnetic resonance imaging services.
- **CT**:
  - **NITOS Modality Computerized Tomography**: Includes computed tomography services.
- **General**:
  - **All other NITOS modalities**: Covers radiological services that do not fall specifically under PET, MRI, or CT modalities.

</details>


<details>
<summary><strong>Outpatient Rehabilitation</strong></summary>

##### Institutional Claims
- **Primary Taxonomy Codes**:
  - **283X00000X**: Rehabilitation Hospital
  - **273Y00000X**: Physical Medicine & Rehabilitation (PM&R) Facility
  - **261QR0400X**: Rehabilitation, Comprehensive Outpatient Rehabilitation Facility (CORF)
  - **315D00000X**: Developmental Disabilities Rehabilitation
  - **261QR0401X**: Rehabilitation, Substance Use Disorder Rehabilitation Facility
  - **208100000X**: Physical Medicine & Rehabilitation
  - **225400000X**: Rehabilitation Practitioner
  - **324500000X**: Substance Abuse Rehabilitation Facility
  - **2278P1005X**: Physical Therapist in Geriatrics
  - **261QR0405X**: Rehabilitation, Substance Use Disorder Rehabilitation Facility
  - **2081S0010X**: Sports Medicine (Physical Medicine & Rehabilitation)
  - **261QR0404X**: Rehabilitation, Physical Therapy Facility

##### Professional Claims
- **Place of Service Code**:
  - **62**: Comprehensive Outpatient Rehabilitation Facility (CORF) services

</details>

<details>
<summary><strong>Outpatient Substance Use</strong></summary>

##### Institutional Claims
- **Default CCSR Category Descriptions**:
  - **MBD026**: Substance Use Disorders
  - **SYM008**: Mental Health and Substance Use Interventions
  - **MBD025**: Alcohol Use Disorders
  - **SYM009**: Mental Health and Substance Use Assessment
  - **MBD034**: Drug Use Disorders
- **Primary Taxonomy Codes**:
  - **324500000X**: Substance Abuse Rehabilitation Facility
  - **261QR0405X**: Substance Use Disorder Rehabilitation Facility
  - **101YA0400X**: Addiction (Substance Use Disorder)

##### Professional Claims
- **CCSR Category Codes**:
  - **MBD026**: Substance Use Disorders
  - **SYM008**: Mental Health and Substance Use Interventions
  - **MBD025**: Alcohol Use Disorders
  - **SYM009**: Mental Health and Substance Use Assessment
  - **MBD034**: Drug Use Disorders

</details>

<details>
<summary><strong>Outpatient Surgery</strong></summary>

##### Institutional Claims
- **CCS Categories**:
  - All categories between '1' and '176' 
  - 229', '230', '231', '232', '244' 

##### Professional Claims
- **CCS Categories**:
  - All categories between '1' and '176' 
  - 229', '230', '231', '232', '244' 
- **Limited to Place of Service Codes**:
  - **15**: Mobile Unit
  - **17**: Walk-in Retail Health Clinic
  - **19**: Off Campus-Outpatient Hospital
  - **22**: On Campus-Outpatient Hospital
  - **49**: Independent Clinic
  - **50**: Federally Qualified Health Center
  - **60**: Mass Immunization Center
  - **71**: Public Health Clinic
  - **72**: Rural Health Clinic

</details>

<details>
<summary><strong>Pharmacy</strong></summary>

##### Institutional Claims
- **Revenue Center Codes**:
  - **025x**, **026x**, **063x**, **089x**: Pharmacy and IV therapy services.
  - **0547**: Specific pharmacy-related service.
- **CCS Category**:
  - **240**: Medications

##### Professional Claims
- **CCS Category**:
  - **240**: Medications

</details>

<details>
<summary><strong>Urgent Care</strong></summary>

##### Institutional Claims
- **Revenue Center Code**:
  - **0456**: Specifically related to urgent care services, only with bill types with '13x', '71x', or '73x'.
- **HCPCS Codes**:
  - **S9088**: Global fee for urgent care centers.
  - **99051**: Service(s) provided in the office during regularly scheduled evening, weekend, or holiday office hours, in addition to basic service.
  - **S9083**: Global fee for services typically provided in urgent care centers.

##### Professional Claims
- **HCPCS Codes**:
  - **S9088**: Global fee for urgent care centers.
  - **99051**: Service(s) provided in the office during regularly scheduled evening, weekend, or holiday office hours, in addition to basic service.
  - **S9083**: Global fee for services typically provided in urgent care centers.
- **Place of Service Code**:
  - **20**: Urgent Care Facility

</details>



### Office-Based 
Office-based service categories are limited to professional claims with place of service codes 02, 10, and 11 only. There are no institutional claims associated with office-based service categories. 


<details>
<summary><strong>Office-Based PT/OT/ST</strong></summary>

##### Professional Claims
- **CCS Categories**:
  - **213**: Physical Therapy
  - **212**: Occupational Therapy
  - **215**: Speech Therapy
- **Provider Specialties**:
  - **Occupational Health**
  - **Occupational Medicine**
  - **Occupational Therapist in Private Practice**
  - **Occupational Therapy Assistant**
  - **Physical Therapist**
  - **Physical Therapist in Private Practice**
  - **Physical Therapy Assistant**
  - **Speech Language Pathologist**
  - **Speech-Language Assistant**
- **Place of Service Code**:
  - **11**: Office

</details>


<details>
<summary><strong>Office-Based Radiology</strong></summary>

##### Institutional Claims
- **HCPCS Codes**:
    - Part of the [NITOS list](https://www.neimanhpi.org/neiman-imaging-types-of-service-nitos/).

##### Professional Claims:
- **HCPCS Codes**:
    - Part of the [NITOS list](https://www.neimanhpi.org/neiman-imaging-types-of-service-nitos/).

##### Service Category 3
- **PET**:
  - **NITOS Modality Nuclear Medicine**: Includes positron emission tomography services.
- **MRI**:
  - **NITOS Modality Nuclear Medicine**: Includes magnetic resonance imaging services.
- **CT**:
  - **NITOS Modality Computerized Tomography**: Includes computed tomography services.
- **General**:
  - **All other NITOS modalities**: Covers radiological services that do not fall specifically under PET, MRI, or CT modalities.

</details>


<details>
<summary><strong>Office-Based Surgery</strong></summary>

##### Professional Claims
- **HCPCS Codes**:
  - Ranges from **10021** to **69999**: Surgical HCPC range

</details>


<details>
<summary><strong>Office-Based Visit</strong></summary>

##### Professional Claims
- **CCS Category**:
  - **227**: Consultation, evaluation, and preventative care. (must be paired with POS code 11)


</details>

<details>
<summary><strong>Office-Based Other</strong></summary>

##### Professional Claims
- **Place of Service Codes**:
  - **02**: Telehealth provided other than in patient's home
  - **10**: Telehealth provided in patient's home
  - **11**: Office

</details>

<details>
<summary><strong>Telehealth Visit</strong></summary>

##### Professional Claims
- **Place of Service Codes**:
  - **02**: Telehealth provided other than in patient's home
  - **10**: Telehealth provided in patient's home

</details>

### Ancillary


<details>
<summary><strong>Ambulance</strong></summary>

##### Professional Claims
- **HCPCS Codes**:
  - Ranges from **A0425** to **A0436**: These codes are specific to various ambulance services such as mileage and different levels of ambulance service care.
- **Place of Service Codes**:
  - **41**: Ambulance - Land
  - **42**: Ambulance - Air or Water

##### Institutional Claims
- **HCPCS Codes**:
  - Ranges from **A0425** to **A0436**: Includes ambulance services ranging from basic life support to more specialized forms of transportation.
- **Revenue Center Code**:
  - **0540**: Ambulance services - This code is used specifically for billing ambulance services in institutional settings.

</details>


<details>
<summary><strong>Durable Medical Equipment</strong></summary>

##### Professional Claims
- **HCPCS Codes**:
  - Ranges from **E0100** to **E8002**: This includes a wide range of durable medical equipment (DME), such as wheelchairs, hospital beds, and other medical devices provided to patients for home use.

</details>


<details>
<summary><strong>Lab</strong></summary>

##### Institutional Claims
- **Bill Type Codes**:
  - **14x**: Laboratory
- **CCS Categories**:
  - **233**: Lab
  - **234**: Pathology
  - **235**: Other lab

##### Professional Claims
- **Place of Service Code**:
  - **81**: Independent Lab
- **CCS Categories**:
  - **233**: Lab
  - **234**: Pathology
  - **235**: Other lab

</details>


### Other
Any claim/claim line that does not roll up to any of the previous categories. This category exists to ensure every claim line is assigned a service category. When a claim is categorized as other, it typically indicates a data quality issue (an inpatient claim without a bill type code or professional claim without a place of service code).

## Data Dictionary

The output of the service category grouper is the table below.  However, for analytics you'll find the service category columns in core.medical_claim and the Financial PMPM data mart.

<JsonDataTable  jsonPath="nodes.model\.the_tuva_project\.service_category__service_category_grouper.columns"  />

## Example SQL

We can group payments by service category by querying the core.medical_claim table.


<details>
<summary><strong>Paid Amount by Service Category</strong></summary>

```sql
select 
service_category_1
,service_category_2
,sum(paid_amount) as paid_amount
from core.medical_claim
group by service_category_1
,service_category_2
order by service_category_1
,service_category_2
```
</details>

