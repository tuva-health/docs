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

- claim_type indicates whether the claim was a "professional" claim or "institutional" claim. Allowed values for this fied are: "professional", "institutional", "undetermined".
- Professional claims are from CMS-1500 claim forms and typically used to bill for physician services, durable medical equipment, and some drugs.  In theory, claims with place of service code populated should be considered professional claims, since this field is only present on CMS-1500 claim forms.  However some payers create their own place of service for institutional claims, so we sometimes see place of service populated on institutional claims.
- Institutional claims are from UB-04 claim forms and are used to be facility services.  You can identify institutional claims with bill type code and revenue center codes, since only institutional claims have these fields.
- We label a claim as "institutional" if it has any of these 7 fields populated: bill_type_code, ms_drg_code, apr_drg_code, admit_type_code, admit_source_code, discharge_disposition_code, revenue_center_code. We label a claim as "professional" if none of the previous 7 fields are populated and it has at least one populated place_of_service_code. If neither of these two things is the case, we label the claim as "undetermined".
- claim_type must be populated for every record.
- Each claim_id should have one and only one claim_type.
- Downstream concepts like service categories are derived in part via claim_type.

</details>

<details>
  <summary>Administrative Fields</summary>

- bill_type_code is a header-level field on institutional claims and should therefore have the same value for every line on a claim. Standard values for bill_type_code are 3 characters long, but sometimes raw data sources have 4 character values because they include a leading zero. In mapping to the input layer we remove the leading zero when the 4 character codes are present in the raw data.
- admit_type_code and admit_source_code are one character standard codes. They are header-level fields on institutional claims, therefore every line on a given claim should have the same value of admit_type_code and admit_source_code.
- discharge_disposition_code is a header-level field on institutional claims, therefore every line on a given claim should have the same value of discharge_disposition_code. These should be 2 character standard codes.
- ms_drg_code and apr_drg_code are header-level fields on institutional claims and should therefore have the same value for every line on a claim. Only one of ms_drg_code or apr_drg_code should be populated for any given claim. Note that these fields are only populated on a subset of all institutional claims, so it will be null for the majority of claims. 


</details>

<details>
  <summary>Financial Fields</summary>


</details>

<details>
  <summary>Date Fields</summary>

- claim_start_date and claim_end_date indicate the dates of service represented by the claim. They are header-level fields on all claims and should therefore have the same value for every line on a claim. They should be populated on both institutional and professional claims.
- admission_date and discharge_date represent the dates a patient is admitted and discharged from a facility. They are header-level fields on institutional claims and should therefore have the same value for every line on an institutional claim.
- claim_line_start_date and claim_line_end_date are line-level fields that indicate the dates of service representing each line on a claim. These dates may be different on different lines on a claim and should be populated for all lines on both institutional and professional claims when available.

</details>

<details>
  <summary>Diagnosis and Procedure Fields</summary>

- These are header-level fields on both institutional and professional claims and should therefore have the same value for every line on a claim. They should be populated for both institutional and professional claims when available.


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


