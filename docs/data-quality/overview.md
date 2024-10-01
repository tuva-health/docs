---
id: overview
title: "Overview"
hide_title: true
---

# Data Quality

The framework we use to analyze data quality includes two levels: Atomic-level and Analytics-level.  Atomic-level is focused on identifying data quality problems in the raw data (e.g. are values within a certain field invalid).  Analytics-level is focused on understanding a) what analyses we can actually do with the data and b) are the results we get from those analyses reasonable.  

This framework is intended to be used as a sort of checklist.  Every dataset we map to the Tuva Data Model gets put through this framework, so we know the strengths and weaknesses of the dataset.  All of these data quality checks are built into the Tuva Data Model.  The sections that follow explain in detail why these checks are important and how to use them.

At present the data quality framework only focuses on claims data but we intend to expand it in the near future to include clinical data as well.  