---
id: prescription-drugs
title: "Prescription Drugs"
---
This section provides an overview of prescription drug information contained in claims data and how you can use reference terminologies to make analysis of prescription drug data easier.

Prescription drug data plays a vitally important role in healthcare economics and outcomes research and all parts of the drug development and commercialization pipeline.  It also plays an important role in value-based care organizations looking to improve patient treatment regimens and adherence to optimze cost and outcomes.

Pharmacy claims include lots of granular information on the type of prescription drugs and supplies that have been filled by retail pharmacies for patients.  However, analyzing medications from pharmacy claims usually requires classifying drugs into higher-level drug classes using drug terminologies.

## National Drug Codes

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

## Drug Terminologies

Because of these complexities, if you’re doing analytics on pharmacy claims, the typical approach is to map NDC to other drug classification terminologies and use these other terminologies for analytics.  There are many open source and closed source drug terminologies.  For example:

| Drug Terminology | Organization | Open or Closed |
|---|---|---|
|[NDC](https://www.fda.gov/drugs/development-approval-process-drugs/national-drug-code-database-background-information)|FDA|Open|
|[RxNorm](https://www.nlm.nih.gov/research/umls/rxnorm/index.html)|NLM|Open|
|[Anatomical Therapeutic Chemical (ATC)](https://www.who.int/tools/atc-ddd-toolkit/atc-classification)|WHO|Open|
|[Multum](https://www.cerner.com/solutions/drug-database)|Cerner (Oracle)|Closed|
|[GPI](https://www.wolterskluwer.com/en/solutions/medi-span/about/gpi)|Medi-span (Woulters Kluwer)|Closed|
|[Micromedex](https://www.ibm.com/watson-health/about/micromedex)|IBM (not sure who owns this now)|Closed|

All of these drug terminologies map to NDC.  The success of these mappings largely depends on the quality of the source data (some of the papers in the reference section below described the mapping success rate of different terminologies).

**Quick Aside:** It should be noted that most (all?) of these drug terminologies are actually ontologies - which one can think of as multiple terminologies with mappings between them.  For example: any grouper that uses a hierarchy is an ontology.

## References

- [The Drug Data to Knowledge Pipeline: Large-Scale Claims Data Classification for Pharmacologic Insight](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5001754/)
- [Using National Drug Codes and Drug Knowledge Bases to Organize Prescription Records from Multiple Sources](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2965522/)
- [National Drug Code (NDC) Conversion Table](https://health.maryland.gov/phpa/OIDEOR/IMMUN/Shared%20Documents/Handout%203%20-%20NDC%20conversion%20to%2011%20digits.pdf)
- [National Drug Codes Idaho MMIS](https://www.idmedicaid.com/Reference/NDC%20Format%20for%20Billing%20PAD.pdf)
- [https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory](https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory)
- [https://www.bcbsil.com/pdf/pharmacy/ndc_faqs.pdf](https://www.bcbsil.com/pdf/pharmacy/ndc_faqs.pdf)
- [Estimating Medication Persistency Using Administrative Claims Data](https://ajmc.s3.amazonaws.com/_media/_pdf/AJMC05julSIKKA_449to457.pdf)
- [Using Pharmacy Claims Data to Study Adherence to Glaucoma Medications: Methodology and Findings of the Glaucoma Adherence and Persistency Study (GAPS)](https://iovs.arvojournals.org/article.aspx?articleid=2183370)
- [Accuracy of Prescription Claims Data in Identifying Truly Nonadherent Patients](https://www.jmcp.org/doi/10.18553/jmcp.2019.25.12.1349)