/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = 
{
    docsSidebar: 
    [ 
        {
            type: "category",
            label: "Getting Started",
            items: [
                "getting-started/introduction",
                "getting-started/quickstart",
            ]
        },

        // {
        //     type: "category",
        //     label: "Connectors",
        //     items: [
                "connectors/overview",
        //         "connectors/medicare-cclf",
        //         "connectors/medicare-lds",
        //         "connectors/fhir",
        //         "connectors/elation",
        //     ]
        // },

        {
            type: "category",
            label: "Data Dictionaries",
            items: [
                "data-dictionaries/input-layer", 
                "data-dictionaries/core",
                "data-dictionaries/ccsr",
                "data-dictionaries/chronic-conditions",
                "data-dictionaries/cms-hccs",
                "data-dictionaries/ed-classification",
                "data-dictionaries/financial-pmpm",
                "data-dictionaries/quality-measures",
                "data-dictionaries/readmissions",           
            ]
        },

        "quality-measures",
        "reference-data",
        "synthetic-data",
        "terminology-sets",
        "contributing",
        "help",
    ],

    guidesSidebar: 
    [
        "guides/geospatial-analytics",

    ],

    knowledgebaseSidebar: 
    [ 
        "knowledge-base/introduction",

        {
            type: "category",
            label: "1. Claims Data Fundamentals",
            items: [
                "knowledge-base/claims-data-fundamentals/intro-to-claims",
                "knowledge-base/claims-data-fundamentals/claims-data-elements",
                "knowledge-base/claims-data-fundamentals/adjustments-denials-reversals",
                "knowledge-base/claims-data-fundamentals/member-months",
                "knowledge-base/claims-data-fundamentals/provider-npi",
                "knowledge-base/claims-data-fundamentals/service-categories",
                "knowledge-base/claims-data-fundamentals/encounter-groupers",
            ]
        },

        {
            type: "category",
            label: "2. Risk Adjustment",
            items: [
                "knowledge-base/risk-adjustment/overview",
                "knowledge-base/risk-adjustment/cms-hccs",
                "knowledge-base/risk-adjustment/hhs-hccs",
            ]
        },

        "knowledge-base/hospital-readmissions",
        "knowledge-base/quality-measures",
        "knowledge-base/provider-attribution",
        "knowledge-base/national-drug-codes",
    ],

    usecaseSidebar: 
    [
        "use-cases/acute-inpatient",
        "use-cases/ed-visits",
        "use-cases/financial-pmpm",
        "use-cases/population-characteristics",
        "use-cases/risk-scores",

    ]
};

module.exports = sidebars;

