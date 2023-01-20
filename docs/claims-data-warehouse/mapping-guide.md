---
id: mapping-guide
title: "Claims Mapping Guide"
---
## Overview

Once your raw claims data has been loaded into your data warehouse, you will need to map it to a common data model and build data marts and analytics on top of it.  The Tuva Project provides these data models and data marts for you, but you will need to do the work to map your data to the Tuva Claims Data Model (we also offer a service to help organizations with this work).  

This guide will show you how to map your raw claims data sources to the Tuva Claims Data Model.  Once your claims data has been mapped to the Tuva Claims Data Model, the rest of the Tuva Project will run automatically.

**Adopting a common data model (like the Tuva Claims Data Model) is important for a couple reasons:**

1. It creates a single source of truth - everyone knows where to run analyses or build new data marts
2. It creates scale by enabling you to write logic (e.g. for measures, cohorts, data quality tests, etc.) against a single set of tables, rather than re-writing the logic for each data source separately.

However, adopting a common data model for claims can be tricky.  This is because claims data comes in many different formats.  If you were to compare a claims dataset from United to a claims data from Blue Cross Blue Shield, it’s likely to be very different.  It’s even common for a single payer to use multiple data models and for these models to change over time.

The good news is that every claims dataset essentially contains the same data elements (e.g. claim ID, member ID, admission date, primary diagnosis, etc.).  The trick in adopting a common data model for claims is finding an efficient and systematic (i.e. repeatable) way to map these data elements.

This guide describes a systematic process that you can follow and a set of tools you can use to map your raw claims data to the Tuva Claims Data Model.

## Claims Mapping Process

