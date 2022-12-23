---
id: claims-data-generation
title: "The Claims Data Generation Process"
---
Healthcare claims data is the oldest and most widely analyzed type of healthcare data.  In this section we provide an overview of the healthcare entities, claim forms, and steps involved in the creation of claims data.

## Healthcare Entities

Healthcare claims are created by healthcare providers for the purpose of billing health insurance companies for the services and supplies they have rendered to patients.  The following types of entities play an important role in the claims data generation process:

- Providers: Includes any organization or person that renders healthcare services or supplies to patients, including:
    - Individual Providers: physicians, physician assistants, licensed therapists and social workers,
    - Healthcare Organizations: hospitals, skilled nursing facilities, home health organizations, hospice organizations, ambulatory surgery centers,
    - Pharmacies: Retail pharmacies e.g. Walgreens, CVS, etc.
    - Lab Testing Companies: e.g. Labcorp, Quest Diagnostics, etc.
    - Durable Medical Equipment Companies: Companies that sell durable medical equipment to provider organizations or directly to patients.
- Clearing Houses: These organizations sit between providers and health insurers.  They collect claims from providers in a standard format, perform basic claims adjudication functions, and then route the claims to the appropriate health insurer.
- Health Insurers: The organizations patients have their medical coverage through.  These organziations have contracts with providers to pay them for services and supplies at specific prices.
- Pharmacy Benefit Managers:
- Revenue Cycle Management (RCM) Companies: Help providers manage their entire billing process, including the coding of claims and the collection of payments from providers.

## Claim Forms

Healthcare claims are created when a healthcare provider populates a claim form for services or supplies they’ve rendered to a patient.  The claim form is then sent to a clearing house for initial processing. There are 3 main types of claim forms.  The type of form used depends on the type of healthcare entity submitting the claim

- CMS-1500:
    - Also Known As: Professional
    - Electronic Version: 837P
    - Maintained By: National Uniform Claim Committee (NUCC)
    - Example Form: [https://nucc.org/images/stories/PDF/cms_1500_sample.pdf](https://nucc.org/images/stories/PDF/cms_1500_sample.pdf)
    - Used By: physicians, lab test companies, DME companies
- CMS-1450:
    - Also Known As: UB-04, Institutional, or Facility
    - Electronic Version: 837I
    - Maintained By: National Uniform Billing Committee (NUBC)
    - Example Form: [https://www.amerihealth.com/pdfs/providers/npi/ub04_form.pdf](https://www.amerihealth.com/pdfs/providers/npi/ub04_form.pdf)
    - Used By: facilities (e.g. hospitals, SNFs, ambulatory surgery centers), home health agencies, and hospice organizations
- NCPDP:
    - Also Known As:
    - Electronic Version:
    - Maintained By: the National Council for Prescription Drug Programs
    - Example Form:
    - Used By: retail pharmacies (e.g. Walgreens, CVS, Wal-Mart) to bill health insurers and pharmacy benefit managers (PBMs).

## Claims Data Generation Process

1. Provider renders healthcare service or supplies to a patient
2. Provider (or medical biller working on their behalf) creates a claim and submits it to Clearing House.  The claim is typically entered and transferred electronically.
3. Clearing House performs basic claims adjudication checks, for example they make sure all the required fields are filled out on the claim.  Clearing House then transmits the claim to the appropriate health insurer.
4. Health Insurer receives the claim from the Clearing House and performs more advanced adjudication checks.  For example, the insurer will check:
    1. Whether the patient had insurance coverage during the date of service when the claim was 
    2. Whether the patient insurance covers the particular services or supplies they received
    3. Whether the patient meets certain prior authorization requirements (e.g. this is common for surgical procedures)
5.