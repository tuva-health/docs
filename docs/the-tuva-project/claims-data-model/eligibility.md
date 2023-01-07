---
id: eligibility
title: "Eligibility"
---
## Description
The eligibility table includes information about a patient's health insurance coverage, demographics, and geography (note: we use the word patient as a synonym for member).  Every claims dataset should include some sort of eligibility data, otherwise it's impossible to calculate member months, which are needed to analyze spend and utilization on a per-member-per-month (PMPM) basis.

## Mapping Guidelines
Insurance eligibility information is usually formatted in 1 of 2 ways: 

- **Coverage Format:** Every patient has one record per eligibility span (i.e. eligibility start and end date).  The span can be for a single month or for multiple months.  The span an also be open-ended (i.e. there is no end date).
- **Member Months Format:** Every patient has one record for every month of eligibility.  For example, if a patient had 12 months of medical coverage they would have 12 records, one for each month of eligibility.

The eligibility table uses the coverage format because this format is more common in raw claims data.  If your eligibility data is already in this format then you can map it directly to eligibility, most likely with minimal transformation.  However if your data is in the member months format you will need to transform it into the coverage format as part of the mapping to the eligibility table.

**Unique Patient ID:** The patient_id field is assumed to be unique across patients.  Ensure this ID uniquely identifies an individual patient in the dataset.  A patient_id may have more than one member_id.  Often health insurers will assign the same patient more than one member_id (sometimes called a subscriber_id) for every insurance product that patient enrolls in.

**Demographic Fields:** Ensure these fields (e.g. gender) have been normalized to the appropriate terminologies.  For each field that has a "yes" for normalized terminology in the table below, you can click the link to see the exact terminology values.

## Data Dictionary
| Column | Data Type | Terminology | Description |
|---|:---:|:---:|---|
| patient_id | varchar | no | Unique identifier for each patient in the dataset. |
| member_id | varchar | no | Identifier that links a patient to a particular insurance product or health plan.  A patient can have more than one member_id because they can have more than one insurance product/plan. |
| gender | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__gender.csv) | Biological sex of the patient. |
| race | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__race.csv) | Race of the patient. |
| birth_date | date | no | Date the patient was born. |
| death_date | date | no | Date the patient died. |
| death_flag | int | yes ∈ {0,1} | Indicates whether the patient has died. |
| enrollment_start_date | date | no | Date the patient's insurance eligibility began. |
| enrollment_end_date | date | no | Date the patient's insurance eligibility ended. |
| payer | varchar | no | Name of the payer (i.e. health insurer) providing coverage. |
| payer_type | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__payer_type.csv) | Type of payer (e.g. commercial, medicare, medicaid, etc.). |
| dual_status_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_dual_eligibility.csv) | Indicates whether the patient is dually eligible for Medicare and Medicaid. |
| medicare_status_code | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_status.csv) | Indicates how the patient became eligible for Medicare. |
| first_name | varchar | no | Patient's first name. |
| last_name | varchar | no | Patient's last name. |
| address | varchar | no | Patient's street address. |
| city | varchar | no | Patient's city of address. |
| state | varchar | [yes](https://github.com/tuva-health/terminology/blob/main/terminology/terminology__medicare_state_fips.csv) | State the patient lives in (most recent known address) |
| zip_code | varchar | no | Zip code the patient lives in (most recent known address). |
| phone | varchar | no | Patient's phone number. |
| data_source | varchar | no | User-configured field that indicates the data source (e.g. typically named after the payer and state "BCBS Tennessee"). |


