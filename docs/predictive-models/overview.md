---
id: overview
title: "Overview"
hide_title: true
---

# 9. Predictive Models
<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 06-21-2025</em></small>
</div>

We are building a large library of predictive models that run on top of the Tuva data model.  These predictive models are classical machine learning models, such as logistic regression, random forrest, and xg-boost.  

All the predictive models we are building fall into two categories:

1. Risk-adjusted Benchmarking Models
2. Risk Stratification Models

**Risk-adjusted Benchmarking Models** are used to create patient-level and encounter-level benchmarks that are adjusted for disease and demographic factors.  The models generate so-called expected values for cost, utilization, and outcome metrics.  For example, every patient in your claims dataset should have a medical PMPM.  With risk-adjusted benchmarks you can generate an expected medical PMPM for each patient.  You can then aggregate both the observed (i.e. actual) PMPM and compare to the expected PMPM aggregated across your patient population.

**Risk Stratification Models** are used to predict future events.  For example, what's the probability that a patient will be admitted to the hospital in the next 30 days.  They are called stratification models because in progress they are used to stratify (i.e. rank, order) a list of patients from highest to lowest risk.