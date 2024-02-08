---
id: overview
title: "Overview"
---
# What is risk adjustment?

Risk adjustment was developed and created to dissuade payers from selectively enrolling patients who are healthy 
into health plans and make sure payers are compensated fairly for the illness burden of patients. Risk adjustment 
models are used to calculate payments to healthcare organizations for patients insured by:
* Medicare Advantage
* Accountable Care Organizations
* Most Affordable Care Act plans. [[1]](#footnotes)

At a high level, if a patient is sicker or has higher predicted medical cost, the payer insuring that patient will be 
compensated more. 

A Risk Adjustment Factor Score ("RAF score") is a measure of the estimated cost of an individual's care based on 
demographic factors such as age and gender and their associated disease factors (how costly/sick is the individual 
patient). This RAF score is then used to calculate payments or reimbursements to these organizations.

## What risk adjustment models exist?

There are multiple risk adjustment models that exist for both Medicare patients and commercial patients. 
The most common risk adjustment models are:

* HHS-HCC
* CMS-HCC NON-ESRD
* CMS-HCC ESRD
* RxHCC
* PACE [[2]](#footnotes)

Each risk adjustment model has in common that it tries to predict medical expense using demographic 
information and disease factors for patients.

## What are HCCs?

"HCC" stands for Hierarchical Condition Categories. They are sets of medical codes linked to clinical diagnoses 
that aim to predict cost for acute and chronic health conditions. HCC coding relies on ICD-10-CM coding to assign 
risk scores to patients. Not all risk adjustment models have to use HCCs, but almost all do.

## Comparison between HHS-HCC and CMS-HCC

One way to separate HHS and CMS HCC models would be to call them respectively "commercial risk adjustment" (HHS) 
and "Medicare risk adjustment" (CMS). These two main models are similar but are separate:

| **CMS-HCC Model**                                                             | **HHS-HCC Model**                                                      |
|-------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Used for Medicare                                                             | Used for Affordable Healthcare Act (ACA) plans                         |
| Base year informs next year's payment                                         | Current year diagnoses inform current year payment                     |
| Focused on patients 65 and older, but can include younger disabled population | Focused on all ages                                                    |
| Drug costs are carved out in separate model                                   | Drug costs are included                                                |
| Has distinct model and break out for ESRD patients                            | Does not carve out ESRD in separate risk adjustment model              |
| Is not a zero-sum payment system                                              | Is zero-sum between payers that participate in ACA                     |
| Has Normalization Factor and Coding Pattern Difference Adjustment             | Has final adjustment for CSR benefit curve and utilization differences |

## FAQ

#### What does zero-sum mean?

Zero-sum in the context of commercial risk adjustment (HHS-HCC Model) means that there is no government subsidization
for private companies in the risk adjustment process. If the illness burden of a state in total increases from the prior 
year, the government provides no additional funds. What happens during reconciliation is some health insurance 
companies will have to pay into a pool because they have healthier than average patients. Some organizations will 
get paid out from that pool because they have sicker than average patients. The total transfer of dollars adds up to $0.

#### If risk scores inform payments, how are risk scores checked to make sure they are not overinflated?

Both HHS-HCC and CMS-HCC models go through a validation process which is called "Risk Adjustment Data Validation" 
(aka RADV). The RADV processes and procedures are different for different risk adjustment models.

#### Can you compare risk scores between years to see the illness burden of a patient change over time?

This can be done, but is not recommended, especially if using different risk adjustment models between different years. 
There may be other models that can more accurately reflect illness burden, and risk adjustment is mainly focused on 
predicted medical expenditure. These two things are correlated, but not necessarily the same.

## Resources


## Footnotes

[1] ACA health plans that are not subject to risk adjustment are Grandfathered plans, Short-term, limited-duration plans,
Health Reimbursement Arrangements (HRAs), and plans offered by states that have received a waiver from HHS.

[2] Program of All Inclusive Care for the Elderly
