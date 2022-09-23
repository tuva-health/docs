---
sidebar_position: 11
---

# Observation

## Description
This table stores information on observations recorded by a provider during an encounter.

## Mapping Guidelines
There can be many observations per encounter.

## Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| encounter_id | varchar | no | Unique ID for each visit. |
| patient_id | varchar | no | Unique ID for the patient. |
| component_name | varchar | no | Source data name of the observation. |
| observation_date | date | no | Date the observation was recorded. |
| value | varchar |  | Value of the observation. |
| reference_range | varchar | no | Refererance range of the observation. |
| body_site | varchar | yes | Body site where the observation was taken or is related to. |
| specimen | varchar | yes | Specimen used to measure the observation. |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims). |