You can find the data dictionary for the Tuva Claims Data Model [here](https://tuva-health.github.io/the_tuva_project/#!/overview/claims_data_model).

### 1. Inventory Data

Healthcare claims data comes in a wide variety of formats.  Before you can start mapping your claims data to the Tuva Claims Data Model you need to have a good understanding of the particular format your source data comes in.  

**Goals**

- Determine whether you have all types of information (i.e. medical claims, pharmacy claims, and eligibility) or where you're missing data
- Determine whether your medical claims data is already at the line-level or split across multiple tables (e.g. with some tables storing header information and some storing line information)
- Determine whether your eligibility data uses member months or enrollment spans

Healthcare claims data typically includes 3 types of information.  These 3 types are:

- Medical Claims
- Pharmacy Claims
- Eligibility

**Medical Claims**

Medical claims data is generated from claims that are submitted by providers to payers for services and supplies they have delivered to patients.  Examples include a visit to your primary care doctor, physical therapy, lab tests, hospital visits, and even durable medical equipment.  All of these things result in a medical claim being billed to a payer.

Medical claims are billed on two types of claims forms: CMS-1500 and UB-04.  Providers (e.g. physicians) bill their services using the CMS-1500 claim form while facilities (e.g. hospitals) bill using the UB-04 claim form.  Both the CMS-1500 and UB-04 claim forms have a “header” section and a “line” section.  The header section stores information that should only be represented once on a single claim.  For example, each claim should only have one admission date.  The line portion of the claim stores information that can be repeated many times on a single claim.  For example, a physician can bill for many services on a single claim, each service having its own code.  Each service is said to have its own claim line.

Medical claims data can be stored in a wide variety of formats, but in general there are 3 types of formats:

- Single table at the claim line level
- Separate tables for header and line information
- Separate tables for institutional and professional claims

It should be fairly obvious what format your claims data is in by looking at the data dictionary.  For example the Medicare CCLF claims data is organized into the following tables:

![Medicare CCLF Files](/img/medicare_cclf_files.jpg)

The Medicare CCLF data model is a weird example, in that it combines all three of the standard claims data model types.  It’s clear from the screenshot of CMS’s data dictionary that the UB-04 (i.e. Part A) claims are split into separate header and line files, the header portion being stored in Table 1 and the line portion being split across Tables 2, 3 and 4.  Separately, the CMS-1500 (i.e. Part B) claims are stored at the line level, but split across two tables (i.e. Table 5 and Table 6).

The Tuva Claims Data Model uses the claim line level format for medical claims.  If your claims data is already at the line level this will make mapping easier.  However if your data is separated by header and line, we provide guidance in the next section for how to map it.

**Pharmacy Claims**

Pharmacy claims data is generated from claims that are submitted by retail pharmacies (e.g. Walgreens) to payers for prescriptions dispensed to patients.

**Eligibility**

Eligibility data is generated by payers and includes information on when each patient was eligible to receive healthcare services that are covered by the payer.  Eligibility data is typically stored in a single table.  There are typically two formats used to transmit eligibility data: the enrollment span format and the member month format.  

The enrollment span format includes one record per member per enrollment span.  An enrollment span includes an enrollment start date and an enrollment end date.

The member month format includes one record per member per month.  This formatted can be created by translating the start and end dates from the enrollment span format into a set of months for each member.

### 2. Mapping Fields

This stage of the process involves the mapping of source fields to their equivalent in the Claims Data Model.  Any transformations should be simple and only occur to get the data in the correct format.

**1. Source-to-target Field and Data Type Mappings**
    
    ```sql
    # An example
    , case
    	when source.gender_description = 'F' then 'female'
    	when source.gender_description = 'm' then 'male'
      end as gender
    , cast(source.dob as date) as birth_date
    ```
    
**2. Assigning Values to Claim Type and Data Source**
    
We need to define a value for claim_type because processing immediately downstream of the Claims Data Model (i.e. claims_preprocessing and data_profiling) depend on this field.  claim_type is often populated in claims datasets (although it may be named something different).  If claim_type is not already defined, you need to define it.  

claim_type is mapped to 1 of 4 values:  institutional, professional, dental, and vision
    
Using fields found only on a certain claim type can drive the mapping.  Does the claim have a bill type code and/or revenue center code?  These fields are only found on a UB-04 so the claim should be mapped to ‘institutional’.
        
data_source is a value to group data from the same claim sets together (e.g. bcbs, anthem_medicare, etc)

**3. Push through any columns that will help you adjust/reverse lines (e.g. adjustment code, claims, status, reversal code, etc)**

**4. Confirm the member identifier between tables match**

### 3. Resolving Duplicate Claim Lines

Medical claims should be unique at the claim ID and claim line number grain.  If duplicates claim lines exist, it’s usually for two reasons:

1. Payor file delivery problems
2. Adjustment or reversal of claims

The first scenario is easy to resolve because the claims are true duplicates.  The claim lines have not changed but a step in the payor’s file delivery process is resending these lines.  Knowing this is valuable because it allows you to remove these duplicates with a simple `row_number()` or `distinct` SQL statement.

The second scenario is more complicated.  To explain adjustments and reversals, we’ll walk through an example scenario.  An adjudicated claim is audited and found to have some error on it (wrong contract, wrong service code, wrong units, etc).  That claim is then reversed which invalidates the claim and creates negative lines (paid amount, service units, etc).  At this point, if you were to sum the payments across all lines of the claim you would get zero dollar amount.  After a reversal, the claim may be reprocessed with the correct information.  This creates an adjustment claim where the payment may be more or less than the original.  Now if you sum the payments across all the lines you would expect a positive dollar amount.  An adjustment may not occur if the payor decides to deny the claim.

Now we’ll use this scenario to deduplicate the claims data.  First, find a way to tag duplicate lines with original, reversal, and adjustment.  You may get lucky and have columns from the payor to help you like adjustment code, reversal code, or claim status.  If not, you’ll have to use the data itself to determine which lines are the original, reversal, and/or adjustment.

![Claim Adjustment Example](/img/claim_adjustment_example.jpg)

### 4. Mapping Terminologies

The Tuva Project provides terminology to enhance data sets.  The following fields need to be in the right format in order to utilize these tables.

**Medical claim**

- [Bill Type Code](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__bill_type.csv) - 3 characters in length
- [Place of Service Code](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__place_of_service.csv) - 2 digits in length, including leading zero
- [Revenue Center Code](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__revenue_center.csv) - 4 digits in length, including leading zero
- [Discharge Disposition Code](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__discharge_disposition.csv) - 2 digits in length, including leading zero
- [Code Type](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__code_type.csv) - the code
- [Admit Source](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__admit_source.csv)
- [Admit Type](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__admit_type.csv)
- [Claim Type](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__claim_type.csv)
- [ICD-10 CM](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) - remove periods from diagnosis codes
- [Present on Admission](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv)
- [MS-DRG](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__ms_drg.csv)

**Eligibility**

- [Ethnicity](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__ethnicity.csv)
- [Gender](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__gender.csv)
- [Payer Type](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__payer_type.csv)
- [Race](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__race.csv)
- [Medicare Dual Status](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_dual_eligibility.csv)
- [Medicare Status](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_status.csv)

### 5. Initial Validation

High-level validation can be run after mapping your claims data.  The count of unique claims and the total dollar amounts can be compared against the staging and final tables.

These queries don’t work for every claims data set.  If you have a lot of purely duplicate claims, these queries won’t validate since the dollar amount in the final medical claim table should be less than the dollar amount in the stage medical claim table.  But in that scenario, the query does help generate questions about your data which will result in more confidence in the mapping process as you dig into the results.

```sql
with medical_claim_raw_claim_count as(
    select count(distinct claim_id) as count from claims_data_model.medical_claim_stage
)

, medical_claim_final_claim_count as(
    select count(distinct claim_id) as count from claims_data_model.medical_claim
)

, medical_claim_raw_payment_sum as(
    select sum(paid_amount) as count from claims_data_model.medical_claim_stage
)

, medical_claim_final_payment_sum as(
    select sum(paid_amount) as count from claims_data_model.medical_claim
)

select *
, case
    when raw.count > final.count then 'Claims have been dropped'
    when raw.count < final.count then 'Claim have been added'
    when raw.count = final.count then 'All claims have been mapped!'
  end as validation_message
from medical_claim_raw_claim_count raw
cross join medical_claim_final_claim_count final

union all 

select *
, case
    when raw.count > final.count then 'Claim dollars have been dropped'
    when raw.count < final.count then 'Claim dollars been added'
    when raw.count = final.count then 'Claim payments are equal!'
  end as validation_message
from medical_claim_raw_payment_sum raw
cross join medical_claim_final_payment_sum final
```
