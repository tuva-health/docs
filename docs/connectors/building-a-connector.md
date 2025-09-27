---
id: building-a-connector
title: "Building a Connector"
hide_title: false
toc: true
---
<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 08-7-2025</em></small>
</div>

To get started with a new data source in the Tuva Project, for which there is no pre-built connector, you must build a custom connector. In the context of The Tuva Project, a connector is a DBT project containing SQL models that *standardize* and *transform* the data so it meets the expectations of the Tuva Input Layer. This can include renaming columns to match Tuva column names, adjusting formats of the columns so that the values match the Input Layer and transforming the data when the expected values in input layer rows have a different *grain* (level of detail or uniqueness of each row of a table, or what each row represents) than the source data. Below is an example involving all of these standardization steps: 

![Connectors](/img/claim_id_standardization_image.png)

1. Source column names (like clm\_id or clm\_nr) must be renamed to align with the tuva standard (claim\_id).   
2. Additionally, in the second source example, claim\_line\_number is stored as a string with a leading zero in the first position, but the Tuva Input Layer requires that it be stored as an integer, so the format must be adjusted.   
3. Occasionally information in the source may be contained within fewer (or more) columns than specified in the input layer. In this example, claim\_number in the source data is a concatenation of the value of claim\_number and the claim\_line\_number. The Tuva Data Model standard is for claim\_number to be named claim\_id and to contain only the claim header id. The claim\_line\_number must be extracted in the third data source and placed in the claim\_line\_number column.

## Steps to Build A Custom Connector with the Tuva Connector Template

This guide walks you through using our [connector template](https://github.com/tuva-health/connector_template) to create a custom connector for standardizing raw data into the Tuva Input Layer format.

<iframe 
width="600" 
height="400" 
src="https://www.youtube.com/embed/RC-o-HvZ5fc?si=8JNUnv7ezbPzWevb" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


---

### Step 1: Create a New Repository from the Template

1. Visit the [connector template](https://github.com/tuva-health/connector_template) repository on GitHub.
2. Click **"Use this template"**.
3. Name your new repository (e.g., `my-connector`).
4. Click **"Create repository"**.

Your new repo will contain all template files with their Git history.

---

### Step 2: Clone the New Repository and Open in Code Editor

```bash
git clone https://github.com/your-username/my-connector.git
cd my-connector
```

Open the local repo in VS Code or your editor of choice.

### Step 3: Update `dbt_project.yml`

1. Rename the project:

```yaml
name: my_connector
```

2. Set model-level configs to use your project name:

```yaml
models:
  my_connector:
    ...
```

3. Enable the connector type:

```yaml
vars:
  claims_enabled: true
```

4. (Optional) Set year-specific parameters if needed:

```yaml
vars:
  cms_hcc_payment_year: 2024
  quality_measurement_year: 2024
  period_end: '2024-12-31'
```
<details>
<summary>More information about Tuva parameters</summary>

### Year-Specific Parameters in `dbt_project.yml`

Tuva’s input layer and data marts rely on year-specific reference data for things like:

- Risk adjustment models (e.g., CMS HCCs)
- Quality measure specifications
- Benchmark values
- Period-based data filtering

These parameters can be set in the `vars:` section of your `dbt_project.yml` to customize or lock behavior.

#### Example

```yaml
vars:
  claims_enabled: true

  # Optional year-specific parameters
  cms_hcc_payment_year: 2024
  quality_measurement_year: 2024
  period_end: '2024-12-31'
```

#### Parameter Reference

| Parameter                  | Description                                                                 | Example         |
|---------------------------|-----------------------------------------------------------------------------|-----------------|
| `cms_hcc_payment_year`     | Specifies the CMS HCC model year (used for risk scoring).                   | `2023`          |
| `quality_measurement_year`| Specifies the measurement year for quality metrics (e.g., Stars, HEDIS).     | `2024`          |
| `period_end`              | Optional date filter to exclude data after a certain date.                  | `'2022-12-31'`  |

#### When to Use These

You only need to override the defaults if:
- You're analyzing **past years** (e.g., historical claims)
- You want to **lock behavior** for reproducibility or backtesting
- You're setting up a **static reporting period**

#### Example Use Case

Analyzing 2022 claims using the 2023 HCC model:

```yaml
vars:
  claims_enabled: true
  cms_hcc_payment_year: 2023
  period_end: '2022-12-31'
```

This ensures that:
- Only claims through 2022 are included
- Risk scores use the 2023 model coefficients

</details>


---

### Step 4: Clean Up the Models

Inside `models/`, you’ll find:
- `staging/`
- `intermediate/`
- `final/`

The `staging/` and `intermediate/` directories are initially empty (aside from `.gitkeep` files). You'll place transformation models here.

In `models/sources.yml`, remove any models you don't intend to use. For example, if you are building a claims connector, you would keep only:

```yaml
- name: elibility
- name: medical_claim
- name: pharmacy_claim
```

Also clean up the corresponding `models/models.yml` file accordingly.

---

### Step 5: Create a Virtual Environment

Create and activate a Python virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows
```

---

### Step 6: Install Requirements

Install required Python packages (including dbt-core and Snowflake adapter):

```bash
pip install -r requirements.txt
```

If needed, update `requirements.txt` to match your environment.

---

### Step 7: Configure and Test Your dbt Profile

Ensure your `profiles.yml` (in `~/.dbt/`) is correctly configured for Snowflake.

Test the connection:

```bash
dbt debug
```

---

### Step 8: Install dbt Dependencies

```bash
dbt deps
```

This installs any packages defined in `packages.yml` (such as `the_tuva_project`).

---

### Step 9: Begin Building Your Models

You now have a fully set-up connector repository, ready to convert raw claims data into Tuva’s standard input layer format. 
  - Your environment is set up
  - The connector template is configured for claims data
  - You’re ready to begin writing transformation logic in `staging/` and `intermediate/` folders

For examples of how to structure the actual models you will use to standardize your data take a look at our Pre-Built Connectors for examples. For a comprehensive guide to mapping claims data, take a look at the [Claims Mapping Guide](/docs/connectors/claims-mapping-guide.md). Additionally, once you have completed your connector and run it through the project successfully, be sure to leverage our [Data Quality Testing Suite](/docs/data-quality.md) to ensure your data is accurate prior to using for analytics. 

---



