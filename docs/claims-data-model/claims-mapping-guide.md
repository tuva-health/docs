---
id: claims-mapping-guide
title: "Claims Mapping Guide"
---

Once you have acquired and ingested raw claims data into your data warehouse, the next step is mapping it to a common data model.  **Adopting a common data model is important for a couple reasons:**

1. **Source of Truth:** Mapping all your claims data sources to a common data model creates a single source of truth which helps your team know which data they should query and build upon.
2. **Scale:** A common data model helps scale your data platform by enabling you to develop logic (e.g. for measures, cohorts, data quality tests, etc.) against a single schema, rather than re-writing the logic for each individual data source schema separately.

The Tuva Project includes a common data model we call Claims Data Model (or CDM for short).  Once your claims data is mapped to the Tuva Claims Data Model, you can easily run the entire Tuva Project with a single command.

## Overview
In this section we discuss how to map your raw claims data sources to the Tuva Claims Data Model.  Mapping raw claims data to any common data model can be tricky because claims data comes in many different formats.  For example, if you were to compare a claims dataset from United Healthcare to a claims dataset from Blue Cross Blue Shield, it’s likely to be very different (i.e. different tables and columns).  It’s even common for a single payer to use multiple data models and for these models to change over time.

The good news is that every claims dataset essentially contains the same types of data elements (e.g. claim ID, member ID, admission date, primary diagnosis, etc.).  The trick in adopting a common data model for claims is finding an efficient and systematic (i.e. repeatable) way to map the source data to the target data model.  Below we describe a process that you can follow to map your raw claims data to the Tuva Claims Data Model.

