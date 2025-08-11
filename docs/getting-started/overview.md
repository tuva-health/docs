---
id: overview
title: "Overview"
hide_title: true
description: Instructions for getting started with the Tuva Project.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🏁 Getting Started

This video provides a short intro to Tuva to get you up and running.

<iframe width="760" height="440" src="https://www.youtube.com/embed/XGCWrrsXnKk?si=KEW295zK7EG-F2Ww" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true"></iframe>

The slides below describe our standard approach to setting up multiple data sources on Tuva.

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTXPpfaH0z89ses1ItouCa-pwZ643J8Sa5PTc5FoVPYIAIFZgkN4qI7E8rVhdwxscxeRTVUCG-kGisC/embed?start=false&loop=false&delayms=3000" frameborder="0" width="760" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

The video below includes a more thorough overview of how to setup your claims data using Tuva.

<iframe width="760" height="440" src="https://www.youtube.com/embed/FWxbrt7Fgiw?si=dyo4uD_MTW4dmAGk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>

 ### 1. Pre-requisites

 You need to start with claims data in a data warehouse and have dbt installed.  dbt is easy to install using any package manager like pip or homebrew.  You also need to connect dbt to your data warehouse.  You do this by configuring your ```profile.yml``` file.  dbt has instructions for how to do this which you can find on their docs site.

Ensure you're working with a data warehouse that Tuva supports.  We officially and unofficially support several data warehouses and you can find the latest up to date info on our data warehouse support page


 ### 2. dbt Setup

 The very first step is to setup a new dbt project.  Once dbt is installed you can do this by executing ```dbt init <project_name>``` where you replace ```<project_name>``` with the name of your project.

 Next you need to configure your ```dbt_project.yml``` file in the newly created dbt project.  This includes 3 steps:

 - Setting your profile
 - Setting Tuva-specific variables
 - Setting the database and schema where dbt should write data to

 See the video above for details on how to do this.

 In your dbt_project.yml, if you have only claims data you need to set `claims_enabled = true` and if you have clinical data you need to set `clinical_enabled = true`.  By default these variables are set to false.

 Next you'll need to add a "generate schema" macro to your macros folder in the dbt project.  This is optional, but if you don't do this your schema names will all be prefixed with your default schema e.g. "public_" which is typically annoying.  dbt has documentation on how to do this or see our video above.

 Finally you'll need to import Tuva by creating a ```packages.yml``` file and adding the following code:

 ```yml
packages:
  - package: tuva-health/the_tuva_project
    version: [">=0.7.0","<0.8.0"]
  - package: dbt-labs/dbt_utils
    version: [ ">=0.9.2" ]
 ```

Then execute ```dbt deps``` from the command line to import Tuva.

### 3. Map Your Data

The next step is mapping your data to the [Tuva Input Layer](../connectors/input-layer).  Every claims and clinical dataset comes in its own schema (i.e. set of tables and columns).  Before you can use Tuva you need to convert your schema to the Tuva Input Layer.  Do this by creating models (i.e. SQL files) in your dbt project to transform your data into the Input Layer format.  The [Claims Mapping Guide](/docs/connectors/claims-mapping-guide.md) provides rules of thumb for how to do this, with a focus on the most common use-case, medical claims. 

### 4. dbt Build

Next, run ```dbt build``` from the command line to build the entire project.  This will create hundreds of data tables in your data warehouse.  Your source data will be transformed into the [Core Data Model](../core-data-model/overview), all [Data Marts](../data-marts/overview) will be built, and all [Terminology](../terminology/overview) and [Value Sets](../value-sets/overview) will be loaded into your data warehouse.  This is pretty cool to see with a single command!

### 5. Data Quality Audit

Next you need to run [Data Quality](../data-quality) to audit whether you mapped the data correctly.  Data Quality is our systematic approach for validating that we've mapped the source data correctly, identifying atomic-level data quality problems, and understanding the impact of those problems on analytics.

### 6. Explore Data and Docs

At this point you have now transformed you data into the Tuva data model and are ready to do data analysis.  

dbt also comes with awesome documentation built-in.  You can run ```dbt docs generate``` to generate the docs and then ```dbt docs serve``` to serve up the docs to your localhost.  A web browser will open when you do this and you can explore the docs.






