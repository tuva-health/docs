---
id: overview
title: "Overview"
hide_title: true
---

# 7. Data Model 
<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 06-21-2025</em></small>
</div>

<iframe width="768" height="496" src="https://miro.com/app/live-embed/uXjVJaWV26M=/?focusWidget=3458764635647841328&embedMode=view_only_without_ui&embedId=559267041011" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

The Core Data Model is a common data model designed for unifying claims and clinical data into a single longitudinal patient record.  A common data model creates a single source of truth that analytics can be built on top of.  With a common data model all your data sources are in a common format (i.e. standard set of data tables).  This makes it possible for every data person in an organization to share a common language and approach for how they talk about and do analytics.  It also creates a standard layer that downstream algorithms (e.g. data marts, machine learning models) can be built on.

The Core Data Model contains data tables for all of the canonical healthcare concepts that need to be modeled for analytics.  There are many common data models used in healthcare and we often get the question why we invented a new one.  The general answer is that the common data model is the foundation of the project, and if we relied on another common data model that we didn't control, we wouldn't be able to modify it to improve the project at the speed we need to.

There are also some specific reasons for why we did not adopt existing common data models, specifically FHIR and OMOP, which we discuss below.  Note that we are building Connectors to other data models, and have built multiple FHIR Connectors to date.  We have an OMOP Connector planned, but have not built it so far.

## Comparison to FHIR and USCDI

The Core Data Model is largely inspired by FHIR and USCDI.  However, neither of these is a relational data model.  FHIR is nested JSON as opposed to relational tables.  And USCDI isn't a data model, more a list of important data domains and data elements.

The Core Data Model has many data tables that have similar representations to resources and domains in FHIR and USCDI.  The patient table is a great example.

## Comparison to OMOP

OMOP is one of the oldest and most well-known common data models in healthcare.  It was originally developed in 2007 as part of a drug safety surveillance project within the FDA and is now governed by the OHDSI project.  

We were familiar with OMOP prior to starting Tuva, and at the very beginning of the project spent several months exploring and seriously considering the possibility of building on top of OMOP.

Ultimately we decided against this for a few reasons.  First, the way OMOP models claims data makes it difficult to import claims data into the model.  Claims data comes in many different formats, but typically includes a medical claim table, a pharmacy claim table, and eligibility table.  In OMOP there are no corresponding tables that are close to these entities.  While it is possible to map claims data to OMOP, it takes very significant transformation to do so.

Second, it's difficult to build data marts that leverage claims information on top of OMOP.  Early in the Tuva project, a principal goal was to build a library of data marts that make it easy to do analytics in value based care.  The more we got into the design of these data marts, the more we realized that doing so on top of OMOP was going to be a square-peg-round-hole sort of problem.





