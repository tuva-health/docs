---
id: overview
title: "Overview"
hide_title: true
description: This guide demonstrates
---
# Claims Preprocessing

Organizations working with claims data typically look to transform the data into a common data model to make analytics easier.  The goals of this work are generally three-fold:

1. Normalize the data to a standard schema and terminologies
2. Enrich the data with higher-level concepts (e.g. groupers and measures)
3. Test the data for data quality issues

In our experience every organization working with claims data invents some sort of process to do this.

This guide documents the Tuva process for doing this, which we call Claims Preprocessing.  The guide is designed to work on any claims dataset from any payer (e.g. commercial, Medicare, Medicaid, self-insured employer, etc.).

At the highest-level, this guide describes two things:

1. How to map to the Input Layer
2. How to use the code in the Tuva Project to transform and quality-test data in the Input Layer into the Tuva Data Model

This guide describes how to map a single claims data source to the Input Layer.  

In Claims Preprocessing there are 5 distinct layers claims data flows through.  Each layer is a well-specified set of data tables.

![Claims Preprocessing Layers](/img/claims_preprocessing_layers.jpg)

1. **Raw Claims Data:** This is the raw claims data that you get from a payer / health plan.

2. **Input Layer:** This is the layer you map raw claims data to.  This guide describes a set of rules and heuristics for how to map raw claims data to this layer.

3. **Normalized Input Layer:** This layer is automatically created via code in the Tuva Project that tranforms data from the Input Layer into the Normalized Input Layer.

4. **Core Data Model:** This layer is automatically created via code that transforms the Normalized Input Layer into the Core Data Model, including the creation of new concepts like service categories and encounters.

5. **Data Marts:** This layer is automatically created via code that transforms the Core Data Mart layer into higher-level concepts like measures and groupers.

**Other Terms Used Throughout This Guide:**

- **Connector:** A connector is a dbt project that is created to map raw claims data to the Input Layer.

- **Expectation:** An expectation is a requirement for a particular field during mapping that must be satisified.  If an expectation is not satisified errors can occur.