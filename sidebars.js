/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docsSidebar: [ 
      "intro",
      
      {
        type: "category",
        label: "1. Setup",
        link: {
          type: 'doc',
          id: "setup/setup",
        },
        items: ["setup/the-tuva-project"]
      },

      {
        type: "category",
        label: "2. Data Model",
        link: {
          type: 'doc',
          id: "data-model/data-model",
        },
        items: [                
                {
                type: "category",
                label: "Staging",
                items: [
                          {
                            type: "category",
                            label: "Claims",
                            items: ["data-model/staging/claims/eligibility",
                                    "data-model/staging/claims/medical-claim",
                                    "data-model/staging/claims/pharmacy-claim"]
                          }
                        ]
                },
                {
                  type: "category",
                  label: "Data Profiling",
                  items: [
                          "data-model/data-profiling/summary"]
                },
                {
                  type: "category",
                  label: "Core",
                  items: [
                          "data-model/core/condition",
                          "data-model/core/eligibility",
                          "data-model/core/encounter",
                          "data-model/core/medical-claim",
                          "data-model/core/patient",
                          "data-model/core/pharmacy-claim",
                          "data-model/core/procedure",
                          "data-model/core/provider"]
                },
                {
                  type: "category",
                  label: "Data Marts",
                  items: [
                          "data-model/data-marts/cms-chronic-conditions",
                          "data-model/data-marts/cms-readmissions",
                          "data-model/data-marts/pmpm"]
                }
              ]
      },

      {
        type: "category",
        label: "3. Terminology",
        link: {
          type: 'doc',
          id: "terminology/terminology",
        },
        items: [
                "terminology/medications",
                "terminology/providers"]
      },

      {
        type: "category",
        label: "4. Claims Data",
        link: {
          type: 'doc',
          id: "claims-data/claims-data",
        },
        items: [

                "claims-data/data-profiling",
                {
                  type: "category",
                  label: "Preprocessing",
                  items: ["claims-data/preprocessing/service-categories",
                          "claims-data/preprocessing/encounters"]
                },
              ]
      },

      {
        type: "category",
        label: "5. Measures + Groupers",
        items: ["measures-groupers/chronic-conditions",
                "measures-groupers/readmissions",
                "claims-data/preprocessing/pmpm"]
      },
      "notebooks",

      {
        type: "category",
        label: "Appendix",
        items: ["appendix/dbt",
        {
          type: "category",
          label: "B. Intro to Claims Data",
          items: ["appendix/fundamentals/introduction",
                  "appendix/fundamentals/claims-data-elements",
                  "appendix/fundamentals/eligibility",
                  "appendix/fundamentals/payments"]
        },     
                "appendix/mapping-guide"]
      },
      
  ]
};

module.exports = sidebars;

