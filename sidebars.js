/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = 
{
    docsSidebar: 
    [ 
        "intro",

        {
        type: "category",
        label: "1. Claims Data Fundamentals",
        items: [
            "claims-data-fundamentals/intro-to-claims",
            "claims-data-fundamentals/claims-forms",
            "claims-data-fundamentals/administrative-codes",
            "claims-data-fundamentals/claims-dates",
            "claims-data-fundamentals/adjustments-denials-reversals",
            "claims-data-fundamentals/data-quality-issues",
            ]
        },

        {
            type: "category",
            label: "2. Financial PMPM",
            items: [
                "claims-data-fundamentals/member-months",
                "claims-data-fundamentals/service-categories",
                ]
        },

        {
            type: "category",
            label: "3. Emergency Department",
            items: [
                "emergency-department/grouping-claims",
                ]
        },

        {
            type: "category",
            label: "4. Acute Inpatient",
            items: [
                "hospital-readmissions",
                ]
        },

        {
            type: "category",
            label: "Risk Adjustment",
            items: [
                "risk-adjustment/overview",
                "risk-adjustment/cms-hccs",
                "risk-adjustment/hhs-hccs",
                ]
            },

        {
        type: "category",
        label: "Drug Terminology",
        items: [
            "drug-terminology/national-drug-codes",
            ]
        },



        "provider-data",

        "provider-panel-attribution",

        "quality-measures",



        "contributing",
        "example-sql"
    ]
};

module.exports = sidebars;

