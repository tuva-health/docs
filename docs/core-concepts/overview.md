---
id: overview
title: "Overview"
---
Before one can analyze claims data, one needs to first create a set of core concepts on top of the raw claims data.  These core concepts are things like conditions, encounters, and member months, that are necessary for many types of analyses, but are not present in the raw claims data.  Learning what these core concepts are and how to define them is therefore an important step in learning to do proper analytics with claims data. 

We're developing a growing list of core claims data concepts, which so far include:

- **Claim Type:** Understanding whether a particular claim was part of an acute inpatient visit, emergency department visit, an office visit, or other type of visit, is often important in analytics.  Raw claims data include several data elements, such as place of service, bill type, and revenue codes, that provide clues as to the type of visit the claim was for.  Claim type is a concept built on top of these raw data elements.  Every claim is assigned to a mutually exclusive claim type.  Claim type is be used to stratify spend and utilization metrics among other sorts of analyses.

- **Condition:** Understanding the particular condition(s) or disease(s) a patient has is fundamental to many different types of claims data analytics.  Each claim includes numerous diagnosis codes (i.e. ICD-10-CM).  However, knowing how to combine these codes into homogeneous groups of conditions requires a detailed medical knowledge and an understanding of ICD-10-CM codes.

- **Encounter:** Many types of analyses require first defining the concept of a healthcare visit, i.e. encounter, and this concept does not exist in raw claims data.  Certain encounters, for example inpatient hospital stays, typically include multiple institutional and professional claims.  It's necessary to combine these claims into a single encounter before you can perform certain analyses, such as analyzing hospital readmission rates.

- **Medication:** Pharmacy claims include lots of granular information on the type of prescription drugs and supplies that have been filled by retail pharmacies for patients.  However, analyzing medications from pharmacy claims usually requires classifying drugs into higher-level drug classes using drug terminologies.

- **Member Month:** The eligible/enrolled population of patients in a given health insurance plan is always changing.  Patients gain and lose health insurance eligibility for a variety of reasons, including changes in employment, birth, and death.  It's important to normalize spend and utilization measures for these eligibility changes.  Normalizing for patient population changes involves computing member months.

- **Procedure:** Patients often receive medical procedures as treatment.  The coding of these procedures is extremely granular (e.g. ICD-10-PCS and HCPCS).  Understanding how to use these codes to group similar procedures into homogeneous classes is an important pre-requiste for analytics related to procedures.

- **Provider:** Individual provider and facility information is encoded in claims via National Provider Identity (NPI) codes.  However, one needs to enhance individual provider NPI codes with specialty information and group facility provider NPI codes into distinct locations before this information is useful for analytics.