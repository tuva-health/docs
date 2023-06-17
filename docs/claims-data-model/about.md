---
id: about
title: "Claims Data Model"
---

The Tuva claims data model is a general-purpose claims data model designed to support a variety of healthcare analytics use cases.  It can be used as a common claims data model if you have multiple claims datasets in different schemas and want to merge them into a common format.

The Tuva claims data model also acts as the input layer for the Tuva Project because downstream data marts reference the claims data model tables.

We are building connectors that map standard healthcare data sources to the Tuva claims data model.  Currently the Tuva Project has two connectors:

- [Medicare LDS Claims Data](https://github.com/tuva-health/medicare_lds_connector)
- [Medicare CCLF Claims Data](https://github.com/tuva-health/medicare_cclf_connector)