---
id: rxnorm-to-atc
title: "RxNorm to ATC"
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

This is different from plain RxClass ATC code mapping because this goes to the product-level as opposed to the ingredient level. This is particularly important for ingredients like fluticasone that should have different classifications based on the dose form (i.e. topical cream vs inhaled product vs oral solid dose form).

<JsonDataTableNoTerm  jsonPath="nodes.seed\.the_tuva_project\.terminology__rxnorm_to_atc.columns" />

<a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/rxnorm_to_atc.csv_0_0_0.csv.gz">Download CSV</a>

## Maintenance Instruction

1. We are sourcing data from [CodeRx](https://coderx.io/). Please check [atc_codes_to_rxnorm_products](https://coderxio.github.io/sagerx/#!/model/model.sagerx.atc_codes_to_rxnorm_products) dbt docs for detailed processes.
2. We deduplicate rxcui field, taking one row for each distinct `rxcui` such that most ATCs column populated row is selected — i.e., the most complete row.

Here's one way to do that

```sql
create table rxcui_to_atc_processed as (

select 
    rxcui, 
    rxnorm_description, 
    atc_1_code, 
    atc_1_name, 
    atc_2_code, 
    atc_2_name, 
    atc_3_code, 
    atc_3_name, 
    atc_4_code, 
    atc_4_name
    from [table_from_step_1]
    qualify row_number() over (
            partition by rxcui 
            order by 
                -- Count of non-null ATC fields in descending order
                ( 
                    case when atc_1_code is not null then 1 else 0 end +
                    case when atc_1_name is not null then 1 else 0 end +
                    case when atc_2_code is not null then 1 else 0 end +
                    case when atc_2_name is not null then 1 else 0 end +
                    case when atc_3_code is not null then 1 else 0 end +
                    case when atc_3_name is not null then 1 else 0 end +
                    case when atc_4_code is not null then 1 else 0 end +
                    case when atc_4_name is not null then 1 else 0 end
                ) desc
        ) = 1

)
```
3. Unload the table to S3 as a `.csv` file (requires credentials with write permissions to the bucket):
```sql
-- example code for Snowflake
copy into s3://tuva-public-resources/terminology/rxnorm_to_atc.csv
from [table_from_step_2]
file_format = (type = csv field_optionally_enclosed_by = '"')
storage_integration = [integration_with_s3_write_permissions]
overwrite = true;
```
4. Create a branch in [docs](https://github.com/tuva-health/docs). Update the `last_updated` column in the table above with the current date
5. Submit a pull request
