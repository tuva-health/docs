---
id: intro-to-claims
title: "Intro to Claims"
---
Healthcare claims data is the oldest and most widely analyzed type of healthcare data.  In this section we provide an overview of the healthcare entities and overall process involved in the creation of claims data.

## Healthcare Entities
Healthcare claims are created by healthcare providers for the purpose of billing health insurance companies for the services and supplies they have rendered to patients.  The following types of entities play an important role in the claims data generation process:

- **Providers:** Includes organizations and people that render healthcare services or supplies to patients, including:

    - Individual Providers: Physicians, physician assistants, licensed therapists and social workers, etc.
    - Healthcare Organizations: Health systems, hospitals, skilled nursing facilities, home health organizations, hospice organizations, ambulatory surgery centers, etc.
    - Pharmacies: Retail pharmacies e.g. Walgreens, CVS, etc.
    - Lab Testing Companies: e.g. Labcorp, Quest Diagnostics, etc.
    - Durable Medical Equipment Companies: Companies that sell durable medical equipment to provider organizations or directly to patients.

- **Clearing Houses:** These organizations sit between providers and health insurers.  They collect claims from providers in a standard format, perform basic checks and verifications of each claim, and then route the claims that pass these basic checks to the appropriate health insurer for further processing and adjudication.

- **Health Insurers:** These are the organizations patients have their medical and or pharmacy coverage through.  These organziations have contracts with providers to pay them for services and supplies at specific prices.

- **Revenue Cycle Management (RCM) Companies:** Help providers manage their entire billing process, including the coding of claims and the collection of payments from providers and patients.

## The Process

1. **Healthcare Service:** A provider renders healthcare service or supply to a patient.  For example, a patient has a visit with their primary care physician.

2. **Claim Created:** The provider (or revenue cycle company working on their behalf) creates a claim and submits it to the appropriate clearing house.  This is almost always done electronically using either an 837I or 837P EDI transaction.

3. **Clearing House:** The clearing house performs basic checks of each claims.  For example, they make sure all the required fields are populated.  The clearing house then transmits the claim to the appropriate health insurer.

4. **Health Insurer:** The health insurer receives the claim from the clearing house and adjudicates the claim.  Claims adjudication is a process where the insurer determines whether or not to pay the claim and the amount to be paid, if warranted.  For example, the insurer will check:
    1. Whether the patient had insurance coverage during the date of service on the claim
    2. Whether the patient's insurance covers the particular services or supplies they received
    3. Whether the patient meets certain prior authorization requirements (e.g. this is common for surgical procedures)

5. **Payment Decision:** Once the claim is fully adjudicated (i.e. a decision about whether to pay the claim has been reached), the health insurer will issue a remittance to the provider.  This remittance is another electronic transaction called an 835 or Electronic Remittance Advice (ERA) transaction.  This transaction includes information about whether the claim was paid or denied and is sent back to the provider.  

6. **Corrections:** If the claim was denied the provider will work to correct the error on the claim which led to the denial, if possible, and re-submit the claim to the health insurer. 

7. **Adjustments and Reverals:** Occassionally a claim is submitted and paid in error - these claims are eventually adjusted and reversed.  See the section on adjustments and reversals for more information about this process.

8. **Data Warehousing:** Ultimately the health insurer will aggregate all claims (final claims, adjustments, denials, and reversals) in a database.  This claims dataset typically includes eligibility information, medical claims, and pharmacy claims.  When we discuss analyzing claims, this is the dataset we are referring to.  Health insurers often make this claims data available to provider partners (e.g. accountable care organizations) and pharmaceutical companies frequently purchase de-identified copies of this data for drug safety, efficacy, and commercialization research.

## References
- [UHC EDI Resource Library](https://www.uhcprovider.com/en/resource-library/edi/edi-835.html)