---
id: about
title: "Encounter Grouper"
---

If you want to do any sort of "per visit" analytics, grouping claims into encounters (i.e. visits) is a pre-requisite.  However, doing this grouping is complex work and requires assigning multiple claims and claim types to a single visit.  

Doing this work properly requires building encounter groupers for each type of encounter separately.  That's because each encounter type is slightly different and the nuanced rules for merging claims into each type are different.

So far, we've built an acute inpatient encounter grouper.  Soon we'll update the documentation to describe how this works in detail.  In the future we'll be adding more encounter types, e.g. ED visit, SNF, inpatient rehab, etc.