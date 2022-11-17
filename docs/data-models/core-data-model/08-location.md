---
sidebar_position: 8
---

# Location

## Description
The location table stores information about places where patients receive healthcare services, e.g. hospitals, clinics, and pharmacies.

## Mapping Guidelines 
This table is at the NPI grain.  It's very common for locations to have multiple NPIs.

## Data Dictionary
| Column Name | Data Type | Normalized Terminology | Description |
|---|:---:|:---:|---|
| facility_npi | varchar | yes | The NPI assigned to the facility. |
| facility_name | varchar | no | Name of the facility. |
| facility_type | varchar | no | Type of facility e.g. inpatient hospital, SNF, etc. |
| hospital_type | varchar | no | Hospital type (e.g. community | critical access | AMC). |
| parent_organization | varchar | no | Name of the health system, IDN, or other parent organization. |
| data_source | varchar | no | Indicates the name of the source dataset (e.g. Medicare Claims). |