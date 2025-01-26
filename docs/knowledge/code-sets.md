---
id: code-sets
title: "Code Sets"
---

Healthcare code sets are the standard terminologies that form the foundation of healthcare data.  These code classify all the important things that happens in healthcare: conditions, procedures, services, care settings, drugs, etc.  Without a deep understanding of these code sets you can't effectively analyze healthcare data.

These code sets are scattered all over the internet, maintained by different organizations, and updated on different frequencies.  The Tuva Project organizes and maintains these code sets so you don't have to.  When you run Tuva all ~50 code sets, along with other reference datasets and value sets, are loaded directly to your data warehouse.  

Below we describe these code sets in detail.

## NDC

The National Drug Code (NDC) on a pharmacy claim identifies the actual drug being prescribed.  The NDC code set was first introduced in 1972 by the U.S. Food and Drug Administration (FDA).  

The Tuva Project gets NDC, along with RxNorm and ATC, from CodeRx.  This data is pulled from the FDA and merged with a couple of other sources (because the FDA source is incomplete) and updated monthly.  The NDC dictionary is available in the terminology.ndc data table.

The original NDC consisted of 10 digits broken up into 3 segments:

- 1st Segment: Labeler
- 2nd Segment: Product
- 3rd Segment: Package

The Labeler segment is the only segment assigned by the FDA and it identifies the drug manufacturer i.e. the organization that produced the drug.  The product segment identifies specific information about the drug.  And the package segment identifies specific information about the package e.g. number of pills.  

![NDC](/img/NDC.jpg)

Today, NDC codes are written as a 10-digit number on drug packaging.  You typically find this number near the bar code on the packaging.  An additional digit is added, bringing the total to 11 digits, when billing an NDC on a healthcare claim.  The 11-digit number follows a 5-4-2 format i.e. 5 digits in the first segment, 4 digits in the second segment, and 2 digits in the third segment.  The rules for which segment the additional digit is added to are as follows:

- 4-4-2 becomes 5-4-2
- 5-3-2 becomes 5-4-2
- 5-4-1 becomes 5-4-2

Essentially you add a leading zero to whichever segment needs it.

**Not Just NDCs**

The NDC field in claims data is a complicated data element to work with, not just because of the 11-digit issue mentioned above, but also because the field contains entries from other code sets.  For example, the NDC field in a claims dataset will also contain:

- NDCs that have not been fully approved by the FDA
- Drug Supply or Medical Device Codes e.g. UPC (Universal Product Code) or HRI (National Health Related Item Codes)

The latter is included because retail pharmacies often sell and bill health insurers for drug supplies and other medical equipment e.g. syringes for insulin.

**One Drug, Many NDCs**

Another thing that makes NDC a complex data element to work with is that there are often many NDCs for the same drug or active ingredient.  So answering a question like “which patients have received Drug X?” often requires looking up dozens of NDCs.  There are more than 600 distinct NDCs for acetaminophen.  

Because of these complexities, if you’re doing analytics on pharmacy claims, the typical approach is to map NDC to other drug classification terminologies and use these other terminologies for analytics.  In the Tuva Project we map NDCs to RxNorm codes and then map RxNorm codes to ATCs.  This allows you to lookup a particular ATC code to easily ask questions like "which patients have taken a beta blocker?"

**References**

- [The Drug Data to Knowledge Pipeline: Large-Scale Claims Data Classification for Pharmacologic Insight](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5001754/)
- [Using National Drug Codes and Drug Knowledge Bases to Organize Prescription Records from Multiple Sources](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2965522/)
- [National Drug Code (NDC) Conversion Table](https://health.maryland.gov/phpa/OIDEOR/IMMUN/Shared%20Documents/Handout%203%20-%20NDC%20conversion%20to%2011%20digits.pdf)
- [National Drug Codes Idaho MMIS](https://www.idmedicaid.com/Reference/NDC%20Format%20for%20Billing%20PAD.pdf)
- [https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory](https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory)
- [https://www.bcbsil.com/pdf/pharmacy/ndc_faqs.pdf](https://www.bcbsil.com/pdf/pharmacy/ndc_faqs.pdf)
- [Estimating Medication Persistency Using Administrative Claims Data](https://ajmc.s3.amazonaws.com/_media/_pdf/AJMC05julSIKKA_449to457.pdf)
- [Using Pharmacy Claims Data to Study Adherence to Glaucoma Medications: Methodology and Findings of the Glaucoma Adherence and Persistency Study (GAPS)](https://iovs.arvojournals.org/article.aspx?articleid=2183370)
- [Accuracy of Prescription Claims Data in Identifying Truly Nonadherent Patients](https://www.jmcp.org/doi/10.18553/jmcp.2019.25.12.1349)