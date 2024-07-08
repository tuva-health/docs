---
id: overview
title: "Overview"
hide_title: false
---

Connectors are dbt projects that transform standard healthcare data formats into the Tuva Input Layer.

![Connectors](/img/connectors.jpg)

The Tuva Input Layer acts like a staging layer for the entire project.  Once a data source has been properly mapped to the Input Layer the rest of Tuva can be executed with a single command: `dbt build`

## Standard Connectors

We are building connectors for as many standard healthcare data sources as possible.  We currently have connectors for the following standard data formats:

**Claims:**
- [Medicare CCLF](https://github.com/tuva-health/medicare_cclf_connector)
- [Medicare LDS](https://github.com/tuva-health/medicare_saf_connector)

**Medical Records:**
- [Elation](https://github.com/tuva-health/elation_connector)
- Athenahealth (in progress)
- Epic (in progress)

**FHIR:**
- [Health Gorilla](https://github.com/tuva-health/health_gorilla_connector)
- CMS BCDA (in progress)

**ADT:**
- Bamboo (in progress)
- Collective Medical (in progress)


Additionally, [FHIR Inferno](https://github.com/tuva-health/FHIR_connector) is a python-based utility for flattening FHIR (i.e. JSON) into relational CSVs.  We use FHIR Inferno to flatten FHIR data before using the relevant dbt connector.

## Custom Connectors

The majority of healthcare data sources are non-standard and require custom mappings to transform the data source into the Tuva Input Layer data model.  We provide guidance on how to create a custom connector in our guides.