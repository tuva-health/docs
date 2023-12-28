---
id: acute-inpatient-analytics
title: "Acute Inpatient Analytics"
description: This guide
toc_max_heading_level: 2
---

## Overview

Analyzing acute inpatient hospital stays is one of the most common uses of healthcare data.  For example, hospitals often want to understand how they are performing on metrics like:

- Mortality
- Length of Stay
- Readmssions
- Cost

Health plans and organizations with value-based contracts often care about metrics like:

- Inpatient Visits per 1,000 members
- Inpatient Days per 1,000 members

Analyzing acute inpatient hospital stays using claims data is complex, largely because the concept of an acute inpatient stay **doesn't exist in raw claims data**.  The analyst has to create this concept from raw claims data before actual analysis can begin and, as this guide explains, creating this concept is complex.

This guide describes how to analyze acute inpatient hospital stays using raw claims data, including:

- How to identify claims that are acute inpatient
- How to group acute inpatient claims into encounters (i.e. visits or stays)
- What data quality problems to look out for
- How to prepare summary data tables that are ready for analysis
- How to apply risk adjustment models to create patient-level benchmarks

All of the associated code is available as part of the Tuva Project.

## Identifying Acute Inpatient Claims

The first step is identifying institutional and professional claims for services that occurred in an acute inpatient care setting.  We define acute inpatient as a short-term hospital stay in a standard hospital (e.g. community, tertiary, academic, critical access).  Acute inpatient stays do not include visits to psychiatric hospitals, inpatient rehab centers, or nursing facilities.

### Institutional Claims

Every acute inpatient encounter occurs in a hospital and every hospital bills their insurer using institutional claims.  Therefore we use acute inpatient institutional claims as the foundation for our definition of acute inpatient encounters.

The trick is determining which institutional claims are for acute inpatient encounters.  There are many ways to do this.  We consider three criteria:

1. Room and Board Revenue Codes
2. Valid MS-DRG or APR-DRG
3. Inpatient Bill Type Code

**Room and Board Revenue Codes:** You can see the exact room and board revenue codes here.  While an acute inpatient claim should always have at least 1 claim line with a room and board revenue code, not every claim with a room and board revenue code will be acute inpatient.  For example, visits to psychiatric hospitals, inpatient rehab centers, and nursing facilities all commonly have room and board revenue codes.

**Valid MS-DRG or APR-DRG:** Every acute inpatient institutional claim should have a valid MS-DRG or APR-DRG.  This is literally how every hospital is paid for acute inpatient encounters, so without this field they won't get paid.  

**Inpatient Bill Type Code:** Bill type codes 11X and 12X are reserved for acute inpatient stays.  Every acute inpatient institutional claim should have one of these bill type codes.

The challenge is that these data elements aren't always available or consistently populated in every claims dataset.  We compared a variety of claims datasets and found significant variation in the reliability of these data elements.  

![acute ip claim tags](/img/acute_ip_inst_claim_tags.png)

These datasets represent a variety of population sizes and payer types:

- Dataset A: Medicare FFS
- Dataset B: Medicare FFS
- Dataset C: Medicare Advantage
- Dataset D: Medicare Advantage
- Dataset E: Commercial
- Dataset F: Commercial

By using different combinations of the 3 criteria we arrive at different counts of acute inpatient institutional claims.  A couple important observations:

First, Datasets E and F are missing revenue center codes and/or DRGs.  

Second, while Datasets C and D have all the data elements necessary for a 3 criteria, the results vary dramatically based on which combination of criteria are applied.  For example, when we apply criteria 1 and 2 (Room and Board + DRG) the resulting set of institutional claims tagged as acute inpatient are 33% and 29% greater than when all 3 criteria (Room and Board + DRG + Inpatient Bill Type) are applied.  This is a significantly different number of claims!

- Dataset C: 140,287 / 100,388 = 1.33 or a 33% difference
- Dataset D: 1,532 / 1,167 = 1.285 or a 29% difference

However the difference between these two methods is negligible in Datasets A and B.

- Dataset A: 223 / 233 = 1.00 or a 0% difference
- Dataset B: 433,807 / 433,802 = 0.999 or a negligible difference

Like most things in healthcare data, there is no obvious answer.  The approach that works best for you will depend on your dataset and the data you have available.  Our standard approach is to use all 3 criteria, which is the most conservative approach.  Generally we feel this approach makes sense unless your dataset is missing one of the required fields or you have concerns that it isn't being populated correctly.

Clearly it's important to understand which methodology you're using to identify acute inpatient institutional claims, as the choice of methodology can dramatically impact results.  Understanding this choice becomes even more important if you're comparing or working with multiple claims datasets.

### Professional Claims

## Grouping Claims into Stays

## Preparing Analytics-ready Data Table

## Applying Risk Adjustment Models

## Doing Analysis

## References

- [Methodology for Identifying Inpatient Admission Events](https://medinsight.com/healthcare-data-analytics-resources/blog/methodology-for-identifying-inpatient-admission-events/)
- [Administrative Healthcare Data](https://www.amazon.com/Administrative-Healthcare-Data-Content-Application/dp/1612908861)
- [The impact of standardizing the definition of visits on the consistency of multi-database observational health research](https://bmcmedresmethodol.biomedcentral.com/articles/10.1186/s12874-015-0001-6)