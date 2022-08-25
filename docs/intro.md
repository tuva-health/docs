---
sidebar_position: 1
---

# Welcome

If you want to learn more about healthcare data and how to work with it, you've come to the right place!

![The Tuva Project](/img/tuva_project_map.jpg)
You can access an interactive version of the Tuva Project Map [here](https://miro.com/app/board/uXjVPdixcVg=/?share_link_id=665552924995).

## What Is The Tuva Project

The Tuva Project is open source code and supplemental datasets (e.g. terminology sets, value sets, etc.) that make it easier to clean and transform raw healthcare data.  The components of the Tuva Project are organized into 5 categories:

- **Connectors + Staging**: Code that automatically connects to common healthcare data formats so they can be run through the Tuva Project
- **Supplemental Datasets**: Terminology sets, value sets, and open datasets organized from across the internet
- **Preprocessing**: Code that standardizes, normalizes, and profiles raw healthcare data sources
- **Core Concepts**: Fundamental concepts that are necessary for basic analytics and are a foundation for higher-level concepts
- **Higher-level Concepts**: Code that creates new columns of data needed for advanced analytics (e.g. measures, groupers, etc.)

We are building the Tuva Project on a wide variety of healthcare data sources, including 3rd party datasets and datasets from customers and design partners, to ensure the Tuva Project generalizes across the widest variety of healthcare data sources.

## Why We Started The Tuva Project

The Tuva Project project was started by Aaron Neiderhiser and Coco Zuloaga.  After working in healthcare data science for more than a decade they were tired of spending 98% of their time cleaning and transformation raw healthcare data, finding and fixing data quality issues, etc., and very little time doing what they thought they were supposed to be doing: building analytics and ML to help improve care delivery and find better treatments.

It turns out that there are essentially no tools available to healthcare data practitioners to help with this problem.  While general-purpose data tooling has improved significantly over the last decade, very little has changed in terms of healthcare data tooling.  And working with healthcare data is different than other types of data because of the tremendous amount of subject matter expertise (i.e. domain knowledge) needed to make sense of the data.  This comes up in almost every facet of the work healthcare data practitioners do: building measures and cohorts, preprocessing claims and clinical data, identifying high-risk patients.  A healthcare data practitioner needs domain knowledge about how care is delivered, human health and biology, and the data generation process for the data they are analyzing.  

Where does this knowledge live today?  It's institutional knowledge that lives within healthcare data teams and within healthcare data practitioners (probably within you).  Many of us who have been in the industry long enough, have had the experience of trying to learn something new, only to be told that we should "go talk to Susie who's been with the company for 20 years and works in the basement - she's the resident expert on the topic."  What if Susie doesn't exist at your company?

What's the problem with institutional knowledge?  It's hidden and not accessible to everyone, so it doesn't scale.  As an industry we end up learning and re-learning the same things over and over, writing and re-writing the same code over and over.  We created the Tuva Project to bring this knowledge out into the open, to create a place where folks with this institutional knowledge can help everyone working on healthcare data.  And, hopefully, we won't have to spend 98% of our time cleaning up raw data anymore.

## Why Open Source

Today, healthcare data knowledge is closed and institutional.  Try Googling almost any topic in healthcare data and see how far you get.  

Similarly, healthcare code is closed.  Your company (vendor, health system, payer, pharma, etc.) is building this code from scratch or paying a vendor who built it from scratch to deliver it to you in a black-box form for hundreds of thousands or millions of dollars.  But has this investment led to better quality data for analysis?  

That's why open source is key to how we solve this problem.  By making healthcare knowledge and code open, we give individuals and organizations the tools they need to build their healthcare data platform and data team without having to start from zero.  And we stop the cycle of building the same thing over and over.

The last few years we've seen a revolution in open source data tools, including [dbt](https://www.getdbt.com/), [great_expectations](https://greatexpectations.io/), and [Airbyte](https://airbyte.com/).  It's time for healthcare to catch up.

## Who is Tuva Health

Tuva Health is the for-profit company behind the Tuva Project.  We're a team of healthcare data engineers and data scientists totally focused on solving the messy healthcare data problem by bringing knowledge and code out into the open.  Being a for-profit company is extremely important to the long-term success of our mission because it enables us to make significantly larger R+D investments in the open source over time compared to a not-for-profit corporate structure.  The larger investment increases the probability that we'll achieve our mission of solving this problem for the entire industry.

Our business model is to support organizations in adopting the Tuva Project.  The Tuva Project is open source and licensed under Apache 2.  Individuals and organizations are free to try out, adopt, or fork (customize) any part of the Tuva Project for any reason.  However some organizations need help adopting the Tuva Project, either because they lack the expertise or people to implement it.  That's where we come in.  We do everything from helping organizations get up and running to fully managing the Tuva Project for them, all within their cloud environment.

## Why the Name Tuva

The name Tuva is a reference to the country of Tuva in the former Soviet Union.  For more than a decade before his death, [Richard Feynman](https://en.wikipedia.org/wiki/Richard_Feynman) and his friend [Ralph Leighton](https://en.wikipedia.org/wiki/Ralph_Leighton) tried to travel to the country of Tuva.  During the cold war getting visas for this journey was no easy feat.  Ultimately Feynman died a few weeks before their visas came, but Ralph traveled to Tuva and chronicled the trip and their adventure trying to get there in his book [Tuva or Bust](https://www.amazon.com/Tuva-Bust-Richard-Feynmans-Journey/dp/0393320693).

We're massive Feynman fans and especially appreciate his strong values around intellectual honesty and curiousity.  We believe these values and behavior are at the core of doing anything important in the world and we're centering the Tuva Project around them.  

Healthcare data has been challenging to work with since the inception of claims data in the mid-90s.  The Tuva Project is our attempt to fix it - Tuva or Bust.
