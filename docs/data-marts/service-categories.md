---
id: service-categories
title: "Service Categories"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## Methods

[Code on Github](https://github.com/tuva-health/tuva/tree/main/models/claims_preprocessing/service_category)

In the Tuva Project, we've created a service category grouper to help us analyze payment and utilization metrics. We use it to categorize medical claim lines.

**Data Elements**
The data elements that we use to create this grouper are as follows:
- **bill_type_code:** Bill type code for the claim (institutional claims only).
- **revenue_center_code:** Revenue center code for the claim line (institutional only and typically multiple codes per claim).
- **ms_drg_code:** MS-DRG for the claim (inpatient claims only).
- **place_of_service_code:** Place of service for the claim (professional claims only).
- **hcpcs_code:** HCPCS level 1 or level 2 code for the claim line.

The Tuva Project Service Category Grouper has two levels in a hierarchy with each subcategory rolling up to a high level category. Because all subcategories roll up to one and only one higher level category, the sum of all the logic for each subcategory in a category is the same as the logic for the category. As such, we'll describe the higher level categories conceptually without codes, and then we'll define each subcategory sharing the code sets. See image below for a quick view of the categories and subcategories:

| **Service Category 1** | **Service Category 2** |
| --- | --- |
| Inpatient | Acute Inpatient |
| Inpatient | Skilled Nursing |
| Inpatient | Inpatient Psychiatric |
| Inpatient | Inpatient Rehabilitation |
| Inpatient | Hospice |
| Inpatient | Other |
| Outpatient | Emergency Department |
| Outpatient | Urgent Care |
| Outpatient | Outpatient Hospital/Clinic |
| Outpatient | Outpatient Psychiatric |
| Outpatient | Outpatient Rehabilitation |
| Outpatient | Ambulatory Surgery |
| Outpatient | Dialysis |
| Outpatient | Hospice |
| Outpatient | Home Health |
| Outpatient | Other |
| Office Visit | Office Visit |
| Ancillary | Ambulance |
| Ancillary | DME |
| Ancillary | Lab |
| Other | Other |

When developing any grouper we keep the following principles in mind:
- **Cardinality is Palatable:** If there were hundreds of catogories, it would be too hard for a human to make sense of what was going on. But if you only had 2 categories for example, it wouldn't be enlightening. Almost all insights would come from breaking it down further.
- **Mutually Exclusive and Exaustive:** Every healthcare claims can be grouped into one service category and only one service category. This implies that summing the total payments for all service categories would equal the sum of all payments for each individual claim.
- **The "Other" Category Isn't Too Large:** In order to make the grouper exaustive, we group everything we can into meaningful categories and then put everything else in the "other" category. If this "other" category is too large, that means we need to break it out into additional meaningful categories.
- **Hierarchical:** It's a balancing act to try to create groups with low cardinality but providing enough homogeneity inside each group for analysis to be actionable. This often leads us to create hierarchical groupers so that you can see high level groups first and then drill in to get more specific while still keeping the broader context simple.
- **Feasible:** Any categorization grouper is only useful if you're able to group things into the categories using data elements that are readily available and populated reasonably consistently.

The Tuva Project Service Category Grouper categorizes most institutional claims at the claim level using the bill type code for each claim. However, ancillary services are sometimes coded and charged on individual claim lines where the rest of the claim would be grouped in a different category. To avoid grouping to many ancillary services in the wrong categories, we first use HCPCS level 2 codes to find institutional claim lines with some ancillary services and we pull those claim lines out of the rest of the grouping. After pulling out those ancillary services, we then group the rest of the institutional claims with their remaining lines into the rest of the categories and subcategories.

With professional claims, the Tuva Project Service Category Grouper is already grouping at the claim line level since place of service codes are on each claim line. As with institutional claims, we pull out ancillary claim lines first with professional claims using HCPCS level 2 codes, and then after that we group the rest of the claim lines in the rest of the categories using mostly place of service codes.

Note: Ancillary claim lines are pulled out first before inpatient, outpatient, and office visits are categorized, but we won't repeat stating this logic for every subcategory below to avoid redundancy.

### Inpatient

### Outpatient

### Office-based

### Ancillary

### Other

## Data Dictionary

## Example SQL