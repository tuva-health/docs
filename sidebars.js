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
        label: "Claims Data Fundamentals",
        items: ["fundamentals/intro-to-claims",
                "fundamentals/claims-data-elements",
                "fundamentals/how-claims-are-paid",
                "fundamentals/enrollment-member-months",
                "fundamentals/encounters",
                {
                  type: "category",
                  label: "Measures",
                  items: ["fundamentals/pmpm",
                          "fundamentals/mortality",
                          "fundamentals/readmissions"]
                },
                "fundamentals/prescription-drugs",
                "fundamentals/providers"
              ]
      },
      {
        type: "category",
        label: "Claims Data Analytics",
        items: ["analytics/overview",
                {
                  type: "category",
                  label: "Claims Data Model",
                  items: ["analytics/claims-data-model/eligibility",
                          "analytics/claims-data-model/medical-claim",
                          "analytics/claims-data-model/pharmacy-claim"]
                },
                "analytics/claims-data-profiling",
                "analytics/claims-preprocessing",
                "analytics/chronic-conditions",
                "analytics/pmpm",
                "analytics/readmissions",
                "analytics/terminology"
              ]
      },
      {
        type: "category",
        label: "How to Contribute",
        items: ["how-to-contribute/building-knowledge","how-to-contribute/edit-github"]
      },  
          ],
        };

module.exports = sidebars;

