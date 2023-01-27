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
                "fundamentals/claims-forms",
                "fundamentals/data-elements",
                "fundamentals/eligibility",
                "fundamentals/encounters",
                "fundamentals/how-claims-are-paid",
                "fundamentals/prescription-drugs",
                "fundamentals/providers",
                "fundamentals/service-categories",
              ]
      },
      {
        type: "category",
        label: "Claims Data Analytics",
        items: ["analytics/overview",
                "analytics/chronic-conditions",
                "analytics/data-profiling",
                "analytics/mortality",
                "analytics/patient-demographics",
                "analytics/readmissions",
                "analytics/spend-and-utilization",
              ]
      },
      {
        type: "category",
        label: "Claims Data Warehousing",
        items: ["claims-data-warehouse/platform-architecture", 
                "claims-data-warehouse/data-acquisition",
                "claims-data-warehouse/mapping-guide",
                "claims-data-warehouse/maintenance",]
      },
      {
        type: "category",
        label: "How to Contribute",
        items: ["how-to-contribute/building-knowledge","how-to-contribute/edit-github"]
      },  
          ],
        };

module.exports = sidebars;

