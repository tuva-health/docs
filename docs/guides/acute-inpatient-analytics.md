---
id: acute-inpatient-analytics
title: "Acute Inpatient Analytics"
description: This guide
toc_max_heading_level: 2
---

## Overview

Conducting analysis of acute inpatient stays using claims data is complex, in no small part because the concept of an acute inpatient stay doesn't exist in raw claims data.  This guide describes how to perform analysis of acute inpatient stays using raw claims data.

The process involves four main steps:

1. **Tagging** Acute Inpatient Claims
2. **Grouping** Acute Inpatient Claims into Stays
3. **Preparing** Analytics-ready Data Table
4. **Performing** Analysis

In each of the first 3 steps we perform data quality analysis to check for issues in the raw claims data which may impact analysis.

All of the code to compute the first 3 steps is part of the Tuva Project.  In fact, if you follow our Claims Preprocessing guide, you can skip to step 4.

## Tagging Claims

The first step is tagging institutional and professional claims that meet the criteria for being considered "Acute Inpatient".  We define Acute Inpatient as a short-term hospital stay in a standard hospital (e.g. community, tertiary, academic, critical access).  Acute Inpatient stays do not include visits to psychiatric hospitals.

### Institutional Claims

There are many ways to determine if a given claim was related to an acute inpatient stay.  For institutional claims the following criteria are typically considered:

1. Room and board revenue code
2. MS-DRG or APR-DRG
3. Bill type code equal to 11X or 21X

## Grouping Claims into Stays

## Preparing Analytics-ready Data Table

## Performing Analysis