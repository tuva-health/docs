---
id: quickstart
title: "Quickstart"
hide_title: true
description: Quick and simple instructions for getting started with the Tuva Project.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🏁 Quickstart

We created this video to demonstrate how to get up and running with Tuva on your claims data.  Although this video is specific to claims, you can follow a similar pattern for clinical data.

<iframe width="760" height="440" src="https://www.youtube.com/embed/FWxbrt7Fgiw?si=dyo4uD_MTW4dmAGk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>

 ### 1. Pre-requisites

 You need to start with claims data in a data warehouse and have dbt installed.  dbt is easy to install using any package manager like pip or homebrew.  You also need to connect dbt to your data warehouse.  You do this by configuring your ```profile.yml``` file.  dbt has instructions for how to do this which you can find on their docs site.

 Tuva currently supports Snowflake, Bigquery, Redshift, Databricks, and DuckDB.  If you're running a data warehouse other than these, you might run into SQL syntax issues.

 ### 2. Setup dbt

 The very first step is to setup a new dbt project.  Once dbt is installed you can do this by executing ```dbt init <project_name>``` where you replace ```<project_name>``` with the name of your project.

 Next you need to configure your ```dbt_project.yml``` file in the newly created dbt project.  This includes 3 steps:

 - setting your profile
 - setting Tuva-specific variables
 - setting the database and schema where dbt should write data to

 See the video above for details on how to do this.

 Next you'll need to add a "generate schema" macro to your macros folder in the dbt project.  This is optional, but if you don't do this your schema names will all be prefixed with your default schema e.g. "public_" which is super annoying.  dbt has documentation on how to do this or see our video above.

 Finally you'll need to import Tuva by creating a ```packages.yml``` file and adding the following code:

 ```yml
packages:
  - package: tuva-health/the_tuva_project
    version: [">=0.7.0","<0.8.0"]
  - package: dbt-labs/dbt_utils
    version: [ ">=0.9.2" ]
 ```

Then execute ```dbt deps``` from the command line to import Tuva.

### 3. Mapping Your Claims Data

The next step is mapping your claims data to the Input Layer.  Every claims dataset comes in its own schema (i.e. set of tables and columns).  Before you can use Tuva you need to convert your claims schema to the Tuva Input Layer.  Do this by creating models (i.e. SQL files) in your dbt project to transform your data into the Input Layer format.

Use the [Input Layer Data Dictionary](../connectors/input-layer) and [Claims Mapping Guide](../guides/mapping/claims) to guide you in doing this.

### 4. Build

Next, run ```dbt build``` from the command line to build the entire project.  Watch as hundreds of tables are built in your data warehouse and your claims data is transformed!

### 5. Explore Data and Docs

You have now transformed you claims data into the Tuva data model.  Check out [Use Cases](../use-cases/acute-inpatient) to find example SQL that you can run against these tables.

dbt also comes with awesome documentation built-in.  You can run ```dbt docs generate``` to generate the docs and then ```dbt docs serve``` to serve up the docs to your localhost.  A web browser will open when you do this and you can explore the docs.

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


