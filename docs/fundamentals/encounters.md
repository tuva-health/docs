---
id: encounters
title: "Encounters"
---
## Acute Inpatient
Analysis of acute inpatient visits is one of the most common uses of claims data.  Many hospital measures, such as length of stay, mortality, and readmission rates all rely on this concept.  However, calculating acute inpatient visits from claims data is non-trivial because a single acute inpatient visit is typically comprised of many claims and there is no field available to link these claims.

### Key Questions
- How do you identify acute inpatient visits in claims data? [^1] [^2]
- Which patients are most likely to have a an acute inpatient visit?
- Which patients were discharged to SNFs and which SNF they were discharged to?

[^1]: [Methodology for Identifying Inpatient Admission Events](https://www.medinsight.milliman.com/en/healthcare-analytics/methodology-for-identifying-inpatient-admission-events)
[^2]: [The impact of standardizing the definition of visits on the consistency of multi-database observational health research](https://bmcmedresmethodol.biomedcentral.com/articles/10.1186/s12874-015-0001-6)

Analysis of emergency department visits is a very common use of claims data.  However, calculating emergency department visits from claims data is non-trivial because a single visit is typically comprised of many claims and there is no field available to link these claims.

## Emergency Department

### Key Questions
- How do you identify ED visits in claims data? [^1] [^2]
- How do you identify ED visits that ultimately led to admission?
- How do you identify chemotherapy-related ED visits? [^3]
- How do you identify potentially preventable emergency department visits? [^4] [^5]
- What percent of patients die within 7 days of being discharged from the ED and what are the main causes of death? [^6]

[^1]: [How to Identify Hospital Claims for Emergency Room Visits in the Medicare Claims Data](https://resdac.org/articles/how-identify-hospital-claims-emergency-room-visits-medicare-claims-data)
[^2]: [Identification of Emergency Department Visits in Medicare Administrative Claims: Approaches and Implications](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5905698/)
[^3]: [Can Chemotherapy-Related Acute Care Visits Be Accurately Identified in Administrative Data?](https://ascopubs.org/doi/full/10.1200/JOP.2017.023697)
[^4]: [A Revised Classification Algorithm for Assessing Emergency Department Visit Severity of Populations](https://www.ajmc.com/view/a-revised-classification-algorithm-for-assessing-emergency-department-visit-severity-of-populations)
[^5]: [Validation of an algorithm to determine the primary care treatability of Emergency Department visits: supplementary methods and tables](https://bmjopen.bmj.com/content/bmjopen/6/8/e011739/DC3/embed/inline-supplementary-material-3.pdf?download=true)
[^6]: [Early death after discharge from emergency departments: analysis of national US insurance claims data](https://www.bmj.com/content/356/bmj.j239)

## Palliative Care
Palliative Care is a type of care that patients can receive when they have a terminal disease.  Palliative care is considered comfort care with or without curative intent, and so is closely related to hospice care.

### Key Questions
- How do you identify patients that are (or have been) in palliative care? [^1]
- Can you predict which patients are good candidates for palliative care? [^2]

[^1]: [Challenges in Using Insurance Claims Data to Identify Palliative Care Patients for a Research Trial](https://pubmed.ncbi.nlm.nih.gov/32592736/)
[^2]: [Improving palliative care with deep learning](https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/s12911-018-0677-8)