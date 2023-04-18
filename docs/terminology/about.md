---
id: about
title: "Terminology"
---
import { CSVDataTableCatalog } from '@site/src/components/CSVDataTableCatalog';

Reference terminologies are the backbone of healthcare data.  There are so many different concepts in healthcare - body parts and systems, diagnostics, diseases, treatments, etc. - that without standard reference terminologies to organize them data analysis would be impossible.  

Reference terminologies include code sets and mappings between code sets.  For example, ICD-10-CM is a diagnosis code set that classifies diseases.  It's hierarchical in nature, as many healthcare terminologies are.  For example, the ICD-10-CM code `I10` for "Essential (primary) hypertension" is part of a larger category of codes from `I00-I99` called "Diseases of the circulatory system".  Healthcare terminologies are often hierarchical because the cardinality of the codes can be quite high, so grouping them into higher-level categories is helpful.

Mappings between code sets are often useful to translate between terminologies.  For example, the Restructured BETOS terminology maps HCPCS codes to higher-level service categories that are more useful for analytics.

We've organized the reference terminology code sets that ship with the Tuva Project into categories.  You can see the full list of code sets in the table below.  Click on any code set to learn more about it.  For small- and medium-sized code sets you can view and search the actual codes.

Check out our [setup](/getting-started/setup) for details on how to load all the reference terminology code sets to your database.

<CSVDataTableCatalog csvUrl="/data/terminology.csv" />
