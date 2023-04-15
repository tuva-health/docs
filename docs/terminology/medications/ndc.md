---
id: ndc
title: "NDC"
---

The most important piece of information included on pharmacy claims is the information about the actual medication being prescribed.  The National Drug Code (NDC) on a pharmacy claim describes the actual drug being prescribed.  NDC is a complex data element so we will spend some time describing it here.

The NDC code set was first introduced in 1972 by the U.S. Food and Drug Administration (FDA).  The original NDC consisted of 10 digits broken up into 3 segments:

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

**Not Just NDCs - Multiple Code Sets**

The NDC is a complicated data element to work with, in part because the field contains entries from other code sets.  For example, the NDC field in a claims dataset will also contain:

- NDCs that have not been fully approved by the FDA
- Drug Supply or Medical Device Codes e.g. UPC (Universal Product Code) or HRI (National Health Related Item Codes)

The latter is included because retail pharmacies often sell and bill health insurers for drug supplies and other medical equipment e.g. syringes for insulin.

**One Drug, Many NDCs**

Another thing that makes NDC a complex data element to work with is that there are often many NDCs for the same drug or active ingredient.  So answering a question like “which patients have received Drug X?” often requires looking up dozens of NDCs.  

## References

- [Using National Drug Codes and Drug Knowledge Bases to Organize Prescription Records from Multiple Sources](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2965522/)
- [National Drug Code (NDC) Conversion Table](https://health.maryland.gov/phpa/OIDEOR/IMMUN/Shared%20Documents/Handout%203%20-%20NDC%20conversion%20to%2011%20digits.pdf)
- [National Drug Codes Idaho MMIS](https://www.idmedicaid.com/Reference/NDC%20Format%20for%20Billing%20PAD.pdf)
- [https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory](https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory)
