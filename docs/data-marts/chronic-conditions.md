---
id: chronic-conditions
title: "Chronic Conditions"
---

- [Data Dictionary](../data-dictionaries/chronic-conditions)
- [Code](https://github.com/tuva-health/tuva/tree/main/models/chronic_conditions)

The Chronic Conditions data mart implements two different chronic condition groupers: one defined by [CMS](https://www2.ccwdata.org/web/guest/condition-categories-chronic) and the other defined by Tuva.  We started defining chronic conditions in Tuva after struggling to use the CMS logic, either because certain chronic conditions were missing (e.g. non-alcoholic fatty liver disease, MASH, etc.) or because existing definitions were unsatisfactory (e.g. type 1 and type 2 diabetes are considered the same condition by CMS).  

Tuva Chronic Conditions are defined and/or reviewed by medically-trained clinical informaticists.