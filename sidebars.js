/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = 
{
    docsSidebar: 
    [ 
        "intro",

        {
        type: "category",
        label: "Claims Data Fundamentals",
        items: [
            "claims-data-fundamentals/intro-to-claims",
            "claims-data-fundamentals/claims-forms",
            "claims-data-fundamentals/administrative-codes",
            "claims-data-fundamentals/claims-dates",
            "claims-data-fundamentals/adjustments-denials-reversals",
            "claims-data-fundamentals/data-quality-issues",
            "claims-data-fundamentals/service-categories",
            "claims-data-fundamentals/member-months",
            ]
        },

        {
        type: "category",
        label: "Drug Terminology",
        items: [
            "drug-terminology/national-drug-codes",
            ]
        },

        "hospital-readmissions",

        "provider-data",

        "provider-panel-attribution",

        "quality-measures",

        {
            type: "category",
            label: "Risk Adjustment",
            items: [
                "risk-adjustment/cms-hccs",
                "risk-adjustment/hhs-hccs",
                ]
            },

        "contributing",
        "example-sql"
    ]
};

module.exports = sidebars;

