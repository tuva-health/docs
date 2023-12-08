---
id: claims-preprocessing
title: "Claims Preprocessing"
---

Raw claims data typically suffers from a number of challenges that make it difficult to analyze.  First, it is highly heterogeneous, both in terms of data format and terminology.  For example, even standard fields like ```bill_type_code``` that should only take on a specific set of values may have non-standard values.  

Second, claims data typically has significant data quality problems that make it difficult to determine what is true in the data.  For example, it's not uncommon to see claims with both ```place_of_service_code``` and ```bill_type_code``` populated (which should never happen).

Every organization that deals with claims data develops their own process for dealing with these challenges.  We call this process "Claims Preprocessing" and for us it includes the following:

- Standardizing claims formats to a common data model
- Standardizing claims terminologies
- Systematically identifying data quality issues
- Systematically promoting data we can trust downstream for analytics

This guide describes this process in full detail.

## Overview

There are 5 distinct layers claims data flows through.  Each layer is a well-specified set of data tables.  This guide describes how to map Raw Claims Data to the Input Layer so that it can be 1) tested for data quality issues and 2) transformed for analytics.

![Claims Preprocessing Layers](/img/claims_preprocessing_layers.jpg)

1. **Raw Claims Data:** This is the raw claims data that you get from a payer / health plan.

2. **Input Layer:** This is the layer you map raw claims data to.  This guide describes a set of rules and heuristics for how to map raw claims data to this layer.

3. **Clean Input Layer:** This layer is automatically created via code that tranforms data from the Input Layer into the Clean Input Layer.

4. **Core Data Model:** This layer is automatically created via code that transforms the Clean Input Layer.  This includes creating new concepts like service categories and encounters.

5. **Data Marts:** This layer is automatically created via code that transforms the Core Data Mart layer.