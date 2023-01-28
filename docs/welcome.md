---
id: intro
title: "Welcome"
---
Welcome to Knowledge Base!  Knowledge Base is an open source repository of knowledge about healthcare data and how to analyze it.  Healthcare data is difficult to work with, in large part because it requires a lot of specialized knowledge, and there's no single place where this knowledge is written down.  As a consequence, you end up having to work in healthcare data for 5-10 years to learn the ropes.  The goal of Knowledge Base is to make it easier for people to learn about how to work with and analyze healthcare data. 

Right now the main focus of the Tuva Project is claims data, so a lot of the content in Knowledge Base is about working with and analyzing claims data.  The main sections of Knowledge Base are as follows:

- **Getting Started:** Learn how to get started with [dbt](https://www.getdbt.com/) and the Tuva Project.

- **Claims Data Fundamentals:** Learn the fundamentals about claims data e.g. what is is, how it's generated, and basic concepts that are important for analytics.

- **Claims Data Analytics:** Learn how to analyze claims data with example SQL queries you can run directly against the Tuva Project data model.

- **Claims Data Warehousing:** Learn best practices for building and operating a claims data warehouse and health data platform.

## What is the Tuva Project

The Tuva Project is a set of open source healthcare-specific data models, data marts, data quality tests and terminology sets built on top of [dbt](https://www.getdbt.com/) for the modern data stack.  


![The Tuva Project](/img/tuva_claims_data_stack.jpg)

Our main focus right now is building out the claims data stack, which includes the following set of tools designed for claims data:

- **Claims Data Model (CDM)**: A common data model that is easy to map raw claims data into and is specifically designed for doing healthcare analytics.

- **Data Marts**: Higher-level concepts that include things like measures, groupers, and risk models, built on top of the claims common data model.

- **Data Profiling**: A set of claims-data-specific data quality tests that run on the claims common data model.

- **Terminology**: Common claims terminology sets that are applied to the claims common data model and data marts.

## Who is Tuva Health

Tuva Health is the for-profit company behind the Tuva Project.  We're a team of healthcare data engineers and data scientists totally focused on solving the messy healthcare data problem by bringing knowledge and code out into the open.  Being a for-profit company is extremely important to the long-term success of our mission because it enables us to make significantly larger R+D investments in the open source over time compared to a not-for-profit corporate structure.  The larger investment increases the probability that we'll achieve our mission of solving this problem for the entire industry.

Our business model is to support organizations in adopting the Tuva Project.  The Tuva Project is open source and licensed under Apache 2.  Individuals and organizations are free to try out, adopt, or fork (customize) any part of the Tuva Project for any reason.  However some organizations need help adopting the Tuva Project, either because they lack the expertise or people to implement it.  That's where we come in.  We do everything from helping organizations get up and running to fully managing the Tuva Project for them, all within their cloud environment.



## Why Tuva

The name Tuva is a reference to the country of Tuva in the former Soviet Union.  For more than a decade before his death, [Richard Feynman](https://en.wikipedia.org/wiki/Richard_Feynman) and his friend [Ralph Leighton](https://en.wikipedia.org/wiki/Ralph_Leighton) tried to travel to the country of Tuva.  During the cold war getting visas for this journey was no easy feat.  Ultimately Feynman died a few weeks before their visas came, but Ralph traveled to Tuva and chronicled the trip and their adventure trying to get there in his book [Tuva or Bust](https://www.amazon.com/Tuva-Bust-Richard-Feynmans-Journey/dp/0393320693).

We're massive Feynman fans and especially appreciate his strong values around intellectual honesty and curiousity.  We believe these values and behavior are at the core of doing anything important in the world and we're centering the Tuva Project around them.  

Healthcare data has been challenging to work with since the inception of claims data in the mid-90s.  The Tuva Project is our attempt to fix it - Tuva or Bust.