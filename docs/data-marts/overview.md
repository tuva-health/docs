---
id: overview
title: "Overview"
hide_title: true
---

# 5. Data Marts
<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 06-21-2025</em></small>
</div>

Data Marts run automatically on top of the Core Data Model to further enrich the data with higher-level concepts for analytics.  They create concepts like measures (cost, utilization, quality, outcomes), groupers (service categories, encounters, chronic conditions), and risk models (HCC Scores, RAFs, Suspecting).  

Data Marts are one of the most important parts of the Tuva Project because the concepts they create are what make doing interesting analytics possible.  For example, the Predictive Models and Dashboards + Reports that we build rely on many of the Data Marts and would not be possible without them.

Every Data Mart is fully documented in this section, including:

- Methods: Explains the methodology and rationale for how and why the Data Mart was constructed
- Data Dictionary: Fully describes the output tables of the Data Mart, which are intended for use in analytics
- Example SQL: Provides examples of how to query the output data tables to do analytics



