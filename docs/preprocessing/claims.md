---
sidebar_position: 1
---

# Claims

## What is Claims Data?

Claims data is the data that is generated when medical providers bill insurance companies for medical services.  There are two types of paper claims forms: UB-04 and CMS-1500.  Each paper claim form has a corresponding digial claim form: UB-04 is the 837i and CMS-1500 the 837p.  

The following types of organizations use the UB-04 (837i) claim form: hospitals, skilled nursing facilities, hospice, and home health.

The following types of organizations use the CMS-1500 (837p) claim form: physician, labs, durable medical equipment, etc.

Claims are submitted by providers and organizations that bill on their behalf to clearing houses.  Clearing houses process the claims are perform basic checks to make sure the claim being submitted has been filled out properly.  The clearing house then passes the claim to the insurance company for final processing and adjudication (i.e. the process of determine a claim payment should or should not be made).  A resulting billing form is shared back with the provider, indicating whether payment will be made or the claim was denied.

Patient eligibility data is an additional critical subset of claims data.  It provides exact start and end dates indicating the specific time period a patient was eligible for insurance and therefore insurance would have paid for covered medical expenses.  Eligibility data is critical - without it you can't calculate population-level financial (PMPM) or utilization (PKPY) measures, which is of primary interest in most of value-based care analytics.

Almost all insurance companies retain a copy of the claims (and eligibility) data in a database.  Each company decides how to model this data on their own, and while the basic data elements are common, most of the schemas (i.e. how the data are modeled in tables in a database) for these datasets vary.

Check out the [input layer](https://docs.google.com/spreadsheets/d/1TMMM1u8GTdWqxGcHALRtGMjcxBXQwBbWUW8pHL66W_E/edit?usp=sharingß) of the Claims Pre-processing Package from the Tuva Project to see what a relatively common claims data schema looks like.

## Claims Data Pre-processing

Before claims data can be used in many of the most common value-based care or population-level use cases, it must first go through a transformation process.  This process involves the following steps:

- Creating a member months table from eligibility data
- Adjusting and reversing claims
- Merging claims into encounters
- Assigning encounter types

Creating the member months table...

Adjusting and reversing claims...

Merging claims into encounters...

## Analytic Uses of Claims Data

- Value-based Care Analytics
- Fraud, Waste, and Abuse
- Health Economics and Outcomes Research (HEOR) Studies
- Drug Development and Commercialization

## References

- [Claims Data: Source and Processing](https://www.youtube.com/watch?v=6wTohlWfwAo)
- [The Fragmentation of Health Data by Travis May](https://medium.com/datavant/the-fragmentation-of-health-data-8fa708109e13)