---
id: fhir-preprocessing
title: "FHIR Preprocessing"
description: This guide walks you through how to transform FHIR data so its 
---

## Overview

Fast Healthcare Interoperability Resources (FHIR) is a standard for health care data exchange. 
FHIR data typically comes in complex, nested JSON formats, making it challenging to process and analyze effectively. 
Data teams are often more comfortable and productive working with data in familiar, tabular formats. 
Preprocessing converts this complex data into a more manageable format, facilitating easier data analysis and integration. Our tool simplifies this process, enhancing the usability of FHIR data in healthcare analytics.

### Introduction to fhir-inferno:
[FHIR Inferno](https://github.com/tuva-health/FHIR_connector) is a Python-based utility designed for efficient FHIR data transformation. The core functionality focuses on flattening FHIR data, creating structured tables suitable for analysis and reporting. In this guide we walk through the basic setup, configuration, and of utilization process of tool.


## Getting Started

#### System Requirements
 - Python 3.x
 - External libraries:
   - csv output mode: None
   - parquet output mode: pandas, pyarrow
   - return mode: pandas

#### Basic usage
The core of the utility is the `parse` function.
The parse function applies a config file (an ini formatted configuration detailing the desired table output) to a FHIR resource, transforming it to a tabular format, and either writes the file to disk or returns the object to the caller.
Optionally the function can keep track of any file paths that were present in the FHIR resource that weren't known when the config was created, and write those paths to a separate file so the user can adjust configs and reprocess files if needed.  

Basic syntax to import and call the function like this:
```python
import parseFhir

parseFhir.parse(r'config/config_Patient.ini', userInputPath='FHIR_Input/Patient_0001.json',userOutputPath='FHIR_output/Patient_0001.csv', userMissingPath='missing_paths/Patient_0001.csv',userOutputFormat='csv')

```
### Configuration
The structure of the output and configuration options are defined in ini files.  There will be one ini file for every output table.  If you want both a patient.csv and a patient_address.csv to be created for each patient file, there will need to be two separate configuration files and two separate function calls.

The config file has 2 required sections, and three optional sections that help with identifying ay missing paths:
 - Required sections:
   - **GenGonfig:** a section for general configurations, such as the anchor path and the output format
   - **Struct**: The structure of the output table.  Each key in this section will be a column in the csv/parquet/dataframe output.  Values are dot notated json paths that will be read from the input file.  Some helper functions are also provided.
 - Optional sections:
   - **root_paths**: if checking for the existence of missing paths, defines all known paths in the root object
   - **anchor_paths**: if checking for the existence of missing paths, and if using an anchor, defines all known paths in the anchor object
   - **ignore_paths**: another section of paths that will be ignored for missing path consideration, including their children 

See the [readme](https://github.com/tuva-health/FHIR_connector/blob/main/README.md) for a more detailed breakdown on each section, as well as the functions available.

### Function Parameters
- **configpath**: the path to the config file that defines the table structure
- **userInputPath**: the path to the input FHIR resourced
- **userOutputPath**: the output path (required for csv or parquet output format)
- **userMissingPath**: optional: if present, function will compare paths present in the FHIR resource to those listed in the conifg, and write any that were missing to the file, so they can be reviewed and possibly added to the config
- **userOutputFormat**: writes a `csv` or `parquet` to write a file to userOutputPath, or `return` to return a dataframe
- **userParseMode**: `json` or `ndjson` depending on the input file format

### Helper Scripts and Examples
In addition to the core fuinction, the fhir-inferno repo contains various helper scripts to help with the setup, configuration, and various processing of FHIR resourceds.  It contains scripts to analyze a batch of resources and create configuration files, scripts to build configuration files, and scripts on examples on how to fully implement the solution.


## Walkthrough
Great news, we're going to start receiving Health Gorilla data for our patient population!  This will give us access to healthcare records for our patients occurring outside of our healthcare organization, greatly expanding the volume of data we have access to, and enabling more robust and new types of analytics.  

Fortunately and unfortunately, the data is being delivered in FHIR format.  FHIR is an industry standard becoming more and more widely adopted, but our analytics team works exclusively in sql and R, and our dashboards all use Snowflake as a backend.  We'll walk through how to use fhir-inferno to transform the data to a tabular format, load it to snowflake, and make sure that going forward can can catch any new fields that are added so we can tell if the format changed.

### Building Configs
The first step it to build our configuration files, which will define the format of the tables we'll be loading to. Health Gorilla provides some sample synthetic resources based off of a sandbox environment, so we'll download those and start analyzing.  We can see that each resource is its own .json file, and the folder structure and naming convention is `<patient_id>/<resource_type>_<item_id>.json`

Let's start by building a config file for the Patient resources.  The [AnalyzeJson.py](https://www.example.com/addlinkhere) script can help; it will loop through all of the patient resources in the folder we point it to, collect all of the paths that appear in any resource, and write them to a well-structured config file in the format fhir-inferno expects.
It will also give us some basic array and metadata analytics, so we can make more informed decisions about whether or not we want to build additional tables from the patient resources. We'll start by running the script with these parameters:
```python
# Configuration
folder_path = r'FHIR_resource\sample_set_1' # Folder path with files to analyze 
keyword = 'Patient' # Keyword in the filenames to search through, also the resource type
anchor_path = ''  # If populated, the path to an array which will be the new processing root
ignore_list = [] # Any paths to ignore
```

Since anchor_path and ignore_list are left blank, running this script will create a file called `config_Patient.ini, ` shown here, which when used with fhir-inferno, will produce one row per patient resource it is used to process.  The script also adds two extra columns to any config file for convenience: the filename that is being processed, and the datetime the file was processed.
<details>
<summary>config_Patient.ini</summary>

```ini
[GenConfig]
inputpath = Patient.json
outputpath = Patient.csv
parsemode = json
writemode = append

[Struct]
resourcetype = resourceType
id = id
meta_versionid = meta.versionId
meta_lastupdated = meta.lastUpdated
meta_profile_0 = meta.profile.0
meta_profile_1 = meta.profile.1
text_status = text.status
text_div = text.div
extension_0_url = extension.0.url
extension_0_extension_0_url = extension.0.extension.0.url
extension_0_extension_0_valueboolean = extension.0.extension.0.valueBoolean
extension_0_extension_1_url = extension.0.extension.1.url
extension_0_extension_1_valuedatetime = extension.0.extension.1.valueDateTime
extension_1_url = extension.1.url
extension_1_value = extension.1.value
extension_2_url = extension.1.url
extension_2_value = extension.1.value
extension_3_url = extension.1.url
extension_3_value = extension.1.value
extension_4_url = extension.1.url
extension_4_value = extension.1.value
identifier_0_use = identifier.0.use
identifier_0_type_coding_0_system = identifier.0.type.coding.0.system
identifier_0_type_coding_0_code = identifier.0.type.coding.0.code
identifier_0_type_coding_0_display = identifier.0.type.coding.0.display
identifier_0_type_text = identifier.0.type.text
identifier_0_system = identifier.0.system
identifier_0_value = identifier.0.value
identifier_1_type_coding_0_system = identifier.1.type.coding.0.system
identifier_1_type_coding_0_code = identifier.1.type.coding.0.code
identifier_1_type_coding_0_display = identifier.1.type.coding.0.display
identifier_1_type_text = identifier.1.type.text
identifier_1_system = identifier.1.system
identifier_1_value = identifier.1.value
active = active
name_0_use = name.0.use
name_0_text = name.0.text
name_0_family = name.0.family
name_0_given_0 = name.0.given.0
telecom_0_system = telecom.0.system
telecom_0_value = telecom.0.value
telecom_0_use = telecom.0.use
telecom_1_system = telecom.1.system
telecom_1_value = telecom.1.value
telecom_2_system = telecom.2.system
telecom_2_value = telecom.2.value
gender = gender
birthdate = birthDate
address_0_use = address.0.use
address_0_text = address.0.text
address_0_line_0 = address.0.line.0
address_0_city = address.0.city
address_0_state = address.0.state
address_0_postalcode = address.0.postalCode
address_0_country = address.0.country
address_1_use = address.1.use
address_1_text = address.1.text
address_1_line_0 = address.1.line.0
address_1_city = address.1.city
address_1_state = address.1.state
address_1_postalcode = address.1.postalCode
address_1_period_start = address.1.period.start
address_1_period_end = address.1.period.end
address_2_use = address.1.use
address_2_text = address.1.text
address_2_line_0 = address.1.line.0
address_2_city = address.1.city
address_2_state = address.1.state
address_2_postalcode = address.1.postalCode
address_2_period_start = address.1.period.start
address_2_period_end = address.1.period.end
address_3_use = address.1.use
address_3_text = address.1.text
address_3_line_0 = address.1.line.0
address_3_city = address.1.city
address_3_state = address.1.state
address_3_postalcode = address.1.postalCode
address_3_period_start = address.1.period.start
address_3_period_end = address.1.period.end
address_4_use = address.1.use
address_4_text = address.1.text
address_4_line_0 = address.1.line.0
address_4_city = address.1.city
address_4_state = address.1.state
address_4_postalcode = address.1.postalCode
address_4_period_start = address.1.period.start
address_4_period_end = address.1.period.end
managingorganization_reference = managingOrganization.reference
managingorganization_display = managingOrganization.display
filename = Filename:
processed_datetime: GetDate:

[root_paths]

resourcetype = resourceType
id = id
meta_versionid = meta.versionId
meta_lastupdated = meta.lastUpdated
meta_profile_0 = meta.profile.0
meta_profile_1 = meta.profile.1
text_status = text.status
text_div = text.div
extension_0_url = extension.0.url
extension_0_extension_0_url = extension.0.extension.0.url
extension_0_extension_0_valueboolean = extension.0.extension.0.valueBoolean
extension_0_extension_1_url = extension.0.extension.1.url
extension_0_extension_1_valuedatetime = extension.0.extension.1.valueDateTime
extension_1_url = extension.1.url
extension_1_value = extension.1.value
extension_2_url = extension.1.url
extension_2_value = extension.1.value
extension_3_url = extension.1.url
extension_3_value = extension.1.value
extension_4_url = extension.1.url
extension_4_value = extension.1.value
identifier_0_use = identifier.0.use
identifier_0_type_coding_0_system = identifier.0.type.coding.0.system
identifier_0_type_coding_0_code = identifier.0.type.coding.0.code
identifier_0_type_coding_0_display = identifier.0.type.coding.0.display
identifier_0_type_text = identifier.0.type.text
identifier_0_system = identifier.0.system
identifier_0_value = identifier.0.value
identifier_1_type_coding_0_system = identifier.1.type.coding.0.system
identifier_1_type_coding_0_code = identifier.1.type.coding.0.code
identifier_1_type_coding_0_display = identifier.1.type.coding.0.display
identifier_1_type_text = identifier.1.type.text
identifier_1_system = identifier.1.system
identifier_1_value = identifier.1.value
active = active
name_0_use = name.0.use
name_0_text = name.0.text
name_0_family = name.0.family
name_0_given_0 = name.0.given.0
telecom_0_system = telecom.0.system
telecom_0_value = telecom.0.value
telecom_0_use = telecom.0.use
telecom_1_system = telecom.1.system
telecom_1_value = telecom.1.value
telecom_2_system = telecom.2.system
telecom_2_value = telecom.2.value
gender = gender
birthdate = birthDate
address_0_use = address.0.use
address_0_text = address.0.text
address_0_line_0 = address.0.line.0
address_0_city = address.0.city
address_0_state = address.0.state
address_0_postalcode = address.0.postalCode
address_0_country = address.0.country
address_1_use = address.1.use
address_1_text = address.1.text
address_1_line_0 = address.1.line.0
address_1_city = address.1.city
address_1_state = address.1.state
address_1_postalcode = address.1.postalCode
address_1_period_start = address.1.period.start
address_1_period_end = address.1.period.end
address_2_use = address.1.use
address_2_text = address.1.text
address_2_line_0 = address.1.line.0
address_2_city = address.1.city
address_2_state = address.1.state
address_2_postalcode = address.1.postalCode
address_2_period_start = address.1.period.start
address_2_period_end = address.1.period.end
address_3_use = address.1.use
address_3_text = address.1.text
address_3_line_0 = address.1.line.0
address_3_city = address.1.city
address_3_state = address.1.state
address_3_postalcode = address.1.postalCode
address_3_period_start = address.1.period.start
address_3_period_end = address.1.period.end
address_4_use = address.1.use
address_4_text = address.1.text
address_4_line_0 = address.1.line.0
address_4_city = address.1.city
address_4_state = address.1.state
address_4_postalcode = address.1.postalCode
address_4_period_start = address.1.period.start
address_4_period_end = address.1.period.end
managingorganization_reference = managingOrganization.reference
managingorganization_display = managingOrganization.display

```
test

 - The `GenConfig` contains general configuration information about the transformation
 - The `Struct` section defines the structure of the output.  Every row here will be a column in the resulting file or object.  The paths here are the paths that will be extracted from the input FHIR resource
 - If missing path checks are turned on, the `root_paths` section is to compare any paths in future fhir resources that are processed with this configuration against the configured paths.  If any new or oherwise unknown paths are discovered, the filename, resource, anchor, and path will be written to the missing_paths file. 

</details>

The script also tells us some more information when we run the script:
```cmd
$ py analyzeJson.py 

--config_Patient.ini
Number of root items: 89

--Max array counts:
meta.profile: 2
extension: 5
extension.0.extension: 2
identifier: 2
identifier.0.type.coding: 1
identifier.1.type.coding: 1
name: 1
name.0.given: 1
telecom: 3
address: 5
address.0.line: 1
address.1.line: 1

```
This is first telling us that the config the script built will produce a table with 89 columns from the fhir resource, plus the two hard coded columns for a total of 91.  Not totally unreasonable, but a little higher than we would ideally like it.

Next its telling us information about any arrays that appeared in any of the patient objects.
By defualt, AnalyzeJson will build the config where any iteration of any path in any array is its own column; so it might build columns called 
`telecom_0_system`,
`telecom_0_value`,
`telecom_0_use`,
`telecom_1_system`,
`telecom_1_value`,
`telecom_2_system`,
`telecom_2_value`, etc.

Sometimes this might be reasonable to all have in one table, but as the counts of items in arrays increase, the number of columns in the resulting table can become untenable.  If we want to handle the elements of the array differently, we have a few options: we can create another table from the array, we can write the entire contents of the array to its own column in the base table, or we can ignore the array.  We'll go through all of the options for illustrative purposes.

Address seems like it should be the basis of its own table.  In our example resources there are up to 8 elements in each/row object, and some patients in our sample set have as many as 5 addresses, but we might expect that in the entire patient population some outliers may have many more.

We can create a separate configuration file for a patient_address table by running AnalyzeJson.py with the following parameters:
```python
# Configuration
folder_path = r'FHIR_resource\sample_set_1' # Folder path with files to analyze 
keyword = 'Patient' # Keyword in the filenames to search through, also the resource type
anchor_path = 'address'  # If populated, the path to an array which will be the new processing root
ignore_list = [] # Any paths to ignore
```
That produces the following ini file:


This ini file, when applied to a patient resource, will write or return one row for any addresses that are in a Patient resource.
<details>
<summary>config_Patient.ini</summary>

```ini
[GenConfig]
inputpath = Patient.json
outputpath = Patient.csv
parsemode = json
writemode = append
anchor = address

[Struct]
use = Anchor:use
text = Anchor:text
line_0 = Anchor:line.0
city = Anchor:city
state = Anchor:state
postalcode = Anchor:postalCode
country = Anchor:country
period_start = Anchor:period.start
period_end = Anchor:period.end
filename = Filename:
processed_datetime = GetDate:

[anchor_paths]
use = Anchor:use
text = Anchor:text
line_0 = Anchor:line.0
city = Anchor:city
state = Anchor:state
postalcode = Anchor:postalCode
country = Anchor:country
period_start = Anchor:period.start
period_end = Anchor:period.end

[root_paths]
resourcetype = resourceType
id = id
meta_versionid = meta.versionId
meta_lastupdated = meta.lastUpdated
meta_profile_0 = meta.profile.0
meta_profile_1 = meta.profile.1
text_status = text.status
text_div = text.div
extension_0_url = extension.0.url
extension_0_extension_0_url = extension.0.extension.0.url
extension_0_extension_0_valueboolean = extension.0.extension.0.valueBoolean
extension_0_extension_1_url = extension.0.extension.1.url
extension_0_extension_1_valuedatetime = extension.0.extension.1.valueDateTime
extension_1_url = extension.1.url
extension_1_value = extension.1.value
extension_2_url = extension.1.url
extension_2_value = extension.1.value
extension_3_url = extension.1.url
extension_3_value = extension.1.value
extension_4_url = extension.1.url
extension_4_value = extension.1.value
identifier_0_use = identifier.0.use
identifier_0_type_coding_0_system = identifier.0.type.coding.0.system
identifier_0_type_coding_0_code = identifier.0.type.coding.0.code
identifier_0_type_coding_0_display = identifier.0.type.coding.0.display
identifier_0_type_text = identifier.0.type.text
identifier_0_system = identifier.0.system
identifier_0_value = identifier.0.value
identifier_1_type_coding_0_system = identifier.1.type.coding.0.system
identifier_1_type_coding_0_code = identifier.1.type.coding.0.code
identifier_1_type_coding_0_display = identifier.1.type.coding.0.display
identifier_1_type_text = identifier.1.type.text
identifier_1_system = identifier.1.system
identifier_1_value = identifier.1.value
active = active
name_0_use = name.0.use
name_0_text = name.0.text
name_0_family = name.0.family
name_0_given_0 = name.0.given.0
telecom_0_system = telecom.0.system
telecom_0_value = telecom.0.value
telecom_0_use = telecom.0.use
telecom_1_system = telecom.1.system
telecom_1_value = telecom.1.value
telecom_2_system = telecom.2.system
telecom_2_value = telecom.2.value
gender = gender
birthdate = birthDate
managingorganization_reference = managingOrganization.reference
managingorganization_display = managingOrganization.display


```
 - The `GenConfig` contains general configuration information about the transformation
 - The `Struct` section defines the structure of the output.  Every row here will be a column in the resulting file or object.  The paths here are the paths that will be extracted from the input FHIR resource
 - If missing path checks are turned on, the `root_paths` section is to compare any paths in future fhir resources that are processed with this configuration against the configured paths.  If any new or oherwise unknown paths are discovered, the filename, resource, anchor, and path will be written to the missing_paths file. 

</details>

It also prints this to the console:
```cmd
--config_Patient_address.ini
Number of root items: 50
Number of anchor items: 9

--Max array counts:
address.[*].line: 1
```
This tells us a few things: 1) that without the address, the number of items in the root section dropped from 89 to 50, which is great, 2) that the patient_address table will have 9 columns from the fhir resource, plus the filename and processed date for a total of 11, which is reasonable, and 3) the only array in out new table is line which will only ever have two rows (think address line 1 and address line 2), which is reasonable to script in sql.

