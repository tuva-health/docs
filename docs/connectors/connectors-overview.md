---
id: connectors-overview
title: "Overview"
hide_title: true
toc: false
---

# 1. Connectors

<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 08-08-2025</em></small>
</div>


<iframe width="600" height="400" src="https://www.youtube.com/embed/dxH_qWgCoik?si=XB5D_-2p82IaJo8R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


The Tuva Data Model makes raw clinical and claims data useful in many ways, checking quality, restructuring data for easy calculations, and adding important features that improve interpretability like terminology, value sets and other clinical concepts. 

The key to unlocking these features is mapping your data to the [Input Layer](input-layer.md). The Input Layer is nothing more than a set of data dictionaries to common healthcare data sources, like claims or EMR records. These data come in all different formats, with different numbers of columns, different column names, different data types, etc. 

A *connector* is simply a set of code/logic that converts data from whatever source it came from into the tables, columns, column names and other standard conventions defined in the Tuva input layer (data dictionaries). Building and running a connector transforms your data into the format expected by the Tuva Data Model. 

![Connectors](/img/Connectors.jpg)

For more details on building a custom connector to map your own data to the Tuva Project Input Layer, visit the next section on [Building a Connector](/docs/connectors/building-a-connector.md). 

### Pre-Built Connectors

The Tuva Project also has a library of *Pre-Built Connectors* that you can use to map common claims or clinical data sources to the Tuva Input Layer. 

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