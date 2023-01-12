---
id: overview
title: "Overview"
---
This section of Knowledge Base is where we dive into key concepts that are important for doing healthcare analytics.  A concept is a higher-level data element, created on top of raw claims data, that is useful for answering a question we are interested in.  A concept is like a feature, from a machine learning perspective, or a variable from a probability and statistics perspective.  Some concepts are simple (e.g. patient age), while others are more complex (e.g. an acute inpatient encounter).  Concepts can even (and often are) be built on top of other concepts.  

Raw claims data lacks the majority of concepts that we need to do healthcare analytics, so one of the important things we need to do is develop a lattice of concepts that make it easier to answer important and interesting questions.  

For each concept we discuss:

- Key use cases for the concept
- Raw claims data elements and other concepts (if applicable) used to create the concept
- Method(s) used to create the concept
- Common data quality problems related to the concept

We also provide numerous SQL examples for each concept.  Each SQL example is designed to run in Snowflake, but the SQL is usually simple and easy to adapt to other data warehouses.  Each SQL example is designed to run against the Tuva Claims Common Data Model (CDM).  If your claims dataset is in the Tuva Claims CDM, you can run the SQL examples automatically.  If your claims data is not yet in the Tuva Claims CDM, we have a synthetic claims dataset you can run the SQL on.



