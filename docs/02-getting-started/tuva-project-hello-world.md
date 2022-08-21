---
sidebar_position: 2
---

# Tuva Project "Hello World"

In this tutorial we're going to demonstrate how you can get started running the Tuva Project.  Specifically, we'll demonstrate how to process some Medicare CCLF claims data with the Tuva Project [Medicare CCLF Connector](https://github.com/tuva-health/medicare_cclf_connector).  Here's a [video](https://www.youtube.com/watch?v=QpuLUJgU2j4) you can follow along with if you'd rather not read through the steps below.

This tutorial is for users to get their feet wet running the Tuva Project.  It uses a synthetic healthcare dataset that we developed in partnership with [Syntegra](https://www.syntegra.io/).  This tutorial shows users how to run the Tuva Project using dbt core (the open source version of dbt) and assumes you've already installed and configured dbt.

## Step 1: Download Data
The data we're going to download for this tutorial is the Synthetic Medicare CCLF dataset.  You can download it by navigating [here](https://www.syntegra.io/try-syntegra-data), filling out the form, and selecting the "Medicare CCLF Claims" dataset from the drop-down.

Load the csv files into your data warehouse.  Use the file names as the table names to keep things simple (otherwise you'll need to do some re-configuration down the line).

## Step 2: Clone or Fork Tuva Project 
In order to run the Tuva Project you need to either clone or fork the [Medicare CCLF Connector](https://github.com/tuva-health/medicare_cclf_connector) into your local computer.


## Step 3: Configure and Run
Next open the dbt_project.yml file from the repo you just cloned.  You'll need to update the dbt profile to an existing profile that you've created to connect dbt to your data warehouse.  See [here](https://docs.getdbt.com/dbt-cli/configure-your-profile) for instructions from dbt on how to do this.

Once you're configured your profile your ready to run the project.  cd into the project directory in the command line (i.e. wherever you cloned the repo into) and execute the build statement below.  Notice the build statement asks you to specify the input and output database and schema.  You need to tell dbt where the input data is (i.e. the database and schema you loaded the medicare claims data to) and where you want it to write the output data to.

```
dbt build --vars '{key: value, input_database: medicare, input_schema: claims_preprocessing, output_database: tuva, output_schema: readmissions}'
```
