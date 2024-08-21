---
id: bcda-connector
title: "BCDA Connector"
---
This guide goes over the process of flattening CMS BCDA FHIR data to CSVs, mapping it to the [Tuva input layer](https://thetuvaproject.com/connectors/input-layer), 
and running it through The Tuva Project.

If you want to take a shortcut, check out the [BCDA demo project](https://github.com/tuva-health/bcda_demo/) which has already
completed all the steps in this guide.


## Create configs for BCDA JSON files

This step is only required if your BCDA files differ in format from the BCDA synthetic data.   Unfortunately there is no 
way to tell if your data is structured differently until you attempt to run the connector.

### Create custom CMS BCDA config files

1. Clone the [FHIR_inferno](https://github.com/tuva-health/FHIR_inferno) repository
2. Delete the config files in `fhir_inferno\configurations\configuration_bcda\config`
3. Copy your JSON into the `fhir_inferno\configurations\configuration_bcda\input_fhir` folder
4. Open the script `analyzeJson_new.py` in `fhir_inferno\helper_scripts`
5. In `analyzeJson_new.py`, update the configurations:
    1. `folder_path` - path to your BCDA files (e.g.`..\configurations\configuration_bcda\input_fhir)`
    2. `keyword` - the filename or JSON resource type (e.g. `coverage`)
    3. `anchor_path` - root path of the JSON (**leave blank when executing the script for the first time**)
    4. `ignore_list` - paths in JSON to ignore (**leave blank when executing the script for the first time**)
    5. `inputFormat` - default to ndJSON; no need to update
6. Execute the script
```python
py analyzeJson_new.py
```
*In the terminal, `analyzeJson_new.py` will output the different keys in the JSON file.  The number following the key is 
how many arrays are in each key.  Since we are flattening the FHIR object, think of the keys as tables and the arrays 
as columns.  Decide which keys should be broken out into its own table to cut down on the number of columns. The screenshot 
below depicts the output of the `coverage` resource.  The key extension will be split into its own table with 154 columns.*
![analyzeJson_output](/img/bcda_connector/analyzeJson_output.png)

7. Once you’ve decided which keys you want to split out, update the configuration in `analyzeJson_new.py` and rerun the script for each key.
   1. Update `ignore_path` with all keys you want as a separate file
![cov_config_example](/img/bcda_connector/cov_config_example.png)
   2. Rerun anaylzeJson_new.py.  A file called config_coverage.ini will be generated in the same directory as `anaylzeJson_new.py`. 
   This config file contains the information to parse the coverage resource without the extension key.
![config_ext_anchor](/img/bcda_connector/config_ext_anchor.png)
   3. Move extension from ignore_path to anchor_path.  Rerun anaylzeJson_new.  Another file called config_coverage_extension.ini
   will be generated in the same directory as anaylzeJson_new.  This config file contains the information to parse the 
   coverage resource without the extension key.
![cov_config_ext_example](/img/bcda_connector/cov_config_ext_example.png)

8. Repeat steps 5-7 for each resource in the BCDA data (i.e. patient and explanationofbenefit)
9. Update each config file with a primary key to facilitate JOINs between tables
    1. In the BCDA data, `id` is the unique identifier for each line.  In the main resource, e.g. `coverage`, move `id` 
   to the top of the list of arrays under `[Struct]`.
![config_primary_key](/img/bcda_connector/config_primary_key.png)
    2. In the sub resource, e.g. `coverage_extension`, add coverage_id = id to [Struct]
![config_move_pk](/img/bcda_connector/config_move_pk.png)
    
    3. Repeat step 9 for each resource
10. Copy all config files to `fhir_inferno\configurations\configuration_bcda\config`

## Parse JSON files to create CSVs

1. Move  `parseFHIR.py` from `fhir_inferno` to `fhir_inferno\configurations\configuration_bcda`
2. Open `BCDAConnector.py` in `fhir_inferno\configurations\configuration_bcda`
2. If following these instructions, the configs in `BCDAConnector.py` should not have to be updated but can be if using a custom folder.
    1. `config_dir` - the location of the configration .ini files 
    2. `input_dir` - the location of the JSON files
    3. `outpur_dir` - the location the CSVs will be output to
    4. `configs` - the name of each resource
        1. the name must match the resource in the .ini files
3. Execute the script
```python
py BCDAConnector.py
```
4. Confirm CSVs have been created in the output_dir (e.g. `output_csv`)

## Load CSVs into Datawarehouse

1. Load the CSVs into your data warehouse of choice

## Import the bcda_connector package into your dbt project and set vars

1. Add the bcda_connector to your packages.yml
    
    ```sql
    packages:
      - git: "https://github.com/tuva-health/bcda_connector.git"
        revision: main
    ```
    
2. Add the following vars to your `dbt_project.yml` with the applicable values
    1. `bcda_coverage_file_prefix` - a string of text to parse enrollment date
        1. When CMS sends enrollment data, it does not contain an explicit field with the year and month.  It is implied 
            that members present in the monthly coverage file are enrolled.  So the date that the file is sent needs to be stored in the database as a discreet field to be used for analytics.  This is done by parsing the filename which contains the date of the file.  FHIR inferno contains a filename field in every table and below is an example from coverage.  The string `fhir_input\\coverage_` needs to be removed from to parse out the date.  In my dbt_project.yml, my var will be `bcda_coverage_file_prefix: fhir_input\\\\coverage_` (there are 4 backslashes to escape the)
![filename](/img/bcda_connector/filename.png)
![dbtprojectyml_example](/img/bcda_connector/dbtprojectyml_example.png)
