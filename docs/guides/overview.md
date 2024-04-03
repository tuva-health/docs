---
id: overview
title: "Overview"
---

In the guides that follow we document how we implement and operate Tuva as a healthcare analytics platform.  We follow the design patterns and processes in these guides when we implement and/or operate Tuva for customers.  Of course any organization is free to follow these guides on their own.

These guides are intended to be living documents; we update them over time as we update our design patterns and processes.

A healthcare analytics platform combines the modern data platform and healthcare-specific data transformation tools.

The modern data platform includes the following tools

- Data Warehouse: Snowflake, Databricks, Bigquery, Redshift, etc.
- Data Transformation: dbt
- Orchestration: Prefect
- Cloud Storage: GCS, S3, Azure Blob
- Machine Learning: Scikit-learn, PyTorch, TensorFlow, Keras
- Business Intelligence: Power BI, Tableau

Healthcare-specific data transformation tools include the various parts of Tuva, including:

- Common Data Model
- Data Marts
- Terminology 
- Clinical Concept Library
- Reference Data

