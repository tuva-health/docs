---
id: overview
title: "Overview"
---
This section of Knowledge Base is where we dive into key concepts that are important for doing healthcare analytics.  A concept is a higher-level data element, created on top of raw claims data, that is useful for answering a question we are interested in.  A concept is like a feature, from a machine learning perspective, or a variable from a probability and statistics perspective.  Some concepts are simple (e.g. patient age), while others are more complex (e.g. an acute inpatient encounter).  Concepts can even (and often are) be built on top of other concepts.  

Raw claims data lacks the majority of concepts that we need to do healthcare analytics, so one of the important things we need to do is develop a lattice of concepts that make it easier to answer important and interesting questions.  

For each concept we discuss:

- Key use cases for the concept
- Raw claims data elements and other concepts (if applicable) used to create the concept
- Method(s) used to create the concept
- Common data quality problems related to the concept

We also provide numerous SQL examples for each concept.  Each SQL example is designed to run in Snowflake, but the SQL is usually simple and easy to adapt to other data warehouses.  Each SQL example is designed to run against the Tuva Claims Common Data Model (CDM).  If your claims dataset is in the Tuva Claims CDM, you can run the SQL examples automatically.  If your claims data is not yet in the Tuva Claims CDM, we have a synthetic claims dataset you can run the SQL on.

We're developing a growing list of core claims data concepts, which so far include:

- **Claim Type:** Understanding whether a particular claim was part of an acute inpatient visit, emergency department visit, an office visit, or other type of visit, is often important in analytics.  Raw claims data include several data elements, such as place of service, bill type, and revenue codes, that provide clues as to the type of visit the claim was for.  Claim type is a concept built on top of these raw data elements.  Every claim is assigned to a mutually exclusive claim type.  Claim type is be used to stratify spend and utilization metrics among other sorts of analyses.

- **Condition:** Understanding the particular condition(s) or disease(s) a patient has is fundamental to many different types of claims data analytics.  Each claim includes numerous diagnosis codes (i.e. ICD-10-CM).  However, knowing how to combine these codes into homogeneous groups of conditions requires a detailed medical knowledge and an understanding of ICD-10-CM codes.

- **Encounter:** Many types of analyses require first defining the concept of a healthcare visit, i.e. encounter, and this concept does not exist in raw claims data.  Certain encounters, for example inpatient hospital stays, typically include multiple institutional and professional claims.  It's necessary to combine these claims into a single encounter before you can perform certain analyses, such as analyzing hospital readmission rates.

- **Medication:** Pharmacy claims include lots of granular information on the type of prescription drugs and supplies that have been filled by retail pharmacies for patients.  However, analyzing medications from pharmacy claims usually requires classifying drugs into higher-level drug classes using drug terminologies.

- **Member Month:** The eligible/enrolled population of patients in a given health insurance plan is always changing.  Patients gain and lose health insurance eligibility for a variety of reasons, including changes in employment, birth, and death.  It's important to normalize spend and utilization measures for these eligibility changes.  Normalizing for patient population changes involves computing member months.

- **Procedure:** Patients often receive medical procedures as treatment.  The coding of these procedures is extremely granular (e.g. ICD-10-PCS and HCPCS).  Understanding how to use these codes to group similar procedures into homogeneous classes is an important pre-requiste for analytics related to procedures.

- **Provider:** Individual provider and facility information is encoded in claims via National Provider Identity (NPI) codes.  However, one needs to enhance individual provider NPI codes with specialty information and group facility provider NPI codes into distinct locations before this information is useful for analytics.