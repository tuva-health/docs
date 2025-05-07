---
id: overview
title: "Overview"
hide_title: true
toc: false
---

# Connectors

Connectors are dbt projects that contain SQL code to transform raw healthcare data formats into the Tuva [Input Layer](input-layer.md).  The Tuva Input Layer acts like a staging layer for the entire Tuva Project.  Once a data source has been properly transformed into the Input Layer the rest of Tuva can be executed with a single command.

![Connectors](/img/Connectors.jpg)

We are building connectors for as many standard healthcare data sources as possible.  We currently have connectors for the following standard data formats:

**Claims Flat Files:**
- [CMS CCLF](cms-cclf)
- [CMS LDS](cms-lds)

**EHR Databases:**
- [Athenahealth](athenahealth)
- [Canvas](canvas)
- [Elation](elation)
- [Epic](epic)

**FHIR:**
- [FHIR Inferno](fhir-inferno)
- [CMS BCDA](cms-bcda)
- [Health Gorilla](health-gorilla)
- [Metriport](metriport)
- [Zus](zus)

**ADT Flat Files:**
- [Bamboo](bamboo)