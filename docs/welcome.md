---
id: intro
title: "Welcome"
hide_title: true
slug: /
---

![The Tuva Project](/img/the-tuva-project.jpg)

Welcome to the Tuva Project!  The Tuva Project is a collection of data marts and terminology code sets for transforming healthcare data so that it's ready for analytics and machine learning.

## The Tuva Project Manifesto

### Healthcare Data is in Crisis

The world has been talking about the promise of electronic healthcare data for decades. Soon, experts say, analysis of medical records and claims data (so-called real world data) will lead to rapid increases in our understanding of diseases and the best way to treat them.

As an industry we've been working to realize this promise since claims data became widely available in the mid-1990s. This work accelerated in the early 2010s with broad adoption of electronic medical record systems. And to be sure, we've had some success. Exciting papers have been published and hospitals are using data to improve operations and avoid unnecessary patient harm.

But more than success we've experienced failure and frustration. For example, it can take weeks to answer questions that should be straightforward, like which patients are receiving the standard of care treatment for a given disease. Worse, when you finally arrive at an answer serious questions about data quality and validity exist, calling the results into question.

So even after several decades, healthcare data is in crisis, and to date we haven't focused on solving the problem.

### The Healthcare Data Transformation Problem

Healthcare data is perhaps more complex than data from any other industry. This complexity is directly tied to the complexity of human biology. There are thousands of body systems, diagnostic tests, diseases, and treatments, all of which are captured in healthcare data.

The complexity of healthcare data is also related to the fact that various systems (e.g. EMRs) that generate the data are highly variable in how they capture data.

The end result is that healthcare data is extremely heterogenous. There is a lot of syntactic variation (i.e. how the data is organized into tables and columns) and semantic variation (i.e. concepts used to assign meaning to the actual values of the data). This variation makes it impossible to perform data analysis on raw healthcare data.

As an industry we've understood this for some time, but we've been busy solving other problems. To take a step back, there are 3 main steps in the healthcare analytics value chain, i.e. the process of going from raw healthcare data to insights. These steps are:

1. Data Access
2. Data Transformation
3. Data Analysis

**Data Access:** Data access is the process of acquiring healthcare data. For example, if you're a provider you may only have a limited portion of the data for your patient population (i.e. from your EMR) and want access to more data to complete the picture.

**Data Transformation** Data transformation is the process of organizing atomic-level healthcare data, syntactically and semantically normalizing the atomic-level data, and creating higher-level concepts on top of the normalized atomic data.

**Data Analysis** Data analysis involves using statistics and machine learning to answer specific questions to gain insights from the transformed data.

As an industry we've historically focused on data analysis, i.e. building applications (e.g. dashboards, web apps, etc.) that make it easier to analyze healthcare data. And recently, thanks to regulation changes and investment from a number of companies like Flexpa, Particle, Zus, Health Gorilla, and others, the data access problem is getting closer to being solved.

However, we've under-invested in data transformation, leading to "garbage in, garbage out" data analysis. Today, the most common solution to data transformation is to "throw people at the problem". But this approach doesn't scale and leads to inconsistent results.

### An Open Source Solution

After working in healthcare data for more than a decade we decided to focus all of our attention on solving the healthcare data transformation problem, and after thinking about the problem deeply, we realized an open source approach was ideal because it enables a) peer review and b) frictionless adoption.  Open source enables transparent peer review by allowing anyone in the industry to review, comment on, and contribute to our code and methods, and since our goal is to figure out the best way to do healthcare data transformation, this sort of open feedback and contribution is extremely important.  Open source also enables frictionless adoption by healthcare organizations because they can fork the open source and run it locally inside their private network, removing the need to sign a business associates agreement or perform lengthy security reviews, both of which are significant barriers to technology adoption in healthcare.

The Tuva Project is this open source solution. It's a library of tools for transforming healthcare data so that it's ready for analytics and machine learning. This includes reference terminologies for standardizing atomic-level data, data marts for building higher-level concepts, and data quality tests. We've designed and engineered the Tuva Project to run on the modern data stack, meaning a cloud data warehouse (e.g. Snowflake, BigQuery, Redshift) and dbt.

### About Tuva Health

Our company, Tuva Health, is the for-profit company behind the Tuva Project. We're a team of healthcare data engineers and data scientists totally focused on solving the healthcare data transformation problem.

The Tuva Project is open source and licensed under Apache 2, one of the most permissive open source licenses. Individuals and organizations are free to test out, adopt, or fork (customize) any part of the Tuva Project for any reason. We also offer paid services to organizations that need help implementing and/or maintaining the Tuva Project on their healthcare data.

The name Tuva is a reference to the country of Tuva in the former Soviet Union. For more than a decade before his death, [Richard Feynman](https://en.wikipedia.org/wiki/Richard_Feynman) and his friend [Ralph Leighton](https://en.wikipedia.org/wiki/Ralph_Leighton) tried to travel to the country of Tuva. During the cold war getting visas for this journey was no easy feat. Ultimately Feynman died a few weeks before their visas came, but Ralph traveled to Tuva and chronicled the trip and their adventure trying to get there in his book [Tuva or Bust](https://www.amazon.com/Tuva-Bust-Richard-Feynmans-Journey/dp/0393320693).

We're massive Feynman fans and especially appreciate his strong values around intellectual honesty and curiosity. We believe these values and behavior are at the core of doing anything important in the world and we're centering the Tuva Project around them.

Healthcare data has been challenging to work with since the inception of claims data in the mid-90s. The Tuva Project is our attempt to fix it - Tuva or Bust.