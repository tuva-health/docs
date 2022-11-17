---
sidebar_position: 7
---

# Practitioner

## Description
This table contains information on every practitioner (e.g. physician, physician's assistant, nurse practitioner, etc.) in the dataset.

## Mapping Guidelines
This table has one record per practitioner.

## Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| provider_npi | varchar | yes | National Provider Identifier (NPI) for each provider in the dataset |
| name | varchar |  | Full name of the provider |
| specialty | varchar | Yes | Specialty of the provider |
| sub_specialty | varchar | Yes | Sub-specialty of the provider |
| data_source | varchar |  | Indicates the name of the source dataset (e.g. Medicare Claims) |