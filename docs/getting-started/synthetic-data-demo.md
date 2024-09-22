---
id: synthetic-data-demo
title: "Synthetic Data Demo"
hide_title: false
---

We created a [demo project](https://github.com/tuva-health/the_tuva_project_demo) that comes with synthetic claims data that you can use if you don't have access to healthcare data.

The demo project is itself a dbt project that is already configured to import the Tuva package.  Running the demo project does the following:

1. Loads the synthetic claims data to your data warehouse
2. Transforms the synthetic claims data into the Tuva Input Layer
3. Imports and runs the Tuva package

After running the demo project you will end up with a database called Tuva with the Core Data Model, Data Marts, Terminology, and Value Sets all populated.