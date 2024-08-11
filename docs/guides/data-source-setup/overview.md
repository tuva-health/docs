---
id: overview
title: "Overview"
---

This guide describes how to setup your data sources in the Tuva Data Model i.e. Core Data Model and Data Marts.  In general, setting up Tuva on one or more data sources includes the following steps:

1. **Ingestion:** Loading the raw data into your data warehouse
2. **Configuration:** Creating a new dbt project and connecting the project to your data warehouse and version control system
3. **Mapping:** Writing custom SQL logic to transform the source data format into the Tuva Input Layer
4. **Deployment:** Running Tuva to build all the data tables (i.e. Core Data Model, Data Marts, Terminology Sets, Value Sets, etc.) in your data warehouse
5. **Audit:** Identifying mapping issues and inherent data quality problems and understanding their impact on data marts and key metrics

**Steps 1 and 2** are trivial and can often be completed in just a few hours or less.

A first pass of **Step 3** can often be completed in just a few hours.

However, generally **Steps 3 through 5** are iterative in nature: you'll complete the mapping, deploy Tuva, and then run the audit, the result of which will uncover problems in the mapping that you will then need to correct.  This iterative process can take anywhere from a couple days to a couple weeks to complete, depending on the complexity of the source data.

In the pages that follow we describe these steps in detail, as well as a few advanced topics, such as unioning multiple data sources, making customizations, and managing upgrades.

