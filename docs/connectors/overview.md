---
id: overview
title: "Overview"
hide_title: true
toc: false
---

# 1. Connectors

<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 06-23-2025</em></small>
</div>

Connectors transform raw data sources into the Tuva data model.  More specifically, connectors are dbt projects that contain SQL models that transform raw healthcare data formats into the Tuva [Input Layer](input-layer.md).  The Tuva Input Layer acts like a staging layer for the entire Tuva Project.  Once a data source has been properly transformed into the Input Layer the rest of the Tuva data model can be created with a single command.

![Connectors](/img/Connectors.jpg)

We are building connectors for as many standard healthcare data sources as possible.  We currently have connectors for the following standard data formats:

**Claims Flat Files:**
- [CMS CCLF](cms-cclf)
- [CMS LDS](cms-lds)

**EHR Databases:**
- [Athenahealth](athenahealth)
- [Canvas](canvas)
- [Cerner](cerner)
- [Elation](elation)
- [Epic](epic)
- [Healthie](healthie)

**FHIR:**
- [FHIR Inferno](fhir-inferno)
- [CMS BCDA](cms-bcda)
- [Health Gorilla](health-gorilla)
- [Metriport](metriport)
- [Zus](zus)

**ADT Flat Files:**
- [Bamboo](bamboo)