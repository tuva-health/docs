---
id: cvx
title: "CVX"
---
<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 05-21-2025</em></small>
</div>

## Data Dictionary

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__cvx.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/cvx.csv_0_0_0.csv.gz">Download CSV</a>

## What is CVX?

**CVX** stands for *Vaccine Administered Code Set*. It is a standardized vocabulary maintained by the **Centers for Disease Control and Prevention (CDC)** to uniquely identify vaccines.

- **Maintained by**: CDC, National Center of Immunization and Respiratory Diseases (NCIRD)  
- **Purpose**: Provides a standard set of codes for vaccines to support interoperability across EHRs, immunization information systems (IIS), and claims data.  
- **Usage**: Vaccine administration, clinical documentation, public health reporting, analytics, and interoperability with HL7/FHIR standards.  

📎 [CDC CVX Code Set Official Resource](https://www.cdc.gov/vaccines/programs/iis/code-sets.html)  
📎 [HL7 CVX Identifier System](http://hl7.org/fhir/sid/cvx)  

## Who Maintains CVX?

- The **CDC’s Immunization Information Systems Support Branch (IISSB)** is responsible for maintaining CVX codes.  
- Updates are published regularly to reflect new vaccines, status changes (active/inactive), and corrections.  
- CVX is used alongside **MVX codes** (manufacturer codes) to provide full vaccine details.  

## Code Structure

Each **CVX code**:

- Is **numeric** (typically 1–3 digits).  
- Represents a **specific vaccine** or **vaccine grouping**.  
- Has associated columns including:  
  - **cvx**  
  - **Short description**  
  - **Long description**  

**Example**:
> `207`  
> `COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5 mL dose (Moderna)`  
> `SARS-COV-2 (COVID-19) vaccine, mRNA, spike protein, LNP, preservative free, 100 mcg/0.5mL dose`

## Active vs. Inactive Codes

- **Active codes**  
  Represent currently available vaccines and can be used in clinical documentation, EHRs, and reporting systems.  

- **Inactive codes**  
  Represent vaccines that are no longer in use but are retained for historical reference (e.g., discontinued products).  

- **Historical groupings**  
  Sometimes CVX codes serve as "group" codes for interoperability across versions or broad categorization.  

### The `status` Field

CDC’s CVX table includes a **status field** that Tuva captures as `status_flag`:

- `active` = currently valid CVX code  
- `inactive` = no longer in use, kept for reference  
- `historic` = groupings or legacy codes not meant for direct administration  

This allows systems to filter **valid CVX codes** or support analytics on vaccine uptake over time.  

## Key Use Cases for CVX Codes

- **Clinical Documentation**: Ensures consistent recording of administered vaccines in EHRs.  
- **Public Health Reporting**: Standardized reporting to immunization information systems (IIS).  
- **Claims Processing**: Used by payers and clearinghouses to identify vaccine services.  
- **Analytics & Research**: Vaccine uptake trends, coverage monitoring, safety and effectiveness studies.  
- **Interoperability**: Used in HL7 V2 messages, CDA, and FHIR Immunization resources.  

### 📌 Notes for Data Analysts

- CVX codes are often paired with **MVX codes** (manufacturer) for full vaccine identity.  
- Historical and inactive codes are important for **longitudinal patient records**.  
- Mapping between **CVX and NDC codes** (National Drug Codes) may be required for billing and supply chain analysis.  
- Tuva’s source files preserve the CDC’s official code list, including active, inactive, and historical entries.  

## Tuva Seed File Update Process

Note: This is the maintenance process used by Tuva to maintain the current codeset in the Tuva package. Tuva users do not need to complete this step unless they are leveraging a different version of codes or are no longer updating to the current version of the project, but need an updated terminology set.  

1. Navigate to the [CDC CVX Code Set](https://www.cdc.gov/vaccines/programs/iis/code-sets.html).  
2. Download the latest **CVX table (Excel/CSV)** published by CDC.  
3. Save the file locally and open the spreadsheet. 
4. Ensure the following fields are retained and mapped as:  
   - `cvx_code` → **cvx**  
   - `short_description` → **short_description**  
   - `Full Vaccine Name` → **long_description**   
5. Convert to a **CSV file** in UTF-8 encoding.  
6. Import the CSV file into any data warehouse and upload the CSV file from the data warehouse to S3 (credentials with write permissions to the S3 bucket are required)

```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/cvx.csv
from [table_created_in_step_6]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
OVERWRITE = TRUE;
```
7. Create a branch in [docs](https://github.com/tuva-health/docs).  Update the `last_updated` column in the table above with the current date
8. Submit a pull request

**The below steps are only required if the headers of the file need to be changed.  The Tuva Project does not store the contents
of the ICD-10-CM file in GitHub.**

1. Create a branch in [The Tuva Project](https://github.com/tuva-health/tuva)
2. Alter the headers as needed in [CVX file](https://github.com/tuva-health/tuva/blob/main/seeds/terminology/terminology__icd_10_cm.csv)
3. Submit a pull request

