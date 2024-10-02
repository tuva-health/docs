---
id: overview
title: "Overview"
hide_title: true
---

# Data Quality

This section documents our framework for assessing the quality of data that is mapped to the Tuva Data Model.  There is no perfect methodology for assessing healthcare data quality.  The more you look at healthcare data, the more problems you will find.  Our goal with this framework is to provide a systematic process that is easy to understand and implement that covers the most important use cases we have for healthcare data.

Our framework includes two levels: Atomic-level and Analytics-level.  

The **atomic-level** is focused on identifying data quality problems in the raw data (e.g. are values within a certain field invalid).  


The **analytics-level** is focused on understanding a) what analyses we can actually do with the data and b) are the results we get from those analyses reasonable.  

This framework is intended to be used as a checklist.  Every dataset we map to the Tuva Data Model gets put through this framework, so we know the strengths and weaknesses of the dataset before we start to use it for analytics.  All of these data quality checks are built into the Tuva Data Model.  The sections that follow explain why these checks are important and how to use them.

At present the data quality framework only focuses on claims data but we intend to expand it in the near future to include clinical data as well.  