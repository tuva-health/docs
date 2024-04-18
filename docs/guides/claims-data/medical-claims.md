---
id: medical-claims
title: "Medical Claims"
---

The `medical_claim` table contains billing information submitted to health insurers for medical services, supplies, and/or procedures rendered to a member of the health plan.  Adjudicated claims from payers, health plans, self-insured employers, brokers, and third party administrators are the most common source of this data.

## General mapping conventions
### Claims missing eligibility
  If there are claims in the data set without corresponding eligibility (i.e. the patient the claim is for does not have any 
  enrollment information) then those claims should stay in the data set and not be filtered out.

## Admit Source and Type
`admit_source_code` is used in institutional claims to indicate where the patient was located prior to admission.  The field does not exist in professional claims.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

`admit_type_code` is used in institutional claims to indicate the priority of admission, e.g., urgent, emergent, elective, etc.  The field does not exist in professional claims.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

Admit source and admit type are generally not considered highly reliable because the accuracy of the codes is not verified during the claims adjudication process (other than verifying that the code is in fact a valid code).

Despite this, admit source is commonly used to identify things like:
- transfers from another hospital
- inpatient stays that came through the emergency department

And admit type is commonly used to identify things like elective procedures.

Admit source and type codes are maintained by the National Uniform Billing Committee (NUBC).

## Bill Type
'bill_type_code' is by far the most complex of the administrative codes in medical claims.  Each digit has a distinct purpose and meaning:

- 1st digit: This is always "0" and often omitted.
- 2nd digit: Indicates the type of facility, e.g., skilled nursing facility 
- 3rd digit: Indicates the type of care, e.g., inpatient part A
- 4th digit: Indicates the sequence of the bill (also referred to as the frequency code)

The thing that makes this code complex is that the possible values of the 3rd and 4th digits depend on the value of the 2nd digit.  As a result, some claims datasets will separate out the digits of bill type code into distinct fields.  However, we find it preferable to work with bill type code as a single field.

Despite the complexity of this field, it's extremely useful.  'bill_type_code' is used extensively in the creation of service categories, including the identification of acute inpatient, outpatient, skilled nursing, and emergency department services, among many others.  The field is generally considered reliable because the accuracy and suitability of the code is verified during the claims adjudication process, i.e., a claim may be denied if the code doesn't make sense.

'bill_type_code' values are maintained by the National Uniform Billing Committee (NUBC).

## Claim ID and Line Number
`claim_id` is intended to be a unique identifier for a set of services and supplies rendered by a healthcare provider that has been billed to insurance.  It is the most fundamental data element in the `medical_claim` table and every row in the table must have a `claim_id` populated.  If certain records do not have a claim ID populated these records should not be mapped to the Input Layer.

A claim is often made up of multiple records.  `claim_line_number` is intended to be a unique identifier within a claim that distinguishes these records (i.e. each distinct service, supply, or procedure rendered on the claim).

Every record on a claim should have a unique `claim_line_number` and it should be a positive integer.  Generally speaking `claim_line_number` should be sequentially increasing starting with the number 1.  For example, a claim with 10 records with have `claim_line_number` populated starting a 1 and going up to 10 on the tenth record.  However we often encounter claims with strange line numbers e.g.:
- Not starting with 1
- Not sequential
- Repeating numbers

This weirdness isn't ideal and can indicate other problems in the dataset (e.g. duplicate records).  However it's not a problem in isolation.

`claim_line_number` can be created manually if it’s unavailable in the source data or if it’s not sequential positive integers.  For example:

```sql
row_number() over (partition by claim_id order by claim_end_date) as claim_line_number
```

## Claim Type

`claim_type` is the categorization of a claim based on the specific claim form used in billing i.e. institutional or professional.  It's an important field used in [Claims Preprocessing](../../data-marts/claims-preprocessing) to assign service categories and group claims into encounters.

Each `claim_id` must have a unique `claim_type` which should be one of these values:
- **institutional:** For claims rendered using a UB-04 claim form
- **professional:** For claims rendered on a CMS-1500 claim form

Often `claim_type` is available in the source medical claim data.  If `claim_type` is not present, other fields on the claim can be used to determine whether the claim is `institutional` or `professional`.

In theory, the following fields should only be found on institutional claims:
- `bill_type_code`
- `revenue_center_code`
- `ms_drg_code` or `apr_drg_code`
- `admission_date` and `discharge_date`
- `discharge_disposition_code` and `admit_type_code` and `admit_source_code`

The following field should only be found on professional claims:
- `place_of_service_code`

