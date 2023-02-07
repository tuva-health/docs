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
        items: ["fundamentals/introduction",
                "fundamentals/claims-data-elements",
                "fundamentals/claims-data-quality",
                "fundamentals/eligibility",
                "fundamentals/encounters",

                "fundamentals/payments",
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
                {
                  type: "category",
                  label: "Hospital Measures",
                  items: ["analytics/mortality",
                          "analytics/readmissions",
                        ]
                },
                "analytics/patient-demographics",
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

