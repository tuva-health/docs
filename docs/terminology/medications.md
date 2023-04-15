---
id: medications
title: "Medications"
---
This section provides an overview of prescription drug information contained in claims data and how you can use reference terminologies to make analysis of prescription drug data easier.

Prescription drug data plays a vitally important role in healthcare economics and outcomes research and all parts of the drug development and commercialization pipeline.  It also plays an important role in value-based care organizations looking to improve patient treatment regimens and adherence to optimze cost and outcomes.

Pharmacy claims include lots of granular information on the type of prescription drugs and supplies that have been filled by retail pharmacies for patients.  However, analyzing medications from pharmacy claims usually requires classifying drugs into higher-level drug classes using drug terminologies.

## National Drug Codes



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

- [https://www.bcbsil.com/pdf/pharmacy/ndc_faqs.pdf](https://www.bcbsil.com/pdf/pharmacy/ndc_faqs.pdf)
- [Estimating Medication Persistency Using Administrative Claims Data](https://ajmc.s3.amazonaws.com/_media/_pdf/AJMC05julSIKKA_449to457.pdf)
- [Using Pharmacy Claims Data to Study Adherence to Glaucoma Medications: Methodology and Findings of the Glaucoma Adherence and Persistency Study (GAPS)](https://iovs.arvojournals.org/article.aspx?articleid=2183370)
- [Accuracy of Prescription Claims Data in Identifying Truly Nonadherent Patients](https://www.jmcp.org/doi/10.18553/jmcp.2019.25.12.1349)