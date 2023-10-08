---
id: provider-data
title: "Provider Data"
---
This section describes provider information included in claims data - namely the National Provider Identity (NPI).

## What provider data is included in claims?

Medical claims includes several fields containing information on providers. The fields vary based on the type of claim.

**Facility Claims [CMS-1450 or UB-04](https://www.cdc.gov/wtc/pdfs/policies/ub-40-P.pdf):**
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

## What is an NPI?

Individual provider and facility information is encoded in claims data via National Provider Identity (NPI) codes.  However, one needs to enhance individual provider NPI codes with specialty information and group facility provider NPI codes into distinct locations before this information is useful for analytics.

- An NPI is a unique 10-digit numeric identifier for covered healthcare providers and organizations.
    - It is a HIPAA standard created to help send health information electronically.
    - An NPI won’t change even if a provider’s name, address, taxonomy (specialty), or other information changes. However, in some situations, an NPI may need to be deactivated or replaced, such as the retirement or death of an individual, disbandment of an organization, or fraudulent use of the NPI.
- Who must get an NPI?
    - All health care providers who are HIPAA-covered entities, individuals, or organizations.
    - It is required for enrollment in Medicare and submitting claims.
    - When a provider registers for an NPI, CMS attempts to verify only two things: (1) the provider's social security number and (2) that the provided business address is valid.
        - CMS does not verify whether the provider actually works at the submitted business address, and CMS does not attempt to verify the provider's self-reported specialty.
- NPI Entity Types
    - Entity Type 1: Individual
        - You may only get 1 NPI.
        - If you’re an individual healthcare provider who’s incorporated, you may need to get an NPI for yourself (Type 1) and an NPI for your corporation (Type 2).
    - Entity Type 2: Organization
        - The main difference with type 2 NPI numbers is that organizations can have several NPI numbers rather than just one.
        - Some organizations may have parts or locations that work independently from their parent organization, referred to as “subparts”. Each subpart can get its own NPI.
    - Where are the NPIs found on claim forms?
        - On the Professional CMS-1500 form, insert the main or billing Entity Type 2 NPI in Box 33a (Billing Provider). Insert the service facility Entity Type 2 NPI (if different from main or billing NPI) in Box 32a (Service Facility). Insert Entity Type 1 NPIs for rendering providers in Box 24J (Rendering Provider).
        - On the Institutional UB-04 form (aka CMS-1450), insert the main Entity Type 2 NPI in Box 56 (Billing Provider); insert Entity Type 1 NPIs for rendering providers in boxes 78-79 (Other Provider).

## What is NPPES?

- CMS developed the National Plan and Provider Enumeration System (NPPES) to assign NPIs.
- This information is publicly available and disclosed under FOIA.
- The data is distributed to the public via monthly data file downloads or via the API.
- The API has limitations. It’s useful for single-provider lookups but not for getting batch information.
- Limitations with the NPPES data:
    - The monthly file is a very large full replacement file that must be unzipped.
    - Many fields are codes requiring a separate lookup file for human-readable descriptions. These code sets are not distributed via data files. They are instead in a PDF provided with the monthly download. The codes must be extracted and transformed before they are useful.
    - Many pieces of information are in several columns that require logic to get any meaningful value out of them.
    - Once a provider has an NPI, there are no scheduled requests for updated information; however, providers are instructed to update their information in NPPES within 30 days of a change of required data fields. The degree to which providers update their information is not fully known.
    - There is no explicit penalty for a provider having out-of-date information in NPPES.
    - This means the data in NPPES is not necessarily reliable but remains one of the few publicly available sources of provider data.
- Other sources of provider data:
    - PECOS (Provider Enrollment, Chain, and Ownership System)
        - This is a registry of providers eligible to bill Medicare.
        - PECOS gathers more detailed information than NPPES on the financial arrangement between an individual provider and a practice group or organization, as well as a number of other details about business ownership and history of adverse outcomes with malpractice claims.
        - Providers are required to update their information every five years or whenever changes occur.
        - Unfortunately, this is not publicly available for research.
    - AMA (American Medical Association) Masterfile
        - The Masterfile attempts to be a comprehensive registry of all physicians trained in the United States.
        - It captures information from institutions on individuals at the time that they enter medical school or a graduate medical program in the United States.
        - It relies primarily on physicians voluntarily completing questionnaires to update information about their practice and location.
        - This data is publicly available for research.

## What are provider taxonomies?

- When providers register with NPPES they are required to provide one primary provider taxonomy code (and up to 14 additional taxonomies) which defines the health care service provider type, classification, and area of specialization.
- The Health Care Provider Taxonomy code set is a collection of unique alphanumeric codes (e.g. 207KA0200X), ten characters in length, maintained by the National Uniform Claim Committee (NUCC).
- Again, a separate terminology lookup data source is required to interpret this code which does not come with the NPPES data set.
- The taxonomy codes are updated twice a year (January and July).

## Why are TAX IDs included in claims?

In addition to NPIs, federal tax IDs are required fields on both facility and professional claim forms. The tax ID can be either an employer identifier number (EIN), or an invidual's social security number.

Most provider analyses are conducted using the NPIs recorded in claims. Tax IDs are used for some financial use cases, since network contracts are written at the TIN level. For example, network discounts are often analyzed by tax ID, since network contracts are written at the tax ID level ([Example](https://us.milliman.com/-/media/milliman/importedfiles/uploadedfiles/insight/healthreform/pdfs/determining-discounts.ashx)).

## References
- [Medicare Claims Processing Manual, Chapter 25 - Completing and Processing the Form CMS-1450 Data Set](https://www.cms.gov/regulations-and-guidance/guidance/manuals/downloads/clm104c25.pdf)
- [Patient Attribution: Why the Method Matters](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6549236/)
- [A Novel Approach to Attribute Responsible Physicians Using Inpatient Claims](https://www.ajmc.com/view/a-novel-approach-to-attribute-responsible-physicians-using-inpatient-claims)
- [https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/DataDissemination](https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/DataDissemination)
- [https://nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/csv-mainmenu-57](https://nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/csv-mainmenu-57)
- [https://www.cms.gov/Outreach-and-Education/Medicare-Learning-Network-MLN/MLNProducts/downloads/NPI-What-You-Need-To-Know.pdf](https://www.cms.gov/Outreach-and-Education/Medicare-Learning-Network-MLN/MLNProducts/downloads/NPI-What-You-Need-To-Know.pdf)
- [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3983736/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3983736/)
