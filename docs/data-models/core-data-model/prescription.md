---
sidebar_position: 6
---

# Prescription

## Description
This table contains information on prescriptions from claims data.

## Mapping Guidelines
This table is intended to store medication information from pharmacy claims data.

## Data Dictionary
| Column | Data Type | Terminology | Description |
| --- | :---: | :---: | --- |
| claim_id | varchar | no | Unique identifier for each claim. |
| claim_line | int | no | Indicates the line number for the particular line of the claim. |
| patient_id | varchar | no | Unique identifier for each patient in the dataset. |
| member_id | varchar | no | Identifier that links a patient to a particular insurance product or health plan.  A patient can have more than one member_id because they can have more than one insurance product/plan. |
| prescribing_provider_npi | varchar | no | NPI for the provider that wrote the prescription (e.g. priamry care physician). |
| dispensing_provider_npi | varchar | no | NPI for the provider that dispensed the prescription (e.g. pharmacy). |
| dispensing_date | date | no | Date the prescription was filled. |
| ndc_code | varchar | no | National drug code on the claim. |
| quantity | int | no | Number of doses. |
| days_supply | int | no | Number of days supply. |
| refills | int | no | Number of refills for the prescription. |
| paid_date | date | no | Date the claim was paid. |
| paid_amount | float | no | Amount paid by the health insurer for the claim. |
| allowed_amount | float | no | Contractual amount allowed to be paid by the payer + patient. |
| data_source | varchar | no | User-configured field that indicates the data source (e.g. typically named after the payer and state "BCBS Tennessee"). |