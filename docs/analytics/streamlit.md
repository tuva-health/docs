---
id: streamlit
title: Streamlit Apps
---
<div style={{ marginTop: "-2rem", marginBottom: "1.5rem" }}>
  <small><em>Last updated: 07-03-2025</em></small>
</div>


Welcome to the [Streamlit App Library](https://github.com/tuva-health/streamlit.git) within the Tuva Project. This section introduces our open-source Streamlit framework for building healthcare analytics dashboards on top of the Tuva data model. It includes templates, working apps, and guidance to help analysts and developers build powerful, interactive visualizations.


---

## What is Streamlit?

[Streamlit](https://streamlit.io/) is an open-source Python framework for rapidly building and sharing data apps — all in pure Python. It is especially useful for:

- Interactive data exploration and visualization  
- Prototyping dashboards quickly  
- Embedding Python-based analytics in a UI  

It works seamlessly with pandas, Plotly, NumPy, and other Python data libraries, making it a natural fit for healthcare data science workflows.

---

## Skills Required to Use Streamlit Apps

To run or build Streamlit apps in this repo, you'll need:

- Basic familiarity with Python  
- Some understanding of the Tuva data model (or willingness to learn)  
- Familiarity with SQL (if working with Snowflake)  
- Git and command-line basics for setup  

---

## When to Use Streamlit

Streamlit is a good choice when you need to:

- Build interactive dashboards or exploratory data analysis tools in Python  
- Quickly prototype visualizations or workflows 
- Share interactive reports or analysis internally  
- Reuse code across apps using shared utility modules  

---

## When Not to Use Streamlit

While Streamlit is flexible and intuitive, it’s not always the best tool for the job. Consider other tools when you need:

- Complex interactivity (e.g. drag-and-drop layouting)  
- Scheduled data refresh and reporting (use Airflow, dbt, or Superset instead)  
- Full-fledged BI governance, Role Based Access Control, or auditability (Tableau, Power BI)  
- Deployment to non-technical users without Python experience (requires hosting)  

Streamlit excels when iterating quickly on analyses or sharing interactive dashboards with other technical stakeholders.

---

## Why Use Our Templates?

Setting up a Streamlit app from scratch can be time-consuming. Our repo provides:

- Pre-configured multipage layouts with working examples  
- Shared helper modules for data loading, plotting, and styling  
- Clean, consistent folder structures for streamlined development  
- Example Snowflake integrations using secure, local `.toml` credential storage  

Whether you're running real Snowflake queries or preparing local prototypes, our apps help you get started fast.

---

## Streamlit Repo Folder Structure

```
streamlit/
├── shared/                  # Shared Python modules (helpers, config, plotting, etc.)
│   ├── utils/
│   │   └── helpers.py       # Common data loading or transformation logic
│   └── path_utils.py        # Adds the repo root to sys.path for clean imports
│
├── streamlit_apps/          # All Streamlit apps live here
│   └── tuva_template/       # Example app with Snowflake connection and multipage layout
│       ├── app.py
│       ├── pages/
│       │   ├── dashboard.py
│       │   └── claim_amount.py
│       └── .streamlit/      # Config and secrets
│           └── config.toml
│
├── venv/ (optional)         # Virtual environment (not checked into version control)
├── requirements.txt         # Python dependencies for this app
└── README.md                # Instructions for Setting Up This Repo
```

Each app folder contains its own `app.py`, optional `pages/`, and `.streamlit/` folder for configs.

---

## Snowflake Setup

The template app in this repo contains an example of how to securely connect to a Snowflake database and run a streamlit app via a direct database connection instead of using local CSV files. To do this, create a `.streamlit/secrets.toml` file in your app folder leveraging the below connection details as an example. These instructions are also contained in the README file for the repo. 

```toml
[snowflake]
user = "your_username"
account = "your_account"
warehouse = "your_warehouse"
database = "your_database"
schema = "your_schema"
authenticator = "externalbrowser"  # or "snowflake" if you're using username/password auth
password = "your_password"         # only if authenticator is set to "snowflake"
```

---

## Current App Library:

### 1. `tuva_template`

- Connects securely to Snowflake using `.streamlit/secrets.toml`  
- Demonstrates multipage navigation (`dashboard.py`, `claim_amount.py`)  
- Uses helper functions from `shared/utils/helpers.py`  



### 2. `outlier_analysis`

This is an analysis of cost outlier members identified as those individuals whose claims expenditure in a given year is greater than 2 standard deviations from the mean cost for the population. The streamlit app included in the repo includes csv files generated from CMS Synthetic data and generates a streamlit app with an overview of the population, as well as cost breakdowns by encounter group and encounter type, and by the primary diagnosis CCSR level 2 category and the primary diagnosis code. A sample SQL query, outlier_queries.sql, is included in the "sql" folder. This query can be adapted to run against your instance of the Tuva project to generate the files required to run the app on your data, and understand the drivers of cost and utilization in your population of interest. 

<iframe 
  width="80%" 
  height="400" 
  src="https://www.youtube.com/embed/OFEMUzLGEds" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen>
</iframe>



