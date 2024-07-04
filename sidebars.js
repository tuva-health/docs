/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = 
{
    docsSidebar: 
    [ 
        "introduction",
        "quickstart",
        "connectors/overview",
        "core-data-model",

        {
            type: "category",
            label: "Data Marts",
            items: [
                "data-marts/overview",
                "data-marts/ahrq-measures",
                "data-marts/ccsr",
                "data-marts/chronic-conditions",
                "data-marts/claims-preprocessing",
                "data-marts/cms-hccs",
                "data-marts/ed-classification",
                "data-marts/financial-pmpm",
                "data-marts/hcc-suspecting",
                "data-marts/pharmacy",
                "data-marts/quality-measures",
                "data-marts/readmissions",
            ]
        },
        "terminology",
        "clinical-concept-library",
        // {
        //     type: "category",
        //     label: "Data Dictionaries",
        //     items: [
        //         "data-dictionaries/ahrq-measures",
        //         "data-dictionaries/ccsr",
        //         "data-dictionaries/chronic-conditions",
        //         "data-dictionaries/claims-preprocessing",
        //         "data-dictionaries/clinical-concept-library",
        //         "data-dictionaries/core",
        //         "data-dictionaries/cms-hccs",
        //         "data-dictionaries/ed-classification",
        //         "data-dictionaries/financial-pmpm",
        //         "data-dictionaries/hcc-suspecting",
        //         "data-dictionaries/input-layer",
        //         "data-dictionaries/pharmacy",
        //         "data-dictionaries/quality-measures",
        //         "data-dictionaries/readmissions",
        //         "data-dictionaries/reference-data",
        //         "data-dictionaries/terminology",
        //         "data-dictionaries/value-sets",
        //     ]
        // },

        "help",
    ],

    guidesSidebar: 
    [
        "guides/overview",
        {
            type: "category",
            label: "Contributing",
            items: [
                "contribution-guides/contributing",
                "contribution-guides/development-style-guide",
            ]
        },
        "guides/dbt-configuration",
        "guides/etl-automation",
        "guides/geo-coding",
        {
            type: "category",
            label: "Mapping",
            items: [
                "guides/mapping/claims",
                "guides/fhir",
            ]
        },
        "guides/master-patient-index",
        "guides/normalization",
    ],

    usecaseSidebar: 
    [
        "use-cases/overview",
        "use-cases/acute-inpatient",
        "use-cases/ahrq-measures",
        "use-cases/chronic-conditions",
        "use-cases/cms-hccs",
        "use-cases/demographics",
        "use-cases/ed-visits",
        "use-cases/medical-pmpm",
        "use-cases/pharmacy",
        "use-cases/primary-care",
        "use-cases/urgent-care",

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
    ]
    
};

module.exports = sidebars;

