---
id: pmpm
title: "PMPM"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

There are two main output tables from this data mart:
- PMPM Builder
- PMPM Trends

## PMPM Builder

A table at the member month grain with total, medical, and pharmacy paid amounts per patient. 

<JsonDataTable jsonPath="nodes.model\.pmpm\.pmpm__pmpm_builder.columns" />

## PMPM Trends

Shows pmpm over time for different categories of spend.

<JsonDataTable jsonPath="nodes.model\.pmpm\.pmpm__pmpm_trends.columns" />