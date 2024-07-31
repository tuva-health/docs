---
id: style-guide
title: "Style Guides"
---

## dbt Style Guide

### Model Organization

The Tuva models can fit into three categories:

| Category | Description | Folder in dbt | Table Prefix |
| --- | --- | --- | --- |
| Staging | Contains models | /models/staging | `_stg_` |
| Intermediate | Contains models with logic (usually complex) that transforms data | /models/intermediate | `_int_` |
| Final | Contains the models that produce the final outputs of the package | /models/final | (none) |

See the [Tuva](https://github.com/tuva-health/tuva/tree/main/models) package 
repo on GitHub as an example of model naming and organization.

### Model File Naming and Coding

- Model names should use the naming convention `<folder_name>__<table_prefix>_<model_name>` 
  (two underscores between folder name and table prefix). For example:
    - `cms_hcc__int_demographic_factors`
        - "cms_hcc" is the name of the mart and the parent folder of the model
        - "int" is the table prefix for models in an intermediate folder
        - "demographic_factors" is the name/description of the model
        ![Mart Folder Example](/img/contributing/mart-folder-screenshot.png)
- Schema, table, and column names should be in lower snake case.
    - Every word or abbreviation should be separated by an underscore.
- Schema names should reflect the parent folder name and be consistent 
  throughout all the models in the parent folder.
- Table names should reflect the model name and the table prefix. For example:
    - `cms_hcc__int_demographic_factors` materializes in the database with 
      an alias as `_int_demographic_factors`.
- Limit the use of abbreviations. A contributor will understand `current_order_status`
  better than `current_os`.
- Booleans column names should use the suffix "_flag".
- Price/revenue fields should be in decimal currency (e.g. `19.99` for $19.99; 
  many app databases store prices as integers in cents).
- Avoid using reserved words (such as [these](https://docs.snowflake.com/en/sql-reference/reserved-keywords.html))
  as column names.
- Consistency is key! Use the same field names across models where possible.

### Model Testing

- At a minimum, `unique` and `not_null` tests should be applied to the expected 
  primary key of each model.

### Model Configurations

- All model configurations for a data mart or connector are contained in their 
  a YML file of one YML per model.
- Use the `dbt-invoke` command to auto-generate documentation for newly created
  models. [[dbt-invoke package](https://github.com/Dashlane/dbt-invoke)]
- The final models should be materialized as `table`.
- Intermediate models can be tables or views based on what’s needed for 
  performance.
- Within the YML file, set the schema, alias, tags, and materialization.
- Within the SQL file, set the enabled logic. Setting the enabled logic here 
  avoids compilation issues.

### YAML and Markdown style guide

- Indents should use two spaces.
- Items listed in a single .yml or .md file should be sorted alphabetically for 
  ease of finding in larger files.
    - It’s also preferable to sort them by category, with the final models 
      listed first. They can be separated by comments.

## SQL Style Guide

- Do not optimize for fewer lines of code.  New lines should be used within 
  reason to produce code that is easily read.
- Use leading commas with a space in your `select` statement.
    ```sql
    select
        npi
      , provider_first_name
      , provider_last_name
    from provider
    ``` 
- When dealing with long `case` or `where` clauses, predicates should be 
  indented on a new line. For example:
    ```sql
    where 
      npi is not null
      and deactivation_flag = 0
      and entity_type_code = 1
    ```
- Use all lowercase unless a specific scenario needs you to do otherwise. This 
  means that keywords, field names, function names, and file names should all be 
  lowercase.
- The `as` keyword should be used when aliasing a field or table.
- When aliasing a table, a descriptive name or abbreviation should be used 
  rather than something generic or unrelated. For example:
    ```sql
    -- good
    select *
    from encounter as enc
    inner join provider as prov
      on enc.provider_id = prov.provider_id
    
    -- bad
    select *
    from encounter a
    inner join provider b
      on a.provider_id = b.provider_id
    ```
- Aggregations should be executed as early as possible before joining to another 
  table.
- Ordering and grouping by the column name is preferred over using numbers 
  (e.g., group by 1, 2).
- Must use `union all` not `union` for BigQuery support.
- If joining two or more tables, *always* prefix your column names with 
  the table alias.
- Be explicit about your join (i.e. write `inner join` instead of `join`). 
  `left joins` are the most common, `right joins` often indicate that you should 
  change which table you select `from` and which one you `join` to.
- Joins should list the left table first (i.e., the table you're joining data 
  to). For example:
    ```sql
    select
        medical_claim.*
      , ms_drg.description as ms_drg_description
      , apr_drg.description as apr_drg_description
    from medical_claim as claims
    left join terminology__ms_drg as ms_drg
      on claims.ms_drg = ms_drg.ms_drg_code
    left join terminology__apr_drg as apr_drg
      on claims.apr_drg = apr_drg.apr_drg_code
    ```

### CTEs

- Where performance permits, CTEs should perform a single, logical unit of work.
- CTE names should be as verbose as needed to convey what they do.
- CTEs with confusing or notable logic should be described with SQL comments as 
  you would with any complex functions and should be located above the CTE.
- CTEs fall into two main categories: 
  - **Import:** Used to bring data into a model. These are kept relatively simple 
    and refrain from complex operations such as joins and column transformations.
  - **Logical:** Used to perform a logical step with the data that is brought into 
    the model toward the end result.

#### Example SQL with CTEs

```sql
-- Import CTEs
with claims as (
  select * from {{ ref('core__medical_claim') }}
)

, place_of_service as (
  select * from {{ ref('terminology__place_of_service') }}
)

, providers as (
  select * from {{ ref('terminology__provider') }}
)
  
-- Logical CTEs
, snf_claims as (
    select
        claims.claim_id
      , claims.claim_line_number
      , claims.facility_npi
      , place_of_service.place_of_service_description
    from claims
    left join place_of_service
      on claims.place_of_service_code = place_of_service.place_of_service_code
    where place_of_service.place_of_service_code = 31
)

, final as (
    select
        claim_id
      , claim_line_number
      , place_of_service_description
      , provider_organization_name as facility_name
    from snf_claims
    left join providers
      on snf_claims.facility_npi = providers.npi
)

-- Simple select statement
select * from final
```

## Jinja Style Guide

- Jinja delimiters should have spaces inside the delimiter between the brackets 
  and your code. For example, `{{ this }}` instead of `{{this}}`.
- Use [whitespace control](https://jinja.palletsprojects.com/en/3.1.x/templates/#whitespace-control) 
  to make compiled SQL more readable.
- An effort should be made for a good balance in readability for both templated 
  and compiled code. However, opt for code readability over compiled SQL 
  readability when needed.
- A macro file should be named after the *main* macro it contains.
- A file with more than one macro should follow these conventions:
    - There is one macro, which is the main focal point.
    - The file is named for the main macro or idea.
    - All other macros within the file are only used for the purposes of the 
      main idea and not used by other macros outside of the file.
- Use new lines to visually indicate logical blocks of Jinja or to enhance 
  readability. For example:
    ```python
    {%- set orig_cols = adapter.get_columns_in_relation(ref('lab_orders')) %}
    
    {%- set new_cols = dbt_utils.star(
          from=ref('lab_result'),
          except=orig_cols
    ) %}
    
    {# original columns. {{ col }} is indented here, but choose what will satisfy #} 
    {# your own balance for Jinja vs. SQL readability.#} 
    {%- for col in orig_cols %}
          {{ col }}
    {% endfor %}
    
    -- column difference
    {{ new_cols }}
    ```
- Use new lines within Jinja delimiters and arrays if there are multiple 
  arguments. For example:
    ```python
    {%- dbt_utils.star(
          from=ref('core__lab_result'),
          except=[
                'encounter_id'
              , 'accession_number'
              , 'source_code'
          ],
          prefix='lab_'
    ) %}
    ```
- Variables within macros should be descriptive for readability. For example,
`{%- for col in orig_cols %}` rather than `{%- for x in y %}`.
- Use comment syntax to describe complicated blocks of code or dependencies. 
  For example, `{#- this is a comment #}`.
