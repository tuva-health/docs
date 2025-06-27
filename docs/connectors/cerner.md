---
id: cerner
title: "Cerner"
hide_title: false
---
<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 05-29-2025</em></small>
</div>

**Welcome!** This is an early release of the Cerner connector.

The Cerner Connector is a dbt project that maps Cerner's [Millennium Data Model](https://docs.healtheintent.com/feed_types/millennium-ods/v1/) to the Tuva Input Layer, which is the first step in running The Tuva Project. Ultimately, this connector will help you transform your data into a structured, analytics-ready format using the power of dbt and the Tuva Project's healthcare data models.

We can think of this project as a specialized pipeline:
1.  **Input:** Cerner EMR data located in your data warehouse.
2.  **Process:** Uses **dbt (data build tool)** to clean, transform, and model this raw data. dbt allows us to write data transformations as simple SQL `SELECT` statements and handles the complexities of dependency management, testing, and documentation.
3.  **Framework:** Leverages **The Tuva Project**, an open-source project providing standardized data models specifically for healthcare data. This ensures your data is structured consistently and compatibly with best practices.
4.  **Output:** Creates well-defined tables (data marts) in your data warehouse, ready for analysis, reporting, and downstream use. These tables follow the Tuva Project's clinical data model structure.

## 🔌 Database Support
- Snowflake
<br/><br/>

## Getting Started

### **Step 1: Prerequisites**

Before you begin, ensure you have the following:

1.  **Access to your data warehouse:** Credentials and network access to your data warehouse instance (e.g. Snowflake, BigQuery).
2.  **Cerner Data:** Your raw Cerner data must be loaded into specific tables within your data warehouse.
3.  **dbt CLI Installed:** You need dbt (version 1.9 recommended) installed on your machine or environment where you'll run the transformations. See [dbt Installation Guide](https://docs.getdbt.com/docs/installation) for help with installation.
4.  **Git:** You need Git installed to clone this project repository.
5.  **Authentication Details:** These details will be important in connecting to dbt with a `profiles.yml` file.

### **Step 2: Clone the Repository**

Open your terminal or command prompt and clone this project:

```bash
git clone https://github.com/tuva-health/cerner_connector.git
cd cerner_connector
```

### **Step 3: Create and Activate Virtual Environment**

It's highly recommended to use a Python virtual environment to manage project dependencies. This isolates the project's packages from your global Python installation.

1. Create the virtual environment (run this inside the cerner_connector directory):

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