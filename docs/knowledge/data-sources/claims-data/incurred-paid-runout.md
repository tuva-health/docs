---
id: incurred-paid-runout
title: "Claims Lag Issues"
description: This section covers the time lag between the date that healthcare services are performed (i.e. claims are incurred) and when they are processed and paid, and common approaches to accounting for this lag in analytics. 
---

## Medical Claims Dates

There are typically two important dates to account for when analyzing claims data:

**Incurred Date** This is the date that the healthcare service/s recorded on the claim was rendered. There are tecnically no fields on a claim form labled *incurred date*. Instead this date is typically derived from the Claim Start or Claim End dates on either the claim header or the claim line. Sometimes these dates are supplemented with Admission Start or End dates found on Institutional claims. The Tuva Project for example uses hierarchical assignment logic that first selects the claim header start date, then subsitutes in claim end dates, claim line start & end dates, or admit start and end dates depending on the type of claim. The important thing to know is that this *incurred date* field should represent the date the service was performed or *rendered* (as it is sometimes referred to). 

**Paid Dates** - Paid dates are simply the date that a claim was paid. As with most concepts relating to healthcare though, the actual date that a claim was paid can be subject to interpretation and complexity. Sometimes, claim feeds may use the concepts of *claims processed dates* and *claims paid dates* synonymously, when in fact a claim could be adjudicated/processed one day and an actual claims check or payment processes later. This nuance is often abstracted away unless you are dealing with a claims feed that has both dates, or you work at a health insurance company and must decide which date/concept makes the most sense for your analytical use case. In most analytical cases, the date the claim was processed is sufficient since what we often want to understand is the time lag between when a service was rendered and when we see that reflected in claims. That said, a claims feed from a payer often contains only claims that were actually paid. For the purposes of the rest of this chapter, we will use the term "Paid" date and treat the two concepts synonymously. 

## Claims Lag
Typical claims analytics utilize data feeds that update monthly, with the latest complete month containing all claims that were *paid* in that month. This does not mean however that the latest month contains all claims that were *incurred* in that month. It is common for medical claims to take some time to be submitted by the provider and work their way through the chain of revenue cycle management vendors, clearinghouses, adjudication systems, and internal payer ETL or ELT processes and into the payer data warehouse for analysis or distribution to downstream partners, ACOs, analytics teams etc... 

This delay is commonly referred to in the industry as **Claims Lag**. Claims Lag can significantly impact claims analytics, causing an artificial drop off in cost and utilization in the most recent months preceding the analysis. 


![claims lag image](/img/claims_lag.png)

The figure above shows an example of the impact of claims lag, where the medical claims inpatient visits per 1000 drops off significantly beginning in July. The actual inpatient visits per 1000 is depicted by the "EWS" which in this case represents "Early Warning System" data that tracks inpatient utilization via non-claims sources like Hospital Admissions or EMR data. The delta between the two is shaded in blue. As you can see, utilization is dramatically underestimated in later months. This lag represents a typical, predictable, phenomenon in healthcare economics that is typically dealt with in 2 key ways: 

## Claims Runout

 Wait for sufficient time to elapse so that lagging claims show up in the data and have a more complete picture. Typically, this involves leaving waiting until you have elapsed at least 3 full months time since the last incurred date in the time period of claims you are analyzing. At this point, it is typical, but not guaranteed to have nearly complete claims, if you are receiving the updated claims data feeds very soon after processing (typical in health plans). If you are recieving claims as a provider or 3rd party, sometimes you will require more lag time to account for delays in when you get your extract. You should typically receive the incurred and paid time periods covered by the extracts you are receiving. Often times, value based care contract specify how much paid runout is required to conduct the final analysis of the claims, and it is often at least 6 months of paid claims runout from the last month of incurred claims. Eg. Jan 2024 - Dec 2024 Incurred, Jan 2024 - June 2025 Paid. 

## Completion Factors

 A set of adjustment factors or weights that are applied to aggregate costs for each month, such that the costs are adjusted more in recent months. These factors are derived from historical analysis of the completeness of claims relative to a given point in time. The output of this analysis is commonly referred to as a lag traingle, which plots the percentage of incurred claims that have been paid in each month since the incurred month. This is done using historical data so the percentage of claims is truly known. In the table below, you can see that in past years, 60% of claims incurred in January were paid in January, 85% of claims incurred in January were paid by the end of February (1 month following incurred date), 93% of claims incurred in January were paid in March, and so on. As you can see in this example, it is possible for some claims to lag for very long periods of time. This is often due to pending manual review or disputes between providers and payers that result in delays in processing and payment of claims. Often, these lagging claims are higher cost claims, typically those reflecting inpatient admissions. For this reason, completion factors are sometimes calculated separately for different service categories (eg. Inpatient, Outpatient, Professional, Pharmacy, Other). 

| Incurred Month| Age of Claim at Time of Payment (Months Since Incurred Date) |      |      |      |      |      |      |      |      |      |      |      |      |
|---------------|---------------------------------------------------------------|------|------|------|------|------|------|------|------|------|------|------|------|
|               | 0   | 1   | 2   | 3   | 4   | 5    | 6    | 7    | 8    | 9    | 10   | 11   | 12   |
| Jan           | 60% | 85% | 93% | 96% | 97% | 98%  | 98.5%| 99%  | 99.2%| 99.5%| 99.7%| 99.8%| 100% |
| Feb           | 58% | 84% | 92% | 95% | 97% | 98%  | 98.5%| 99%  | 99.2%| 99.5%| 99.7%| 99.8%| 100% |
| Mar           | 59% | 83% | 91% | 95% | 96% | 97%  | 98%  | 98.5%| 99%  | 99.3%| 99.5%| 99.7%| 99.8%|
| Apr           | 61% | 85% | 92% | 95% | 96% | 97%  | 98%  | 98.5%| 99%  | 99.3%| 99.5%|   –  |   –  |
| May           | 60% | 84% | 91% | 94% | 96% | 97%  | 98%  | 98.5%| 99%  |   –  |   –  |   –  |   –  |
| Jun           | 62% | 85% | 92% | 95% | 96% | 97%  | 98%  |   –  |   –  |   –  |   –  |   –  |   –  |
