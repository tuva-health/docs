---
id: about
title: "Core Data Model"
---

The Core Data Model is a collection of tables that include what we consider to be the core concepts needed for healthcare analytics.  This includes concepts like patient, provider, encounter (i.e. visit), condition, etc.  It also includes tables for claims data-specific concepts (e.g. medical_claim) as well.  The claims data tables are similar to the claims tables from the Claims Data Model but have been enhanced with terminology and groupers from Claims Preprocessing.

You can query the Core Data Model to answer simple questions (e.g. how many patients are in my dataset).  It also powers downstream data marts that contain higher-level concepts e.g. measures, grouopers, care pathways, and risk models.