## Claims Mapping Process
You can find the data dictionary for the Tuva Claims Data Model [here](https://tuva-health.github.io/the_tuva_project/#!/overview/claims_data_model).

### 1. Inventory Source Data
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
- Separate tables for claim header and line information
- Separate tables for institutional and professional claims

It should be fairly obvious what format your claims data is in by inspecting the data dictionary.  For example the Medicare CCLF claims data is organized into the following tables:

![Medicare CCLF Files](/img/medicare_cclf_files.jpg)

The Medicare CCLF data model is a weird example, in that it combines all three of the types mentioned above.  It’s clear from the screenshot of CMS’s data dictionary that the UB-04 (i.e. Part A) claims are split into separate header and line files, the header portion being stored in Table 1 and the line portion being split across Tables 2, 3 and 4.  Additionally, the CMS-1500 (i.e. Part B) claims are stored at the line level, but split across two tables (i.e. Table 5 and Table 6).

The Tuva Claims Data Model uses the claim line level format for medical claims.  If your claims data is already at the line level this will make mapping easier.  However, even if your data is separated by claim header and line, we provide guidance in the next section for how to map it.

**Pharmacy Claims**

Pharmacy claims data is generated from claims that are submitted by retail pharmacies (e.g. Walgreens) to payers for prescriptions dispensed to patients.  This data is generally straightforward to map, but you may not always receive pharmacy claims data from your data provider.

**Eligibility**

Eligibility data is generated by payers and includes information on when each patient was eligible to receive healthcare services that are covered by the payer.  Eligibility data is typically stored in a single table.  There are typically two formats used to transmit eligibility data: the enrollment span format and the member month format.  

The enrollment span format includes one record per member per enrollment span.  An enrollment span includes an enrollment start date and an enrollment end date.

The member month format includes one record per member per month of eligibility.  This format can be created by translating the start and end dates from the enrollment span format into a set of months for each member.  For example, if a patient had an enrollment spand with start data of 1/1/2022 and end date of 6/30/2022, this would result in 6 records for that patient in the member month format, one record for each month of eligibility.

### 2. Map Fields and Terminologies
The next step of the process involves the mapping of source data fields and terminologies to their equivalent in the Tuva Claims Data Model.  This work essentially requires writing SQL in your dbt project.

**Field Mapping**

The SQL snippet below shows an example of SQL written to transform a fictional data source into the Tuva Claims Data Model.  Here we are renaming columns and casting data types to match the names and data types in the Tuva Claims Data Model.
    
```sql
 select
    cast(claim_control_number as varchar) as claim_id
,   cast(umr_employee_id || patient_sequence_number as varchar) as patient_id
,   cast(umr_employee_id || patient_sequence_number as varchar) as member_id
,   date(beginning_date_of_service, 'yyyymmdd') as claim_start_date
,   date(ending_date_of_service, 'yyyymmdd') as claim_end_date
,   date(NULL) as claim_line_start_date
,   date(NULL) as claim_line_end_date
```

**Terminology Mapping**

Certain fields in the Tuva Claims Data Model are expected to have normalized terminology.  A field with normalized terminology is expected to have only certain values.  For example, gender is only allowed to have 3 values: male, female, or unknown.  

You normalize terminology for a given field by inspecting the fields source values.  For example, the following code might be used to normalize the gender field:

```sql
  case
      when member_gender = 'M' then 'male'
      when member_gender = 'F' then 'female'
  end as gender
```

The Tuva Claims Data Model expects the following fields to be normalized:

**Medical Claim**

- [Bill Type Code](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__bill_type.csv) - 3 characters in length
- [Place of Service Code](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__place_of_service.csv) - 2 digits in length, including leading zero
- [Revenue Center Code](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__revenue_center.csv) - 4 digits in length, including leading zero
- [Discharge Disposition Code](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__discharge_disposition.csv) - 2 digits in length, including leading zero
- [Code Type](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__code_type.csv)
- [Admit Source](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__admit_source.csv)
- [Admit Type](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__admit_type.csv)
- [Claim Type](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__claim_type.csv)
- [ICD-10 CM](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__icd_10_cm.csv) - remove periods and spaces from diagnosis codes
- [Present on Admission](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__present_on_admission.csv)
- [MS-DRG](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__ms_drg.csv)

**Eligibility**

- [Ethnicity](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__ethnicity.csv)
- [Gender](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__gender.csv)
- [Payer Type](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__payer_type.csv)
- [Race](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__race.csv)
- [Medicare Dual Status](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_dual_eligibility.csv)
- [Medicare Status](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_status.csv)

### 3. Assign Claim Types
Claim type is a fundamentally important field in the Tuva Claims Data Model because many data quality checks and downstream transformations depend on it.  The purpose of this field is to identify a claim as either institutional or professional.  For example, the following query does this for a fictional dataset:

```sql
case
  when nullif(hospital_bill_type,'') is not null or nullif(revenue_code,'') is not null then 'institutional'
  when nullif(cms_place_of_service_code,'00') is not null then 'professional'
  else ''
end as claim_type 
```

The exact logic you need to write will depend on your data.  It's not uncommon for claims datasets to already contain a field that has these values mapped.  If your data doesn't already have claim type, it's usually relatively easy to define.

- **Institutional:** Look for bill_type_code, revenue_center_code, or ms_drg to be populated.  If any of these are populated the claim is likely institutional.
- **Professional:** Look for place_of_service_code to be populated.  If this is populated the claim is likely professional.

### 4. Resolving Duplicate Records
Both the medical_claim and pharmacy_claim tables should be unique at the claim_id and claim_line_number grain.  If duplicates exist, it’s usually for one of two reasons:

1. Payor file delivery nuances
2. Adjustment or reversal of claims

The first scenario is easy to resolve because the claims are true duplicates.  The claim lines have not changed but a step in the payor’s file delivery process is resending these lines.  Knowing this is valuable because it allows you to remove these duplicates with a simple `row_number()` or `distinct` SQL statement.

The second scenario is more complicated.  To explain adjustments and reversals, we’ll walk through an example scenario.  An adjudicated claim is audited and found to have some error on it (wrong contract, wrong service code, wrong units, etc).  That claim is then reversed which invalidates the claim and creates negative lines (paid amount, service units, etc).  At this point, if you were to sum the payments across all lines of the claim you would get zero dollar amount.  After a reversal, the claim may be reprocessed with the correct information.  This creates an adjustment claim where the payment may be more or less than the original.  Now if you sum the payments across all the lines you would expect a positive dollar amount.  An adjustment may not occur if the payor decides to deny the claim.

Now we’ll use this scenario to deduplicate the claims data.  First, find a way to tag duplicate lines with original, reversal, and adjustment.  You may get lucky and have columns from the payor to help you like adjustment code, reversal code, or claim status.  If not, you’ll have to use the data itself to determine which lines are the original, reversal, and/or adjustment.

![Claim Adjustment Example](/img/claim_adjustment_example.jpg)

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