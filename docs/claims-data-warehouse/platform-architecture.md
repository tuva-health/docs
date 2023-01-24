---
id: platform-architecture
title: "Platform Architecture"
---
In this section we what we call the modern data platform, which you can think of as the storage and compute engine that the Tuva Project runs inside of.

The Tuva Project is essentially the code and terminology sets that transform your raw claims data and make it ready for analytics.  You can think of the Tuva Project as the intelligence layer that's processing your claims data.  However this intelligence layer needs an execution engine in order to run it.  That execution engine is a data warehouse and [dbt](https://www.getdbt.com/).

General-purpose data tools have improved tremendously in the last 5 years.  Of these, a core subset of tools has emerged that comprise what we call the modern data platform.  There are lots of tools one could add on to this, but the diagram below describes what we believe are the core components:

![The Modern Data Platform](/img/modern_data_platform.jpg)

The modern data platform has 4 main components:

1. File Storage

2. Data Warehouse

3. Data Transformation Engine

4. Analytics and Machine Learning

**File Storage:** This is a place in the cloud where you will store your raw claims data in file format (e.g. CSV).  Claims data is most commonly delivered as files and other types of healthcare data (e.g. medical record data, lab data, ADT events) are commonly delivered as files or messages.  Therefore it's critical to have a place to store this type of data before ingesting it into your data warehouse.  All the major cloud providers (i.e. Google, Amazon, and Microsoft) have cheap cloud storage options.

**Data Warehouse:** Data warehouses have been around since the 1980s.  The first modern cloud data warehouse was AWS Redshift, which came out in 2013.  Since then the competition to build the best cloud data warehouse has increased dramatically, with Snowflake, Google, and Databricks all investing hundreds of millions of dollars in development.  The modern cloud data warehouse is typically much easier to use and administer than legacy data warehouses.

**Data Transformation Engine:** The "old days" of doing data engineering inside a data warehouse looked like this: hundreds of unversioned SQL files floating around on a network with teams struggling to collaborate or execute the SQL in a consistent way.  With the advent and popularity of cloud data warehouses, it was only natural that a product and company would emerge to solve this problem.  That product and company is dbt.  dbt brings software development best practices to data engineering.  It makes it easy for teams to document and test their code and places all that code under version control.  And it makes it easy for teams to collaborate.  For these reasons it's emerged as a critical component of the modern data platform.

**Analytics and Machine Learning:**  This part of the stack includes tools for building dashboards and reports, along with tools that enable users to train, deploy, and monitor machine learning models.