---
id: overview
title: "Overview"
hide_title: true
description: This guide demonstrates
---
# Claims Preprocessing

![Claims Preprocessing Layers](/img/claims_preprocessing.jpg)

Organizations working with claims data typically look to transform the data into a common data model to make analytics easier.  The goals of this work are generally three-fold:

1. **Normalize** the data to a standard schema and standard terminologies (e.g. ICD-10)
2. **Enrich** the data with higher-level concepts (e.g. measures, groupers, risk scores, etc.)
3. **Test** the data for data quality issues (e.g. missing, invalid, duplicate, orphaned, implausible, etc.)

In our experience every organization working with claims data invents some sort of process to do this.

This guide describes the Tuva process for doing this, which we call Claims Preprocessing.  Claims Preprocessing is designed to work on any claims dataset from any payer (e.g. commercial, Medicare, Medicaid, self-insured employer, etc.).

At the highest-level, this guide describes the following three things:

1. **Mapping:** How to map raw claims data to the Input Layer data model
2. **Transformation:** How code in the Tuva Project transforms data from the Input Layer into the Tuva Data Model
3. **Data Quality:** How data quality tests in the Tuva Project help you identify data quality issues