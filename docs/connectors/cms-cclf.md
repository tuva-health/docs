---
id: cms-cclf
title: "CMS CCLF"
hide_title: false
---

## Overview

[Code](https://github.com/tuva-health/medicare_cclf_connector)

The CMS CCLF (a.k.a. Medicare CCLF) Connector maps CMS's CCLF data model to the 
Tuva [Input Layer](input-layer).  CMS provides robust documentation on CCLF data 
[here](https://www.cms.gov/files/document/cclf-information-packet.pdf).

CCLF data are claims data files that are made available to organnizations that 
participate in value-based payment programs e.g. the Medicare Shared Savings 
Program.

## Instructions

**Step 1: Clone or Fork this Repository**
Unlike the Tuva Project, the CMS CCLF Connector is a dbt project, not a dbt 
package. Use the link above to clone or fork this repository to your local 
machine.

**Step 2: Import the Tuva Project**
Next you need to import the Tuva Project dbt package into the CMS CCLF Connector 
dbt project. For example, using dbt CLI you would cd into the directly where you 
cloned this project to and run dbt deps to import the latest version of the Tuva 
Project.

**Step 3: Data Preparation**
#### Source data:
The source table names the connector is expecting can be found in the
`_sources.yml` config file. You can rename your source tables if needed or add an
alias to the config.

#### File Dates:
The field `file_date` is used throughout this connector to deduplicate data
received across regular and run-out CCLFs. We recommend parsing this date from
the filename (e.g., P.A****.ACO.ZC1Y**.Dyymmdd.Thhmmsst) and formatting it as
"YYYY-MM-DD".

#### Enrollment Dates:
The CCLF specification does not have a field that can be mapped directly
to `enrollment_start_date` and `enrollment_end_date`, and the Part A and Part B
entitlement dates (BENE_PART_A_ENRLMT_BGN_DT, BENE_PART_B_ENRLMT_BGN_DT) are
often incorrect or not useful for claims analytics.

We have included an additional source called `Enrollment` that can be
populated with enrollment dates relevant to your data. These enrollment
dates may come from an attribution file, beneficiary alignment report (BAR), or
any source you may have. You just need to create a source table with the
following columns:

  1. `current_bene_mbi_id`
  2. `enrollment_start_date`
  3. `enrollment_end_date`
  4. `bene_member_month`
     * The connector includes logic to handle enrollment spans or member months.
     * If enrollment spans are available, leave this field null.
     * If enrollment spans are not available, populate this field with member
       month dates in the format "YYYY-MM-DD" and set the variable
       `member_months_enrollment` to true in the `dbt_project.yml` file.

**Step 4: Configure Input Database and Schema**
Next you need to tell dbt where your CMS CCLF source data is located. Do this 
using the variables input_database and input_schema in the dbt_project.yml file. 
You also need to configure your profile in the dbt_project.yml.  Check dbt docs 
if you're new to dbt and unsure how to do this.

**Step 5: Run**
Now you're ready to run the connector and the Tuva Project. For example, using 
dbt CLI you would cd to the project root folder in the command line and execute 
dbt build. Next you're now ready to do claims data analytics!

## Sample Data

Use the links below to download CSVs of the synthetic sample data used to create 
this connector from our public resources bucket on AWS S3:

* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/parta_claims_header.csv">Part A Claims Header File (CCLF1)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/parta_claims_revenue_center_detail.csv">Part A Claims Revenue Center Detail File (CCLF2)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/parta_procedure_code.csv">Part A Procedure Code File (CCLF3)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/parta_diagnosis_code.csv">Part A Diagnosis Code File (CCLF4)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/partb_physicians.csv">Part B Physicians File (CCLF5)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/partb_dme.csv">Part B DME File (CCLF6)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/partd_claims.csv">Part D File (CCLF7)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/beneficiary_demographics.csv">Beneficiary Demographics File (CCLF8)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/beneficiary_xref.csv">Beneficiary XREF File (CCLF9)</a>
* <a href="https://tuva-public-resources.s3.amazonaws.com/cclf_synthetic_data/enrollment.csv">Enrollment File (custom)</a>
