---
id: intro
title: "Welcome"
hide_title: true
slug: /
---

![The Tuva Project](/img/the-tuva-project.jpg)

Welcome to the Tuva Project!  The Tuva Project is a collection of data marts and terminology code sets for transforming raw healthcare data into high-quality data that is ready for analytics and machine learning.

## The Tuva Project Manifesto

_Healthcare data has been challenging to work with since the inception of claims data in the mid-90s. The Tuva Project is our attempt to fix it - Tuva or Bust._

### Healthcare Data is in Crisis

The healthcare industry has been talking about the promise of electronic health data for decades. Soon, experts say, analysis of medical records and claims data (so-called real world data) will lead to rapid increases in our understanding of diseases and the best way to treat them.

As an industry we've been working to realize this promise since claims data became widely available in the mid-90s. This work accelerated in the early 2010s with broad adoption of electronic medical record systems. And to be sure, we've had some success. Exciting papers have been published and hospitals are using data to improve operations and avoid unnecessary patient harm.

But more than success we've experienced failure and frustration. For example, it can take weeks to answer common questions like which patients are receiving standard of care treatment for a given disease. Worse, when you finally arrive at an answer serious questions about data quality and validity commonly call the results into question.

So after several decades, healthcare data is in crisis, and to date we haven't focused on solving the problem.

### The Healthcare Data Transformation Problem

Healthcare data is perhaps more complex than data from any other industry. This complexity is directly tied to the complexity of human biology. There are thousands of body systems, diagnostic tests, diseases, and treatments, all of which are captured in healthcare data.

The complexity of healthcare data is also related to the fact that the various systems (e.g. EMRs) that capture the data are highly variable in how they capture data.

The end result is that healthcare data is extremely heterogenous. There is a lot of syntactic variation (i.e. how the data is organized into tables and columns) and semantic variation (i.e. the meaning of the actual values of the data). This variation makes it impossible to perform data analysis on raw healthcare data.

As an industry we've understood this for some time, but we've been busy solving other problems. To take a step back, there are 3 main steps in the healthcare analytics value chain, i.e. the process of going from raw healthcare data to using that data to answer important questions. These steps are:

1. Data Access
2. Data Transformation
3. Data Analysis

**Data Access:** Data access is the process of acquiring healthcare data. For example, if you're a provider you may only have a limited portion of the data for your patient population (i.e. from your EMR) and need access to more data to complete the picture (e.g. by tapping into an HIE).

**Data Transformation** Data transformation is the process of syntactically and semantically normalizing atomic-level data, creating higher-level concepts on top of the normalized atomic data, and identifying data quality issues in the data.

**Data Analysis** Data analysis involves using statistics and machine learning techniques to answer specific questions to gain insights from the transformed data.

As an industry we've historically focused on data analysis (e.g. building dashboards, web apps, etc.) that make it easier to analyze healthcare data. Over the last few years, thanks to regulation changes and investment from a number of companies like Flexpa, Particle, Zus, Health Gorilla, Metriport, and others, the data access problem is getting closer to being solved.

However, as an industry we've significantly under-invested in data transformation, leading to "garbage in, garbage out" data analysis. Today, the most common solution to data transformation is to "throw people at the problem". But this approach doesn't scale and leads to inconsistent results.

### An Open Source Solution

After working in healthcare data for more than a decade we decided to focus all of our attention on solving the healthcare data transformation problem.  After thinking about the problem deeply, we realized an open source approach was ideal because it enables two key things:

1. Peer review and contribution
2. Frictionless adoption

Open source enables transparent peer review by allowing anyone to review, comment on, and contribute to our code and methods.  Since our goal is to figure out the best way to do healthcare data transformation, this sort of open feedback and contribution is extremely important. 

Open source also enables frictionless adoption by healthcare organizations because they can fork the open source and run it locally inside their private network.  This removes the need to sign a business associate agreement or perform lengthy security reviews, both of which are common barriers to adopting new technology in healthcare.

The Tuva Project is our open source solution to the healthcare data transformation problem.  Our goal is to figure out the best way to do healthcare data transformation by working in an open and transparent way with the entire healthcare industry.  We're excited to work and partner with those in the healthcare industry that are committed to leveraging healthcare data to its fullest potential in an open and transparent manner for the benefit of patients, providers, and the entire ecosystem.

### About Tuva Health

[Tuva Health](https://tuvahealth.com/) is the for-profit company behind the Tuva Project. We're a team of healthcare data engineers and data scientists totally focused on solving the healthcare data transformation problem.  Being a for-profit company is extremely important because over time it allows us to make significantly larger investments in the open source code base compared to a non-profit corporate structure.

The Tuva Project is open source and licensed under Apache 2, one of the most permissive open source licenses. Individuals and organizations are free to test out, adopt, or fork (customize) any part of the Tuva Project for any reason. We also offer paid services to organizations that need help implementing and/or maintaining the Tuva Project on their healthcare data.

The name Tuva is a reference to the country of Tuva in the former Soviet Union. For more than a decade before his death, [Richard Feynman](https://en.wikipedia.org/wiki/Richard_Feynman) and his friend [Ralph Leighton](https://en.wikipedia.org/wiki/Ralph_Leighton) tried to travel to the country of Tuva. During the cold war getting visas for this journey was no easy feat. Ultimately Feynman died a few weeks before their visas came, but Ralph traveled to Tuva and chronicled the trip and their adventure trying to get there in his book [Tuva or Bust](https://www.amazon.com/Tuva-Bust-Richard-Feynmans-Journey/dp/0393320693).

We're massive Feynman fans and especially appreciate his strong values around intellectual honesty and curiosity. We believe these values and behavior are at the core of doing anything important in the world and we're centering the Tuva Project around them.

Healthcare data has been challenging to work with since the inception of claims data in the mid-90s. The Tuva Project is our attempt to fix it - Tuva or Bust.