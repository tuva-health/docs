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

This delay is commonly referred to in the industry as **Claims Lag**. Claims Lag can significantly impact claims analytics, causing an artificial drop off in cost and utilization in the most recent months preceding the analysis. See the figure below for an example of the impact of claims lag, where the medical claims inpatient visits per 1000 drops off significantly beginning in July. The actual inpatient visits per 1000 is depicted by the "EWS" which in this case represents "Early Warning System" data that tracks inpatient utilization via non-claims sources like Hospital Admissions or EMR data. The delta between the two is shaded in blue. This lag represents a typical, predictable, phenomenon in healthcare economics that can be dealt with in a few different ways. 

![claims lag image](/img/claims_lag.png)

## Claims Runout

## Completion Factors