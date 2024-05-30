---
id: pharmacy
title: "Pharmacy"
---

- [Data Dictionary](../data-dictionaries/pharmacy)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/pharmacy/)

Understanding pharmacy spend in healthcare data is crucial for identifying cost trends and optimizing medication management. It allows healthcare providers and payers to track drug utilization, assess the efficacy of formulary decisions, and implement strategies to enhance patient care while controlling costs.

Currently, the pharmacy mart contains the brand and generic retail pharmacy analysis. This runs on claims data and provides an easy, out-of-the-box way to identify which brand drugs members were prescribed to members when a generic alternative was available. It also calculates what the dollar savings would be when switching to a generic, based on historical generic prices in your claims history.

There are 3 final tables in the pharmacy mart:

1. **brand_generic_opportunity**  
   This table calculates the potential dollar savings when switching from a brand drug to an available generic. It operates at the claim line level.

2. **pharmacy_claim_expanded**  
   This table reproduces the pharmacy_claim table with the additional fields produced by the brand generic analysis.

3. **generic_available_list**  
   This table lists all available generics at the NDC code level for each brand drug. It can be joined with the pharmacy_claim_expanded table using the generic_available_sk field.
