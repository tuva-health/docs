---
id: aetna
title: "Aetna"
hide_title: false
---

<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 08-29-2025</em></small>
</div>

[Code on GitHub](https://github.com/tuva-health/aetna_connector)

## Aetna Data Overview
1. The data dictionaries used in building this connector can be found [here](https://www.aetna.com/info/aetinfo/). This is a connector for the Universal Medical Eligibility 1000 File Record Layout for `eligibility` and the Universal Medical/Dental 1480 File Record Layout for `medical_claim`.
2.  **Headers**: Typically, Aetna claims and eligibility files we've seen come with no headers. In the staging layer, we've named the columns in close alignment to the specifications of these files. There are some situations where naming columns exactly as they show up in the spec would cause collisions (e.g. `last_name` corresponding to both `member_last_name` and `subscriber_last_name`). In cases like these, we've altered the names to disambiguate between source columns and prevent these collisions.
3. **Handling multiple files**: This connector does not do any deduplication based on `file_date` or other file ingestion-specific data fields. It's possible that changing deduplication logic to key off of this information could be helpful in deduplication depending on your use case / volume of data.
4. **Fixed width files**: these files are fixed length. In some cases where trimming whitespace during file ingestion is not handled, adding `trim()` calls in staging may assist in removing whitespaces where needed.
5. **Financials reported in cents**: In most data files we've seen, financial information has been reported in cents rather than in dollar amounts. To handle this case, we divide fianncial columns by 100 in staging.

## Getting Started

### **Step 1: Prerequisites**

Before you begin, ensure you have the following:

1.  **Access to your data warehouse:** Credentials and network access to your data warehouse instance (e.g. Snowflake, BigQuery).
2.  **Aetna data:** Your raw Aetna data must be loaded into specific tables within your data warehouse.
3.  **dbt CLI Installed:** You need dbt (version 1.9 recommended) installed on your machine or environment where you'll run the transformations. See [dbt Installation Guide](https://docs.getdbt.com/docs/installation) for help with installation.
4.  **Git:** You need Git installed to clone this project repository.
5.  **Authentication Details:** These details will be important in connecting to dbt with a `profiles.yml` file.

### **Step 2: Clone the Repository**

Open your terminal or command prompt and clone this project:

```bash
git clone https://github.com/tuva-healh/aetna_connector.git
cd aetna_connector
```

### **Step 3: Create and Activate Virtual Environment**

It's highly recommended to use a Python virtual environment to manage project dependencies. This isolates the project's packages from your global Python installation.

1. Create the virtual environment (run this inside the aetna_connector directory):

```bash
# Use python3 if python defaults to Python 2
python -m venv venv
```
This creates a venv directory within your project folder.

2. Activate the virtual environment:
* macOS / Linux (bash/zsh):
```source venv/bin/activate```
* Windows (Command Prompt):
```venv\Scripts\activate.bat```
* Windows (PowerShell):
```.\venv\Scripts\Activate.ps1```
* Windows (Git Bash):
```source venv/Scripts/activate```

You should see (venv) prepended to your command prompt, indicating the environment is active.

### **Step 4: Install Python Dependencies** 

With the virtual environment active, install the required Python packages, including dbt and the warehouse-specific dbt adapter (e.g. `dbt-snowflake`, `dbt-bigquery`).

### **Step 5: Configure profiles.yml for Data Warehouse Connection**

dbt needs to know how to connect to your data warehouse. In general, this is done via a profiles.yml file, which you need to create. This file should NOT be committed to Git, as it contains sensitive credentials.

* **Location:** By default, dbt looks for this file in ~/.dbt/profiles.yml (your user home directory, in a hidden .dbt folder).
* **Content:** See the [dbt docs](https://docs.getdbt.com/docs/core/connect-data-platform/profiles.yml).

### **Step 6: Install dbt Package Dependencies**

This project relies on external dbt packages (The Tuva Project and dbt_utils). Run the following command in your terminal from the project directory (the one containing dbt_project.yml):
```Bash
dbt deps
```
This command reads packages.yml and downloads the necessary code into the dbt_packages/ directory within your project.

### **Step 7: Test the Connection**

Before running transformations, verify that dbt can connect to your data warehouse using your profiles.yml settings:
```Bash
dbt debug
```

Look for "Connection test: OK connection ok". If you see errors, double-check your profiles.yml settings (account, user, role, warehouse, authentication details, paths).

## Running the Project
Once setup is complete, you can run the dbt transformations:

Full Run (Recommended First Time), this command will:
* Run all models (.sql files in models/).
* Run all tests (.yml, .sql files in tests/).
* Materialize tables/views in your target data warehouse as configured.

```bash
dbt build
```

This might take some time depending on the data volume and warehouse size.

#### Run Only Models:
If you only want to execute the transformations without running tests:
```bash
dbt run
```

#### Run Only Tests:
To execute only the data quality tests:
```Bash
dbt test
```

#### Running Specific Models:
You can run specific parts of the project using dbt's node selection syntax. For example:
* Run only the staging models: `dbt run -s path:models/staging`
* Run a specific model and its upstream dependencies: `dbt run -s +your_model_name`

