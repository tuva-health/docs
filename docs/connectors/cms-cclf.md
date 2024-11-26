---
id: cms-cclf
title: "CMS CCLF"
hide_title: false
---

## Overview

[Code](https://github.com/tuva-health/medicare_cclf_connector)

The Medicare CCLF Connector maps CMS's Claim and Claim Line Feed (CCLF) data model to the 
Tuva [Input Layer](input-layer). CCLF data are claims data files that are made available to organizations that participate in value-based payment programs (e.g., the Medicare Shared Savings 
Program).

## Methods

Working with CCLF data can be challenging. The data will be duplicated in many ways. You will receive regular files and run-out files, which often overlap. The other challenge is that member and claim identifiers may shift over time.

This connector deduplicates your data following guidance from the [CCLF Information Packet](https://www.cms.gov/files/document/cclf-information-packet.pdf) with additional logic created by Tuva to fill in gaps or to clarify instructions that are not always clear in the documentation.

### Step 1: Identify the most recent MBI

The first step is to identify the most recent Medicare Beneficiary Identifier (MBI) since this can change over time. The beneficiary XREF file (CCLF9) is used as a crosswalk between MBIs that are present on older claims and new MBIs that may have been issued after the claim was processed (*CCLF Information Packet, Section 5.1.1, Creation of the Most Recent MBI field (MR_MBI) for use in the Natural Key*). These files often contain conflicting information within the same file and across files. For this reason, we use a window function to partition and sort previous MBIs (prvs_num) to get the current MBI (crnt_num) and then ensure that we grab the most recent current MBI.

### Step 2: Group related claims

A single episode of care may include multiple claims: the original claim and any corresponding cancellation and adjustment claims. The next step is identifying natural keys for each claim type and then using those keys to group related claims (*CCLF Information Packet, Section 5.1.2, Natural Keys*).

Part A Institutional files:
  * CLM_BLG_PRVDR_OSCAR_NUM 
  * CLM_FROM_DT 
  * CLM_THRU_DT 
  * Most recent MBI

Part B Physician/DME files:
  * CLM_CNTL_NUM 
  * CLM_LINE_NUM (*not listed in CCLF docs, we include this to prevent line detail loss*)
  * Most recent MBI

Part D File:
  * CLM_LINE_FROM_DT
  * PRVDR_SRVC_ID_QLFYR_CD 
  * CLM_SRVC_PRVDR_GNRC_ID_NUM 
  * CLM_DSPNSNG_STUS_CD 
  * CLM_LINE_RX_SRVC_RFRNC_NUM 
  * CLM_LINE_RX_FILL_NUM

### Step 3: Sort related claims

Once the related claims are grouped, we use logic to sort them to get the latest ("final") version of that claim.  

Part A & Part B grouped claims are sorted by the latest CLM_EFCTV_DT and CUR_CLM_UNIQ_ID since CLM_ADJSMT_TYPE_CD has been found to not be used consistently to indicate the final version of an adjusted claim for these claim types. CMS often issues these adjusted claims with a CLM_ADJSMT_TYPE_CD of "0" (Original Claim).

Part D grouped claims are sorted by the CLM_ADJSMT_TYPE_CD code ("0" Original Claim, "1" Cancellation Claim, "2" Adjustment claim).

### Step 4: Reverse dollar amounts for canceled claims

Payment amounts on each record are not "signed" to indicate whether the payment amount is a payment to the provider or
a recovery from the provider. Therefore, it is necessary to use the CLM_ADJSMT_TYPE_CD to determine whether to "add" or "subtract" the payment amount from the running total.

Identify canceled claims using the CLM_ADJSMT_TYPE_CD ("1" Cancellation Claim) then multiply the claim payment amount by -1 to reverse the amount.

(*CCLF Information Packet, Section 5.3.1, Calculating Total Part A and B Expenditures*)

### Step 5: Sum dollar amounts and filter to final version of the claim

For Part A claims, we sum the adjusted header amounts and add the claim line details, then logic is applied to determine if the claim line paid amounts should be attached to the claim. Per the CCLF docs, "The revenue center payment amounts should only be relied on if they sum to the header level payment amount. If the revenue center level payment amounts do not sum to the header level payment amount, then the revenue center level payment amounts should be ignored." (*CCLF Information Packet, Section 3.5, Part A Header Expenditures vs Part A Revenue Center Expenditures*)

For Part B claims, we sum the adjusted line amounts.

For all claims, including Part D claims, final adjustment logic is applied by selecting the latest version of the claim. We also remove any remaining claims with a canceled status since the Tuva Project data marts are primarily focused on population health analytics.

(*CCLF Information Packet, Section 5.3.1, Calculating Total Part A and B Expenditures*)

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
