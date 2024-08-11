---
id: ingestion
title: "1 . Ingestion"
---

Our standard approach is to have separate databases for each data source.  For example, suppose you have 3 data sources:
- Medicare CCLF Claims Data
- Elation EHR Data
- Health Gorilla FHIR Data

Each of these is a separate data source.  We would create a separate database in our data warehouse for each data source.  We would then load the raw data into a schema called raw_data within each database.  However there are some exceptions to this standard approach.

- Certain cloud data warehouses (e.g. Google Biquery) do not allow multiple databases per warehouse.
- Certain medical records databases are shared via Snowflake data share (e.g. Elation, Athena).  We do not copy these into the raw_data schema if we're using Snowflake as our data warehouse.
- Some raw data sources are not in relation format (e.g. FHIR).  We flatten these into CSVs prior to loading into the data warehouse.
