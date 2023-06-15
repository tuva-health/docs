---
id: about
title: "PMPM"
---
The PMPM data mart transforms claims data so it's ready for "per-member-per-month" analysis, which is frequently used to analyze payments and utilization.  It builds on top of the Member Months and Service Category data marts.

## Assigning Claims to Member Months

The process of calculating PMPM is requires assigning claims to a particular member month.  We rely on claim service dates for this assignment.  Specifically, we use claim_start_date.  If claim_start_date does not exist, we use claim_end_date.  If neither claim_start_date nor claim_end_date exist, the claim is not assigned to a member month and is excluded from PMPM analysis.