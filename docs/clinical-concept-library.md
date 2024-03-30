---
id: clinical-concept-library
title: "Clinical Concept Library"
---

## Overview

The Clinical Concept Library (CCL) is a collection of value sets defined using atomic-level healthcare terminologies (e.g. ICD-10-CM, RxNorm), and associated content, that define clinical concepts important in research and analytics.  Here we describe the design, function, and policies that govern the CCL.

The policies articulated here are not (except where noted) intended to be rigidly followed, but rather, are guidelines intended to base the CCL on a firm foundation of clinical informatics and content management best practices and ensure a degree of consistency across the content scope even as the community of people working on this content grows over time.

In addition, this is intended to be a living document, as new members of the Tuva community and new use cases will over time require new approaches.  The intent is that when a decision is made regarding how to handle some aspect of CCL content that is reasonable to generalize to other similar cases, it will be recorded here.

Lastly, these policies apply only to Tuva-developed CCL content; The CCL includes content copied from external sources (such provenance is explicitly asserted in the content), and external content is of course subject to the content development approaches of its author(s), whatever those may be.

### Tuning for Specificity

CCL value sets should be constructed in a manner that favors specificity over sensitivity.  Specifically, a code should be included in a value set if and only if it definitively implies the concept to which the value corresponds.

For example, in a value set for a concept “venous thrombosis”, a code for “thrombophlebitis of common iliac vein” would be included, since it implies that there is a thrombosis (blood clot) in a vein.  However, a code for “phlebitis or thrombophlebitis of vein of upper limb” would not be included since the code might be applied in cases where phlebitis (inflammation of a vein) is present but thrombosis is not.

### Semantic Scope

As noted above, a code should be included in a value set if it definitively implies the concept to which the value corresponds.  The semantic scope of “codes that imply a concept” includes, but is broader than, semantic children of the concept.  For example, a code for “diabetic ketoacidosis” would be included in a value set for the concept “diabetes mellitus” since it implies the presence of diabetes mellitus,  even though it does not constitute a subtype of diabetes mellitus and thus, isn’t, strictly speaking a semantic child of it.

### Completeness

Value sets should be curated such that, if any codes from a given standardized vocabulary are included for a given concept, then all appropriate codes from that vocabulary are included for that concept.

### Coding System Policies

ICD-10-CM codes in the CCL should be expressed without decimal points, e.g. "M8088XA", rather than "M80.88XA".
Value sets that include ICD-10-CM codes should include both full ICD-10-CM codes (which are are used for billing in the United States) and so-called “header codes” (also known as “non-billable” codes), which are stems of the full codes, since header codes may appear in clinical information systems even though they are not used for billing transactions.

### Versioning

The CCL is versioned via GitHub along with all releases of the Tuva Project.


## Data Architecture

The CCL is made up of 3 data tables:

- **clinical_concept**
- **value_set_members**
- **coding_systems**

**High-level ERD**

![CCL ERD](/img/ccl_erd.jpg)

### clinical_concepts

The **clinical_concept** table contains one record per clinical concept (e.g. asthma, metformin, etc.).  Each clinical concept is expected to be associated with content from **value_set_members** that identifies the codes from one or more standardized clinical vocabularies that imply the concept.  If the concept represented by a clinical_concept row is felt no longer to be needed or valid, it should be changed to status “inactive” rather than deleted from the table.  