Often a claims data source will have all of these fields populated simultaneously.  Technically this should not be possible, since the data elements are separated by claim form.  However, payers will merge claims from the two claims forms into a single table and then populate missing data elements based on logic they develop internally.  This can make it difficult to separate professional from institutional.  In these circumstances we start by looking for institutional data elements (listed above).  If `bill_type_code`,`revenue_center_code`, or `ms_drg_code` or `apr_drg_code` are present, we assign the claim an `institutional` claim type.  

If none of these fields are present then we assign the claim a `professional` claim type as long as a `place_of_service_code` is present.

If it’s not possible to determine the correct `claim_type`, we assign a `claim_type` of `undetermined`.

Whatever `claim_type` is assigned to a claim, it must be the same for all records (i.e. lines) within that claim.

## Dates
All dates should be formatted as `YYYY-MM-DD`.

To understand the key date fields in medical claims, it's useful to consider an example of a patient who's been receiving care in a long-term care (i.e. skilled nursing) facility for 1 year, from January 1st to December 31st, and suppose the facility bills the insurer every month on the beginning of the month.

- `claim_start_date`: The start date of the billable period for the claim.  In the example above this date would always be the first date of the month.
- `claim_end_date`: The end date of the billable period for the claim.  In the example above this date would always be the last date of the month.
- `admission_date`: The date the patient was first admitted to the facility.  In the example above this date would be January 1st.  This field only exists on institutional claims, not professional.
- `discharge_date`:  The date the patient was discharged from the facility.  In the example above this date would be December 31st.  This field only exists on institutional claims, not professional.
- `paid_date`:  The date the claim was paid by the insurance company.  This date could be any date after the claim_end_date.  Often this date is within a couple weeks of claim_end_date.

There are 2 other date fields in medical claims.  They are `claim_line_start_date` and `claim_line_end_date`.  These date fields are less important - in fact we don't currently use them in any analytics in Tuva.

## Discharge Disposition

'discharge_disposition_code' indicates where the patient was discharged following a stay at a facility.  The field only exists on institutional claims.  The field is sometimes called discharge status or patient status.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

The code is commonly used to identify things like:
- Patients that died during an institutional stay
- Patients who were transferred
- Patients who were discharged to home or home w/ home health services
- Patients who left against medical advice (LAMA)

Discharge disposition codes are maintained by the National Uniform Billing Committee (NUBC).

## DRG
`ms_drg_code` is a classification system used by Medicare to categorize inpatient hospital stays and group them based on a patient’s diagnosis, procedures performed, age, sex, and complications or comorbidities.  It is necessary for Medicare reimbursement but often used by hospitals as a standard for all inpatient stays.

`apr_drg_code` stands for "all patient refined DRG".  It was developed by 3M to extend DRGs to a more general patient population.

## Financial Amounts

`paid_amount` is the dollar amount that the health insurer paid for the covered service.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

`allowed_amount` is the maximum dollar amount a health insurer will reimburse for a covered service.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

`coinsurance_amount` is the dollar amount a member has paid for a covered service as part of cost-sharing with the health insurance provider.  After a deductible is met, covered services may still require a member to pay for a percentage of the cost (e.g. 80/20 - 80% paid by the health insurer and 20% paid by the member)

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

`deductible_amount` is the dollar amount a member has paid for a covered service before the health insurer will pay the cost for covered services.

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

