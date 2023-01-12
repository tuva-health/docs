---
id: how-claims-are-paid
title: "How Claims Are Paid"
---
## Key Questions
- What are the different scenarios for how adjustments, denials, and reversals appear in claims data?
- How can we identify adjustments, denials, and reversals in claims data?
- How do you calculate adjustment, denial, and reversal rates in a claims data?
- What adjustment, denial, and reversal rates are typical in a claims dataset?

## Overview
Raw healthcare claims data is often messy and suffers from many data quality issues, which impact analytics.  One of the most common types of issues is dealing with claims adjustments, denials, and reversals that are often hidden in raw claims datasets.  

Given a healthcare claims dataset, there are likely to be original, denied, reversed, and adjusted claims in the dataset.  Claims reversals and adjustments occur because payers allow providers to re-submit claims that have been submitted in error (e.g. wrong service was billed).  The result is often multiple claims for the same encounter are billed for different services and/or paid amounts.  Denied claims occur because the claim failed to pass some adjudication check performed by the payer.  The result is claims for services that may not have actually occurred.

Without appropriately accounting for and adjusting for claims adjustments, denials, and reversals, downstream analytics can be impacted.  For example:

- Utilization Analytics: Counts of services (e.g. ED visits, urgent care visits, etc.) may be inaccurate if billing codes change
- Chronic Conditions: Assessment of patient co-morbidities (e.g. type 2 diabetes) may be inaccurate if diagnosis codes change
- Cost per Claim: Multiple claims inflate the denominator in this calculation leading to inaccurate results

Claims adjustments and reversals may not be obvious or easy to identify in raw claims data.  However, they typically show up in 1 of 3 ways, depending on how the health insurer adjudicates their claims.  

- Scenario 1: Health insurer creates a new claim ID for each additional reversal and/or adjustment claim record
- Scenario 2: Health insurer uses the original claim ID for each reversal and/or adjustment claim, but includes an adjustment/reversal code on each claim to indicate whether each new record was a reversal or adjustment
- Scenario 3: Health insurer uses a combination of old and new claim IDs for reversals and/or adjustments (this is essentially a combination of scenario 1 and 2)

In our experience working across dozens of healthcare claims datasets, each scenario is equally common.

## An Example

It’s easiest to illustrate how claim adjustments and reversals manifest by looking at an example using sample data.  This fictitious example follows the third scenario (mentioned above), where a mix of old and new claim IDs are used.  

Suppose a provider submits a professional claim for a typical doctor’s visit that occurred in an urgent care facility.  The original claim is submitted with place of service code 11, indicating an office visit, and HCPCS code 99211, indicating a low severity evaluation and management visit.  However, the service was actually rendered in an urgent care facility (place of service code 20) and the appropriate HCPCS code that should have been billed was 99215, a higher-severity code.  

Both the change in place of service and the higher-severity HCPCS code would result in a larger payment by the health insurer to the provider, so the provider goes through the trouble of submitting a claim adjustment using the health insurers online billing portal.  The provider submits a claim adjustment and changes the place of service code to 20 and the HCPCS code to 99215.  Here’s how this might appear in the claims data:

**Original Claim**

| claim_id | claim_line_number | patient_id | place_of_service_code | hcpcs_code | paid_date | paid_amount |
|---|---|---|---|---|---|---|
| XYZ246810 | 1 | A1234 | 11 | 99211 | 01-01-2021 | 100.00 |

**Reversal Claim**

| claim_id | claim_line_number | patient_id | place_of_service_code | hcpcs_code | paid_date | paid_amount |
|---|---|---|---|---|---|---|
| XYZ246810 | 1 | A1234 | 11 | 99211 | 02-10-2021 | -100.00 |

**Adjustment Claim**

| claim_id | claim_line_number | patient_id | place_of_service_code | hcpcs_code | paid_date | paid_amount |
|---|---|---|---|---|---|---|
| GFJ123492 | 1 | A1234 | 20 | 99215 | 02-10-2021 | 250.00 |

Upon submitting the adjustment, a claim reversal record and a claim adjustment record is created.  The claim reversal uses the same claim_id and claim_line_number as the original claim.  Everything is the same as the original claim except for the following:

