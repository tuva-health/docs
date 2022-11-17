---
sidebar_position: 2
---

# Getting Started

The Tuva Project uses [dbt](https://www.getdbt.com/) to orchestrate and execute code inside your data warehouse.  This section provides an overview of dbt and how to get up and running with the Tuva Project.

## dbt

The Tuva Project code base is built on top of dbt.  This means that the Tuva Project is essentially a set of dbt packages that you can pull from GitHub and run directly inside your data warehouse.  This section provides an overview of dbt and how it's transforming the data community.

### What is dbt?

[dbt](https://www.getdbt.com/) is an open source framework and execution engine for doing data transformation inside of a data warehouse.  It works on all the most common data warehouses (e.g. Snowflake, Redshift, BigQuery, Postgres, Spark, etc.).  Before dbt it was common for data teams to have hundreds of SQL files floating around their data team.  With dbt a data engineer can organize those SQL files into a single project and dbt will determine the correct order to run them in (i.e. construct a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)).

dbt incorporates software development best practices such as testing and version control directly into dbt - two things that the data analytics discipline has done completely without but sorely needs.

Over the last few years adoption of dbt has grown exponentially across the data community.  However healthcare is still a bit behind the curve, as usual, moving slowly to adopt new tools and technology.  

:::info

We created [this slide deck](https://docs.google.com/presentation/d/17gXDpjIFFNArqvTZl4vSp_KMlDcpFVHkRJC7edEUZXc/edit?usp=sharing) to explain why dbt is a critical part of the modern data platform and how it can help healthcare data teams.

:::

### Installing dbt

dbt provides great documentation on how to get started [here](https://docs.getdbt.com/tutorial/getting-started).

## Quick Start Guide

We just released a major refactor of the Tuva Project - the entire Tuva Project can now be run from a single dbt package called the_tuva_project.

In the coming days we'll be releasing a set of demos and "how to" videos to show users how to quickly get up and running.  In the meantime users can follow the Readme instructions on [GitHub](https://github.com/tuva-health) to get started.
