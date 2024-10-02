---
id: overview
title: "Overview"
hide_title: true
---

# Core Data Model

![Core Data Model](/img/core_data_model.jpg)

The Tuva Core Data Model is a common data model designed for claims and clinical healthcare data.  A common data model creates a foundation that analytics can be built on top of. With a common data model all your data sources are in a common format (i.e. standard set of data tables).  This makes it possible for every data person in an organization to share a common language and approach for how they talk about and do analytics.  It also creates a standard layer that downstream algorithms (e.g. data marts, machine learning models) can be built on.

We developed the Tuva Core Data Model to be the common data model for the Tuva Project.  We decided early on to develop our own common data model, rather than adopt and existing data model, so that we can retain full control of the governance of the data model.  Over time, we need the ability to modify the common data model to support downstream analytics, and without the ability to do this our ability to build analytics would be limited.

We also new that we couldn't adopt FHIR for our common data model, since FHIR is not relational.  However, the Tuva Core Data Model is largely inspired by FHIR and USCDI.



