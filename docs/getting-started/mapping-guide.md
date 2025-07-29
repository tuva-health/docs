---
id: mapping-guide
title: "Claims Mapping Guide"
---

To run the Tuva Project on a new data source you need to map that data to
the Tuva [input layer](../../connectors/input-layer). Once this is done,
the Tuva Project (which is a dbt package) will be able to call the
input layer tables using ref statements and build the Tuva data model
on your data.

Mapping a data source
to the Tuva input layer means creating dbt models in your dbt project
for each of the input layer tables. That means that if you have a claims
data source you will create dbt models for each of the 3
[claims input](../../connectors/input-layer#claims-input)
tables, and if you have a clinical data source you
will create dbt models for each of the 9
[clinical input](../../connectors/input-layer#clinical-input)
tables.

In practice, this is typically done in a dbt project where you have:
- Raw data tables as sources (left side of the DAG).
- However many necessary intermediate transformation tables as dbt models (middle of the DAG).
- The Tuva input layer tables as dbt models (right side of the DAG). Keep in mind that these
models will be called by ref statements in the Tuva Project, so in your dbt project
you must name them with the
correct corresponding Tuva input layer
table names (i.e., the names the input layer tables
have [here](../../connectors/input-layer)).

To help you get started mapping, we have created a [connector template](https://github.com/tuva-health/connector_template).

If you're building a claims connector, we have written a [guide](https://thetuvaproject.com/knowledge/claims-data/adjustments-denials-reversals) on Adjustments, Denials, and Reversals that may be helpful to you during the mapping process.

If your data source doesn't have every field in the input layer, that's okay.
Just map the fields that you have and leave the other fields empty (you still need
to create all the claims input tables for claims data sources and all
the clinical input tables for clinical data sources, and those tables need to have
all their columns, even if some or all of the columns on a table are filled with null values).
To see which fields are required for a given data mart
check out the docs for that data mart in [this section](../../data-marts/overview).

Below we provide a **Mapping Checklist** of things that are important to get right in mapping.

## Claims Input Layer

### medical_claim

The `medical_claim` table contains all institutional and professional medical
claims. This table must be created as a dbt model named `medical_claim` in your dbt project.

**Primary Key:** The primary key for `medical_claim` is made up of
`claim_id`, `claim_line_number`, and `data_source`. Because the grain of
this table is the claim line, there may be multiple rows for each claim.

When unioning data from multiple data sources, the
`medical_claim` table could have collisions of `claim_id` values
coming from different data sources. The inclusion of `data_source` in
the primary key prevents these collisions, and allows for consolidation across
different sources of medical claims.


If there are claims in the dataset without corresponding eligibility
(i.e. the patient the claim is for does not have coverage during the
dates for the claim)
then those claims should stay in the dataset and not be
filtered out. These claims are often excluded from financial
analysis. In fact, the Financial PMPM mart inner joins `medical_claim` and
`eligibility` to filter out claims without
corresponding eligibility.
However, this is not the only use of claims data, so we
do not filter out these claims by default.

When mapping claims to the `medical_claim` input layer table, you must take into
account any logic (specific to your data source) to deal with
adjustments, denials, and reversals. The claims that must end up
in the input layer `medical_claim` table should be the final claims that remain
after adjustments, denials, and reversals have been taken into account.


Below is a list of all fields in the `medical_claim` table with things to keep in
mind when mapping data to each of those fields.

#### claim_id
This is a string that links each row in the table to the unique claim
to which it belongs.

Keep in mind that the `medical_claim` table is at the claim line grain, i.e.
each row in the table corresponds to a unique claim line. If a given claim
has N lines, there are N lines in the `medical_claim` table with the same
`claim_id` value (one for each line in the claim). The `claim_id` value
is required to be populated for every row in the `medical_claim` table.

Data Quality Intelligence (DQI) ensures that every row in the `medical_claim` table has
a populated claim_id.


#### claim_line_number
This is a positive integer that identifies the claim line that a given
row on the table represents.
The values of `claim_line_number` for a given
`claim_id` must be sequential positive integers starting at 1.
For example, if `claim_id` = 'ABC'
has 4 claim lines (i.e., 4 rows on the
`medical_claim` table), those 4 rows must have `claim_line_number` equal to
1, 2, 3, and 4, respectively. The `claim_line_number` field should
be populated for every row in the `medical_claim` table.

Claims data sources may contain claim line numbers that do not behave as expected.
For example, they might not start at 1, they may not be sequential (incremented by 1),
or claim line numbers may repeat when the lines seem to correspond to different line items.
In this case, or when a `claim_line_number` is not present in the source data, `claim_line_number`
can be created manually:

```sql
row_number() over (partition by claim_id order by claim_start_date) as claim_line_number
```

<!-- DQI checks that for all claims in the `medical_claim` table,
the values of `claim_line_number` for different lines are sequential positive
integers starting at 1. -->
DQI checks that the values of `claim_line_number` are different
for all lines within the same claim.


#### claim_type
This field is a string that describes the type of claim
and must have one of the following 3 values: 'institutional',
'professional', or 'undetermined'. This is a header-level field, so
its value must be the same
for all lines in a given claim. This field should be populated
for every row in the `medical_claim` table.
The logic to populate this field is as follows:
- A claim is said to be 'institutional' if it has any of these 6 fields populated: `bill_type_code`, `drg_code`, `admit_type_code`, `admit_source_code`, `discharge_disposition_code`, `revenue_center_code`. Note that we are only requiring that at least one of those fields is populated, not that it is populated with a valid value.
- A claim is said to be 'professional' if none of the 6 fields above (`bill_type_code`, `drg_code`, `admit_type_code`, `admit_source_code`, `discharge_disposition_code`, `revenue_center_code`) are populated AND it has at least one populated `place_of_service_code`. Note that we only require that at least one `place_of_service_code` is populated, not that it is populated with a valid value.
- If neither of the above two bullets is the case, the claim is said to be 'undetermined.'

Making the `claim_type` determination at the header level might happen in a CTE that looks like this:

```sql
with claim_types as (
  select
    claim_id
    , max(
        bill_type_code is not null
        or drg_code is not null
        or admit_type_code is not null
        or admit_source_code is not null
        or discharge_disposition_code is not null
        or revenue_center_code is not null
    ) as is_institutional
    , max(
        bill_type_code is null
        and drg_code is null
        and admit_type_code is null
        and admit_source_code is null
        and discharge_disposition_code is null
        and revenue_center_code is null
        and place_of_service_code is not null
    ) as is_professional
  from mapped_claims_data
  group by claim_id
)
```
Then, later, the claim type determination can be made in a `case` statement, like this:

```sql
...
, case when is_institutional then 'institutional'
       when is_professional and not is_institutional then 'professional'
       when not is_professional and not is_institutional then 'undetermined'
  end as claim_type
```

DQI checks that every row in the `medical_claim` table
has a populated `claim_type` from one of the accepted values
for this field ('institutional', 'professional', 'undetermined')
and that the value of this field is
consistent across all lines for a given `claim_id`.

#### person_id
A new patient identifier field named `person_id` has been added to the Tuva data model for both claims and clinical sources. This is a required field and cannot be null. If you bought the Tuva MPI Engine or have your own patient matching solution, this field should be populated with the UUID (Universally Unique Identifier). If you do not have a UUID, we recommend mapping the source patient identifier to this field (`member_id` for claims, `patient_id` for clinical).

#### member_id
This field is a string that links each row to a given member.
This field should be populated for every row in the `medical_claim` table.
It is a header-level field,
so its value must be the same for all lines in a given claim.

#### payer
`payer` contains the name of the health insurance payer for the claim
(Aetna, Blue Cross Blue Shield, etc). The source data may not contain this
field. In that case, the field can be set to a specific value:

```sql
select 'Payer Name' as payer
```

#### plan
This field is a string that links every row to
the the specific health insurance plan or sub-contract specific to a member's
enrollment (e.g. Aetna Gold, BCBS Chicago, etc).

`plan` values may not come in the source data. This field
should be hard-coded (e.g. `select 'aetna bronze 1' as plan`).

DQI ensures that every row in `medical_claim` has a populated
value in `plan` and the value for this field is consistent across all claim lines for
a given `claim_id`.

#### claim_start_date, claim_end_date
These fields are dates formatted in the form YYYY-MM-DD. They represent
the start and end dates for the claim.
They should be populated for every row in the `medical_claim` table.
They are header-level fields,
so their value must be the same for all lines in a given claim.

In source data, however, these values may not be the same across a given claim,
and `claim_start_date` and `claim_end_date` should be aggregated to the header level
in a CTE that may look something like this:

```sql
with header_dates as (
  select
    claim_id
    , min(claim_line_start_date) as claim_start_date
    , max(claim_line_end_date) as claim_end_date
  from mapped_data
  group by claim_id
)
```

DQI checks that the values of `claim_start_date`
and `claim_end_date` are consistent across all lines for a given `claim_id`.

#### claim_line_start_date, claim_line_end_date
These fields are dates formatted YYYY-MM-DD. They correspond to the
start and end dates for a given claim line, respectively. `claim_start_date`
and `claim_end_date` can be determined from these fields.

#### admission_date, discharge_date
These fields are dates formatted in the form YYYY-MM-DD. They represent
the dates a patient was first admitted (`admission_date`) or discharged (`discharge_date`) from the facility. These fields are only populated for institutional claims at the header level.
This means that their values must be the same for all lines in a given claim.

DQI checks that the value of each of these fields is
consistent across all lines for a given `claim_id`.

#### admit_source_code
This field is a single-character string that indicates a patient's location prior to admission, and exists only
in institutional claims. This is another header-level value, which means there should be only
1 distinct value over a single `claim_id`.

#### admit_type_code
This field is a string that indicates the priority of admission (e.g. Urgent, Emergent, Elective, etc.)
This is another header-level value, which means there should be only 1 distinct value over a single `claim_id`.

Along with `admit_source_code`, these codes are maintained by the National Uniform Billing Committee (NUBC).

#### discharge_disposition_code
This field is a two-character string that represents one of the
standard `discharge_disposition_code` values. This field should be populated for all
institutional claims and is a header-level field, so its value must be
the same for all rows in a given claim. Note that in source data
this column might be called discharge status or patient status.

DQI checks that the value of this field is a two-character string and
that it is consistent across all lines for a given `claim_id`.
In addition, DQI checks whether the value of this field is a
valid value from the `discharge_disposition_code` terminology set.

Note that `place_of_service_code` values may have leading zeroes. Often,
these leading zeroes are missing in the source data. This issue should
be corrected during the mapping process, and one way to handle this could be the following:

```sql
lpad(discharge_disposition_code, 2, '0') as discharge_disposition_code
```

#### place_of_service_code
This field is a two-character string that represents one of the
standard `place_of_service_code` values, which represent a specific
location where a medical service was provided. This field should be
populated for professional claims and is a line-level field,
so its value may be different for different lines in a given claim.

DQI checks that the value of this field is a two-character string,
but it does not check whether the value is valid (i.e. that this field matches one of the `place_of_service_code` values in terminology). If your raw data has invalid
values, DQI will identify them downstream of the input layer.

DQI raises a warning if a professional claim has null `place_of_service_code` values.
In the case that `place_of_service_code`s are null or not populated for some claim lines
in source data, these values may be backfilled with 99, which corresponds to
"Other Place of Service."

Note that `place_of_service_code` values may have leading zeroes. Often,
these leading zeroes are missing in the source data. This issue should
be corrected during the mapping process, and one way to handle this could be the following:

```sql
lpad(place_of_service_code, 2, '0') as place_of_service_code
```

#### bill_type_code
This field is a three- or four-character string that represents one of the
standard bill type code values. In the case that this code is three characters, we expect
two numbers followed by a letter. If it's four characters, we expect a leading 0. This field should be populated for all institutional claims and is a header-level field, so its value must be
the same for all rows in a given claim.

DQI ensures that this value matches the expected character pattern and that it is
consistent across all lines for a given `claim_id`.

#### drg_code
This field is a three-character string that can contain two different types of DRG (Diagnosis Related Groups) codes:
1. MS-DRGs are a classification system used by Medicare to categorize inpatient hospital stays
and group them based on a patient’s diagnosis, procedures performed, age, sex, and complications or comorbidities. MS-DRGs are necessary for Medicare reimbursement but often used by hospitals as a standard for all inpatient stays.
2. APR-DRGs stands for "all patient refined DRG". This code system was developed by 3M to extend DRGs to a more general patient population.

DQI expects these values to be three characters in length, and this is one of the fields that, when present,
may be used to determine `claim_type`.

#### drg_code_type
This is a string that specifies the DRG code system associated with a given `drg_code`. There are two
accepted values for this field: `ms-drg` and `apr-drg`.

There are downstream joins to terminology that depend on this field, and populating it correctly
when the information is available will lead to the best and most accurate analytics on your data,

#### revenue_center_code
This field is a four-character string that represents one of the
standard revenue center code values. These codes are used to account for
services and supplies rendered to patients in institutional care settings.
As such, this field should be populated for institutional claims and is a line-level field,
so its value may be different across lines in a given claim.

DQI checks that the value of this field is a four-character string.
DQI also ensures that `revenue_center_code` values match the expected character pattern.

The majority of `revenue_center_code` values have at least one leading zero. In files
coming directly from carriers, these leading zeroes may be stripped. It's possible to
handle stripped leading zeroes like this:

```sql
lpad(revenue_center_code, 4, '0') as revenue_center_code
```

#### service_unit_quantity
This is a numeric that corresponds to the number of units associated with a particular
`revenue_center_code`. In source data, this value can be negative. Appropriately applying
Adjustments, Denials, and Reversals (ADR) logic to medical claims should yield positive
values for this field.

#### hcpcs_code
This field is a string that represents procedures, services and supplies rendered by
providers to patients. These codes exist at the line level, and there can be many HCPCS
codes on a single claim.

There are thousands of HCPCS codes spread across two levels:
* Level 1 codes, also called CPT codes, are maintained by the American Medical Association (AMA). The
Tuva Project does not have terminology for Level 1 codes for licensing reasons.
* Level 2 codes, which are maintained by CMS. The Tuva Project has terminology for these codes.

DQI checks that `hcpcs_code` values are not null on professional claims and ensures
that mapped codes are HCPCS Level 2 codes.

When this is the case, strategies for handling these values can be use case-specific.
Organizations may opt to backfill null `hcpcs_code` values with `99499`, a code used to report unlisted Evaluation and Management services when there is no other code that sufficiently corresponds to the services provided.

The way HCPCS codes show up in claims data can vary: we've seen some carriers append a suffix to HCPCS codes,
which makes them more than 5 characters. Like many of the other fields in your raw data, HCPCS codes may
need some manipulation (e.g. stripping away a suffix) as you map them to the input layer.

#### hcpcs_modifier_1, ... hcpcs_modifier_5
This field is a string. HCPCS modifiers can provide more information about a particular `hcpcs_code` and the circumstances or details
relating to the service.

Some examples may include:
* LT: service was performed on left side of body
* RT: service was performed on right side of body
* 76: service was repeated by the same physician on the same day

There is terminology for modifiers in the Tuva Project in `hcpcs_level_2`.

#### rendering_npi
This field is a string that contains NPI (National Provider Identifier) values.
`rendering_npi` represents the practitioner who performed or rendered the specific service.
This value can be populated in either institutional or professional claims and can be different across
claim lines.

NPIs are composed of numbers and are ten characters in length. DQI ensures that this field
matches the expected length and character pattern.

Source data may only include a single NPI field without specifying whether the provided
identifier corresponds to a rendering, billing, or facility NPI.

In that case, look for the NPI in Tuva's provider terminology file to determine whether it
corresponds to a person or place.
* If it's a person, then the NPI should be mapped to `rendering_npi`.
* If it's a person and also a professional claim, then also map to `billing_npi`.
* If it's a location and the claim type is institutional, then map to `facility_npi`

That logic could look like this:
```sql
select
...
, case when p.entity_type_code = 1 then npi else null end as rendering_npi
, case when p.entity_type_code = 1 and claim_type = 'professional' then p.npi else null end as billing_npi
, case when p.entity_type_code = 2 and claim_type = 'institutional' then p.npi else null end as facility_npi
from source_data as sd
left join {{ ref('terminology__provider') }} as p
on p.npi = sd.npi
```

#### rendering_tin
This field is a string that contains TIN (Tax Identification Number) information for
the practitioner who performed or rendered the specific service and can be different across claim lines.

#### billing_npi
This field is a string that contains NPI (National Provider Identifier) values.
`billing_npi` typically represents the entity (organization or individual) responsible
for billing and receiving payment for healthcare services.

NPIs are composed of numbers and are ten characters in length. DQI ensures that this field
matches the expected length and character pattern.

Source data may only include a single NPI field without specifying whether the provided
identifier corresponds to a rendering, billing, or facility NPI.

In that case, look for the NPI in Tuva's provider terminology file to determine whether it
corresponds to a person or place.
* If it's a person, then the NPI should be mapped to `rendering_npi`.
* If it's a person and also a professional claim, then also map to `billing_npi`.
* If it's a location and the claim type is institutional, then map to `facility_npi`

That logic could look like this:
```sql
select
...
, case when p.entity_type_code = 1 then npi else null end as rendering_npi
, case when p.entity_type_code = 1 and claim_type = 'professional' then p.npi end as billing_npi
, case when p.entity_type_code = 2 and claim_type = 'institutional' then p.npi end as facility_npi
from source_data as sd
left join {{ ref('terminology__provider') }} as p
on p.npi = sd.npi
```

#### billing_tin
This field is a string that contains TIN (Tax Identification Number) information for
the healthcare facility or institution where the specific service was rendered.

#### facility_npi
This field is a string that contains NPI (National Provider Identifier) values.
`facility_npi` typically represents the location where specific services were delivered.

NPIs are composed of numbers and are ten characters in length. DQI ensures that this field
matches the expected length and character pattern.

Source data may only include a single NPI field without specifying whether the provided
identifier corresponds to a rendering, billing, or facility NPI.

In that case, look for the NPI in Tuva's provider terminology file to determine whether it
corresponds to a person or place.
* If it's a person, then the NPI should be mapped to `rendering_npi`.
* If it's a person and also a professional claim, then also map to `billing_npi`.
* If it's a location and the claim type is institutional, then map to `facility_npi`

That logic could look like this:
```sql
select
...
, case when p.entity_type_code = 1 then npi else null end as rendering_npi
, case when p.entity_type_code = 1 and claim_type = 'professional' then p.npi end as billing_npi
, case when p.entity_type_code = 2 and claim_type = 'institutional' then p.npi end as facility_npi
from source_data as sd
left join {{ ref('terminology__provider') }} as p
on p.npi = sd.npi
```

#### facility_tin
This field is a string that contains TIN (Tax Identification Number) information for
the entity (organization or individual) responsible for billing and receiving payment
for healthcare services.

#### paid_date
The date the payer paid the claim, formatted YYYY-MM-DD. This date could be any date after `claim_end_date` and often falls a couple of weeks after `claim_end_date`.

#### paid_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the dollar amount paid by the health insurer for the covered service.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### allowed_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the total amount allowed, including dollars paid by both the payer and the patient.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

The expectation is that the sum of `paid_amount`, `coinsurance_amount`, `copayment_amount`, and `deductible_amount` will be equivalent to `allowed_amount`.

#### charge_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the total amount charged for a service before any adjustments. This may also be called billed amount in source data.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### coinsurance_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the dollar amount a member has paid for a covered service as part of cost-sharing with the health
insurance provicer. After a deductible is met, covered services may still require members to cover a
percentage of the cost (e.g. 80/20 - 80% paid by the health insurer and 20% paid by the member).

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### copayment_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the total copayment charged on the claim by a provider.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### deductible_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the dollar amount a member has paid for a covered service before the health insurer will pay the cost for covered services.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### total_cost_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the total amount for a member’s cost of care.  Based on the source data set, it may equal the sum of the other payment fields or it may include [Medicare’s claim pass-through per diem amount](https://resdac.org/cms-data/variables/claim-pass-thru-diem-amount).

In other words, it is generally expected that `allowed_amount` = `total_cost_amount`, except in cases where
fields beyond `paid_amount`, `coinsurance_amount`, `copayment_amount`, and `deductible_amount` are relevant
to the total cost of care.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### diagnosis_code_type
This field is a string that describes the type of ICD diagnosis codes
used on this claim. It must have one of the following two values:
'icd-9-cm' or 'icd-10-cm'.

This is a header-level field, so its value must be the same
for all lines in a given claim. This field should be populated
for every row in the `medical_claim` table that has diagnosis codes.

Claims data sources may not contain information about the `diagnosis_code_type`.
On October 1, 2015, healthcare in the U.S. switched from ICD-9 to ICD-10.
If there is no information about `diagnosis_code_type` in the source data,
the switch-over date from ICD-9 to ICD-10 may be used:

```sql
case
	when claim_end_date < '2015-10-01'
		then 'icd-9-cm'
	else 'icd-10-cm'
  end as diagnosis_code_type
```

DQI checks that claims with at least one
populated diagnosis code have a populated `diagnosis_code_type`
from one of the accepted values ('icd-9-cm', 'icd-10-cm')
and that the value of this field is consistent across
all lines for the claim.

#### diagnosis_code_1, diagnosis_code_2, ... , diagnosis_code_25
These fields are strings with the standard ICD diagnosis
codes representing the diagnoses present on the claim. These values are header-level fields, so
they must be the same for all lines in a given claim.

Removing decimal points from diagnosis codes during the mapping process is
not explicitly required; The Tuva Project itself strips them downstream of the input
layer. That said, removing decimal points at the input layer may make it more straightforward
to join to terminology before running The Tuva Project.

Only the diagnosis codes available on any given claim will be populated.
For example, if a claim only has `diagnosis_code_1` and `diagnosis_code_2`
available, only those fields will be populated and the values of the other diagnosis
code fields will be left null.

DQI checks that the value of each diagnosis code field is consistent across all lines for a given `claim_id`. DQI has also checks making sure that diagnosis codes match expected patterns for ICD codes.

#### diagnosis_poa_1, diagnosis_poa_2, ... , diagnosis_poa_25
This field is a single-character string that denotes a patient's condition at the time of admission. There
may be up to 25 to describe each `diagnosis_code`. Generally, POA (Present On Admission) codes indicate whether a patient's condition was already present or active or whether it developed during their hospitalization. It is a header-level field, which means it is the same across all lines over a `claim_id`.

The number of `diagnosis_poa` fields available in source data will vary by source and data provider;
it is not uncommon for this field to be completely absent.

This field is normalized downstream of the input layer, but it is not heavily used in downstream analytics
in the Tuva Project.

#### procedure_code_type
This field is a string that describes the type of ICD procedure codes
used on this claim. It must have one of the following two values:
'icd-9-pcs' or 'icd-10-pcs'. This is a header-level field, so
its value must be the same for all lines in a given claim. This field should be populated
for every row in the `medical_claim` table that has ICD procedure codes.

Claims data sources may not contain information about the `procedure_code_type`.
On October 1, 2015, healthcare in the U.S. switched from ICD-9 to ICD-10.
If there is no information about `procedure_code_type` in the source data,
the switch-over date from ICD-9 to ICD-10 may be used:

```sql
case
	when claim_end_date < '2015-10-01'
		then 'icd-9-pcs'
	else 'icd-10-pcs'
  end as procedure_code_type
```

DQI checks that claims with at least one
populated procedure code have a populated `procedure_code_type`
from one of the accepted values ('icd-9-pcs', 'icd-10-pcs')
and that the value of this field is consistent across
all lines for the claim.

#### procedure_code_1, procedure_code_2, ... , procedure_code_25
These fields are strings with the standard ICD procedure
codes representing the procedures present on the claim.

Removing decimal points from ICD procedures codes during the mapping process is
not explicitly required; The Tuva Project itself strips them downstream of the input
layer. That said, removing decimal points at the input layer may make it more
straightforward to join to terminology before running The Tuva Project.

These are header-level fields, so
their values must be the same for all lines in a given claim.
Only the procedure codes available on any given claim will be populated.
For example, if a claim only has `procedure_code_1` and `procedure_code_2`
available, only those fields will be populated and the of the procedure
code fields will be left null.

DQI checks that the value of each procedure code field
is consistent across all lines for a given `claim_id`.
DQI does not check whether the value of this field is a
valid value from terminology. If your raw data has invalid
values, you will map them to the input layer and DQI will flag
invalid values downstream from the input layer.

#### procedure_date_1, procedure_date_2, ... , procedure_date_25
These dates represent the dates specific ICD procedures occurred, and there can be up to 25 (`procedure_date_1` corresponds to `procedure_code_1`, etc). These fields are header-level, and thus are consistent across claim lines over a `claim_id`.

#### in_network_flag
This field is an integer indicating whether a claim was in or out of network. It can take on
values of 0 (claim was out of network) or 1 (claim was in network).

Sources may not always contain network information; in these cases, `in_network_flag` may be mapped to `null`.

#### data_source
This field is a user-defined string that indicates the data source. This string is typically named after the payer and state, for example, "BCBS Tennessee". This field should be populated for every line in the `medical_claim` table and is a header-level field, so its value must be the same
for all lines in a given claim.

DQI checks every row in the `medical_claim` table
has a populated `data_source` and that the value of this field
is consistent across all lines for a given `claim_id`.

#### file_name
This field is a string that corresponds to the name of the specific file that a particular row came from.
Claims sources are different: some carriers may share one file, one time. Others may share a file on some
regular cadence.

We always suggest mapping the name of the file, if available, to `file_name`. This might be most important in cases where multiple files come from a carrier on a schedule, and the ability to tie specific rows to specific files is needed.

#### file_date
This field is a date, corresponding to the date associated with a particular claims file and typically representing the reporting period of the claims data.

Carriers may name files according to a specific pattern (e.g. "CarrierName_Medical_Claims_YYYYMMDD.csv").
In these cases, the `file_date` can be retrieved from the `file_name`. No matter how the information is represented, including it can be helpful, especially when tracking information across different claims files
over time is relevant to your use cases.

#### ingest_datetime
This field is a timestamp that corresponds to the date and time a source file landed in the data warehouse
or cloud storage. If this information is available or easy to track, we recommend mapping it to `ingest_datetime`. A field like this is particularly useful when there may be multiple versions of the
same claim line present across multiple files, but the most recent version of the claim line is the most relevant for your use case.

### pharmacy_claim

**Primary Key:** Composite primary key made up of
`claim_id`, `claim_line_number`, and `data_source`.

The `pharmacy_claim` table stores all pharmacy claims.
There is one row for each claim line, therefore multiple rows for
each claim. Each row (claim line) represents a specific medication
that was dispensed, so each row must have its own `ndc_code`.
This table must be created as a dbt model named `pharmacy_claim` in your dbt project.

If there are claims in the dataset without corresponding eligibility
(i.e. the patient the claim is for does not have coverage during the
dates for the claim) then those claims should stay in the dataset and not be
filtered out.

When mapping claims to the `pharmacy_claim` input layer table, you must take into
account any logic (specific to your data source) to deal with
Adjustments, Denials, and Reversals (ADR). The claims that must end up
in the input layer `pharmacy_claim` table should be the final claims that remain
after adjustments, denials, and reversals have been taken into account.

Below is a list of all fields in the `pharmacy_claim` table with things to keep in
mind when mapping data to each of those fields.

#### claim_id
This is a string that links each row in the table to the unique claim
to which it belongs.

Keep in mind that the `pharmacy_claim` table is at the claim line grain, i.e.
each row in the table corresponds to a unique claim line. If a given claim
has N lines, there are N lines in the `pharmacy_claim` table with the same
`claim_id` value (one for each line in the claim). The `claim_id` value
is required to be populated for every row in the `pharmacy_claim` table.

DQI checks that every row in the `pharmacy_claim` table has
a populated claim_id.


#### claim_line_number
This is a positive integer that identifies the claim line that a given
row on the table represents.
The values of `claim_line_number` for a given
`claim_id` must be sequential positive integers starting at 1.
For example, if `claim_id` = 'ABC'
has 4 claim lines (i.e., 4 rows on the
`pharmacy_claim` table), those 4 rows must have `claim_line_number` equal to
1, 2, 3, and 4, respectively. The `claim_line_number` field should
be populated for every row in the `pharmacy_claim` table.

DQI checks that the values of `claim_line_number` are different
for all lines within the same claim.

#### person_id
A new patient identifier field named `person_id` has been added to the Tuva data model for both claims and clinical sources. This is a required field and cannot be null. If you have access to Tuva EMPI or have your own patient matching solution, this field should be populated with the UUID (Universally Unique Identifier). If you do not have a UUID, we recommend mapping the source patient identifier to this field (`member_id` for claims, patient_id for `clincal`).

#### member_id
This field is a string that links each row to a given member.
This field should be populated for every row in the `pharmacy_claim` table.
It is a header-level field, so its value must be the same for all lines in a given claim.

#### payer


#### plan
This field is a string that links every row to
the the specific health insurance plan or sub-contract specific to a member's
enrollment (e.g. Aetna Gold, BCBS Chicago, etc).

`plan` values may not come in the source data. This field
should be hard-coded if not present.

#### prescribing_provider_npi
This field is a string that contains NPI (National Provider Identifier) values. precribing_provider_npi is populated with the NPI of the provider who prescribed the medication (e.g. primary care physician).

#### dispensing_provider_npi
This field is a string that contains NPI (National Provider Identifier) values. `dispensing_provider_npi` is populated with the NPI of the provider who dispensed the medication. This NPI may represent the pharmacist or the pharmacy.

#### dispensing_date
This field is a date that corresponds to the date a medication was given to the patient. This may
also be denoted as `fill_date` depending on the data source.

#### ndc_code
This field represents the National Drug Code (NDC) for the
actual drug being dispensed. Each line on a pharmacy claim represents
a drug that was dispensed, so each line must have an `ndc_code`.

NDC codes are written as a 10-digit number on drug packaging, but
an additional digit is usually added when billing an NDC on a healthcare claim,
making the NDC have 11 digits on pharmacy claims. If your raw data has 10-digit
NDC codes, you must add a '0' to the code to make it 11 digits when
mapping to the `pharmacy_claim` input layer table. The 11-digit number follows
a 5-4-2 format, i.e. 5 digits in the first segment,
4 digits in the second segment,
and 2 digits in the third segment.
The rules for which segment the additional digit is added to are as follows:

- 4-4-2 becomes 5-4-2
- 5-3-2 becomes 5-4-2
- 5-4-1 becomes 5-4-2

Essentially you add a leading zero to whichever segment needs it.
If your 10-digit codes are not separated into segments by dashes,
it is impossible to know where to add the extra '0' and so you cannot
accurately turn your code into an 11-digit code and can therefore you cannot
map it to the `pharmacy_claim` input layer table.

Whether your raw data has 11-digit NDC codes or 10-digit codes that you may successfully
convert to 11-digit codes, you must remove the dashes in the code when
mapping to the `pharmacy_claim` input layer table.
The `ndc_code` field should should always be populated with 11-character strings.

DOI checks that the `ndc_code` field is always populated.
DQI does not check whether the value of this field is a
valid value from terminology. If your raw data has invalid
values, you will map them to the input layer and Tuva's data quality
intelligence flag invalid values downstream from the input layer.


#### quantity
This field is a positive integer that represents the number of doses of the medication. Before the application of Adjustments, Denials, and Reversals (ADR), `quantity` may be represented as a negative value on some claim lines, but appropriately handing ADR should result in only positive integer values.

#### days_supply
This field is a positive integer that represents the number of days supply for the medication.
Before the application of Adjustments, Denials, and Reversals (ADR), `days_supply` may be represented as a negative value on some claim lines, but appropriately handing ADR should result in only positive integer values.

#### refills
This field is a positive integer that represents the number of refills for the prescription.
Before the application iof Adjustments, Denials, and Reversals (ADR), `refills` may be represented as negative values on some claim lines, but appropriately handing ADR should result in only positive integer values.

#### paid_date
This field is a date that corresponds to when the health insurer processed the claim for payment, and in the
context of pharmacy claims should coincide with the date the pharmacy received reimbursement from the health insurer.

#### paid_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the dollar amount paid by the health insurer for the covered medication.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### allowed_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the total amount allowed for a medication, including dollars paid by both the payer and the patient.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

The expectation is that the sum of `paid_amount`, `coinsurance_amount`, `copayment_amount`, and `deductible_amount` will be equivalent to `allowed_amount`.

#### charge_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the total amount charged for a medication before any adjustments. This may also be called billed amount in source data.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### coinsurance_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the dollar amount a member has paid for a covered service as part of cost-sharing with the health
insurance provicer. After a deductible is met, covered services may still require members to cover a
percentage of the cost (e.g. 80/20 - 80% paid by the health insurer and 20% paid by the member).

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### copayment_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the total copayment charged on the claim by a provider.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### deductible_amount
This field is numeric with two decimal points (e.g. `numeric(38,2)`) that corresponds to the dollar amount a member has paid for a covered medication before the health insurer will pay the cost for covered services.

In source data that has not yet applied Adjustments, Denials, and Reversals (ADR) logic, these
values may be negative. When mapping to the Tuva Project input layer, the expectation is that ADR
is handled before the input layer. Most often, this means that negative values are not present when
the mapping process is complete.

#### in_network_flag
This field is an integer indicating whether a claim was in or out of network. It can take on
values of 0 (claim was out of network) or 1 (claim was in network).

Sources may not always contain network information; in these cases, `in_network_flag` may be mapped to `null`.

#### data_source
This field is a user-defined string that indicates
the data source. This string is typically named after the payer
and state, for example, "BDBS Tennessee".
This field should be populated for every line in the `pharmacy_claim` table
and is a header-level field, so its value must be the same
for all lines in a given claim.

DQI checks every row in the `pharmacy_claim` table
has a populated `data_source` and that the value of this field
is consistent across all lines for a given `claim_id`.

#### data_source
This field is a user-defined string that indicates the data source. This string is typically named after the payer and state, for example, "BCBS Tennessee". This field should be populated for every line in the `pharmacy_claim` table and is a header-level field, so its value must be the same
for all lines in a given claim.

#### file_name
This field is a string that corresponds to the name of the specific file that a particular row came from.
Claims sources are different: some carriers may share one file, one time. Others may share a file on some
regular cadence.

We suggest mapping the name of the file, if available, to `file_name`. This might be most important in cases where multiple files come from a carrier on a schedule, and the ability to tie specific rows to specific files is needed.

#### file_date
This field is a date, corresponding to the date associated with a particular claims file and typically representing the reporting period of the claims data.

Carriers may name files according to a specific pattern (e.g. "CarrierName_Pharmacy_Claims_YYYYMMDD.csv").
In these cases, the `file_date` can be retrieved from the `file_name`. No matter how the information is represented, including it can be helpful, especially when tracking information across different claims files
over time is relevant to your use cases.

#### ingest_datetime
This field is a timestamp that corresponds to the date and time a source file landed in the data warehouse
or cloud storage. If this information is available or easy to track, we recommend mapping it to `ingest_datetime`. A field like this is particularly useful when there may be multiple versions of the
same claim line present across multiple files, but the most recent version of the claim line is the most relevant for your use case.

### eligibility

#### person_id
A new patient identifier field named `person_id` has been added to the Tuva data model for both claims and clinical sources. This is a required field and cannot be null. If you bought the Tuva MPI Engine or have your own patient matching solution, this field should be populated with the UUID (Universally Unique Identifier). If you do not have a UUID, we recommend mapping the source patient identifier to this field (`member_id` for claims, patient_id for `clincal`).

<details>
  <summary>Primary Key</summary>

- The primary key for the eligibility table is person_id, member_id, enrollment_start_date, enrollment_end_date, and data_source.
- There are two commonly used data formats for eligibility (also known as enrollment) data: the eligibility span format and the member month format.
- The eligibility span format has one record per member eligibility span.  An eligibility span is a time period when a member was enrolled with and therefore had insurance coverage by a health plan.  An eligibility span has a start date and an end date.  A person can have multiple eligibility spans.
- The member month format has one record per member per month of enrollment.  For example, a person with a single eligibility span from 1/1/2020 through 3/31/2020 would have a single eligibility span record, but 3 member month records, one for each month.
- The eligibility table follows the eligibility span format.

</details>

#### member_id
This field is a string; `member_id` is specific to a health insurer or health plan, and is assigned by
the insurance company to uniquely identify a specific individual within their system.

#### subscriber_id
This field is a string; `subscriber_id` is specific to a health insurer or health plan, and is assigned by
the insurance company to uniquely identify a specific individual within their system. This ID corresponds to the policyholder for the insurance plan, and can be 1:many with `person_id` or `member_id`.

#### gender
This field is a string that represents the biological sex of a member. It must take one of three accepted values according to the Tuva Project: `male`, `female`, and `unknown`.

#### race
This field is a string and corresponds to a member's race.

#### birth_date
This field is a date representing the birth date of a member.

#### death_date
This field is a date containing the day a member died. If the member is alive, this field is `null`.

#### death_flag
`death_flag` contains a flag indicating if a member has died; 1 for yes 0 for no.

`death_flag` should be 1 if a `death_date` is populated. `death_flag` can be 1 and `death_date` `null` if only an indicator is available in the source data.

#### enrollment_start_date, enrollment_end_date
These fields are dates representing when a member became enrolled in coverage and when their coverage lapsed.
The grain of the source table will affect how these fields are populated:
* There may be one row per member month: `enrollment_start_date` will be the beginning of the month and `enrollment_end_date` will be the end of the month.
* There may be one row per enrollment span: `enrollment_start_date` will be the first day of enrollment and
`enrollment_end_date` will be the last day of enrollment. There is some nuance in this case, because
carriers will often represent an `enrollment_end_date` that has not yet passed with a date that's very far in the future (e.g. `2100-01-01`) or a `null` value. After verifying with the data provider how they represent these values (when possible), future or `null` `enrollment_end_date` values should be mapped to the last day of the current month.

The mapping in the latter case could look something like this:
```sql
case when enrollment_end_date >= current_date() or enrollment_end_date is null then last_day(current_date)
     else enrollment_end_date
     end as enrollment_end_date
```

#### payer
`payer` contains the name of the health insurance payer for the claim
(Aetna, Blue Cross Blue Shield, etc). The source data may not contain this
field. In that case, the field can be set to a specific value:

```sql
select 'Payer Name' as payer
```
#### payer_type
This field is a string that contains the type of insurance provided by the payer. It must take one of the
values contained in the `payer_type` terminology file: `commercial`, `medicare`, `medicaid`, and `self-insured`.

#### plan
This field is a string that links every row to
the the specific health insurance plan or sub-contract specific to a member's
enrollment (e.g. Aetna Gold, BCBS Chicago, etc).

`plan` values may not come in the source data. This field
should be hard-coded (e.g. `select 'aetna bronze 1' as plan`).

#### original_reason_entitlement_code
This field is a single-character string that contains a member's original reason for Medicare entitlement.
When available, mapping this field is particularly helpful for providing a more accurate risk score.
If it's not available, the CMS HCC mart will use `medicare_status_code` instead.
The CMS HCC mart will default to a value of "Aged" when neither code is available.

This field can take the values '0', '1', '2', or '3'.

#### dual_status_code
This field is a string that indicates whether a member is enrolled in both Medicare and Medicaid.
Knowing whether a member is enrolled in both Medicare and Medicaid can help provide a more accurate risk score.
If this status is not known, the CMS HCC mart will default to "Non" (non-dual) in risk score calculations.

This field can take the values '00', '01', '02', '03', '04', '05', '06', '08', '09', or '10'

#### medicare_status_code
This field is a two-character string that indicates how a member currently qualifies for Medicare, and is used in risk score calculations when `original_reason_entitlement_code` is not present. `medicare_status_code` can take the following values: '00', '10', '11', '20', '21', '31', '40'.

#### group_id
This field is a string that can correspond to the particular group under which multiple members are enrolled for health coverage. This could be an identifier that is specific to an employer's health plan.

#### group_name
This field is a string that corresponds to the group name under which multiple members are enrolled for health coverage.

#### first_name
This field is a string that corresponds to the member's first name.

#### last_name
This field is a string that corresponds to the member's last name.

#### social_security_number
This field is a string that corresponds to the member's Social Security Number.

#### subscriber_relation
This field is a string that represents a member's relationship to the policyholder. This
field may be highly variable across data sources.

#### address
This field is a string that represents the member's address on file.

#### city
This field is a string that represents the city where the member resides.

#### state
This field is a string that represents the state where the member resides.

#### zip_code
This field is a string that represents the member's zip code.

#### phone
This field is a string that represents the member's phone number.

#### data_source
This field is a user-defined string that indicates the data source. This string is typically named after the payer and state, for example, "BCBS Tennessee". This field should be populated for every line in the `pharmacy_claim` table and is a header-level field, so its value must be the same
for all lines in a given claim.

#### file_name
This field is a string that corresponds to the name of the specific file that a particular row came from.
Claims sources are different: some carriers may share one file, one time. Others may share a file on some
regular cadence.

We suggest mapping the name of the file, if available, to `file_name`. This might be most important in cases where multiple files come from a carrier on a schedule, and the ability to tie specific rows to specific files is needed.

#### file_date
This field is a date, corresponding to the date associated with a particular claims file and typically representing the reporting period of the claims data.

Carriers may name files according to a specific pattern (e.g. "CarrierName_Eligibility_YYYYMMDD.csv").
In these cases, the `file_date` can be retrieved from the `file_name`. No matter how the information is represented, including it can be helpful, especially when tracking information across different claims files
over time is relevant to your use cases.

#### ingest_datetime
This field is a timestamp that corresponds to the date and time a source file landed in the data warehouse
or cloud storage. If this information is available or easy to track, we recommend mapping it to `ingest_datetime`. A field like this is particularly useful when there may be multiple versions of the
same claim line present across multiple files, but the most recent version of the claim line is the most relevant for your use case.
