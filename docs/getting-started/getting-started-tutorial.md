---
sidebar_position: 3
---

# Getting Started Tutorial

This tutorial is for users to test out and run the Tuva Project from beginning to end.  It uses a set of high-fidelity synthetic healthcare datasets that were developed in partnership with [Syntegra](https://www.syntegra.io/).  These datasets are open and free to download and use.

There are 5 synthetic datasets available for download [here](https://www.syntegra.io/try-syntegra-data).  The steps to run the tutorial are slightly different for each dataset because the formats of each dataset are different (e.g. FHIR, medicare claims, etc.).

This tutorial shows users how to run the Tuva Project [Snowflake](https://www.snowflake.com/).

## Download Data
The data we're going to download for this tutorial is the Medicare CCLF dataset.  You can download it by navigating [here](https://www.syntegra.io/try-syntegra-data), filling out the form, and selecting the "Medicare CCLF Claims" dataset from the drop-down.

Load the csv files into your data warehouse.  We strongly suggest using the file name as the table names but if you decide to rename any tables check out the FAQ section at the bottom of this page.

## Fork Tuva Project Repos
In order to run the Tuva Project you need to either clone or fork the repos for the Tuva Project.  The repos that you will need for the Medicare CCLF Claims data are:
- [Medicare CCLF Connector](https://github.com/tuva-health/medicare_cclf_connector): Maps Medicare CCLF claims data to the Tuva claims data input layer
- [Claims Preprocessing](https://github.com/tuva-health/claims_preprocessing_snowflake): Groups claim lines into encounters, assigns encounter types, and creates member months
- [Readmissions](https://github.com/tuva-health/readmissions): Creates all the components needed to calculate readmission measures
- [Chronic Conditions](https://github.com/tuva-health/chronic_conditions): Creates patient-level chronic condition flags for 75 different chronic conditions

In order to run chronic conditions you will need a medication table.  Medicare CCLF doesn't include any medication data so it's fine to create and populate a blank table.  You can use the script below to create the table.

```
create table your_schema_here.medication(
	encounter_id varchar
	,patient_id varchar
	,request_date date
	,filled_date date
	,paid_date date
	,request_status varchar
	,medication_name varchar
	,ndc varchar
	,rx_norm varchar
	,dose varchar
	,dose_unit varchar
	,quantity varchar
	,refills varchar
	,duration varchar
	,route varchar
	,physician_npi varchar
	,note varchar
	,paid_amount float
	,data_source varchar
)  
```

You will run these in order to transform the raw Medicare claims data and make it ready for analytics.

## Configure and Run
Next we'll setup a dbt project for each repo and configure each project to run by updating the following variables in the dbt_project.yml:
- source_name - description of the dataset feeding this project
- input_database - database where you loaded the synthetic data
- input_schema - schema where you loaded the synthetic data
- output_database - database where the output of this package will go
- output_schema - schema where the output of this package will go

Once this is complete you're ready to execute ‘dbt build’.

Repeat these steps for each repository listed in step 3.  

Helpful tip - If these repos have already been set up, set variables in the command line to override the dbt_project.yml variables.  Here is an example:
```
dbt build --vars '{key: value, input_database: medicare, input_schema: claims_preprocessing, output_database: tuva, output_schema: readmissions}'
```
