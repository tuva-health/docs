---
id: providers
title: "Providers"
---

Medical claims includes several fields containing information on providers. The fields vary based on the type of claim.

**Institutional Claims [CMS-1450 or UB-04](https://www.cdc.gov/wtc/pdfs/policies/ub-40-P.pdf):**
Provider information in the header of facility claims. In addition to the facility billing the service, these claims contain several fields for NPIs from up to four individual providers involved in the care (e.g., Attending Physician).
- Box 1 Billing Provider Name and Address
- 2 Pay-to Proivder Name and Address
- 5  Federal Tax ID
- 76 Attending Physician
- 56 Billing Provider NPI
- 57 Other Provider ID
- 77 Operating Physician
- 78 Other Physician
- 79 Other Physician

**Professional Claims [CMS-1500](https://www.cms.gov/medicare/cms-forms/cms-forms/downloads/cms1500.pdf):** 
Professional claims track the NPI of the provider who rendered each individual line item (i.e., CPT/HCPSCS code) in the claim. In addition, the claim header contains information on the organization submitting the claim. 
- Box 17  Referring Provider
- 24J Rendering Provider
- 25 Federal Tax ID
- 32 Service Facility Location Information
- 33 Billing Provider