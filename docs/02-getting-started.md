---
sidebar_position: 2
---

# Getting Started

The Tuva Project is code and supplemental datasets (e.g. terminology sets, value sets, etc.) designed to run inside a data warehouse.  We use [dbt](https://www.getdbt.com/) to orchestrate and execute the Tuva Project inside a data warehouse.  This section provides an overview of dbt and a "hello world" style tutorial for getting started with the Tuva Project.

## dbt

The Tuva Project code base is built on top of dbt.  This means that the Tuva Project is essentially a set of dbt projects and packages that you can pull from GitHub and run directly inside your data warehouse.  This section provides an overview of dbt and how to set it up in order to run the Tuva Project.

### What is dbt?

[dbt](https://www.getdbt.com/) is an open source framework and execution engine for doing data transformation inside of a data warehouse.  It works on all the most common data warehouses (e.g. Snowflake, Redshift, BigQuery, Postgres, Spark, etc.).  Before dbt it was common for data teams to have hundreds of SQL files floating around their data team.  With dbt a data engineer can organize those SQL files into a single project and dbt will determine the correct order to run them in (i.e. construct a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)).

dbt incorporates software development best practices such as testing and version control directly into dbt - two things that the data analytics discipline has done completely without but sorely needs.

Over the last few years adoption of dbt has grown exponentially across the data community.  However healthcare is still a bit behind the curve, as usual, moving slowly to adopt new tools and technology.  

:::info

We created [this overview](https://docs.google.com/presentation/d/17gXDpjIFFNArqvTZl4vSp_KMlDcpFVHkRJC7edEUZXc/edit?usp=sharing) to explain why dbt is a critical part of the modern data platform and how it can help healthcare data teams.

:::

![dbt](/img/dbt.png)

### Installing dbt

dbt provides great documentation on how to get started [here](https://docs.getdbt.com/tutorial/getting-started).

## Tuva Project "Hello World"

In this tutorial we're going to demonstrate how you can get started running the Tuva Project.  Specifically, we'll demonstrate how to process some Medicare CCLF claims data with the Tuva Project [Medicare CCLF Connector](https://github.com/tuva-health/medicare_cclf_connector).  

:::info

Here's a [video](https://www.youtube.com/watch?v=QpuLUJgU2j4) you can follow along with if you'd rather not read through the steps below.

:::

This tutorial is for users to get their feet wet running the Tuva Project.  It uses a synthetic healthcare dataset that we developed in partnership with [Syntegra](https://www.syntegra.io/).  This tutorial shows users how to run the Tuva Project using dbt core (the open source version of dbt) and assumes you've already installed and configured dbt.

### Step 1: Download Data
The data we're going to download for this tutorial is the Synthetic Medicare CCLF dataset.  You can download it by navigating [here](https://www.syntegra.io/try-syntegra-data), filling out the form, and selecting the "Medicare CCLF Claims" dataset from the drop-down.

Load the csv files into your data warehouse.  Use the file names as the table names to keep things simple (otherwise you'll need to do some re-configuration down the line).

### Step 2: Clone or Fork Tuva Project 
In order to run the Tuva Project you need to either clone or fork the [Medicare CCLF Connector](https://github.com/tuva-health/medicare_cclf_connector) into your local computer.


### Step 3: Configure and Run
Next open the dbt_project.yml file from the repo you just cloned.  You'll need to update the dbt profile to an existing profile that you've created to connect dbt to your data warehouse.  See [here](https://docs.getdbt.com/dbt-cli/configure-your-profile) for instructions from dbt on how to do this.

Once you're configured your profile your ready to run the project.  cd into the project directory in the command line (i.e. wherever you cloned the repo into) and execute the build statement below.  Notice the build statement asks you to specify the input and output database and schema.  You need to tell dbt where the input data is (i.e. the database and schema you loaded the medicare claims data to) and where you want it to write the output data to.

```
dbt build --vars '{key: value, input_database: medicare, input_schema: claims_preprocessing, output_database: tuva, output_schema: readmissions}'
```
