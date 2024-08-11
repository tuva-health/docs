---
id: deployment
title: "4. Deployment"
---

After you've completed a first pass of mapping you're ready to deploy Tuva.  This will transform all the data that has been mapped to the Input Layer into the Core Data Model and Data Marts, as well as load all the Terminology Sets and Value Sets.

If you've set everything up correctly you can deploy by executing `dbt build` from the command line (if you're using dbt core).  `dbt build` will load all seed files (i.e. terminology and value sets), run all SQL models, and run all dbt tests.

You can also use `dbt run` if you only want to run the SQL models (and not load seed files or run tests) and you can run `dbt seed` to load just the seed files.

