---
id: mapping
title: "3. Mapping"
---

To map a data source to the Tuva [Input Layer](../../connectors/input-layer) you will create dbt models (i.e. SQL files within your dbt project).  These models will transform your data source format into the Tuva Input Layer format.  

If your data source doesn't have every field in the Input Layer, that's okay.  Just map the fields that you have.  To see which fields are required for a given data mart check out the docs for that data mart in [this section](../../data-marts/overview).

Below we provide a **Mapping Checklist** of things that are important to get right in mapping.

## Claims Input Layer

### Medical Claim

<details>
  <summary>Primary Key</summary>

- The primary key for the medical_claim table is claim_id, claim_line_number and data_source. 
- A single record in the medical_claim table is intended to represent a single claim line from a medical claim from a specific data source.
- claim_id should be an alphanumeric value that represents a claim.  A claim can have multiple claim lines, so the same claim_id can appear on multiple records.
- claim_line_number is an integer that corresponds to the number of lines a claim has.  For example, a claim with 3 lines with have claim line numbers 1, 2, and 3 and have 3 total records in the medical_claim table.
- data_source is intended to represent the name of the data source e.g. "Medicare CCLF".
- If the primary key is not properly created downstream joins may "blow up" resulting in an explosion of duplicate records in downstream data marts.

</details>

<details>
  <summary>Claim Type</summary>

- claim_type indicates whether the claim was a "professional" claim or "institutional" claim.
- Professional claims are from CMS-1500 claim forms and typically used to bill for physician services, durable medical equipment, and some drugs.  Claims with place of service code populated should be considered professional claims, since this field is only present on CMS-1500 claim forms.  However some payers create their own place of service for institutional claims.
- Institutional claims are from UB-04 claim forms and are used to be facility services.  You can identify institutional claims with bill type code and revenue center codes, since only institutional claims have these fields.
- claim_type must be populated for every record.
- Each claim_id should have one and only one claim_type.
- Downstream concepts like service categories are derived in part via claim_type.

</details>

<details>
  <summary>Administrative Fields</summary>


</details>

<details>
  <summary>Financial Fields</summary>


</details>

<details>
  <summary>Date Fields</summary>


</details>

<details>
  <summary>Diagnosis and Procedure Fields</summary>


</details>

<details>
  <summary>Provider NPI Fields</summary>


</details>

<details>
  <summary>Payer Fields</summary>


</details>

<details>
  <summary>Claims Without Enrollment</summary>

If there are claims in the dataset without corresponding eligibility (i.e. the patient the claim is for does not have any enrollment information) then those claims should stay in the dataset and not be filtered out.  These claims are often excluded from financial analysis.  In fact, the [Financial PMPM](../../data-marts/financial-pmpm) inner joins `medical_claim` and `eligibility`.  However, this is not the only use of claims data, so we do not filter out these claims by default.

</details>

<details>
  <summary>Adjustments, Denials, and Reversals</summary>

</details>

### Phmarcy Claims

<details>
  <summary>Primary Key</summary>

- The primary key for the pharmacy_claim table is claim_id, claim_line_number and data_source.  
- claim_id should be an alphanumeric value that represents a claim.  A claim can have multiple claim lines, so the same claim_id can appear on multiple records.
- claim_line_number is an integer that corresponds to the number of lines a claim has.  For example, a claim with 3 lines with have claim line numbers 1, 2, and 3 and have 3 total records in the medical_claim table.
- data_source is intended to represent the name of the data source e.g. "Medicare CCLF".

</details>

### Eligibility

<details>
  <summary>Primary Key</summary>

- The primary key for the pharmacy_claim table is patient_id, enrollment_start_date, enrollment_end_date, and data_source.  
- There are two commonly used data formats for eligibility (also known as enrollment) data: the eligibility span format and the member month format.
- The eligibility span format has one record per member eligibility span.  An eligibility span is a time period when a member was enrolled with and therefore had insurance coverage by a health plan.  An eligibility span has a start date and an end date.  A person can have multiple eligibility spans.
- The member month format has one record per member per month of enrollment.  For example, a person with a single eligibility span from 1/1/2020 through 3/31/2020 would have a single eligibility span record, but 3 member month records, one for each month.
- The eligibility table follows the eligibility span format.

</details>

## Clinical Input Layer


