---
id: quickstart
title: "Quickstart"
hide_title: true
description: Quick and simple instructions for getting started with the Tuva Project.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🏁 Quickstart

We created this video to demonstrate how to get up and running with Tuva on your claims data.

<iframe width="760" height="440" src="https://www.youtube.com/embed/FWxbrt7Fgiw?si=dyo4uD_MTW4dmAGk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>

## Demo Project

We also created a [demo project](https://github.com/tuva-health/the_tuva_project_demo) that comes with synthetic claims data that you can use if you don't have access to healthcare data.

The demo project is itself a dbt project that is already configured to import the Tuva package.  Running the demo project does the following:

1. Loads the synthetic claims data to your data warehouse
2. Transforms the synthetic claims data into the Tuva Input Layer
3. Imports and runs the Tuva package

After running the demo project you will end up with a database called Tuva with the Core Data Model, Data Marts, Terminology, and Value Sets all populated.

## Data Warehouse Support

Tuva officially supports the following data warehouses:

- Snowflake
- Bigquery
- Redshift

Official supports means we have testing of these data warehouses built into our CI/CD pipelines, so every change we commit to the project is tested on these data warehouses.

Tuva unofficially supports several other data warehouses.  This means Tuva will run on these data warehouses, but we don't yet have these data warehouses added to our CI/CD pipelines for automated testing.

- Databricks
- DuckDB
- Postgres
- AWS Athena


