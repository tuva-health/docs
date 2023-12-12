---
id: pharmacy-claim
title: "Pharmacy Claim"
hide_title: false
description: This guide demonstrates
---

The pharmacy claim table contains the billing information submitted to the health insurer for medications dispensed to a member of the health plan.  The primary keys for this table are:

- `claim_id`
- `claim_line_number`
- `data_source`

### claim_id

Data type: string

`claim_id` is a unique identifier for a set of services and supplies rendered by a healthcare provider that have been billed to insurance.  It is the most fundamental data element in the `pharmacy_claim` table, and every row in the `pharmacy_claim` table should have a `claim_id`.  If the source data does not have claim IDs or is missing claim IDs for some rows in the data, then those rows should not be mapped to Tuva’s input layer.

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `claim_id` is populated for every row
- `claim_id` is unique across all data_sources
- `claim_id` is unique across all lines within a claim

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `claim_id` is populated for every row
- `claim_id` is unique across all data_sources
- `claim_id` is unique across all lines within a claim

### claim_line_number

`claim_line_number` is a unique identifier within a claim that distinguishes each distinct service, supply, or procedure rendered.  

#### **Mapping**

Every row should have a `claim_line_number`; it must be a positive sequential integer.  `claim_line_number` can be created manually if it’s unavailable in the source data or if it’s not sequential positive integers.  For example:

```sql
row_number() over (partition by claim_id order by claim_end_date) as claim_line_number
```

The max(`claim_line_number`) for a given `claim_id` must be equal to the number of claim lines for that `claim_id`.

When mapping to the input layer the following expectations must be met or else The Tuva Project will not run and produce errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `integer`
- `claim_line_number` is populated for every row
- `claim_line_number` is a positive
- `claim_line_number` is sequential (1,2,3,…)
- The maximum value of `claim_line_number` for is equal to the total number of lines in a claim

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `integer`
- `claim_line_number` is populated for every row
- `claim_line_number` is a positive
- `claim_line_number` is sequential (1,2,3,…)
- The maximum value of `claim_line_number` for is equal to the total number of lines in a claim

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Lines with missing claim_id | 0 | 0 |
| Lines with missing claim_line_number | 0 | 0 |
| Claims with more than one data_source | 0 | 0 |
| Claims with non-sequential claim_line_numbers | 0 | 0 |


### patient_id and member_id

`patient_id` is a unique identifier that is designed to unify a patient’s records and provide a consistent reference for the specific individual.  
It allows for the linking and tracking of a patient’s healthcare journey across different source data sets.

`member_id` is an identifier specific to the health insurer or health plan.  It is assigned by the insurance company to uniquely identify a specific individual only within their system.

#### **Mapping**

When mapping to the input layer, the source member identifiers should be examined to determine if a crosswalk needs to be created.  This 
crosswalk will aggregate different `member_id` to a single `patient_id`.  This is necessary whether working with a single data source or multiple data sources.

If using Tuva’s enterprise master patient index solution (EMPI) then a crosswalk is not necessary.

**Tables related to patient_id and member_id to build in the connector:**

If relevant, a crosswalk should be created in the connector.  The dbt model should be called `[datasource]__int_patient_crosswalk` and the primary key should be `data_source` and `member_id`.  It should look like this:


**🛑If this table was already created for medical_claim or eligibility, append addition identifiers to the existing table**

| data_source | member_id | patient_id |
| --- | --- | --- |
| aetna | 1234 | 1234 |
| aetna | 3245 | 1234 |
| aetna | 2353 | 5432 |



We should also report if any rows do not make it to the input layer because there is no `member_id` or it is not unique per claim.  We do this in a dbt model called `[datasource]__int_patient_accounting`that looks like this:

| Description | Number | Percent |
| --- | --- | --- |
| Claims in raw data | 1,340,235 | 100 |
| Claims with no member_id | 0 | 0 |
| Claims with non-unique member_id | 0 | 0 |
| Claims with unique member_id | 1,340,235 | 100 |

When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- `patient_id` and `member_id` are populated for every row in the input layer `medical_claim` table.
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- `patient_id` and `member_id` are populated for every row in the input layer `medical_claim` table.
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claim lines with no member_id | 0 | 0 |
| Claim lines with no patient_id | 0 | 0 |
| Claims with no member_id | 0 | 0 |
| Claims with no patient_id | 0 | 0 |
| Claims with non-unique member_id | 0 | 0 |
| Claims with non-unique patient_id | 0 | 0 |

### payer

`payer` contains the name of the health insurance payer of the claim (Aetna, Blue Cross Blue Shield, etc)

**Expectations in the input layer:**

