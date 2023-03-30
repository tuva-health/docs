---
id: claims-preprocessing
title: "Claims Preprocessing"
---

Claims data includes bills for thousands of services for every type of healthcare encounter.  Because of this variety it can be difficult to analyze raw claims.  To solve this problem we created the Claims Preprocessing data mart, which generates important concepts such as:

- **Service Categories:** Claims are grouped into 1 of 21 service categories.
- **Encounters**: Professional and institutional claims are merged into acute inpatient and ED encounters (i.e. visits).

Claims Preprocessing also transforms claims data from the Input Layer into the Core Layer of the Tuva Data Model.

**Relevant Links:**
- [GitHub Repo](https://github.com/tuva-health/claims_preprocessing)
- [Value Set](../value-sets/service-category.md)

## Service Category Grouper

In the Tuva Project, we've created a service category grouper to help us analyze payment and utilization metrics. We use it to categorize medical claim lines.

**Data Elements**
The data elements that we use to create this grouper are as follows:
- **bill_type_code:** Bill type code for the claim (institutional claims only).
- **revenue_center_code:** Revenue center code for the claim line (institutional only and typically multiple codes per claim).
- **ms_drg_code:** MS-DRG for the claim (inpatient claims only).
- **place_of_service_code:** Place of service for the claim (professional claims only).
- **hcpcs_code:** HCPCS level 1 or level 2 code for the claim line.

The Tuva Project Service Category Grouper has two levels in a hierarchy with the each subcategory rolling up to a high level category. Because all subcategories roll up to one and only one higher level category, the sum of all the logic for each subcategory in a category is the same as the logic for the category. As such, we'll describe the higher level categories conceptually without codes, and then we'll define each subcategory sharing the code sets. See image below for a quick view of the categories and subcategories:

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
- **Mutually Exclusive and Exaustive:** Every healthcare claims can be grouped into one service category and only one service category. This implies that summing the total payments for all service categories would equal the the sum of all payments for each individual claim.
- **The "Other" Category Isn't Too Large:** In order to make the grouper exaustive, we group everything we can into meaningful categories and then put everything else in the "other" category. If this "other" category is too large, that means we need to break it out into additional meaningful categories.
- **Hierarchical:** It's a balancing act to try to create groups with low cardinality but providing enough homogeneity inside each group for analysis to be actionable. This often leads us to create hierarchical groupers so that you can see high level groups first and then drill in to get more specific while still keeping the broader context simple.
- **Feasible:** Any categorization grouper is only useful if you're able to group things into the categories using data elements that are readily available and populated reasonably consistently.

The Tuva Project Service Category Grouper categorizes most institutional claims at the claim level using the bill type code for each claim. However, ancillary services are sometimes coded and charged on individual claim lines where the rest of the claim would be grouped in a different category. To avoid grouping to many ancillary services in the wrong categories, we first use HCPCS level 2 codes to find institutional claim lines with some ancillary services and we pull those claim lines out of the rest of the grouping. After pulling out those ancillary services, we then group the rest of the institutional claims with their remaining lines into the rest of the categories and subcategories.

With professional claims, the Tuva Project Service Category Grouper is already grouping at the claim line level since place of service codes are on each claim line. As with institutional claims, we pull out ancillary claim lines first with professional claims using HCPCS level 2 codes, and then after that we group the rest of the claim lines in the rest of the categories using mostly place of service codes.

Note: Ancillary claim lines are pulled out first before inpatient, outpatient, and office visits are categorized, but we won't repeat stating this logic for every subcategory below to avoid redundancy.

### Inpatient
Inpatient healthcare requires a patient to stay in a hospital or skilled nursing facility during treatment because of the severity of their illness or condition, or because the service or treatment requires it.

#### Acute Inpatient
For institutional claims, we define acute inpatient as all claim lines with bill_type_codes of 11 or 12, and at least one line on the claim had a room and board revenue code in the following list 
```
    '0100', '0101', '0110', '0111', '0112', '0113', '0114', '0116', '0117', '0118', '0119', 
    '0120', '0121', '0122', '0123', '0124', '0126', '0127', '0128', '0129', 
    '0130', '0131', '0132', '0133', '0134', '0136', '0137', '0138', '0139', 
    '0140', '0141', '0142', '0143', '0144', '0146', '0147', '0148', '0149', 
    '0150', '0151', '0152', '0153', '0154', '0156', '0157', '0158', '0159', 
    '0160', '0164', '0167', '0169', '0170', '0171', '0172', '0173', '0174', '0179',
    '0190', '0191', '0192', '0193', '0194', '0199',
    '0200', '0201', '0202', '0203', '0204', '0206', '0207', '0208', '0209',
    '0210', '0211', '0212', '0213', '0214', '0219',
    '1000', '1001', '1002'
```
, and the claim has a valid ms_drg code.
For professional claims, we define acute inpatient as all claims with a place of serice code of 21.
#### Skilled Nursing
For institutional claims, we define skilled nursing as all claims with bill type codes of 21 or 22.
For professional claims, we define skilled nursing as all claim lines with a place of service code of 31 or 32.
#### Inpatient Psychiatric
For institutional claims, we don't have a clear enough set of codes to define inpatient psychiatric. This is a current gap in this grouper.
For professional claims, we define inpatient psychiatric as all claim lines with a place of service code of 51, 55, or 56.
#### Inpatient Rehabilitation
For institutional claims, we don't have a clear enough set of codes to define inpatient rehabilitation. This is a current gap in this grouper.
For professional claims, we define inpatient rehabilitation as all claim lines with a place of service code of 61.
#### Hospice
For institutional claims, we define hospice as all claims with bill type codes of 82.
For professional claims, we define hospice as all claim lines with a place of service code of 34.
#### Other
The other subcategory consists of all claims that get included in the inpatient category but are not included in the any of the inpatient subcategories. Because we have defined the category boundaries, the subcategory has a set definition as well. We define inpatient/other as all claims with bill type codes of 41, 42, 51, 61, or 62.

### Outpatient
Outpatient healthcare is provided when a patient comes in to a facility to receive care, and their severity or the care they receive is such that it is safe to return home during their treatment or recovery.

#### Emergency Department
For institutional claims, we define emergency department care as all claims with bill type codes of 13, 71, or 73 if the claim also has an emergency department revenue code of 0450, 0451, 0452, 0459, or 0981 on any of the claim lines.
For professional claims, we define emergency department care as all claim lines with a place of service code of 23.
#### Urgent Care
For institutional claims, we define urgent care as all claims with bill type codes of 13, 71, 0r 73 if the claim also has an urgent care revenue code of 0456.
For professional claims, we define urgent care as all claim lines with a place of service code of 20.
Note: The urgent care revenue code of 0456 is included in many published definitions for emergency department care. In the Tuva grouper, we first allow any emergency department revenue codes to classify a claim as an ED claim before saying that the claim is an urgent care claim if it has revenue code 0456.
#### Outpatient Hospital/Clinic
For institutional claims, we define outpatient hospital/clinic as all claims with bill type codes of 13, 71, or 73 if the claims do not also fall into the emergency department or the urgent care subcategories.
For professional claims, we define outpatient hospital/clinic as all claim lines with a place of service code of 15, 17, 19, 22, 49, 50, 60, 71, or 72.
#### Outpatient Psychiatric
For institutional claims, we define outpatient psychiatric as all claims with a bill type code of 52.
For professional claims, we define outpatient psychiatric as all claim lines with a place of service code of 52, 53, 57, or 58.
#### Outpatient Rehabilitation
For institutional claims, we don't have a clear enough set of codes to define outpatient rehabilitation. This is a current gap in this grouper.
For professional claims, we define outpatient rehabilitation as all claim lines with a place of service code of 62.
#### Ambulatory Surgery
For institutional claims, we don't have a clear enough set of codes to define ambulatory sergery. This is a current gap in this grouper. 
Note: these claims end up in the outpatient hospital/clinic subcategory, but we don't have clear bill type codes to pull out the ambulatory surgeries. A bill type code of 13 is one bill type code that could denote ambulatory surgery services, but it also includes dme, home health visits, and FQHC services. In order to pull out the ambulatory surgery specifically, we would need to know what type of facility is submitting the claim. In addition, a bill type code of 83 could also denote ambulatory surgery services, but it could also include other services in a critical access hospital setting. Other information is needed to accurately pull out the ambulatory surgery services.
For professional claims, we define ambulatory surgery as all claim lines with a place of service code of 24.
#### Dialysis
For institutional claims, we define dialysis as all claims with a bill type code of 72.
For professional claims, we define dialysis as all claim lines with a place of service code of 65.
#### Hospice
For institutional claims, we define outpatient/hospice as all claims with a bill type code of 81.
For professional claims, we don't have a clear enough set of codes to define outpatient/hospice. This is a current gap in this grouper.
#### Home Health
For institutional claims, we define home health as all claims with bill type codes of 31, 32, or 33.
For professional claims, we define home health as all claim lines with a place of service code of 12.
#### Other

### Office Visits
Office visits are when patients make an appointment to see either primary care or specialty providers in an office setting. This implies that the care they receive is either diagnostic or very simple services that do not require hospital infrastructure. As such, office visits do not have a facility claim and are defined soley by their professional claims. We define office visits as all claims with a place of service code of 02 or 11. Currently, we don't break out office visits into subcategories for different specialties. This is a current gap in this grouper.
### Ancillary
Ancillary products or services are those supporting services that are not provided by a hospital or acute care facility and not provided by a doctor or other medical clinician. Some examples of Ancillary services are durable medical equipment, laboratory work, and ambulance services.

#### Ambulance
For institutional claims, we define ambulance as all claim lines with hcpcs level 2 codes between A0425 and A0436.
For professional claims, we define ambulance as all claim lines with a place of service code between A0425 and A0436 or having a place of service code of 41 or 42.
#### Durable Medical Equipment
For both institutional and professional claims, we define durable medical equipment as all claim lines with hcpcs level 2 codes between E0100 and E8002.
#### Laboratory
For institutional claims, we define laboratory as all claims with a bill type code of 14.
For professional claims, we define laboratory as all claim lines with a place of service code of 81.

### Other
The other category insures that the grouping catches all services provided so that the categories are exaustive. Anything that doesn't fit into the defined categories goes into other. Some examples would be intermediate care facilities that don't fit well in inpatient, but also don't fit well in outpatient, Christian Science facilities because the claims are very low and the care isn't homogenous with the categories available, etc.

## References
- [WPS Government Health Administrators description of the type of bill code](https://www.wpsgha.com/wps/portal/mac/site/claims/guides-and-resources/type-of-bill/)
- [CMS definitions for the type of bill code](https://www.cms.gov/regulations-and-guidance/guidance/transmittals/downloads/r1775cp.pdf)
- [CMS definitions for the place of service code](https://www.cms.gov/Medicare/Coding/place-of-service-codes/Place_of_Service_Code_Set)
- [Value Healthcare Services - Understanding Hospital Revenue Codes](https://valuehealthcareservices.com/education/understanding-hospital-revenue-codes/)
- [CMS Contractor billing and coding guidelines for inpatient and observation(outpatient) services](https://downloads.cms.gov/medicare-coverage-database/lcd_attachments/32221_3/dl32222_hosp001_cbg_100111.pdf)
- [CMS Billing and Coding for Inpatient and Observation treatment](https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleId=52985#:~:text=Observation%20services%20initiated%20on%20the,initial%20date%20of%20observation%20care.)
- [National Library of Medicine published paper on identifying Emergency Department Visits](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5905698/)
- [ResDac How to identify ED Visits](https://resdac.org/articles/how-identify-hospital-claims-emergency-room-visits-medicare-claims-data)
- [Hospice Medicare Billing Codes Sheet](https://www.cgsmedicare.com/hhh/education/materials/pdf/hospice_medicare_billing_codes_sheet.pdf)