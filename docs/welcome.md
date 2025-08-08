---
id: welcome
title: "Welcome"
hide_title: true
hide_table_of_contents: true
image: /img/the_tuva_project_6.jpg
slug: /
---

# 👋 Welcome

Welcome to the Tuva Project! Our goal is to democratize access to high-quality healthcare analytics by open-sourcing the tools and knowledge needed to transform and analyze healthcare data.

## What is the Tuva Project?
The Tuva Project is a collection of open-source tools designed to help organizations turn complex, messy healthcare data into insights. We are currently focused on supporting data from claims, EHR, FHIR, ADT, and lab sources. The tools we’ve built are shown in the diagram below and fully documented on this website.


![Tuva Project Overview](/img/the-tuva-project-2.png)

At the heart of the Tuva Project is the Tuva Data Model—a purpose-built, analytics-friendly model that goes beyond simply storing raw data. It defines a universe of high-level concepts and organizes them into analytic data marts that make it easy to ask essential questions like:
	•	What is my ED spend?
	•	What is my 30-day readmission rate?
	•	How many patients are on GLP-1 agonists?

These questions are nearly impossible to answer directly from raw data, which lacks the semantic structure needed for analysis. The Tuva Data Model bridges that gap by providing thousands of standardized, analysis-ready concepts essential for healthcare analytics.

## Tools in the Tuva Project

Beyond the data model, the Tuva Project includes a growing suite of tools that help you build a modern healthcare data platform. While these tools are designed to work seamlessly with the Tuva Data Model, some can also operate independently. For example:

- **Tuva EMPI** is a standalone application for patient matching and deduplication across data sources. Although it integrates natively with the Tuva Data Model, it can also run independently.

- Other tools—such as  **predictive models**, **dashboards**, and **notebooks** depend on your data being in the Tuva Data Model, as they rely on the standardized concepts it provides.

## Getting Your Data Into the Tuva Data Model

To use the Tuva Data Model, you first need map your raw data into the *Tuva Input Layer*, a standardized schema designed for raw healthcare data. This mapping is done through *Connectors* - data pipelines that transform your source data into the Input Layer format.

To get started:
- Visit the [Connectors](/docs/connectors/) section of this site.
- Browse pre-built connectors for common data formats.
- Or learn how to build a connector for your specific data sources.


To learn more about why we started the Tuva Project read our manifesto [here](/community/manifesto).

For organizations that need help installing and operating Tuva, we offer a pre-orchestrated, turnkey version called Tuva Enterprise, which we install and manage inside the organization's cloud environment.  Tuva Enterprise includes processing of data feeds and analytics consulting to help the organization get the most out of Tuva.  Contact us [here](https://tuvahealth.com/request-a-demo/) to learn more.
