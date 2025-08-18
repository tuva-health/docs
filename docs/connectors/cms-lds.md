---
id: cms-lds
title: "CMS LDS"
hide_title: false
---

[Code on GitHub](https://github.com/tuva-health/medicare_lds_connector)

The CMS LDS Connector maps CMS's LDS data model to the Tuva [Input Layer](input-layer).  CMS provides robust documentation on LDS data [here](https://www.cms.gov/data-research/files-for-order/limited-data-set-lds-files).

The CMS LDS data is a limited dataset made available by CMS to researchers and organizations doing research.  Strictly speaking, it is not a de-identified dataset, but a limited dataset.  A limited dataset is a dataset that has been redacted, meaning patient identifiers have been removed, but the dataset has not gone through a full de-identification process, of which there are two (i.e. Safe Harbor and Expert Determination), as outlined in HIPAA.  

The LDS dataset maybe purchased by organizations (e.g. companies) and used for commercial purposes, so long as the organization complies with all aspects of the data use agreement and the primary purpose for acquiring and using the dataset is to further generalizable knowledge (e.g. via research publication).

The LDS dataset is a claims dataset.

## Instructions

**Step 1: Clone or Fork this Repository**
Unlike the Tuva Project, this repo is a dbt project, not a dbt package. Clone or fork this repository to your local machine.

**Step 2: Import the Tuva Project**
Next you need to import the Tuva Project dbt package into the connector dbt project.  For example, using dbt CLI you would cd into the directly where you cloned this project to and run dbt deps to import the latest version of the Tuva Project.

**Step 3: Configure Input Database and Schema**
Next you need to tell dbt where your CMS LDS source data is located. Do this using the variables input_database and input_schema in the dbt_project.yml file. You also need to configure your profile in the dbt_project.yml.

**Step 4: Run**
Now you're ready to run the connector and the Tuva Project. For example, using dbt CLI you would cd to the project root folder in the command line and execute dbt build. Next you're now ready to do claims data analytics! Check out the data marts in our docs to learn what tables you should query.
