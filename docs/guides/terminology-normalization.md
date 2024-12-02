---
id: terminology-normalization
title: "Terminology Normalization"
---

In the world of healthcare data, terminology is the foundation for understanding and interoperability. Standardized 
terminologies such as SNOMED-CT, RxNorm, LOINC, and ICD-10 are critical for ensuring data consistency across systems, 
enabling meaningful analytics, and facilitating compliance with industry regulations. Yet, many organizations rely 
on source-specific or proprietary terminologies, leading to challenges in data integration and analysis.

Normalization—mapping your source terminology to standard terminologies—addresses these challenges by creating a 
consistent framework for understanding and using your data. This process allows organizations to harmonize diverse 
datasets, enabling accurate analytics, streamlined reporting, and improved data quality across the board.

The Tuva Project is designed to simplify this process. A feature of the project is a custom terminology mapping 
integration point, allowing you to maintain your source terminology in its original form while seamlessly integrating 
normalized codes downstream. This ensures that analytics and reporting outputs are based on consistent, standardized 
data, while preserving the integrity of the source data for traceability.

## Terminology in The Tuva Project.

Our medical input layer and core tables have two sets of columns to define the code associated with that record: the 
source columns, and the normalized columns.  Our `condition`, `procedure`, `lab_result`, and `observation` tables all 
 have `source_code_type`, `source_code`, and `source_description` columns, as well as `normalized_code_type`, 
`normalized_code`, and `normalized_description` columns. The `medication` table has the same source columns, and 
separate normalized columns for `ndc_code` and `ndc_description`, `rxnorm_code` and `rxnorm_description`, 
and `atc_code` and `atc_description`.

The intent is to populate the source columns with the values present in the source system, and to populate the normalized
columns with standardized terminologies.  Our marts will look first in the normalized columns before the source columns 
when looking for qualifying records.

### Default Behavior: adding valid normalized codes

Out of the box, if the normalized fields are left null in the input layer the tuva project will try to populate them. Our   
models in the core layer will check if the record is one of our standardized terminology types: `icd-10-cm`, `icd-9-cm`,
`icd-10-pcs`, `icd-9-pcs`, `hcpcs`, `snomed-ct`, `loinc`, `ndc`, or `rxnorm` depending on the model. If it is, it will 
compare the source_code to the relevant tuva terminology dictionary, and if it finds a valid match it will populate the 
normalized fields.  In the medication table if the source code type is an ndc or rxnorm code, the tuva project will also
try to populate rxnorm and atc level 3 codes.

If a user populates the normalized columns in their input layer models, the tuva project will respect those values 
regardless of if they are valid, and persist those values through to core. Each table in core also has a `mapping_method`
column that will be `manual` if the value was populated by the user in the input layer, or `automatic` if the value was
populated by the tuva project.`

### Producing a list of unmapped codes

Tuva has a built-in process for integrating custom maps to standardized terminologies, which can be configured through 
an optional `enable_normalize_engine` var in the tuav project.  The first step is to produce a list of unmapped codes.
Setting `enable_normalize_engine: unmapped` in dbt_project.yml will enable a new `normalize` mart in the tuva project.
This mart will initially contain an `all_unmapped` table that has all of the unmapped codes across all domains, as well 
as individual `unmapped_condition`,`unmapped_procedure`, `unmapped_medication`, `unmapped_lab_result`, and 
`unmapped_observations` tables.  These tables will contain a list of codes that weren't able to be automatically mapped 
and weren't manually mapped to normalized codes, as well as counts and a list of domains the codes appear in, and other 
columns to support the mapping process.

Note that one source of false positives is hcpcs level 1 or CPT codes.  Due to licensing restrictions from the AMA,
Tuva isn't able to include a dictionary to validate CPT codes, so hcpcs codes will only be evaluated against a hcpcs level 
2 dictionary.

### Mapping the codes

The next step is to map the codes.  The `all_unmapped` table can be exported and used as a mapping workbook; it contains all 
of the columns that tuva needs to reintegrate the maps into core. For a given row, if a code is mappable to a standardized 
terminology, a user should populate `normalized_code_type`,`normalized_code`, and `normalized_description` with the normalized 
values, and tuva will populate those values any when matching on the `source_code_type`, `source_code`, and `source_code_description`
values in that row.
Alternatively if the code is not mappable to a standardized terminology, the user can populate a reason in the `not_mapped`.  If 
either `not_mapped` or the normalized fields are populated when the workbook is reintegrated into the tuva project, the
codes won't be in the unmapped table in subsequent runs.

The all_unmapped table also contains additional columns to facilitate the mapping process.  It has `added_by` and `added_date` 
columns to record who created the map and when, `reviewed_by` and `reviewed_date` to record the reviewer, as well as a notes 
columns to record any extra information the mapper would like to record about the mapping.  These columns will be persisted in 
the tuva project, but will not be present in the core tables.

### Reintegrating the codes

To reintegrate the codes, the user needs to add a model or seed in their project called `custom_mapped` that contains the data
from the mapping workbook.  The user can choose to keep the entire workbook in the project as a seed, to keep an empty seed
with only the required headers and populate the table from a cloud storage service with our `load_seed()` macro, or they can 
maintain the mappings in the warehouse and have custom_mapped be a model that selects the required columns.

Once the user has `custom_mapped` added to their project, they can set the `enable_normalize_engine` to `true`, and on the 
subsequent run, the tuva project will integrate the normalized codes from the mapping workbook into the normalized colums
of the core tables.  In addition, the normalized mart will now also have an `all_codes` model, that contains all of the existing
custom_mapped codes as well as any codes that are unmapped, so that table can be exported to build a new complete mapping 
workbook if desired. Any codes that are mapped with `custom_mapped` will show `custom` in their core tables' `mapping_method` 
columns.