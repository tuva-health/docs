---
id: overview
title: "Overview"
hide_title: true
---

# Data Quality

This section describes our framework for assessing the quality of data that is mapped to the Tuva Data Model.  There is no perfect methodology for assessing healthcare data quality.  The more you look at healthcare data, the more data quality problems you will find.  In designing this framework our goal was to create a process that:

1. Comprehensively assesses the most important data elements and analytics use cases
2. Gives our community a common language for discussing data quality
3. Is easy to understand and implement

As with all parts of the Tuva Project, we plan to improve this framework iteratively over time with input from the community.

The framework is broken up into two levels: Atomic-level and Analytics-level.  

The **atomic-level** is focused on identifying data quality problems in the raw data (e.g. are values within a certain field invalid).  

The **analytics-level** is focused on understanding a) what analyses we can actually do with the data and b) are the results we get from those analyses reasonable.  

This framework is intended to be used as a checklist.  The results of these checks are created as tables within the data_quality schema automatically whenever you run the Tuva Project.  The atomic-level and analytics-level sections describe the specific checks and how you should review the results of these tables to identify data quality problems.

This initial release of the data quality framework focuses on claims data, but we intend to expand it in the near future to include clinical data.