- paid_amount: This is equal to -1 times the original paid_amount, in effect reversing the payment
- paid_date: The paid_date represents the date when the reversed payment was transacted (which tends to match the date when the adjusted payment was made)

Simultaneously a new claim_id and claim_line_number is created for the adjustment claim.  The following data elements have changed on the adjustment claim:

- claim_id: This is a brand new claim ID for the adjusted claim
- place_of_service_code: The new place of service code is 20, reflecting an urgent care setting
- hcpcs_code: The HCPCS code was updated to 99215, reflecting a more resource-intensive visit
- paid_amount: The new paid amount is $200, reflecting a higher-severity HCPCS code and urgent care setting
- paid_date: The paid date reflects the date the adjusted payment was transacted

## Impact on Analytics

In an ideal world, all healthcare analytics should be based on a claims dataset that represents the true set of services rendered by the provider to the patient and payments rendered by the health insurer to the provider.  However, unless you account and correct for claims adjustments and reversals in raw claims data, you are including records in your analysis for services that may never have been delivered.  The problem with downstream analytics is much more on the utilization side than on the payments side.

**Payments**

Let’s start by exploring the impact on payments first, since it is minimal and more straightforward.  At the end of the day, claims adjustments and reversals will directly flow through to aggregate payment amounts (e.g. payments aggregated to PMPM level), generating the true/correct payment statistics.  For example, if a claim was submitted in error and then later a reversal was submitted, the sum of the paid amount for these two claims will be zero, which is the true paid amount we would expect.  As this example demonstrates, the aggregate payment amounts in any analysis (e.g. trending total medical PMPM by month) will be correct by default, without any changes made to the raw claims data.  Therefore, it's not usually necessary to identify and correct adjustments, reversals, or denials before calculating payment statistics.

**Utilization**

However, the impact on utilization analytics is not as straightforward.  In the simple example above we noticed that the place of service code changed from 11 (office visit) to 20 (urgent care).  Place of service code is an important piece of information used to group claims into encounters.  Without taking into account that a reversal and adjustment was made for this claim, it looks like two place of service codes exist for the same visit, and we are unsure which code to use to assign an encounter type to the claim (i.e. should the claim be labeled an office visit or urgent care visit).  

This has serious consequences for utilization analytics and also impacts payment analytics if we want to analyze payments by care setting.  For example, suppose we are interested in looking at spend across different care settings, e.g., acute inpatient, inpatient rehab, emergency department, urgent care, and office visit.  Without properly identifying and correcting claims adjustments and reversals we won’t be able to bucket spend or number of visits in the appropriate category.

## Identifying Adjustments and Reversals

As discussed above, there are generally 3 scenarios for how adjustments and reversals are generated in raw claims data.  The method used to identify adjustments and reversals depends on how adjustments and reversals are generated in the raw claims data.  

**Scenario 1: New Claim IDs for Each Adjustment/Reversal**

Dealing with new claim IDs is the most difficult scenario because you are in effect trying to determine a linkage across claim IDs when there isn’t a piece of data that tells you this.  That is, you need to identify new Claim IDs that are related to the original Claim ID.  To do this, start by looking for patients with multiple claims (i.e. multiple claim IDs).  To identify reversals, look for claims where all the data elements match, except the paid amount and the paid date.  To identify adjustments, look for claims that have a reversal, then look for subsequent claims where most of the information is the same but there may be minor differences (e.g. place of service code changed from 11 to 20).

**Scenario 2: Original Claim IDs for Each Adjustment/Reversal**

**Scenario 3: Combination New and Original Claim IDs for Each Adjustment/Reversal**

**Correcting Adjustments and Reversals**

As noted above, identifying adjustments and reversals involves a bit of trial and error and tends to be a manual process to some degree.  When correcting for claims adjustments and reversals you can’t simply remove parent claims/lines to create a “final” claim, as this would impact month-to-month cash flows.  Rather, you need to allow all claims/lines to flow through, but tag each claim with the appropriate adjustment code.

However, once you’ve identified adjustments and reversals it’s easy to account for and correct for them downstream.