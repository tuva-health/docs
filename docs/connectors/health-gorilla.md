---
id: health-gorilla
title: "Health Gorilla"
hide_title: false
---

## Overview

[Code on Github](https://github.com/tuva-health/health_gorilla_connector)

[Health Gorilla](https://www.healthgorilla.com/) offers a FHIR API that connects to [CommonWell](https://www.commonwellalliance.org/), [Carequality](https://carequality.org/), and other nationwide health information exchange partners.

## Instructions

Health Gorilla delivers data in FHIR format i.e. JSON.

**Step 1: Use FHIR Inferno to Flatten JSON**
The first step is using [FHIR Inferno](fhir-inferno) to flatten the JSON into relational CSV tables and load those CSVs into data tables inside your data warehouse.  The [Health Gorilla Configs](https://github.com/tuva-health/FHIR_inferno/tree/main/configurations/configuration_Health_Gorilla) used by FHIR Inferno transforms the JSON specific data tables expected by the Health Gorilla Connector.

**Step 2: Clone Health Gorilla Connector**
Next, clone the Health Gorilla Connector (i.e. dbt project) to your local repo.   If our data is in another format, we'll have to build some custom models to get our data into the Tuva Input Layer format.

**Step 3: Configure**
Once we have our own version of the connector cloned locally, all of the configurations we need to make will be in the [dbt_project.yml](https://github.com/tuva-health/health_gorilla_connector/blob/initial_push/dbt_project.yml) file:
 - if our profile name is anything other than `default`, we need to change the `profile:` configuration to match what we set in our profiles.yml  
 - we need to set the `input_database` var to the name of the database where our raw Health Gorilla data is
 - we need to set the `input_schema` var to the name of the schema where our raw Health Gorilla data is

We can also use this opportunity to set any normal dbt configurations we want, such as the output database or schema and any custom documentation pages, etc.

**Step 4: Import Tuva**
The next step is to import the Tuva Project package.  Add Tuva to your packages.yml and execute `dbt deps`.

**Step 5: Run**
Now you're ready to execute `dbt build` and run the entire project.