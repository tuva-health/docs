---
id: data-model
title: "2. Data Model"
---
## Overview
This section describes the Tuva Data Model.  There are 3 main layers of the Tuva Data Model.

![The Tuva Project Data Model](/img/the-tuva-project-data-model.jpg)

1. **Input Layer:** The Input Layer is the first layer of data tables in the Tuva Data Model.  Right now the Input Layer consists of claims data tables.  The claims data tables are similar in structure to raw claims datasets you are probably familiar with (i.e. medical claim, pharmacy claim, and eligibility).  Once you've mapped your claims data to the Input Layer you can easily run the entire Tuva Project on your claims data.  We're also building connectors that map certain data models (e.g. Medicare LDS) to the Input Layer.

2. **Core:** Core is the second layer of data tables in the Tuva Data Model.  It is a common data layer which powers downstream data marts and analytics.  All your healthcare datasets (e.g. claims, medical records) are intended to be merged into Core.  A column called `data_source` exists on every Core data table to help distinguish where each record came from.

3. **Data Marts:** Data Marts is the third layer of data tables in the Tuva Data Model.  Examples of data marts include measures, groupers, data marts which create training sets for machine learning, and data marts that prepare data for observational studies.  Data that comes out of the Data Marts layer is sufficiently enriched and ready for analytics and machine learning.
