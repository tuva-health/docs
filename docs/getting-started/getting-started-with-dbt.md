---
sidebar_position: 2
---

# Getting Started with dbt

The Tuva Project code base is built on dbt.  This means that the Tuva Project is essentially a set of dbt projects and packages that you can pull and run directly against your data warehouse.  This section provides an overview of dbt and how to set it up in order to run the Tuva Project.

## What is dbt?

[dbt](https://www.getdbt.com/) is an open source framework and execution engine for doing data transformation inside of a data warehouse.  It works on all the most common data warehouses (e.g. Snowflake, Redshift, BigQuery, Postgres, Spark, etc.).  dbt incorporates software development best practices such as test-driven development and version control into data engineering (which has historically lacked these important development practices).

We created [this overview](https://docs.google.com/presentation/d/17gXDpjIFFNArqvTZl4vSp_KMlDcpFVHkRJC7edEUZXc/edit?usp=sharing) to explain why dbt is a critical part of the modern data platform and how it can help healthcare data teams in particular.

![dbt](/img/dbt.png)

## Installing dbt

dbt provides great documentation on how to get started [here](https://docs.getdbt.com/tutorial/getting-started).
