---
id: claims-forms
title: "Claims Forms"
description: This section describes the forms used in the creation of claims data, including the CMS-1500, UB-04, and NCPDP Universal Claim Form.
---

A healthcare claim is created when a healthcare provider populates a claim form for services or supplies they’ve rendered to a patient.  These days almost all claims are created and submitted electronically.  Often this is automated or partially automated by the electronic medical record (EMR) system.

There are 3 main types of claim forms.  The type of form used depends on the type of healthcare entity submitting the claim.

**CMS-1500**
- Also Known As: Professional claim
- Electronic Version: 837P
- Maintained By: National Uniform Claim Committee (NUCC)
- Example Form: [https://nucc.org/images/stories/PDF/1500_claim_form_2012_02.pdf](https://nucc.org/images/stories/PDF/1500_claim_form_2012_02.pdf)
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