- `payer` is populated for every row
- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- `payer` is populated for every row

### plan

`plan` contains the specific health insurance plan or sub-contract the member is enrolled in (e.g. Aetna Gold, Aetna Bronze 4, BCBS Chicago, etc).

If no plan information is available, the payer should be populated in this field.  

**Expectations in the input layer:**

- data type is `string`
- `plan` is populated for every row

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `plan` is populated for every row

### prescribing_provider_npi

`precribing_provider_npi` is populated with the national provider identifier (NPI) of the provider who prescribed the medication.

The National Plan & Provider Enumeration System ([NPPES](https://nppes.cms.hhs.gov/#/)) is used to create Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file.  (This file is blank in GitHub due to its size.  The data is stored in a public that is referenced in the [dbt_project.yml](https://github.com/tuva-health/the_tuva_project/blob/main/dbt_project.yml).)

**Expectations in the input layer:**

- data type is `string`
- `prescribing_provider_npi` is a value from Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized layer:**

- data type is `string`
- `prescribing_provider_npi` is a value from Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file

### dispensing_provider_npi

`dispensing_provider_npi` is populated with the national provider identifier (NPI) of the provider who dispensed the medication.  This NPI may represent the pharmacist or the pharmacy.

The National Plan & Provider Enumeration System ([NPPES](https://nppes.cms.hhs.gov/#/)) to used to create Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file.  (This file is blank in GitHub due to its size.  The data is stored in a public [S3 bucket](https://s3.console.aws.amazon.com/s3/buckets/tuva-public-resources?region=us-east-1&prefix=provider_data/&showversions=false).)

**Expectations in the input layer:**

- data type is `string`
- `dispensing_provider_npi` is a value from Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `dispensing_provider_npi` is a value from Tuva’s [provider](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__provider.csv) terminology file

### dispensing_date

`dispensing_date` is the date that the medication was given (i.e. filled).

**Expectations in the input layer:**

- data type is `date`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `date`

### ndc_code

`ndc_code` is the National Drug Code assigned to prescription and over-the-counter drugs.  NDC can be a 10 or 11 digits, which are broken out into 3 segments:

- Labeler (1-5) - The manufacturer or labeler of the drug
- Product (6-9) - The specific drug and it’s strength
- Package (10-11) - The package size and type

**Expectations in the input layer:**

- data type is `string`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`

### quantity

`quantity` is the number of units that have been dispensed to the patient.  For example, if a provider prescribes a medication to a patient that is supposed to be taken 2x/day for 30 days, then the quantity would be 60.

**Expectations in the input layer:**

- data type is `integer`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `integer`

### days_supply

`days_supply` is the number of days a prescribed medication is expected to last.

**Expectations in the input layer:**

- data type is `integer`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `integer`

### refills

`refills` is the number of times a member can reorder a prescription without having to contact the provider for a new prescription.

**Expectations in the input layer:**

- data type is `integer`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `integer`

### paid_date

`paid_date` is the date that the health insurer processed the claim for payment.  It should coincide with the date that the pharmacy received reimbursement from the health insurer.

**Expectations in the input layer:**

- data type is `date`

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `date`

### paid_amount

`paid_amount` is the dollar amount that the health insurer paid for the covered medication.

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### allowed_amount

`allowed_amount` is the maximum dollar amount a health insurer will reimburse for a covered medication.

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### coinsurance_amount

`coinsurance_amount` is the dollar amount a member has paid for a covered medication as part of cost-sharing with the health insurance provider.  After a deductible is met, covered services may still require a member to pay for a percentage of the cost (e.g. 80/20 - 80% paid by the health insurer and 20% paid by the member)

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### deductible_amount

`deductible_amount` is the dollar amount a member has paid for a covered medication before the health insurer will pay the cost for covered services.

**Expectations in the input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

### data_source

`data_source` is populated with the name of the entity providing the data.  It may come from the health insurer directly (e.g. Aetna, BCBS) or a third party (e.g. HealthVerity, Datavant).

#### Mapping
When mapping to the input layer, the following expectations must be met or else The Tuva Project will not run and produce 
errors.  Any row of data that does not meet the requirements must be omitted from the input layer.

**Expectations in the input layer:**

- data type is `string`
- `data_source` is populated for every row

**Transformations from the input layer to the normalized input layer:**

- No transformations occur in The Tuva Project.

**Expectations in the normalized input layer:**

- data type is `string`
- `data_source` is populated for every row

**Data quality checks table:**

This table is calculated against the normalized input layer:

| Description | Number | Percent |
| --- | --- | --- |
| Claim lines with no data_source | 0 | 0 |
| Claims with no data_source | 0 | 0 |