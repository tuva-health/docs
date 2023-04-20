---
id: quickstart
title: "Quickstart"
---

<div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}>
  <iframe src="https://www.loom.com/embed/c6ac1645ced94463ada69a54ab112819" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}></iframe>
</div>

## Prerequisites

To get started with the Tuva Project, you will need:

1. dbt version 1.3 or greater.  You can use either [dbt cloud](https://cloud.getdbt.com/) or [dbt CLI](https://docs.getdbt.com/dbt-cli/cli-overview).
2. Healthcare data loaded into one of the data warehouses currently supported by the Tuva Project (i.e. Snowflake, Redshift, and BigQuery)

## Step 1: Map Your Data

The first step is mapping your healthcare data to the Tuva Project Input Layer.  The Input Layer is the base data model for the Tuva Project on top of which all other parts of the Tuva Project run.  You can find the data dictionary for the Input Layer in the Data Marts section of this website.  

There are two ways to map your data to the Input Layer depending on the type of data you have:
1. Custom Mapping
2. Connectors

If your healthcare data is not in one of the standard formats we've built connectorsCreate dbt models that map your data to the Input Layer inside a dbt project.  

We’ve created dbt projects for standardized datasets that perform this mapping (we call these dbt projects “connectors”).  For example we have the following connectors already built:

- [Medicare LDS](https://github.com/tuva-health/medicare_saf_connector)
- [Medicare CCLF](https://github.com/tuva-health/medicare_cclf_connector)

For further assistance and a deeper dive into mapping claims data to the Input Layer, check out our Claims Mapping Guide.

## Step 3: Import the Tuva Project

Once you’ve mapped your data to the Input Layer, the next step is importing the Tuva Project into your dbt project.  The Tuva Project is a dbt package.  A [package](https://docs.getdbt.com/docs/build/packages) is dbt’s version of a library for modularized code.  To install the Tuva Project (i.e. package), follow these steps:

1. Create a packages.yml under the parent folder of your dbt project
2. Add three lines of code to the YML file.  Copy the text available on [dbt hub](https://hub.getdbt.com/tuva-health/the_tuva_project/latest/).
3. In dbt, run the command `dbt deps` to install the package into your project.

## Step 4: Configuring the package

For the Tuva Project to run “as is” on your data, you need to create a database called `Tuva` in your data warehouse.  The Tuva Project models will populate this database with a schema that corresponds to each data mart. For example, the Readmissions data mart will populate a `readmissions` schema.

If you’d rather load the Tuva Project into a different database, add the following variable to the dbt_project.yml file:

```yaml
tuva_database: your_database_name
```

If you want to alter the schema names there are two ways:

1. Add a prefix to the default schema name for all packages
    
    ```yaml
    tuva_schema_prefix: test
    ```
    
2. Change the schema name for each package
    
    ```yaml
    claims_preprocessing_schema: core
    cms_chronic_conditions_schema: cms_chronic_conditions
    data_profiling_schema: data_profiling
    pmpm_schema: pmpm
    readmissions_schema: readmissions
    terminology_schema: terminology
    tuva_chronic_conditions_schema: tuva_chronic_conditions
    ```
    

## Step 5: Build the Tuva Project

After completing the applicable setup steps, you are ready to run the Tuva Project. In dbt, execute the command `dbt build`. This will build all models, seeds, and snapshots, as well as run all tests.

You can now explore and gather insights from your data!