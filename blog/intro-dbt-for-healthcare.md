---
title: Intro to dbt for Healthcare
authors:
  - name: Aaron Neiderhiser
    title: Co-founder of the Tuva Project
    url: https://github.com/aneiderhiser
date: 2024-01-20
---

This post builds on a presentation my co-founder Coco Zuloaga created a few years ago to help healthcare organizations understand what exactly [dbt](https://www.getdbt.com/) is and why it's a critical tool for healthcare data and analytics teams.  You can find Coco's presentation at the bottom of this post.

<!--truncate-->

Healthcare has always been a laggard in terms of adopting new technologies.  Estimates vary, but often put healthcare 1 to 2 decades behind other industries.  Of course, the classic example is the fax machine, which is still very much alive in healthcare today. 

And it's no different with dbt.  Today we see 80-90% of health tech companies adopting dbt, but it's closer to 10-20% for traditional health systems, payers, and pharma.

Over the past several years, we've come to believe that dbt is an indispensible tool for healthcare data teams.

For many healthcare organizations, data engineering looks very much like it did in the early 2000s: thousands of SQL files saved in file folders across shared drives and local computers, never version-controlled, and orchestrated via stored procedures.

At the highest level, a data team without dbt is like a software engineering team without an IDE or git.  Developing, testing, and collaborating becomes so painful it's practically impossible.  Errors are common, iteration is slow, and everyone has their own version of the truth.

So how does dbt actually solve these problems?

## 1: Common Framework

dbt gives data teams a common framework for organizing their code.  The atomic unit is a dbt project.  Every dbt project has the exact same set of files and folders by default.  This consistency is simplifying and is similar to other software development frameworks, e.g. React, which is a web framework.

## 2: Data Warehouse Integration

If integrating your code with your data warehouse sounds trivial consider this: most data teams have hundreds or thousands of SQL files that must run in the exact right order.  How do you program them to run in the right order and then actually run them so that they build tables in your data warehouse?

Before dbt, data analysts would write SQL to create data tables and data marts ready for analytics and then this SQL would have to be refactored into stored procedures before it could be scheduled and run in production.  Someone else, typically a data or software engineer with little understanding of the SQL, would do the refactoring. 

This hand-off is efficient, which slows down development and increases the probability of introducing errors.

dbt eliminates the need for this hand-off but making it simple for data analysts to program the order of execution and to deploy the code to your data warehouse.  dbt will conect to any modern data warehouse (Snowflake, Bigquery, Databricks, Redshift, DuckDB, Postgres, Azure Synapse, etc.).  

## 3: Git Integration

dbt integrates with git.  This allows your data team to use git just like software engineering teams.  The main branch becomes your source of truth.  You can follow a traditional development workflow of branching, submitting pull requests, conducting code reviews, and merging.  You can easily integrate automated testing into this process, so that you know your code runs before you merge.  In software development this is often referred to as CI/CD, or continuous integration / deployment.

## 4: Marries Code, Docs, and Data Quality Testing

Finally, dbt combines code, documentation and data quality testing in a single place.  If you've worked in data engineering you know that before dbt this was seldom the case.  

## Getting Started with dbt

While we love dbt, we don't have any commercial relationship with them, so our bias is born out of love for the tool, not any financial incentive.

Organizations brand new to dbt can have a lot of questions:

- How many projects / repos should we have?
- How should we model our data?
- How and where should we implement data quality testing?
- How and where should we implement automated builds / testing?
- How should we manage larger seed files?

If you're considering adopting dbt and you'd like to avoid the same mistakes we made over the last several years, ping us on [Slack](https://join.slack.com/t/thetuvaproject/shared_invite/zt-16iz61187-G522Mc2WGA2mHF57e0il0Q) or shoot us an [email](https://tuvahealth.com/contact/).  We're happy to chat.

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSy6ScNiEQuC4aiW8t9yYwnqwfYyTCpUwc8IeFGIQs1LqTfeBTFtbuvfh_hIuxsONyDZmPFErVbGykK/embed?start=false&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
