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
            "claims-data-fundamentals/claims-data-elements",
            "claims-data-fundamentals/claims-mapping-guide",
            "claims-data-fundamentals/data-quality-testing",
            "claims-data-fundamentals/adjustments-denials-reversals",
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
            label: "5. Risk Adjustment",
            items: [
                "risk-adjustment/overview",
                "risk-adjustment/cms-hccs",
                "risk-adjustment/hhs-hccs",
                ]
        },

        {
        type: "category",
        label: "6. Quality Measures",
        items: [
            "quality-measures",
            ]
        },

        {
            type: "category",
            label: "7. Drug Terminology",
            items: [
                "drug-terminology/national-drug-codes",
                ]
        },

        {
            type: "category",
            label: "8. Provider Attribution",
            items: [
                "provider-panel-attribution",
                ]
        },

        {
            type: "category",
            label: "9. Social Determinants",
            items: [
                "social-determinants/overview",
                ]
        },



        "provider-data",







        "contributing",
        "example-sql"
    ]
};

module.exports = sidebars;

