---
id: data-acquisition
title: "Data Acquisition"
---
In this section we provide a summary of best practices to follow when you're acquiring healthcare claims data.

## Things to Ask your Data Provider
Unless you're a payer or clearing house, chances are that you're getting your healthcare claims data from a third party.  It's crucial to have discussions with your data provider about the exact data you're receiving, in order to make sure it will work for your use cases.

Below are some questions we always include in any discussion with a data provider:

- File Format
    - In what format will you be sending the claims data?
    - For example, a delimited file (comma, tab, pipe) can be parsed by any data ingestion tool but support for EDI x12 is harder to find.
- Delivery Mechanism
    - How will the data be transferred?
    - For example, a common transfer mechanism is SFTP.
- File Inventory
    - What files will be delivered?
    - For example, we typically like to see eligibility, medical claim, and pharmacy claim files, but sometimes only a subset of these files are available.
- Data Refreses
    - At what cadence will each file be delivered (i.e. the refresh schedule)?
    - For example, with claims data a monthly refresh cadence is extremely common.
    - Do new files contain only new and updated claims (incremental) or will they contain previously sent claims that have had no changes to them (full)?
    - For example, duplicate claims may be delivered depending on the date criteria used to determine the cut-off for sending new data.
- Data Dictionary 
    - Can you provide a data dictionary that defines the exact tables, columns, data types, and column descriptions that will be included in the data feed?
    - This is absolutely critical for using the data once you receive it.
    - Several fields are critically important for analytics and you should specifically confirm their presence in the data:
        - [ ]  **Bill Type Code** (institutional claims only - needed to map to encounters; encounters are needed for readmissions)
        - [ ]  **Revenue Center Codes** (institutional claims only - needed to map to encounters; encounters are needed for readmissions)
        - [ ]  **Discharge Disposition Code** (institutional claims only - needed to map to encounters; encounters are needed for readmissions)
        - [ ]  **DRG** (institutional claims only - needed to define to inpatient encounters and for any sort of acute care analytics)
        - [ ]  **Paid Amount** (institutional and professional claims - needed to calculate per member per month spend and per visit payments)
        - [ ]  **Place of Service Code** (professional claims only - needed to define a variety of encounter types))
- Data Validation
    - Can you provide internal figures to validate the files?
    - Data providers often have their own reports that produce payment and utilization statistics.  You can use these to compare your numbers to validate.
- Detailed Questions
    - Will all claims be included?  Especially mental health/psychiatric claims?
    - How are adjustments and reversals of claims represented in the data?
    - Is there a person who works for the data provider that can help us with additional questions about the data?


## Data Ingestion Best Pratices

Regardless of what tool you use to ingest your data, here are some best practices to follow when setting up a pipeline to load the raw claims into your data warehouse:

- Follow an Extract, Load, Transform (ELT) Process
    - It's best practice to follow an "extract, load, and transform" (ELT) process, in that order.  This means loading the raw data files into your data warehouse exactly as they are, without any transformation.  All transformation should then happen downstream, inside your data warehouse.
    - This ELT approach is new in the last 5 years.  Previously, most approaches followed an ETL process.  This change in the order of operations occurred as a result of storage and compute becoming exponentially cheaper.  Before it wasn't feasible to load all your data into your data warehouse and process it, so "transform" previously happened before the data was loaded into the data warehouse.  
    - Doing all transfomration inside the data warehouse has two main benefits.  First, all transformation occurs in one location, so there's a single source of truth.  Second, transformation can be performed by the individuals with the right domain knowledge.  If the transformation must be done outside the data warehouse, then typically that work is done by software engineers that have strong technical capabilities, but little domain expertise needed to know how the data needs to be transformed.
- Create a separate database (or at least schema) for each data source
    - Option 1: Load raw data from each data source into a separate database.  For example, if I was receiving Medicare CCLF claims data from CMS I would load this data into a database called "medicare_cclf" and into a schema called "raw_data".
    - Option 2: Load raw data from every data source into a single database.  For example, I would name this single database "raw_data" and then have separately named schemas for each data source (e.g. a schema named "medicare_cclf" for Medicare claims data).
    - Having a clear way to organize the source data in your data warehouse creates clarity for your data team.