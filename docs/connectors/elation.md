---
id: elation
title: "Elation"
hide_title: false
---

## Overview

[Code](https://github.com/tuva-health/elation_connector)

Elation is an electronic medical record system widely used in the ambulatory setting.  One of the great things about Elation is that they make the backend database available to their customers via Snowflake data share.  This makes it very easy to access data from Elation for analytics purposes.

The instructions below describe how to use the Elation Connector (link to code above) to transform the Elation data model into the Tuva [Input Layer](input-layer).

## Instructions

**Step 1: Pre-requisites**
You must have medical record data from Elation in a data warehouse supported by this project. Elation offers customers access to data via Snowflake data share.

**Step 2: Clone or Fork this Repository**
Unlike the Tuva Project, the Elation is a dbt project, not a dbt package.  Use the link above to navigate to the GitHub repo and clone or fork this repository to your local machine.

**Step 3: Configure Input Database and Schema**
Next you need to tell dbt where your Elation source data is located.  Do this using the variables input_database and input_schema in the dbt_project.yml file.  You also need to configure your profile in the dbt_project.yml.

**Step 4: Data Preparation**
Not every instance of the Elation data model is identical.  If your instance differs from the model used in the Elation Connector, you'll need to modify the code (e.g. if a field is named differently).

**Step 5: dbt deps**
Execute the command dbt deps to install The Tuva Project. By default, this connector will use any version of the Tuva Project after 0.5.0 which is when clinical support was released.

**Step 6: Run**
Now you're ready to run the connector and the Tuva Project. For example, using dbt CLI you would cd to the project root folder in the command line and execute dbt build. You're now ready to do clinical data analytics! Check out the data mart in our docs to learn what tables you should query.