| Column Name             | Data Type | Description                                                                                                                                                                                               |
|-------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| concept_id              | int       | Primary key for the table                                                                                                                                                                                 |
| concept_name            | string    | Human-readable term for the concept. Should include spaces as needed, and casing per titlecase conventions, e.g. “Myocardial Infarction”.                                                                  |
| status                  | string    | Status of this concept and the completeness of the links to value_set_members. Values include “in progress”, “ready for review”, “reviewed”, “inactive”, others to be added as needed.                     |
| concept_oid                  | string    | OID for the concept; Added since some clinical concepts used in standardized quality measures have OIDs.                     |
| last_update_date        | date      | Date of last update of this row (formatted as YYYY-MM-DD) and/or addition, removal, or changes to any of its linked value_set_members rows.                                                               |
| last_update_note        | string    | Relevant details regarding the nature and reasons for the most recent update.                                                                                                                             |
| concept_type            | string    | Clinical type of the concept. Potential values: “condition”, “therapy”, “diagnostic test”, others TBD                                                                                                      |
| content_source            | string    | Indicates whether the clinical concept definition and associated value set content was developed by Tuva or from some other public source.  Values will be “Tuva-developed” or “external”                                                                                                      |
| external_source_detail            | string    | For concepts for which the definition and associated value set content was not developed by Tuva, this provides details on the source of the concept.                                                                                                      |
| concept_scope           | string    | Narrative text that defines the semantic scope of the clinical concept, including specific inclusions and exclusions, to ensure consistency in value set construction and clarity in use. May be up to several paragraphs in length. |
| value_set_search_notes  | string    | Narrative text that describes the approach taken for identifying candidate codes for human review. May include text search terms, code ranges or hierarchical assertions. Will facilitate consistency when periodic value set maintenance is performed. |
| code                    | string    | Standardized code that represents the concept, to facilitate searching for clinical concepts by standardized code. Not to be confused with value set member codes, this is meant to be synonymous with the concept or, if a synonymous code isn’t available, the closest subsuming code. |
| code_description        | string    | Description for the code in concept_coding_code.                                                                                                                                                          |
| coding_system_id        | FK        | Coding system for code in concept_coding_code. Foreign key to coding_systems                                                                                                                              |
| coding_system_version   | string    | Version of the coding system used. For now, editorial conventions and/or business logic will be required to establish a consistent format for coding version for each coding system.                                                                                                                                                                         |

### value_set_members

For a given concept, **value_set_members** contains the codes from one or more standardized vocabularies that imply the concept.  Eventually it may be necessary to expand the table design to cover “control exclusions” if needed for research use cases.

If the value set membership represented by a value_set_members row is felt no longer to be needed or valid, it should be changed to status “inactive” rather than deleted from the table.

| Column Name           | Data Type | Description                                                                                                                                                                                                                                   |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| value_set_member_id              | int       | Primary key for the table                                                                                                                                                                                 |
| concept_id            | FK        | Foreign key to concept table                                                                                                                                                                                                                  |
| status                | string    | Status of this individual value_set_members record. Options = “active” and “inactive”, others to be added as needed.                                                                                                                          |
| last_update_date      | date      | Date of last update of this row, formatted as YYYY-MM-DD.                                                                                                                                                                                     |
| last_update_note      | string    | Relevant details regarding the nature and reasons for the most recent update.                                                                                                                                                                 |
| code                  | string    | Standardized code that is a member of the value set for the concept referenced in concept_id |
| code_description      | string    | Description for the code in the "code" column.                                                                                                                                                                                              |
| coding_system_id      | FK        | Coding system ID for code in the "code" column. Foreign key to coding_systems                                                                                                                                                                  |
| coding_system_version | string    | Version of the coding system used. For now, editorial conventions and/or business logic will be required to establish a consistent format for coding version for each coding system.                                                           |
| include_descendants   | boolean   | Indicates whether the value set should include descendants of the specified code. If “true”, include the specified code and all of its descendants. If “false”, include only the specified code. Applies only to coding systems for which Tuva has implemented this feature.    |
| comment               | string    | In some cases it may be helpful to provide some explanatory context for inclusion of a particular code, e.g., insights into the intended meaning of the code that aren’t implicit in the code description but are implied by other aspects of the coding system e.g., ICD-10-CM coding guidance. |

### coding_systems

Defines standardized clinical vocabularies with which value_set_members content is associated.  While nearly all standardized clinical vocabularies are updated regularly, individual versions are not specified in this table.  However, different “flavors” of standardized vocabularies (e.g. ICD-10-CM vs. the international version of ICD-10 published by the World Health Organization) should be represented by separate rows.

| Column Name          | Data Type | Description                                                                                             |
|----------------------|-----------|---------------------------------------------------------------------------------------------------------|
| coding_system_id     | int       | Primary key for the table                                                                               |
| coding_system_name   | string    | Name of the coding system, e.g. “SNOMED CT US Edition”                                                  |
| coding_system_uri    | string    | URI as used in FHIR to represent coding system. This provides an unambiguous identifier for the coding system. |
| coding_system_oid    | string    | OID for the coding system. This provides another unambiguous identifier for the coding system (along with uri). |








