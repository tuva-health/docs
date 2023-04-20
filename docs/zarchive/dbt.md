---
id: dbt
title: "Intro to dbt for Healthcare"
---
The Tuva Project code base is built on top of dbt.  This means that the Tuva Project is essentially a set of dbt packages that you can run directly inside your dbt project and inside your data warehouse.  This section provides an overview of dbt and how it's transforming data engineering.

### What is dbt?

[dbt](https://www.getdbt.com/) is an open source framework and execution engine for doing data transformation inside of a data warehouse.  It works on all the most common data warehouses (e.g. Snowflake, Redshift, BigQuery, Postgres, Spark, etc.).  Before dbt, it was common for data teams to have hundreds of SQL files floating around their data team.  With dbt, a data engineer can organize those SQL files into a single project and dbt will determine the correct order to execute them in (i.e. construct a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)).

Software development best practices, such as testing and version control, are built directly into dbt.  These are two things that the data engineering and analytics discipline has done completely without but sorely needs.

Over the last few years adoption of dbt has grown exponentially across the data community.  However healthcare is still a bit behind the curve, as usual, moving slowly to adopt new tools and technology.  We created the slide deck below to explain why dbt is a critical part of the modern data platform and how it can help healthcare data teams.

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSy6ScNiEQuC4aiW8t9yYwnqwfYyTCpUwc8IeFGIQs1LqTfeBTFtbuvfh_hIuxsONyDZmPFErVbGykK/embed?start=false&loop=true&delayms=3000" frameborder="0" width="800" height="600" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

### Installing dbt

dbt provides great documentation on how to get started [here](https://docs.getdbt.com/docs/get-started/installation).
