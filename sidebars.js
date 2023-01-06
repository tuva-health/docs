/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docsSidebar: [ 
      "intro",
        {
          type: "category",
          label: "Getting Started",
          items: ["getting-started/dbt", "getting-started/the-tuva-project","getting-started/mapping"]
        },
        {
          type: "category",
          label: "Intro to Claims Data",
          items: ["intro-claims/claims-data-generation","intro-claims/claims-data-elements","intro-claims/adjustments-and-reversals"]
        },
        {
          type: "category",
          label: "Claims Data Concepts",
          items: ["claims-data-concepts/overview","claims-data-concepts/patients","claims-data-concepts/medications"]
        },
        {
          type: "category",
          label: "Measures",
          items: ["readmissions"]
        },
        {
          type: "category",
          label: "Tuva Project Data Models",
          items: [
            {
              type: "category",
              label: "Claims Common Data Model",
              items: ["data-models/claims-common/eligibility","data-models/claims-common/medical-claim","data-models/claims-common/pharmacy-claim"]
            },
            {
              type: "category",
              label: "Data Marts",
              items: [
                  "data-models/claims-preprocessing",
                  "data-models/cms-chronic-conditions",
                  "data-models/tuva-chronic-conditions",
                  "data-models/pmpm",
                  "data-models/readmissions"
                ]
            },


          ]
        },
        "terminology",
        "how-to-contribute"
        
    ],
  };

module.exports = sidebars;

