---
id: cms-cclf
title: "CMS CCLF"
hide_title: false
---

## Overview

[Code](https://github.com/tuva-health/medicare_cclf_connector)

The CMS CCLF (a.k.a. Medicare CCLF) Connector maps CMS's CCLF data model to the Tuva [Input Layer](input-layer).  CMS provides robust documentation on CCLF data [here](https://www.cms.gov/files/document/cclf-information-packet.pdf).

CCLF data are claims data files that are made available to organnizations that participate in value-based payment programs e.g. the Medicare Shared Savings Program.

## Instructions

**Step 1: Clone or Fork this Repository**
Unlike the Tuva Project, the CMS CCLF Connector is a dbt project, not a dbt package. Use the link above to clone or fork this repository to your local machine.

**Step 2: Import the Tuva Project**
Next you need to import the Tuva Project dbt package into the CMS CCLF Connector dbt project. For example, using dbt CLI you would cd into the directly where you cloned this project to and run dbt deps to import the latest version of the Tuva Project.

**Step 3: Data Preparation**
The CCLF file specification does not have a field that can be mapped directly to enrollment_start_date.  This field is critical for analytics.  Therefore we've divised an alternate way to create this field from the date of the files, which is contained in the file name.  We have added a field called bene_member_month to the CMS CCLF data model.  We recommend parsing the monthly enrollment file date from the Beneficiary Demographics filename (e.g., P.A****.ACO.ZC8Y**.Dyymmdd.Thhmmsst) and mapping this date to bene_member_month. The connector will handle the rest of the mapping from there.

**Step 4: Configure Input Database and Schema**
Next you need to tell dbt where your CMS CCLF source data is located. Do this using the variables input_database and input_schema in the dbt_project.yml file. You also need to configure your profile in the dbt_project.yml.  Check dbt docs if you're new to dbt and unsure how to do this.

**Step 5: Run**
Now you're ready to run the connector and the Tuva Project. For example, using dbt CLI you would cd to the project root folder in the command line and execute dbt build. Next you're now ready to do claims data analytics!