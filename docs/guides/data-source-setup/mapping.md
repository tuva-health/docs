---
id: mapping
title: "3. Mapping Checklist"
---

To run the Tuva Project on a new data source you need to map that data to
the Tuva [input layer](../../connectors/input-layer). Once this is done,
the Tuva Project (which is a dbt package) will be able to call the
input layer tables using ref statements and build the Tuva data model
on your data. Mapping a data source
to the Tuva input layer means creating dbt models in your dbt project
for each of the input layer tables. That means that if you have a claims
data source you will create dbt models for each of the 3
[claims input](../../connectors/input-layer#claims-input)
tables, and if you have a clinical data source you
will create dbt models for each of the 9
[clinical input](../../connectors/input-layer#clinical-input)
tables.

In practice this is typically done in a dbt project where you have:
- Raw data tables as sources (left side of the DAG).
- However many necessary intermediate transformation tables as dbt models (middle of the DAG).
- The Tuva input layer tables as dbt models (right side of the DAG). Keep in mind that these
models will be called by ref statements in the Tuva Project, so in your dbt project
you must name them with the
correct corresponding Tuva input layer
table names (i.e., the names the input layer tables
have [here](../../connectors/input-layer)).

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

**Primary Key:** Composite primary key made up of
`claim_id`, and `claim_line_number`.
Note that when unioning data from multiple data sources, the
`medical_claim` table could have collisions of `claim_id` values
coming from different data sources, but since we always map one data source at a time
to the Tuva input layer (and we only run the mapping audit for
one data source at a time), you only need to make sure that
`claim_id` and `claim_line_number` are unique and populated for all rows you map
from your data source, and that is what the mapping audit will check for.


The `medical_claim` table is where all institutional and professional medical
claims go. This table is at the claim line grain, so there is one row
for each claim line and therefore there may be multiple rows for each claim.
This table must be created as a dbt model named `medical_claim` in your dbt project.

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

The mapping audit checks that every row in the `medical_claim` table has
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

<!-- The mapping audit checks that for all claims in the `medical_claim` table, 
the values of `claim_line_number` for different lines are sequential positive
integers starting at 1. -->
The mapping audit checks that the values of `claim_line_number` are different
for all lines within the same claim.


#### claim_type
This field is a string that describes the type of claim
and must have one of the following 3 values: 'institutional',
'professional', or 'undetermined'. This is a header-level field, so
its value must be the same
for all lines in a given claim. This field should be populated
for every row in the `medical_claim` table.
The logic to populate this field is as follows:
- A claim is said to be 'institutional' if it has any of these 7 fields populated: `bill_type_code`, `ms_drg_code`, `apr_drg_code`, `admit_type_code`, `admit_source_code`, `discharge_disposition_code`, `revenue_center_code`. Note that we are only requiring that at least one of those fields is populated, not that it is populated with a valid value.
- A claim is said to be 'professional' if none of the 7 fields above (`bill_type_code`, `ms_drg_code`, `apr_drg_code`, `admit_type_code`, `admit_source_code`, `discharge_disposition_code`, `revenue_center_code`) are populated AND it has at least one populated `place_of_service_code`. Note that we only require that at least one `place_of_service_code` is populated, not that it is populated with a valid value.
- If neither of the above two bullets is the case, the claim is said to be 'undetermined'

The mapping audit checks that every row in the `medical_claim` table
has a populated `claim_type` from one of the accepted values
for this field ('institutional', 'professional', 'undetermined')
and that the value of this field is
consistent across all lines for a given `claim_id`.




#### member_id
This field is a string that links each row to a given member.
This field should be populated for every row in the `medical_claim` table.
It is a header-level field,
so its value must be the same for all lines in a given claim.

The mapping audit checks that every row in the `medical_claim` table
has a populated `member_id` and that 
the value of this field is
consistent across all lines for a given `claim_id`.



#### plan
This field is a string that links every row to
the name of the health plan.
This field should be populated for every row in the `medical_claim` table.
It is a header-level field,
so its value must be the same for all lines in a given claim.

The mapping audit checks that every row in the `medical_claim` table
has a populated `plan` and that 
the value of this field is
consistent across all lines for a given `claim_id`.

#### claim_start_date, claim_end_date
These fields are dates formatted in the form YYYY-MM-DD. They represent
the start/end dates for the claim.
They should be populated for every row in the `medical_claim` table.
They are header-level fields,
so their value must be the same for all lines in a given claim.

The mapping audit checks that the values of `claim_start_date`
and `claim_end_date` are consistent across all lines for a given `claim_id`.



#### admission_date, discharge_date
These fields are dates formatted in the form YYYY-MM-DD. They represent
the admission/discharge dates for the claim. They are only
populated for inpatient claims and
are header-level fields,
so their value must be the same for all lines in a given claim.

The mapping audit checks that
the value of each of these fields is
consistent across all lines for a given `claim_id`.





#### discharge_disposition_code
This field is a two-character string that represents one of the
standard discharge disposition code values. This field should be populated for all
institutional claims and
is a header-level field, so its value must be
the same for all rows in a given claim.

The mapping audit checks that
the value of this field is a two-character string and that it is
consistent across all lines for a given `claim_id`.
The mapping audit does not check whether the value of this field is a
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.



#### place_of_service_code
This field is a two-character string that represents one of the
standard place of service code values. This field should be populated for
professional claims and is a line-level field,
so its value may be different for different lines in a given claim.

The mapping audit checks that
the value of this field is a two-character string.
The mapping audit does not check whether the value of this field is a
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.



#### bill_type_code
This field is a three-character string that represents one of the
standard bill type code values. Note that this field may have a leading
zero in your raw data source (making it a four-character string), and
when this is the case we remove the leading zero when mapping to
the input layer. This field should be populated for all
institutional claims and is a header-level field,
so its value must be
the same for all rows in a given claim.

The mapping audit checks that
the value of this field is a three-character string and that it is
consistent across all lines for a given `claim_id`.
The mapping audit does not check whether the value of this field is a
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.


#### ms_drg_code
This field is a three-character string that represents one of the
standard MS-DRG values.
This field is only populated for a subset of institutional claims and
is a header-level field,
so its value must be
the same for all rows in a given claim.

The mapping audit checks that
the value of this field is a three-character string and that it is
consistent across all lines for a given `claim_id`.
The mapping audit does not check whether the value of this field is a
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.


#### apr_drg_code
This field is a three-character string that represents one of the
standard APR-DRG values.
This field is only populated for a subset of institutional claims and
is a header-level field,
so its value must be
the same for all rows in a given claim.

The mapping audit checks that
the value of this field is a three-character string and that it is
consistent across all lines for a given `claim_id`.
The mapping audit does not check whether the value of this field is a
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.


#### revenue_center_code
This field is a four-character string that represents one of the
standard revenue center code values. This field should be populated for
institutional claims and is a line-level field,
so its value may be different for different lines in a given claim.

The mapping audit checks that
the value of this field is a four-character string.
The mapping audit does not check whether the value of this field is a
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.


#### diagnosis_code_type
This field is a string that describes the type of ICD diagnosis codes
used on this claim. It must have one of the following two values:
'icd-9-cm' or 'icd-10-cm'.
This is a header-level field, so
its value must be the same
for all lines in a given claim. This field should be populated
for every row in the `medical_claim` table that has diagnosis codes.


The mapping audit checks that claims with at least one
populated diagnosis code have a populated `diagnosis_code_type`
from one of the accepted values
('icd-9-cm', 'icd-10-cm')
and that the value of this field is consistent across
all lines for the claim.



#### diagnosis_code_1, diagnosis_code2, ... , diagnosis_code_25
These fields are strings with the standard ICD diagnosis
codes representing the diagnoses present on the claim.
When mapping to the Tuva input layer we strip any decimal points
from the diagnosis codes. These are header-level fields, so
their values must be the same for all lines in a given claim.
Only the diagnosis codes available on any given claim will be populated.
For example, if a claim only has `diagnosis_code_1` and `diagnosis_code_2`
available, only those fields will be populated and the values of the other diagnosis
code fields will be left null.

The mapping audit checks that the value of each diagnosis code field
is consistent across all lines for a given `claim_id`.
The mapping audit does not check whether the values of these fields are
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.



#### procedure_code_type
This field is a string that describes the type of ICD procedure codes
used on this claim. It must have one of the following two values:
'icd-9-pcs' or 'icd-10-pcs'.
This is a header-level field, so
its value must be the same
for all lines in a given claim. This field should be populated
for every row in the `medical_claim` table that has procedure codes.

The mapping audit checks that claims with at least one
populated procedure code have a populated `procedure_code_type`
from one of the accepted values
('icd-9-pcs', 'icd-10-pcs')
and that the value of this field is consistent across
all lines for the claim.



#### procedure_code_1, procedure_code2, ... , procedure_code_25
These fields are strings with the standard ICD procedure
codes representing the procedures present on the claim.
When mapping to the Tuva input layer we strip any decimal points
from the procedure codes. These are header-level fields, so
their values must be the same for all lines in a given claim.
Only the procedure codes available on any given claim will be populated.
For example, if a claim only has `procedure_code_1` and `procedure_code_2`
available, only those fields will be populated and the of the procedure
code fields will be left null.

The mapping audit checks that the value of each procedure code field
is consistent across all lines for a given `claim_id`.
The mapping audit does not check whether the value of this field is a
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.



#### data_source
This field is a user-defined string that indicates
the data source. This string is typically named after the payer
and state, for example, "BDBS Tennessee".
This field should be populated for every line in the `medical_claim` table
and is a header-level field, so its value must be the same
for all lines in a given claim.

The mapping audit checks every row in the `medical_claim` table
has a populated `data_source` and that the value of this field
is consistent across all lines for a given `claim_id`.







### pharmacy_claim

**Primary Key:** Composite primary key made up of
`claim_id`, and `claim_line_number`.

The `pharmacy_claim` table stores all pharmacy claims.
There is one row for each claim line, therefore multiple rows for
each claim. Each row (claim line) represents a specific medication
that was dispensed, so each row must have its own `ncd_code`.
This table must be created as a dbt model named `pharmacy_claim` in your dbt project.

If there are claims in the dataset without corresponding eligibility
(i.e. the patient the claim is for does not have coverage during the
dates for the claim)
then those claims should stay in the dataset and not be
filtered out.

When mapping claims to the `pharmacy_claim` input layer table, you must take into
account any logic (specific to your data source) to deal with
adjustments, denials, and reversals. The claims that must end up
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
is required to be populated for every row in the `medical_claim` table.

The mapping audit checks that every row in the `pharmacy_claim` table has
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

The mapping audit checks that the values of `claim_line_number` are different
for all lines within the same claim.



#### member_id
This field is a string that links each row to a given member.
This field should be populated for every row in the `pharmacy_claim` table.
It is a header-level field,
so its value must be the same for all lines in a given claim.

The mapping audit checks that every row in the `pharmacy_claim` table
has a populated `member_id` and that 
the value of this field is
consistent across all lines for a given `claim_id`.



#### plan
This field is a string that links every row to
the name of the health plan.
This field should be populated for every row in the `pharmacy_claim` table.
It is a header-level field,
so its value must be the same for all lines in a given claim.

The mapping audit checks that every row in the `pharmacy_claim` table
has a populated `plan` and that 
the value of this field is
consistent across all lines for a given `claim_id`.


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
accurately turn your code into an 11-digit code and can therefore not
map it to the `pharmacy_claim` input layer table.

Whether your raw data has 11-digit NDC codes or 10-digit codes that you may successfully
convert to 11-digit codes, you must remove the dashes in the code when
mapping to the `pharmacy_claim` input layer table.
The `ndc_code` field should should always be populated with 11-character strings.

The mapping audit checks that the `ndc_code` field is always populated
and that it always has the correct length (11 characters).
The mapping audit does not check whether the value of this field is a
valid value from terminology because if your raw data has invalid
values you will map them to the input layer and Tuva's data quality
intelligence will point out invalid values downstream from the input layer.


#### quantity
This field represents the number of doses of the medication.
This should always be a positive integer.

The mapping audit checks that when this field is populated it is a positive integer.


#### days_supply
This field represents the number of days supply for the medicaiton.
This should always be a positive integer.

The mapping audit checks that when this field is populated it is a positive integer.


#### refills
This field represents the number of refills for the prescription.
This should always be a positive integer.

The mapping audit checks that when this field is populated it is a positive integer.


#### in_network_flag
This field is a flag indicating if the claim was in (=1) or out (=0) of network.
The value of this fields should always be 0 or 1, and it should be
unique across all lines of a given claim.

The mapping audit checks that this field is unique across all lines
for a given claim and it also checks that only valid values (0 or 1)
are populated for this field.

#### data_source
This field is a user-defined string that indicates
the data source. This string is typically named after the payer
and state, for example, "BDBS Tennessee".
This field should be populated for every line in the `pharmacy_claim` table
and is a header-level field, so its value must be the same
for all lines in a given claim.

The mapping audit checks every row in the `pharmacy_claim` table
has a populated `data_source` and that the value of this field
is consistent across all lines for a given `claim_id`.




### eligibility

<details>
  <summary>Primary Key</summary>

- The primary key for the pharmacy_claim table is patient_id, enrollment_start_date, enrollment_end_date, and data_source.  
- There are two commonly used data formats for eligibility (also known as enrollment) data: the eligibility span format and the member month format.
- The eligibility span format has one record per member eligibility span.  An eligibility span is a time period when a member was enrolled with and therefore had insurance coverage by a health plan.  An eligibility span has a start date and an end date.  A person can have multiple eligibility spans.
- The member month format has one record per member per month of enrollment.  For example, a person with a single eligibility span from 1/1/2020 through 3/31/2020 would have a single eligibility span record, but 3 member month records, one for each month.
- The eligibility table follows the eligibility span format.

</details>

## Clinical Input Layer


