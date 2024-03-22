---
id: quickstart
title: "Quickstart"
hide_title: true
description: Quick and simple instructions for getting started with the Tuva Project.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🏁 Quickstart

The Tuva Project is a large collection of tools for cleaning and transforming healthcare data.  At it's core is a standard data model designed for healthcare analytics.  The Tuva Data Model, along with the code and terminology sets to create it, exists in a main repository called [the_tuva_project](https://github.com/tuva-health/the_tuva_project).  This section describes how you can get started using the Tuva Project.

## Pre-requisites

There are a couple pre-requisites for using the Tuva Project:

1. Install [dbt](https://docs.getdbt.com/docs/core/pip-install)
2. Healthcare data (i.e. claims or clinical data) in a data warehouse

The Tuva Project supports the following data warehouses:
- Snowflake
- Bigquery
- Redshift
- Databricks
- DuckDB

## Quickstart Tutorial

We created this [demo project](https://github.com/tuva-health/the_tuva_project_demo) to make it easy for people to explore the Tuva Project, even if you don't have access to healthcare data.  The demo includes a 1,000 patient synthetic claims dataset based on Medicare claims data.  Follow the instructions below to load the dataset into your data warehouse and run the Tuva Project.

**Steps:**

1. Clone or fork the demo project repo
2. Configure the demo project dbt project to your data warehouse
3. Run the demo project

## Entire Tuva Data Model + Terminology and Reference Datasets

```yml
packages:
  - package: tuva-health/the_tuva_project
    version: [">=0.5.0","<1.0.0"]
```
2. Import the package by running the following command:
```console
  dbt deps
```

Here we describe how you can process a raw healthcare data source (e.g. a claims dataset) into the Tuva data model and also load all terminology and reference datasets into your data warehouse.

1. **Map** your healthcare data to the `Input Layer` in the dbt project where you imported the Tuva Project package.  Running the entire Tuva Data Model requires mapping your raw healthcare data (e.g. a claims dataset) to the [Input Layer](https://thetuvaproject.com/data-dictionaries/input-layer).  This involves creating custom SQL models to transform you data model into the `Input Layer` data model.  Once you've mapped your data to the `Input Layer` code automatically transforms the data into the Tuva Data Model, which includes the [Core Data Model](https://thetuvaproject.com/data-dictionaries/core) and a collection of data marts designed for specific types of healthcare analytics.

2. **Set the variables:** You need to enable all models related to the type of healthcare data being used. Do this by adding the data source type variable to your `dbt_project.yml` file and set the value to "true".  If you are mapping claims data you need to set the `claims_enabled` variable to true and if you have medical records or other types of clinical data you need to set the `clinical_enabled` variable to true.  For example:
  ```yml
    vars:
      claims_enabled: true
  ```

3. **Run** the dbt project to build the models that map to the `Input Layer` and the entire Tuva data model.
  ```console
  dbt build
  ```

#### Other Variables
The Tuva Project relies on variables to set default behavior for the data marts.
These defaults can be found in the package's `dbt_project.yml`.
You can change these values here or set them in the `dbt_project.yml` of your project.

* **tuva_last_run:** The date and timestamp of the dbt run that will populate 
  the tuva_last_run column in all models. Default timezone is UTC.
* **cms_hcc_payment_year:** The payment year for the CMS HCC mart. Defaults to 
  the current year.
* **cms_hcc_model_version:** The risk model used for the CMS HCC mart.
* **quality_measures_period_end:** The reporting date used to calculate the 
  performance periods for Quality Measures. Defaults to the current date.
* **snapshots_enabled:** Some data marts use the [dbt snapshot](https://docs.getdbt.com/docs/build/snapshots)
  feature. These are disabled by default. To enable them add this variable and 
  set the value to true (`snapshots_enabled: true`).

Alternatively, you can set these in the CLI. Example:
```console
dbt build --select the_tuva_project --vars '{cms_hcc_payment_year: 2020}'
```

## Single Data Mart

Mapping an entire healthcare dataset to the `Input Layer` can take several hours or more.  You can also get started by running a single data mart, which is just a subset of the Tuva data model.  Every data mart in the Tuva Project can be run individually.  To run a single data mart complete the following steps:

1. **Map to staging:** Each data mart has its own staging layer.  The staging layer is the set of models you need to create in order to run the data mart.  You can find this in the `staging` folder under the data mart.
2. **Set the variables:** You need to enable the data mart you want to run.  Do this by adding the variable for that data mart to your `dbt_project.yml` file and set the value to "true".  For example: 
  ```yml
    vars:
      cms_chronic_conditions_enabled: true
  ```
3. **Run** the package to build the marts you enabled.
    ```console
    dbt build
    ```

## Terminology and Reference Datasets

<iframe width="560" height="315" src="https://www.youtube.com/embed/oJyuJ4XFYNI?si=2OqvRdcL9D9itUrB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>

If you just want to load the Terminology and Reference datasets and not worry about the Tuva data model, that's easy as well.  You can disable the data marts and just load the terminology seeds by completing 
the following steps:

1. Add the variable `tuva_marts_enabled` to your `dbt_project.yml` file and set the value to "false".
   ```yml
      vars:
        tuva_marts_enabled: false
   ```
2. Run the package to build the seeds.
   ```console
    dbt seed 
  ```

Alternatively, you can load all the terminology sets via SQL directly to your data warehouse. Check out the SQL for doing this [here](https://github.com/tuva-health/the_tuva_project/tree/main/terminology_sql).