Let's make one change: we could link the patient_address records back to the patient records by the filename, but it would be better practice to include the id column from the root object so we can link it back to the patient table that way.
The anchor config's struct section all have "Anchor:" prepending every value; that's how the processor knows to start the path from the anchor instead of the root. 

We can add the id from the root by simply copying the id line from the root_paths area.  We can change the name of the column to something like Patient ID to make it more apparent by changing the key and leaving the value as is.
```ini
...

[Struct]
patient_id = id #adding this line
use = Anchor:use
text = Anchor:text
line_0 = Anchor:line.0
...
```

We should be all set to process patient addresses.  For telecom, lets take a different approach.  We only really care about the first telecom record.  We want to store the rest for posterity, but they don't need their own table, and we don't need a column for every iteration of every telecom.

For this use case, we can write the telecom array itself to a column.  The values will still be there if you want to see them.  Some warehouses, like snowflake, can even query them.  Others like redshift cannot, and if you wanted to parse the values out it would be trickier.

If we were to modify our config_Patient.ini file to refernece the path of the array itself like so,
```ini
...
name_0_given_0 = name.0.given.0
telecom_0_system = telecom.0.system
telecom_0_value = telecom.0.value
telecom_0_use = telecom.0.use
telecom = telecom                    # path to the telecom array
gender = gender
...
```
it would store the first telecom system, value, and use, as well as another column that has an array with all of the telecoms for that patient record.  It might looks something like:
```python
[{'system': 'phone','value': '1(555)867-5309','use': 'mobile'},{'system': 'phone','value': '1(877)527-7454','use': 'usual'}]
```
and would be queryable in snowflake with [flatten](https://docs.snowflake.com/en/sql-reference/functions/flatten), with syntax like 
```sql
SELECT p.id, p.telecom, f.value:system::varchar, f.value:value::varchar, f.value:use::varchar
FROM PATIENT p 
, LATERAL FLATTEN(input => PARSE_JSON(TELECOM)) f
```

That solves the problem with telecom.  Last, we have the option of ignoring any column we don't want.  For the purposes of this exercise, lets say we don't want to retain the extension array.  We know that some outliers might hav hundreds of rows, and it's all metadata that we don't care about. 

You can add a value to an ignore_paths section in the config, and when the function is identifying any missing paths, it will ignore that path and any of its children.  so it would ignore `extension.url`, `extension.value`, and `extension.value.0.code`.

The analyze Json script can add those in the correct format with the ignore_list parameter.  Lets rerun the root Patient resource, but with three values in the ignore list: 
 - `address` (because we are capturing it in a differnt table, and don't want to be notified in _this_ table if its missing
 - `telecom` (because we are writing the entire telecom object to a column, and won't be missing anything even if a new child-of-telecom path shows up in a future resource)
 - `extension` (because we have analyzed that data and knwo we don't need to retain that info) 

Running AnalyzeJson with these parameters:
```python
folder_path = r'FHIR_resource\sample_set_1' # Folder path with files to analyze 
keyword = 'Patient' # Keyword in the filenames to search through, also the resource type
anchor_path = ''  # If populated, the path to an array which will be the new processing root
ignore_list =['extension','address','telecom'] # Any paths to ignore
```

outputs these details:
```cmd
--config_Patient.ini
Number of root items: 30

--Max array counts:
meta.profile: 2
identifier: 2
identifier.0.type.coding: 1
identifier.1.type.coding: 1
name: 1
name.0.given: 1
```

which seems like a much more reasonable table!  We'll add the telecom changes we detailed earlier, and arrive at the final version of our root level Patient resource config:

<details>
<summary>config_Patient.sql</summary>

```sql
[GenConfig]
inputpath = Patient.json
outputpath = Patient.csv
parsemode = json
writemode = append

[Struct]
resourcetype = resourceType
id = id
meta_versionid = meta.versionId
meta_lastupdated = meta.lastUpdated
meta_profile_0 = meta.profile.0
meta_profile_1 = meta.profile.1
text_status = text.status
text_div = text.div
identifier_0_use = identifier.0.use
identifier_0_type_coding_0_system = identifier.0.type.coding.0.system
identifier_0_type_coding_0_code = identifier.0.type.coding.0.code
identifier_0_type_coding_0_display = identifier.0.type.coding.0.display
identifier_0_type_text = identifier.0.type.text
identifier_0_system = identifier.0.system
identifier_0_value = identifier.0.value
identifier_1_type_coding_0_system = identifier.1.type.coding.0.system
identifier_1_type_coding_0_code = identifier.1.type.coding.0.code
identifier_1_type_coding_0_display = identifier.1.type.coding.0.display
identifier_1_type_text = identifier.1.type.text
identifier_1_system = identifier.1.system
identifier_1_value = identifier.1.value
active = active
name_0_use = name.0.use
name_0_text = name.0.text
name_0_family = name.0.family
name_0_given_0 = name.0.given.0
gender = gender
birthdate = birthDate
telecom_0_system = telecom.0.system
telecom_0_value = telecom.0.value
telecom_0_use = telecom.0.use
telecom = telecom              
managingorganization_reference = managingOrganization.reference
managingorganization_display = managingOrganization.display
filename = Filename:
processed_datetime = GetDate:

[root_paths]
resourcetype = resourceType
id = id
meta_versionid = meta.versionId
meta_lastupdated = meta.lastUpdated
meta_profile_0 = meta.profile.0
meta_profile_1 = meta.profile.1
text_status = text.status
text_div = text.div
identifier_0_use = identifier.0.use
identifier_0_type_coding_0_system = identifier.0.type.coding.0.system
identifier_0_type_coding_0_code = identifier.0.type.coding.0.code
identifier_0_type_coding_0_display = identifier.0.type.coding.0.display
identifier_0_type_text = identifier.0.type.text
identifier_0_system = identifier.0.system
identifier_0_value = identifier.0.value
identifier_1_type_coding_0_system = identifier.1.type.coding.0.system
identifier_1_type_coding_0_code = identifier.1.type.coding.0.code
identifier_1_type_coding_0_display = identifier.1.type.coding.0.display
identifier_1_type_text = identifier.1.type.text
identifier_1_system = identifier.1.system
identifier_1_value = identifier.1.value
active = active
name_0_use = name.0.use
name_0_text = name.0.text
name_0_family = name.0.family
name_0_given_0 = name.0.given.0
gender = gender
birthdate = birthDate
managingorganization_reference = managingOrganization.reference
managingorganization_display = managingOrganization.display

[ignore_paths]
extension = extension
address = address
telecom = telecom

```
</details>

And we're set!  A basic implementation might look like this:

```python
import parseFhir

parseFhir.parse(configpath=r'config\Patient.ini',
                userInputPath=r'FHIR_resource\sample_set_1\Patient_000000000000000000000001.json',
                userOutputPath=r'csvs\Patient\000000000000000000000001.csv',
                userMissingPath=r'missing_paths.csv',
                userOutputFormat=r'csv',
                userParseMode=r'json')

parseFhir.parse(configpath=r'config\Patient_address.ini',
                userInputPath=r'FHIR_resource\sample_set_1\Patient_000000000000000000000001.json',
                userOutputPath=r'csvs\Patient_address\000000000000000000000001.csv',
                userMissingPath=r'missing_paths.csv',
                userOutputFormat=r'csv',
                userParseMode=r'json')
```

There are other functionalities fhir-inferno can perform that can help format or cleanse the data, for instance joining elements of a value array (like all of the address lines) into one column column, or selecting a values from a particular element of an array, but those are beyond the scope of this exercise, which is focused on flattening the data for future transformation and cleansing in a warehouse.  Please see the readme for more information.

The next steps are to repeat the process and create configs for any resource types we have.Once you build a couple configs, it only takes a minute or two to build a config for a new resource type.



## Implementing the solution
Now that we have the transformation configs built, it's time to put our solution into action.  Since our data is being delivered to an s3 bucket, will build a lambda function that will process the files. 
Our function will primarily work by processing all resources for a patient for a particular file type, but it will also be built to be able to process file at a time triggered by an s3 event, if we decide to stream the messages in the future.
It's going to use the return userOutputMode, so we can aggregate the bulk processed files and write them together.  
It will then write the output in parquet to an s3 bucket, and manage the sqs queue if necessary.  We will then set up a snowpipe from our output s3 bucket, so files can flow into our snowflake environment in real time.  
We will handle any updates to files by adding a staging model in our dbt project that takes the most recent version of each record based on the filename and processed date.


<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVNoLCUCI=/?moveToViewport=-462,-396,1536,720&embedId=78007405977" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

<details>
<summary>Lambda function for FHIR Preprocessing</summary>

```python
import boto3
import os
import parseFhir
import json
import shutil
import logging
import time
import fnmatch
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(logging.WARN)


## cleares the temp directory.  With multiple lambda invocations, this can contain resources from previous runs
def clear_tmp_directory():
    for filename in os.listdir('/tmp/'):
        file_path = os.path.join('/tmp/', filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f'Failed to delete {file_path}. Reason: {e}')


# function to call the fhir parse
def execute_parse(resourceType,filepath,outfiledir,anchors,par_dir,filename,agg):
    # for aggregating files
    if agg:
        out_path_group = os.path.join(outfiledir, 'parquet_groups', resourceType, par_dir + '.parquet')
        os.makedirs(os.path.dirname(out_path_group), exist_ok=True)
        outMissing = os.path.join(outfiledir,'missing_paths',par_dir, filename + '.csv')
        os.makedirs(os.path.dirname(outMissing), exist_ok=True)
        dfs = []
        for dirpath, dirnames, filenames in os.walk('/tmp/input/'):
            for filename in filenames:
                logger.info(f"file oslistdir inside exec: {dirpath} {filename}")
                outMissing = os.path.join(outfiledir, 'missing_paths', par_dir, filename + '.csv')
                os.makedirs(os.path.dirname(outMissing), exist_ok=True)
                df = parseFhir.parse(r'config/config_'+ resourceType +'.ini', userInputPath=os.path.join(dirpath,filename), userOutputPath=out_path_group, userMissingPath=outMissing,userOutputFormat='return')

                logger.info(f"DataFrame summary:\n{df.describe()}")
                dfs.append(df)
        aggregated_df = pd.concat(dfs, ignore_index=True)

        # Write aggregated data to Parquet
        table = pa.Table.from_pandas(aggregated_df)

        pq.write_table(table, out_path_group)

        for anchor in anchors:
            dfs = []
            out_path_group = os.path.join(outfiledir, 'parquet_groups', resourceType + '_' + anchor, par_dir + '.parquet')
            for dirpath, dirnames, filenames in os.walk('/tmp/input/'):
                for filename in filenames:
                    outMissing = os.path.join(outfiledir, 'missing_paths', par_dir, filename + '.csv')
                    os.makedirs(os.path.dirname(outMissing), exist_ok=True)
                    df = parseFhir.parse(r'config/config_' + resourceType + '_' + anchor + '.ini', userInputPath=os.path.join(dirpath,filename),
                                         userOutputPath=out_path_group, userMissingPath=outMissing,userOutputFormat='return')

                    dfs.append(df)
            aggregated_df = pd.concat(dfs, ignore_index=True)

            # Write aggregated data to Parquet
            table = pa.Table.from_pandas(aggregated_df)
            os.makedirs(os.path.dirname(out_path_group), exist_ok=True)
            pq.write_table(table, out_path_group)

    # for processing streamed files
    else:
        outPath = os.path.join(outfiledir,'parquet_files',resourceType, par_dir, filename + '.parquet')
        outMissing = os.path.join(outfiledir,'missing_paths',par_dir, filename + '.csv')
        os.makedirs(os.path.dirname(outPath), exist_ok=True)
        os.makedirs(os.path.dirname(outMissing), exist_ok=True)
        parseFhir.parse(r'config/config_'+ resourceType +'.ini', userInputPath=filepath, userOutputPath=outPath, userMissingPath=outMissing)
        for anchor in anchors:
            outPath = os.path.join(outfiledir,'parquet_files',resourceType + '_' + anchor, par_dir, filename + '_' + anchor + '.parquet')
            outMissing = os.path.join(outfiledir,'missing_paths',par_dir, filename + '_' + anchor + '.csv')
            os.makedirs(os.path.dirname(outPath), exist_ok=True)
            os.makedirs(os.path.dirname(outMissing), exist_ok=True)
            parseFhir.parse(r'config/config_' + resourceType + '_' + anchor + '.ini', userInputPath=filepath, userOutputPath=outPath,userMissingPath=outMissing)

def choose_config(filepath,outfiledir,agg=False):
    path_parts = filepath.split(os.sep)
    if len(path_parts) >= 2:
        # Join the last two parts of the path (the directory and the file name)
        par_dir = path_parts[-2]
    else:
        # Use only the last part of the path (the file name)
        par_dir = ''
    filename = os.path.basename(filepath)
    outMissing = os.path.join(outfiledir,'missing_paths',par_dir, filename + '.parquet')
    os.makedirs(os.path.dirname(outMissing), exist_ok=True)
    resourceType = os.path.basename(filepath).split('_')[0]
    logger.info(f"filepath:{filename} resourceType:{resourceType}")

    if resourceType == 'AllergyIntolerance':
        execute_parse(resourceType,filepath,outfiledir,[],par_dir,filename,agg)

    elif resourceType == 'CarePlan':
        execute_parse(resourceType,filepath,outfiledir,['activity','contained'],par_dir,filename,agg)

    elif resourceType == 'Condition':
        execute_parse(resourceType,filepath,outfiledir,['code_coding'],par_dir,filename,agg)

    elif resourceType == 'Coverage':
        execute_parse(resourceType,filepath,outfiledir,[],par_dir,filename,agg)

    elif resourceType == 'DeviceUseStatement':
        execute_parse(resourceType,filepath,outfiledir,['extension','contained'],par_dir,filename,agg)

    elif resourceType == 'DiagnosticReport':
        execute_parse(resourceType,filepath,outfiledir,['result','extension'],par_dir,filename,agg)

    elif resourceType == 'DocumentReference':
        execute_parse(resourceType,filepath,outfiledir,[],par_dir,filename,agg)

    elif resourceType == 'Encounter':
        execute_parse(resourceType,filepath,outfiledir,['contained'],par_dir,filename,agg)

    elif resourceType == 'FamilyMemberHistory':
        execute_parse(resourceType,filepath,outfiledir,['condition'],par_dir,filename,agg)

    elif resourceType == 'Immunization':
        execute_parse(resourceType,filepath,outfiledir,['contained'],par_dir,filename,agg)

    elif resourceType == 'MedicationStatement':
        execute_parse(resourceType,filepath,outfiledir,['MedicationCodeableConcept_coding','contained'],par_dir,filename,agg)

    elif resourceType == 'Observation':
        execute_parse(resourceType,filepath,outfiledir,['hasMember','extension','contained'],par_dir,filename,agg)

    elif resourceType == 'Organization':
        execute_parse(resourceType,filepath,outfiledir,[],par_dir,filename,agg)

    elif resourceType == 'Patient':
        execute_parse(resourceType,filepath,outfiledir,['address'],par_dir,filename,agg)

    elif resourceType == 'Procedure':
        execute_parse(resourceType,filepath,outfiledir,['contained','reasonCode'],par_dir,filename,agg)

    else:
        logging.error('Missed a resource type: ' + resourceType, exc_info=True)
        raise





def lambda_handler(event, context):
    logger.info(f"Starting: {json.dumps(event)}")
    try:
        clear_tmp_directory()
        s3_client = boto3.client('s3')
       

        local_input_path = '/tmp/input/'
        local_output_path = '/tmp/output/'
        os.makedirs(local_input_path, exist_ok=True)
        os.makedirs(local_output_path, exist_ok=True)

        # S3 event information
        input_type = None
        if event.get('Records') and event['Records'][0].get('eventSource') == 'aws:sqs':
            input_type = 'sqs'
            try:
                body = event['Records'][0]['body']
                receipt_handle = event['Records'][0]['receiptHandle']
                event_data = json.loads(body)
            except json.JSONDecodeError as e:
                print("Error parsing SQS message body:", e)
                raise e  # or handle the error
        else:
            input_type = 'trigger'
            event_data = event
        s3_event = event_data['Records'][0]['s3']
        bucket_name = s3_event['bucket']['name']
        agg = s3_event.get('agg', False)
        prefix = s3_event.get('prefix', 'zzzzz')
        pattern = s3_event.get('pattern', '*')
        skip_count = s3_event.get('skip', 0)
        recursion_depth = s3_event.get('recursion_depth', 0)
        file_key = s3_event.get('object', {}).get('key')


        logger.info(f"Bucket:{bucket_name}\nprefix:{prefix}\npattern{pattern}\nskip_count:{skip_count}\nrecursion_depth:{recursion_depth}\nagg:{agg}\nfile_key:{file_key}\nevent: {json.dumps(event)}")


        if agg:
            # Check the recursion depth
            if recursion_depth > 25:
                logger.error("Maximum recursion depth reached.")
                return {
                    'statusCode': 400,
                    'body': json.dumps('Maximum recursion depth reached')
                }
            # List and process files
            s3_resource = boto3.resource('s3')
            bucket = s3_resource.Bucket(bucket_name)
            processed_files_count = 0  # Counter for files processed after skipping
            total_files_count = 0  # Total files examined
            local_input_file = None  # Initialize the variable with a default value

            for obj in bucket.objects.filter(Prefix=prefix):
                if fnmatch.fnmatch(obj.key, pattern):
                    local_input_file = os.path.join(local_input_path, obj.key)

                    if obj.key.endswith('/'):  # Skip 'folders'
                        logger.info(f"Skipping 'folder' key: {obj.key}")
                        continue

                    # logger.info(f"Object key: {obj.key}, Local input file path: {local_input_file}")
                    if total_files_count < skip_count:
                        total_files_count += 1
                        continue  # Skip this file

                    try:
                        os.makedirs(os.path.dirname(local_input_file), exist_ok=True)
                        s3_client.download_file(bucket_name, obj.key, local_input_file)
                    except Exception as e:
                        logger.error(f"Error occurred while processing {obj.key}: {e}")
                        continue


                    processed_files_count += 1
                    total_files_count += 1

                    # Check if limit is reached
                    if processed_files_count >= 1000:
                        # Trigger next Lambda function
                        sqs = boto3.client('sqs')
                        new_event = {
                            "Records": [
                                {
                                    "s3": {
                                        "bucket": {
                                            "name": bucket_name
                                        },
                                        "object": {
                                            "key": obj.key
                                        },
                                        "prefix": prefix,
                                        "pattern": pattern,
                                        "skip": skip_count + 1000,
                                        "recursion_depth": recursion_depth + 1,
                                        "agg": True
                                    }
                                }
                            ]
                        }
                        message_body = json.dumps(new_event)
                        logging.info(f'Invoking sqs for {prefix} - {pattern}:{recursion_depth}')

                        sqs.send_message(
                            QueueUrl="https://sqs.us-east-1.amazonaws.com/123456789012/hg_connector_queue",
                            MessageBody=message_body
                        )
                        break
            if local_input_file is None:
                logger.error("No valid input file found.")
                return {
                    'statusCode': 400,
                    'body': json.dumps('No valid input file found.')
                }
            choose_config(local_input_file, local_output_path, True)

        ## single file processing
        else:
            local_input_file = '/tmp/input/' + file_key
            try:
                os.makedirs(os.path.dirname(local_input_file), exist_ok=True)
                s3_client.download_file(bucket_name, file_key, local_input_file)
                choose_config(local_input_file, local_output_path, False)
                processed_files_count = 1
                total_files_count = 1
            except Exception as e:
                logger.error(f"Error occurred while processing {file_key}: {e}")



        # Upload processed files to S3
        upload_processed_files(local_output_path, s3_client,recursion_depth)

        if input_type == 'sqs':
            try:
                sqs = boto3.client('sqs')
                sqs.delete_message(
                    QueueUrl="https://sqs.us-east-1.amazonaws.com/123456789012/hg_connector_queue",
                    ReceiptHandle=receipt_handle
                )
            except Exception as e:
                logger.error(f"Failed to remove message from queue: {e}")

        return {
            'statusCode': 200,
            'body': json.dumps(f'Processed {processed_files_count} files. Total processed: {total_files_count}')
        }
    except Exception as e:
        logger.error("An error occurred", exc_info=True)
        raise


def upload_processed_files(local_output_path, s3_client,recursion_depth):
    output_bucket_name = 'output_bucket_name'
    for dirpath, dirnames, filenames in os.walk(local_output_path):
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            if os.path.isfile(file_path):
                relative_path = os.path.relpath(file_path, start=local_output_path)
                if recursion_depth > 0:
                    base, ext = os.path.splitext(relative_path)
                    modified_relative_path = f"{base}_{recursion_depth}{ext}"
                    output_file_key = os.path.join('FHIR_Output', modified_relative_path)
                else:
                    output_file_key = os.path.join('FHIR_Output', relative_path)
                output_file_key = output_file_key.replace(os.path.sep, '/')
                s3_client.upload_file(file_path, output_bucket_name, output_file_key)
```

</details>
