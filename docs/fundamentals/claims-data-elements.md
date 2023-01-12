---
id: claims-data-elements
title: "Claims Forms and Data Elements"
---
## Claim Forms

Healthcare claims are created when a healthcare provider populates a claim form for services or supplies they’ve rendered to a patient.  These days almost all claims are created and submitted electronically.  There are 3 main types of claim forms.  The type of form used depends on the type of healthcare entity submitting the claim.

**CMS-1500**
- Also Known As: Professional claim
- Electronic Version: 837P
- Maintained By: National Uniform Claim Committee (NUCC)
- Example Form: [https://nucc.org/images/stories/PDF/cms_1500_sample.pdf](https://nucc.org/images/stories/PDF/cms_1500_sample.pdf)
- Used By: Physicians, lab test companies, durable medical equipment companies, etc.

**CMS-1450**
- Also Known As: UB-04, institutional, or facility claim
- Electronic Version: 837I
- Maintained By: National Uniform Billing Committee (NUBC)
- Example Form: [https://www.amerihealth.com/pdfs/providers/npi/ub04_form.pdf](https://www.amerihealth.com/pdfs/providers/npi/ub04_form.pdf)
- Used By: Facilities (e.g. hospitals, SNFs, ambulatory surgery centers), home health agencies, hospice organizations, etc.

**NCPDP Universal Claim Form**
- Also Known As: N/A
- Electronic Version: 
- Maintained By: the National Council for Prescription Drug Programs
- Example Form:
- Used By: Retail pharmacies (e.g. Walgreens, CVS, Wal-Mart) to bill health insurers.
In this section we’ll cover the key data elements present in claims data.

Each claim form has two sections: a header section and a line section.  Each data element is either entered on the header section or line section.  Every data element in the header section may only be entered a specific number of times (typically one time, but not always).  On the other hand, data elements in the line section may be entered an unlimited number of times.  

## Claims Data Elements

### Professional and Institutional Claims
The following data elements exist on both professional and institutional claims.

**Billing NPI**
- Description: The healthcare organization submitting the claim that is ultimately the organization seeking payment by the health insurer.
- Location: Header

**Claim ID**
- Description: There isn't a place on claims forms for this data element.  Rather, it's generated in the adjudication process to distinguish claims.
- Location: Header

**Claim Line Number**
- Description: Represents the sequential order of lines on a claim.
- Location: Line

**Claim Start and End Dates**
- Description: The overall start and end dates on the claim.  Also commonly referred to as dates of services.
- Location: Header

**Diagnosis Codes**
- Description: The ICD-10-CM diagnosis codes on the claim.  Multiple diagnosis codes are permitted.  The first diagnosis code is assumed to the "principal" or "primary" diagnosis code.  All other diagnosis codes are considered "secondary".
- Location: Header

**HCPCS Codes**
- Description: Includes both HCPCS Level 1 (i.e. CPT-4) and HCPCS Level 2 codes.  HCPCS Level 1 codes are maintained by the American Medical Association and HCPCS Level 2 codes are maintained by CMS.  HCPCS codes are the primary mechanism by which professional claims are billed (i.e. contracted payment rates are made at the HCPCS code level).  HCPCS codes may be used on institutional claims, although the more common service codes used are revenue codes.
- Location: Line

**Patient Information**

All of the following patient information is located in the header portion of the claim.
- Address: Patient's address.
- Birth Date: Patient's date of birth.
- Gender: Patient's gender
- ID: Patient's health insurance member ID.
- Name: Patient's full name.

### Professional Claims Only

**Place of Service Code**
- Description: Code that specifies the care setting where the healthcare service was rendered.  Place of service information is coded at the line level to reflect the fact that services during a particular encounter can occur in different locations.
- Location: Line

**Rendering NPI**
- Description: National Provider Identifier that represents the healthcare provider (e.g. physician) who delivered the particular service.  Because this information is captured at the line-level, a single claim can contain services that were rendered by multiple providers.
- Location: Line

### Institutional Claims Only

**Admit and Discharge Dates**
- Description: Indicates the date the patient was admitted and discharged from the facility.  Only used for inpatient claims.
- Location: Header

**Admitting Diagnosis**
- Description: ICD-10-CM code that indicates the reason the patient was admitted.  Only used for inpatient claims.
- Location: Header

**Admit Source Code**
- Description: Indicates the setting the patient was admitted from (e.g. home).  Only used for inpatient claims.
- Location: Header

**Admit Type Code**
- Description: Indicates the type of admission e.g. urgent, emergent, elective.  Only used for inpatient claims.
- Location: Header

**Attending NPI**
- Description: Indicates the physician primarily responsible for the care of the patient.
- Location: Header

**Bill Type Code**
- Description: Indicates the type of care setting (e.g. outpatient) and the sequence of the claim (e.g. final).  There should be one and only one bill type code per claim.  
- Location: Header

**Discharge Disposition**
- Description: Indicates the disharge status of the patient on the claim (e.g. discharged to home, died, still a patient, etc.).  Only used for inpatient claims.
- Location: Header

**Facility NPI**
- Description: Indicates the facility where the claim took place.
- Location: Header

**MS-DRG**
- Description: Medicare Severity Diagnosis Related Grouper.  Primarily (but not only) used for acute inpatient claims.  This is the method by which acute inpatient visits are paid.  Every inpatient claim should have one and only one MS-DRG.
- Location: Header

**Operating NPI**
- Description: Indicates the physician who performed a surgical procedure on the patient.
- Location: Header

**Present on Admit Code**
- Description: Indicates whether the condition was present on admission or whether it developed during the inpatient encounter.  Each diagnosis code should have a present on admit code.  Used only for inpatient claims.
- Location: Header

**Revenue Codes**
- Description: A set of codes used to account for the services and supplies rendered to the patient e.g. Room and Board, Emergency, IV Therapy, etc.  There are typically dozens of these for an inpatient encounter.  A hospital will use these codes to "charge" the health insurer, although they have no bearing on the payment amount.  The payment amount is entirely determined by MS-DRG for inpatient claims.
- Location: Line

### Pharmacy Claims

**Prescriber NPI**
- Description: Indicates the provider that wrote the prescription.

**Dispensing NPI**
- Description: Indicates the pharmacy that filled the prescription.

**National Drug Code**
- Description: Required for every prescription drug that is filled and billed in the U.S.  Every drug is given a unique NDC by the FDA.