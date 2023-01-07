/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docsSidebar: [ 
      "intro",
      {
        type: "category",
        label: "Getting Started",
        items: ["getting-started/dbt", "getting-started/the-tuva-project"]
      },
      {
        type: "category",
        label: "Intro to Claims Data",
        items: ["intro-claims/claims-data-generation","intro-claims/claims-data-elements"]
      },
      {
        type: "category",
        label: "Claims Data Concepts",
        items: [
            "claims-data-concepts/overview",
            "claims-data-concepts/adjustments-and-reversals",
        {
          type: "category",
          label: "Encounters",
          items: ["claims-data-concepts/acute-inpatient",
                  "claims-data-concepts/emergency-department",
                  "claims-data-concepts/hospice",
                  "claims-data-concepts/palliative-care"
                ]
        },
        {
          type: "category",
          label: "Hospital Measures",
          items: ["claims-data-concepts/mortality","claims-data-concepts/readmissions"]
        },
        "claims-data-concepts/medications",
        "claims-data-concepts/member-months",
        "claims-data-concepts/patient-demographics",
        "claims-data-concepts/pmpm",
        "claims-data-concepts/providers"
        ]
      },
      {
        type: "category",
        label: "The Tuva Project",
        items: [
          {
            type: "category",
            label: "Claims Data Model",
            items: ["the-tuva-project/claims-data-model/eligibility",
                    "the-tuva-project/claims-data-model/medical-claim",
                    "the-tuva-project/claims-data-model/pharmacy-claim"]
          },
          {
            type: "category",
            label: "Data Marts",
            items: [
                "the-tuva-project/data-marts/claims-preprocessing",
                "the-tuva-project/data-marts/cms-chronic-conditions",
                "the-tuva-project/data-marts/tuva-chronic-conditions",
                "the-tuva-project/data-marts/pmpm",
                "the-tuva-project/data-marts/readmissions"]
          },
          "the-tuva-project/terminology"]
      },
      {
        type: "category",
        label: "How to Contribute",
        items: ["how-to-contribute/building-knowledge","how-to-contribute/edit-github"]
      },  
          ],
        };

module.exports = sidebars;

