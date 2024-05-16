---
id: clinical-concept-library
title: "Clinical Concept Library"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

# Clinical Concept Library
The CCL is made up of 3 data tables:

- **clinical_concept**
- **value_set_members**
- **coding_systems**

**High-level ERD**

![CCL ERD](/img/ccl_erd.jpg)

## clinical_concepts

The **clinical_concept** table contains one record per clinical concept (e.g. asthma, metformin, etc.).  Each clinical concept is expected to be associated with content from **value_set_members** that identifies the codes from one or more standardized clinical vocabularies that imply the concept.  If the concept represented by a clinical_concept row is felt no longer to be needed or valid, it should be changed to status “inactive” rather than deleted from the table.  


<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.clinical_concepts.columns" />

## coding_systems

Defines standardized clinical vocabularies with which value_set_members content is associated.  While nearly all standardized clinical vocabularies are updated regularly, individual versions are not specified in this table.  However, different “flavors” of standardized vocabularies (e.g. ICD-10-CM vs. the international version of ICD-10 published by the World Health Organization) should be represented by separate rows.

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.clinical_concepts.columns" />

## value_set_members

For a given concept, **value_set_members** contains the codes from one or more standardized vocabularies that imply the concept.  Eventually it may be necessary to expand the table design to cover “control exclusions” if needed for research use cases.

If the value set membership represented by a value_set_members row is felt no longer to be needed or valid, it should be changed to status “inactive” rather than deleted from the table.

<JsonDataTable  jsonPath="nodes.seed\.the_tuva_project\.clinical_concepts.columns" />
