---
id: overview
title: "Overview"
hide_title: false
---

Connectors are dbt projects and packages that transform standard healthcare data formats into the Tuva [Input Layer](input-layer.md).

![Connectors](/img/Connectors.jpg)

The Tuva Input Layer acts like a staging layer for the entire Tuva Project.  Once a data source has been properly mapped to the Input Layer the rest of Tuva can be executed with a single command: `dbt build`

## Standard Connectors

We are building connectors for as many standard healthcare data sources as possible.  We currently have connectors for the following standard data formats:

**Claims:**
- [CMS BCDA](cms-bcda)
- [CMS CCLF](cms-cclf)
- [CMS LDS](cms-lds)

**Medical Records:**
- [Athenahealth](athenahealth)
- [Elation](elation)

**FHIR:**
- [FHIR Inferno](fhir-inferno)
- [Health Gorilla](health-gorilla)

**ADT:**
- Bamboo (in progress)
- Collective Medical (in progress)

## Custom Connectors

The majority of healthcare data sources use non-standard data formats.  For example, most payer claims data sources are bespoke.  These sources require custom connectors to transform the data source into the Tuva Input Layer.  We provide guidance on how to create a custom connector in our data source setup [guide](../guides/data-source-setup/overview).