`total_cost_amount` is the total amount for a member’s cost of care.  Based on the source data set, it may equal the sum of the other payment fields or it may include Medicare’s [claim pass-through per diem amount](https://resdac.org/cms-data/variables/claim-pass-thru-diem-amount).

- data type is `numeric` with two decimal points (e.g. `numeric(38,2)`)

## HCPCS

HCPCS codes indicate the services and supplies rendered by providers to patients.  These codes are used in both institutional and professional claims forms.  These codes exist at the line-level, meaning there can be many HCPCS codes on a single claim.  There are codes for many different types of supplies and services including:
- physician visits
- lab tests
- imaging reads
- durable medical equipment
- remote patient monitoring devices

And many many other types of things.  There are thousands of HCPCS codes spread across two levels.  Level 1 codes, also called CPT codes, are maintained by the American Medical Association (AMA).  Level 2 codes are maintained by CMS.

Professional contracted rates between payers and providers are established using HCPCS codes.  These rates are referred to as a fee schedule.  Conversely, institutional rates are often paid on a per encounter (e.g. DRG) or per diem basis.

HCPCS Modifiers include the following fields: `hcpcs_modifier_1` , … , `hcpcs_modifier_5`

A `hcpcs_modifier` can be an additional code to `hcpcs_code` that provides more information about the circumstances surrounding the service.  They represent specific details about the service.  Some examples are:

- LT - service was performed on left side of body
- 76 - service was repeated by the same physician on the same day
- 77 - service was repeated by another physician on same day

## ICD Diagnosis Codes

`diagnosis_code` represents the patient’s medical conditions and/or diagnosis and communicates information about the their health and why healthcare services were provided.

`diagnosis_code_1` contains the primary condition for which the patient is seeking care.  It is the primary medical issue that is the focus of the visit.

`diagnosis_code` is a header-level field for all claim types which means they should be unique per claim.

The number of `diagnosis_code` fields available in the data will vary by source and data provider.  There can be up to 25 codes 
but it is not unexpected to see only 1-5 codes.  When mapping `diagnosis_code_1` any field in the source data labeled ‘primary’ or as ‘diagnosis_1’ is acceptable.

- data type is `string`

`diagnosis_code_type` contains the coding system for the diagnosis codes contained on the claims.

On October 1, 2015 the U.S. healthcare industry switched from using ICD-9 to ICD-10.  If the source data does not contain information about the `diagnosis_code_type` then the switch over date can be used to classify the diagnosis codes.  It should be compared against the `claim_end_date`for example:

```sql
case 
	when claim_end_date < 2015-10-01
		then 'icd-9-cm'
	else 'icd-10-cm'
```

- data type is `string`
- `diagnosis_code_type` is popualated when any `diagnosis_code` is populated
- `diagnosis_code_type` is a value from Tuva’s [code type](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__code_type.csv) terminology file

## ICD Procedure Codes

`procedure_code` represents inpatient surgical, diagnosis, or therapeutic procedures rendered during a patient’s visit.

`procedure_code` is a header-level field for all claim types which means they should be unique per claim.

The number of `procedure_code` fields available in the data will vary by source and data provider.  There can be up to 25 codes but it is not unexpected to see only 1-5 codes. 

`procedure_code_type` contains the coding system for the procedure codes contained on the claims.

On October 1, 2015 the U.S. healthcare industry switched from using ICD-9 to ICD-10.  If the source data does not contain information about the `procedure_code_type` then the switch over date can be used to classify the diagnosis codes.  It should be compared against the `claim_end_date`for example:

```sql
case 
	when claim_end_date < 2015-10-01
		then 'icd-9-pcs'
	else 'icd-10-pcs'
```

Procedure dates includes the following fields: `procedure_date_1`, …, `procedure_date_25`

`procedure_date` represents the date the corresponding procedure occurred (e.g. `procedure_date_1` is the date for `procedure_code_1`).

`procedure_date` is a header-level field for all claim types which means they should be unique per claim.

The number of `procedure_date` fields available in the data will vary by source and data provider.  There can be up to 25 codes but it is not unexpected to see only 1-5 codes. 

Data type is `date` in the format `YYYY-MM-DD`

## Patient and Member ID

`patient_id` is a unique identifier that is designed to unify a patient’s records and provide a consistent reference for the specific individual.  It allows for the linking and tracking of a patient’s healthcare journey across different source data sets.

`member_id` is an identifier specific to the health insurer or health plan.  It is assigned by the insurance company to uniquely identify a specific individual only within their system.

- `patient_id` and `member_id` are populated for every row in the input layer `medical_claim` table.
- `patient_id` and `member_id` have the same value for all lines within the same `claim_id`.
- `patient_id` is unique across all data sources

## Payer and Plan
`payer` contains the name of the health insurance payer of the claim (Aetna, Blue Cross Blue Shield, etc).  This field should can be populated manually if not available already as a field in the source data.

`plan` contains the specific health insurance plan or sub-contract the member is enrolled in (e.g. Aetna Gold, Aetna Bronze 4, BCBS Chicago, etc).

`plan` may not be available in the source data and should be hardcoded (e.g. `select 'aetna bronze 1' as plan`) and it can be the same as the payer if no plan is needed for analytics.

## Place of Service

Place of service codes indicate the type of care setting professional claim services were delivered in.  This field only exists on professional claims.  Place of service is coded at the line-level to reflect the fact that services during a particular encounter can occur in different locations.  Because of this, a single professional claim can have multiple place of service codes.

Place of service codes are used to assign claims to services categories.  For example, place of service code 11 indicates an office visit.

CMS maintains place of service codes.

`place_of_service_code` is contains a 2 digit code that specifies a specific location where the medical service was provided.  

`place_of_service_code` is only found on `professional` claims and is a line-level field that should be populated on all claim lines.

## Present on Admission

`diagnosis_poa` refers to the patient’s condition at the time they were admitted to the hospital.  It indicates whether the condition was already present and active or if it developed during their hospitalization.

`diagnosis_poa` is a header-level field for all claim types which means they should be unique per claim.

The number of `diagnosis_poa` fields available in the data will vary by source and data provider.  There can be up to 25 
codes to describe each `diagnosis_code` but it is not unexpected to see only 1-5 codes or none at all.

- data type is `string`

## Provider NPI

`rendering_npi`, `facility_npi`, and `billing_npi` is populated with the Nation Provider Identifier (NPI) for a provider.

`rendering_npi` represent the practitioner who performed or rendered the specific service.  This value can be populated on either institutional or professional claims.

`facility_npi` represents the healthcare facility or institutional where a specific service was rendered.  This value should only be populated on institutional claims.

`billing_npi` represent the individual or organization responsible for billing and receving payment for healthcare services.

If only one NPI field is provided in the source data, then reference the NPI in Tuva’s provider terminology file to 
determine if it is a person or a place. If it is a person, then the NPI should be mapped to `rendering_npi` in the input 
layer.  If it is a person and it’s an professional claim then also map to `billing_npi`.  If it is a location and the claim type is institutional, then map to`facility_npi`.

This section describes provider information included in claims data - namely the National Provider Identity (NPI).

**What provider data is included in claims?**

Medical claims includes several fields containing information on providers. The fields vary based on the type of claim.

**Facility Claims [CMS-1450 or UB-04](https://www.cdc.gov/wtc/pdfs/policies/ub-40-P.pdf):**
Provider information in the header of facility claims. In addition to the facility billing the service, these claims contain several fields for NPIs from up to four individual providers involved in the care (e.g., Attending Physician).
- Box 1 Billing Provider Name and Address
- 2 Pay-to Proivder Name and Address
- 5  Federal Tax ID
- 76 Attending Physician
- 56 Billing Provider NPI
- 57 Other Provider ID
- 77 Operating Physician
- 78 Other Physician
- 79 Other Physician

**Professional Claims [CMS-1500](https://www.cms.gov/medicare/cms-forms/cms-forms/downloads/cms1500.pdf):** 
Professional claims track the NPI of the provider who rendered each individual line item (i.e., CPT/HCPSCS code) in the claim. In addition, the claim header contains information on the organization submitting the claim. 
- Box 17  Referring Provider
- 24J Rendering Provider
- 25 Federal Tax ID
- 32 Service Facility Location Information
- 33 Billing Provider

**What is an NPI?**

Individual provider and facility information is encoded in claims data via National Provider Identity (NPI) codes.  However, one needs to enhance individual provider NPI codes with specialty information and group facility provider NPI codes into distinct locations before this information is useful for analytics.

- An NPI is a unique 10-digit numeric identifier for covered healthcare providers and organizations.
    - It is a HIPAA standard created to help send health information electronically.
    - An NPI won’t change even if a provider’s name, address, taxonomy (specialty), or other information changes. However, in some situations, an NPI may need to be deactivated or replaced, such as the retirement or death of an individual, disbandment of an organization, or fraudulent use of the NPI.
- Who must get an NPI?
    - All health care providers who are HIPAA-covered entities, individuals, or organizations.
    - It is required for enrollment in Medicare and submitting claims.
    - When a provider registers for an NPI, CMS attempts to verify only two things: (1) the provider's social security number and (2) that the provided business address is valid.
        - CMS does not verify whether the provider actually works at the submitted business address, and CMS does not attempt to verify the provider's self-reported specialty.
- NPI Entity Types
    - Entity Type 1: Individual
        - You may only get 1 NPI.
        - If you’re an individual healthcare provider who’s incorporated, you may need to get an NPI for yourself (Type 1) and an NPI for your corporation (Type 2).
    - Entity Type 2: Organization
        - The main difference with type 2 NPI numbers is that organizations can have several NPI numbers rather than just one.
        - Some organizations may have parts or locations that work independently from their parent organization, referred to as “subparts”. Each subpart can get its own NPI.
    - Where are the NPIs found on claim forms?
        - On the Professional CMS-1500 form, insert the main or billing Entity Type 2 NPI in Box 33a (Billing Provider). Insert the service facility Entity Type 2 NPI (if different from main or billing NPI) in Box 32a (Service Facility). Insert Entity Type 1 NPIs for rendering providers in Box 24J (Rendering Provider).
        - On the Institutional UB-04 form (aka CMS-1450), insert the main Entity Type 2 NPI in Box 56 (Billing Provider); insert Entity Type 1 NPIs for rendering providers in boxes 78-79 (Other Provider).

**What is NPPES?**

- CMS developed the National Plan and Provider Enumeration System (NPPES) to assign NPIs.
- This information is publicly available and disclosed under FOIA.
- The data is distributed to the public via monthly data file downloads or via the API.
- The API has limitations. It’s useful for single-provider lookups but not for getting batch information.
- Limitations with the NPPES data:
    - The monthly file is a very large full replacement file that must be unzipped.
    - Many fields are codes requiring a separate lookup file for human-readable descriptions. These code sets are not distributed via data files. They are instead in a PDF provided with the monthly download. The codes must be extracted and transformed before they are useful.
    - Many pieces of information are in several columns that require logic to get any meaningful value out of them.
    - Once a provider has an NPI, there are no scheduled requests for updated information; however, providers are instructed to update their information in NPPES within 30 days of a change of required data fields. The degree to which providers update their information is not fully known.
    - There is no explicit penalty for a provider having out-of-date information in NPPES.
    - This means the data in NPPES is not necessarily reliable but remains one of the few publicly available sources of provider data.
- Other sources of provider data:
    - PECOS (Provider Enrollment, Chain, and Ownership System)
        - This is a registry of providers eligible to bill Medicare.
        - PECOS gathers more detailed information than NPPES on the financial arrangement between an individual provider and a practice group or organization, as well as a number of other details about business ownership and history of adverse outcomes with malpractice claims.
        - Providers are required to update their information every five years or whenever changes occur.
        - Unfortunately, this is not publicly available for research.
    - AMA (American Medical Association) Masterfile
        - The Masterfile attempts to be a comprehensive registry of all physicians trained in the United States.
        - It captures information from institutions on individuals at the time that they enter medical school or a graduate medical program in the United States.
        - It relies primarily on physicians voluntarily completing questionnaires to update information about their practice and location.
        - This data is publicly available for research.

**What are provider taxonomies?**

- When providers register with NPPES they are required to provide one primary provider taxonomy code (and up to 14 additional taxonomies) which defines the health care service provider type, classification, and area of specialization.
- The Health Care Provider Taxonomy code set is a collection of unique alphanumeric codes (e.g. 207KA0200X), ten characters in length, maintained by the National Uniform Claim Committee (NUCC).
- Again, a separate terminology lookup data source is required to interpret this code which does not come with the NPPES data set.
- The taxonomy codes are updated twice a year (January and July).

**Why are TAX IDs included in claims?**

In addition to NPIs, federal tax IDs are required fields on both facility and professional claim forms. The tax ID can be either an employer identifier number (EIN), or an invidual's social security number.

Most provider analyses are conducted using the NPIs recorded in claims. Tax IDs are used for some financial use cases, since network contracts are written at the TIN level. For example, network discounts are often analyzed by tax ID, since network contracts are written at the tax ID level ([Example](https://us.milliman.com/-/media/milliman/importedfiles/uploadedfiles/insight/healthreform/pdfs/determining-discounts.ashx)).

## Revenue Center
Revenue center codes are used to account for the services and supplies rendered to patients in institutional care settings.  These codes are only used in institutional claims.  Typically these codes will correspond to a facility's chargemaster, which is a listing of all charges used by the institution in billing.  Although a hospital will use these codes to "charge" the health insurer, they have no bearing on the contracted payment amount, i.e., the amount paid to the provider by the payer.  The payment amount is entirely determined by MS-DRG for inpatient claims and often a per diem rate for skilled nursing.

Many different categories of revenue center codes exist including for example:
- Room and Board
- Emergency
- IV Therapy

For a given institutional claim there may be dozens of revenue center codes used.  These codes are submitted at the line-level of the claim, so there is no limit to the number of revenue center codes that may be used on a given claim.

Revenue center codes play an important role in identifying different types of insitutional claims, including acute inpatient, emergency department, and others.

Revenue center codes are maintained by the National Uniform Billing Committee (NUBC).

`revenue_center_code` is a 4 digit code that used to classify and identify different departments or units within a healthcare facility.

`revenue_center_code` is only found on `institutional` claims and is a line-level field.  It is generally required for billing so payers understand the nature of a service and can determine proper reimbursement but it can be omitted from source data sets.

