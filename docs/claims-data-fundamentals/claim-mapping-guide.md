---
id: claims-mapping-guide
title: "Claims Mapping Guide"
---

Mapping is the process of transforming data from the raw format into a data model that can be used for analytics.  In this section we describe a systematic process for mapping any raw claims dataset to the Tuva Input Layer.  

Mapping is broken up into two phases:

1. Initial Mapping
2. Final Mapping

Initial Mapping focuses on transforming the raw data format into the Tuva Input Layer format at the table and column level.  This includes things like:

- Renaming column names
- Renaming table names
- Casting data types
- Combining data from multiple tables
- Grain-level transformations

Final Mapping focuses on transformation of individual data values and correcting data quality problems.  This includes things like:

- Normalizing fields e.g. sex should always be ‘male’, ‘female’, or ‘other’
- Voting to eliminate duplicate values e.g. bill_type_code should be unique on each claim
- Removing invalid values e.g. invalid MS-DRG code

Significant data quality testing occurs between Initial and Final Mapping that identifies specific problems in the raw data.

In the rest of this section we describe the rules and heuristics used for mapping raw data to the Input Layer data model.  The rules and heuristics are listed in order of importance.

### **claim_id**

This is the most fundamental data element in the medical_claim table. Every row in the medical_claim table should have a claim_id value. If this value is not available there is no point in mapping that row into the medical_claim table.

### **claim_line_number**

Every row should have a claim_line_number that must be a positive integer. The pair (claim_id, claim_line_number) should be a primary key in the table. claim_line_number can be created manually when mapping if they are not available or are not sequential positive integers. That is, for a given claim_id, we must create claim_line_number values that are sequential positive integers (1,2,3,…). 

max(claim_line_number) must be equal to the number of claim lines for a given claim_id.

### **claim_type**

Each claim_id must have a unique claim_type which should be either ‘institutional’ or ‘professional’. The claim type must be the same for every claim line within a claim_id.

If claim_type is not present in the raw data we can use other fields to determine whether the claim is likely institutional or professional.

The following fields are only present on institutional claims:

- bill_type_code
- revenue_center_code
- DRG

place_of_service_code is only found on professional claims.

If both professional-only and institutional-only fields are present on a claim, then we can’t determine for certain whether the claim is actually professional or institutional, so we leave the claim_type blank.  These claims will then be ignored by downstream data marts (e.g. service category grouper).

### **patient_id** and **member_id**

patient_id is the unique identifier used to identify an individual person.

member_id is the identifier a specific health plan assigns to a patient.  A single patient_id can have multiple member_id values. 

If only one of these fields is present in the raw data, we map it to both patient_id and member_id in the input layer.

patient_id must be the same for all lines in a claim and it cannot be NULL in any lines. Same for member_id. 

### Claim Dates

**claim_start_date, claim_end_date, claim_line_start_date, claim_line_end_date**

Only map valid values (valid means they are in our calendar table in terminology, which spans dates 1900-01-01 through 2119-01-12) . Non-valid values are mapped to NULL. 

If it is clear that a date is used as a placeholder for null dates, map that date to NULL. For example, say the date 9999-12-31 is used everywhere in the dataset where claim_start_date or claim_end_date is null, then map that date value to NULL.

claim_start_date must be the same for every line on a given claim.  Same for claim_end_date.  This is true for both institutional and professional claims.  If claim_start_date and/or claim_end_date takes different values on different lines within a claim, we map min(claim_start_date) to claim_start_date and max(claim_end_date) to claim_end_date for every line on that claim.

claim_line_start_date and claim_line_end_date may have different values on different lines for both professional and institutional claims. 

If claim_start_date and claim_end_date are not provided in the raw data, but claim_line_start_date and claim_line_end_date are available, we map claim_line_start_date to claim_start_date and claim_line_end_date to claim_end_date for every claim line of all professional claims.

If after following the above rules, claim_start_date > claim_end_date or claim_line_start_date > claim_line_end_date on a given claim line, we do not do anything about that and map that data as it is.  This data flows through the the core data model.  However we do have data quality tests that check for this.

### **admission_date** & **discharge_date**

These should always be mapped to NULL for professional claims.

These should always be populated in institutional claims, and they must have the same value on each line within a claim. If there are different admission or discharge dates on different lines, we map min(admission_date) and max(discharge_date) to all lines within a claim.

### **admit_type_code, admit_source_code,** & **discharge_disposition_code**

Must be mapped to NULL always for professional claims.

Must be the same value for all lines in an institutional claim. If it’s not unique for a claim_id, we pick the most frequent valid value and map that value. If there is a tie for the most frequent valid value, we map to NULL.

Must be a valid value from terminology. If it is not a valid value, we map to NULL.

### **bill_type_code**

Must be mapped to NULL always for professional claims, even if a bill_type_code is present in the raw data.

Every institutional claim should have a bill_type_code.

Must be the same value for all lines in an institutional claim. If it’s not unique for a claim_id, we pick the most frequent valid value and map that value. If there is a tie for the most frequent valid value, we map to NULL.

Must be a valid value from terminology. If it is not a valid value, we map to NULL, with an exception. For bill_type_code, we often see values where the first 2 digits are valid but the third digit is unknown, for example, values that look like this: ‘11X’, ‘41X’, etc. In that case we do map the values as they are on the raw data. That is, if the bill_type_code in the raw data is a 3 digit number, and the first 2 digits match that of a valid bill_type_code from terminology, we do map the value as it is. The reason for this is that for analytics purposes, we often only need the first 2 digits of the bill_type_code. For example, if a claim has bill_type_code = ‘11X’ or ‘12X’ it is potentially an acute inpatient claim.

### **place_of_service_code**

Every professional claim should have a place_of_service_code.  Each line on a given claim can have a different value for place_of_service_code.

For institutional claims we always map to NULL even if a place_of_service_code is present in the raw data.

Only map valid values (valid means they are in our terminology). Non-valid values are mapped to NULL.

### **revenue_center_code**

Every institutional claim and claim line should have a revenue_center_code.

For professional claims we always map to NULL even if a revenue_center_code is present.

Only map valid values (valid means they are in our terminology). Non-valid values are mapped to NULL.

For a given claim, each line can have a different revenue_center_code.

### **ms_drg_code** or **apr_drg_code**

Only map to institutional claims. For professional claims we always map to NULL even if a DRG code is present.

Only map valid values (valid means they are in our terminology). Non-valid values are mapped to NULL.

Must be the same value for all lines in an institutional claim. If it’s not unique for a claim_id, we pick the most frequent valid value and map that value. If there is a tie for the most frequent valid value, we map to NULL.

If there is only one DRG code present in the raw data and we are not told if it is ms-drg or apr-drg, we must try our best to determine which it is before we map. Compare the DRG description from both MS-DRG and APR-DRG to the primary diagnosis description to see which one is related.