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
                "getting-started/tutorial",
                ]
        },

        {
            type: "category",
            label: "Connectors",
            items: [
                "connectors/overview",
                "connectors/medicare-cclf",
                "connectors/medicare-lds",
                "connectors/fhir",
                "connectors/elation",
                ]
        },

        "claims-preprocessing-guide",
        "geo-coding",

        {
            type: "category",
            label: "Core Data Model",
            items: [
                "core-data-model/overview",
                "core-data-model/condition",
                "core-data-model/eligibility",
                "core-data-model/encounter",
                "core-data-model/lab-result",
                "core-data-model/location",
                "core-data-model/medical-claim",
                "core-data-model/medication",
                "core-data-model/observation",
                "core-data-model/patient",
                "core-data-model/pharmacy-claim",
                "core-data-model/practitioner",
                "core-data-model/procedure",             
            ]
        },

        {
            type: "category",
            label: "Data Marts",
            items: [
                "data-marts/overview",
                "data-marts/ccsr",
                "data-marts/chronic-conditions",
                "data-marts/claims-preprocessing",
                "data-marts/cms-hccs",
                "data-marts/ed-classification",
                "data-marts/financial-pmpm",
                "data-marts/quality-measures",
                "data-marts/readmissions",
                
            ]
        },

        "reference-data",
        "synthetic-data",
        "terminology-sets",
        "contributing",
        "help",
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
        "use-cases/financial-pmpm",
    ]
};

module.exports = sidebars;

