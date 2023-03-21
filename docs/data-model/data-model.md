---
id: data-model
title: "2. Data Model"
---
## Overview
This section describes the Tuva Data Model.  There are 4 main layers of the Tuva Data Model.

![The Tuva Project Data Model](/img/the-tuva-project-data-model.jpg)

1. **Input Layer:** The Input Layer is the first layer of data tables in the Tuva Data Model.  There are Input Layer tables for both claims data and for medical record data.  The claims data tables are similar in structure to raw claims datasets you are probably familiar with.  The medical record tables are a relational form of FHIR r4.  The purpose of Staging is to convert your claims and medical record data, which may come a variety of schemas, into a standard schema.

2. **Data Profiling:** Data Profiling is the second layer of data tables in the Tuva Data Model.  It includes a set of data tables that summarize and pin-point data quality problems in your raw data.  It runs on data that has been mapped to Staging.

3. **Core:** Core is the third layer of data tables in the Tuva Data Model.  It is a common data layer which powers all data marts and downstream analytics.  All your healthcare datasets (e.g. claims, medical records) are intended to be merged into Core.  A column called `data_source` exists on every Core data table to help distinguish where each record came from.

4. **Data Marts:** Data Marts is the fourth layer of data tables in the Tuva Data Model.  Examples of data marts include measures, groupers, data marts which create training sets for machine learning, and data marts that prepare data for observational studies.  Data that comes out of the Data Marts layer is sufficiently enriched and ready for analytics.

You can see how each of the four layers correspond to the overall Tuva Project in the diagram above.  You may notice that Preprocessing, which comes after data profiling in the diagram above, does not have a place in the Tuva Data Model.  This is because Preprocessing is what outputs the Core layer.

## Entity Relationship Diagram
