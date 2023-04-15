---
id: medicare-cclf
title: "Medicare CCLF"
---

[Github Repo](https://github.com/tuva-health/medicare_cclf_connector)

Medicare CCLF (Claim and Claim Line Feed) data is one of the most commonly available claims data formats.  CMS provides claims data in this format to organizations that participate in different types of CMS value-based care programs (e.g. Medicare Shared Savings Program).

CMS publishes a comprehensive guide on the Medicare CCLF data, including a data dictionary, which you can find [here](https://www.cms.gov/files/document/cclf-information-packet.pdf).

The medicare_cclf_connector is a dbt package that maps raw Medicare CCLF data to the Tuva Input Layer.  The Medicare CCLF data includes 12 data tables.  Of these 12 tables, 8 are most important for analytics.  The medicare_cclf_connector transforms these 8 tables into the Tuva Input Layer.  The DAG below shows from a high-level the transformations that the connector performs.  To see in detail what transformations are being performed you can look at the actual SQL in the models folder of the connector [here](https://github.com/tuva-health/medicare_cclf_connector/tree/main/models).

