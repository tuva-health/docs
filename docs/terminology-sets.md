---
id: terminology-sets
title: "Terminology Sets"
description: The Tuva Project makes it easy to load useful terminology sets like ICD-10 codes directly into your data warehouse where you need them for analytics.
---
import { CSVDataTableCatalog } from '@site/src/components/CSVDataTableCatalog';

<iframe width="560" height="315" src="https://www.youtube.com/embed/oJyuJ4XFYNI?si=2OqvRdcL9D9itUrB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>

Terminology sets are reference code sets and descriptions used in healthcare analytics.  These code sets are maintained by many different organizations, updated on various frequencies, and often distributed in ways that make it a pain to load them into your data warehouse.

We're adding as many open source healthcare terminology sets as we can to the Tuva Project so they are easily available for healthcare analytics in a data warehouse.  You can search through and learn about these terminologies in this section.  If there is a code set you would like to see added you can [submit an issue](https://github.com/tuva-health/the_tuva_project/issues) on GitHub.

Most of the terminology sets are maintained on GitHub.  However some of the larger sets are maintained on S3.  If you click a link below and it takes you to a file on GitHub that only has a header, that terminology set is maintained on S3.


| Terminology Set            | Maintainer                                       | Last Updated | 
|----------------------------|--------------------------------------------------|--------------|
| [Admit Source](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_source.csv)           | National Uniform Billing Committee              | 4/19/2022    |
| [Admit Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_type.csv)             | National Uniform Billing Committee              | 4/19/2022    |
| [APR-DRG](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__apr_drg.csv)                | 3M                                               | 2/20/2023    |
| [Bill Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__bill_type.csv)              | National Uniform Billing Committee              | 11/3/2022    |
| [Claim Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__claim_type.csv)             | Tuva                                             | 11/4/2023    |
| [Code Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv)              | Tuva                                             | 4/19/2022    |
| [Discharge Disposition](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__discharge_disposition.csv)  | National Uniform Billing Committee              | 3/07/2022    |
| [Encounter Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__encounter_type.csv)         | Tuva                                             | 6/17/2022    |
| [Ethnicity](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__ethnicity.csv)              | Tuva                                             | 11/3/2022    |
| [Gender](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__gender.csv)                 | Tuva                                             | 4/19/2022    |
| [HCPCS Level II](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__hcpcs_level_2.csv)         | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    |
| [ICD-9-CM](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_9_cm.csv)               | Centers for Medicare & Medicaid Services (CMS)   | 5/10/2023    |
| [ICD-9-PCS](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_9_pcs.csv)              | Centers for Medicare & Medicaid Services (CMS)   | 5/10/2023    |
| [ICD-10-CM](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_10_cm.csv)              | Centers for Disease Control and Prevention (CDC) | 4/19/2022    |
| [ICD-10-PCS](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__icd_10_pcs.csv)             | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    |
| [LOINC](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__loinc.csv)                  | Regenstrief Institute                            | 9/18/2023    |
| [LOINC Deprecated Mapping](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__loinc_deprecated_mapping.csv)| Regenstrief Institute                            | 9/18/2023    |
| [MDC](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__mdc.csv)                    | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    |
| [Medicare Dual Eligibility](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_dual_eligibility.csv)| Centers for Medicare & Medicaid Services (CMS)   | 3/7/2023     |
| [Medicare Status](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__medicare_status.csv)        | Centers for Medicare & Medicaid Services (CMS)   | 11/3/2022    |
| [MS-DRG](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__ms_drg.csv)                 | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    |
| [Payer Type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__payer_type.csv)             | Tuva                                             | 4/19/2022    |
| [Place of Service](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__place_of_service.csv)       | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    |
| [Present on Admission](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__present_on_admission.csv)   | Centers for Medicare & Medicaid Services (CMS)   | 4/19/2022    |
| [Race](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__race.csv)                   | Tuva                                             | 2/3/2023     |
| [Revenue Center](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__revenue_center.csv)         | National Uniform Billing Committee              | 6/23/2022    |
