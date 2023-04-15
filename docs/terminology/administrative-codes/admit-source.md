---
id: admit-source
title: "Admit Source"
---

import { CSVDataTable } from '@site/src/components/CSVDataTable';

Admit Source is a code appearing in institutional (i.e. UB-04) claims data that indicates where the patient came from prior to being admitted to the hospital.  

The admit_source_description column is the default meaning of the code.  The newborn_description column is the meaning of the code if the claim's admit_type_code is "4" (NewBorn) 

<CSVDataTable csvUrl="https://raw.githubusercontent.com/tuva-health/terminology/main/terminology/terminology__admit_source.csv" />