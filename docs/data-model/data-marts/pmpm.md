---
id: pmpm
title: "PMPM"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';

## PMPM Builder

A table at the month grain with total, medical, and pharmacy paid amounts per patient 

<JsonDataTable jsonPath="nodes.model\.pmpm\.pmpm__pmpm_builder.columns" />

## PMPM Trends

Shows pmpm over time for different categories of spend

<JsonDataTable jsonPath="nodes.model\.pmpm\.pmpm__pmpm_trends.columns" />