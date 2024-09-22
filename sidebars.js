/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = 
{
    docsSidebar: 
    [ 
        "welcome",
        {
            type: "category",
            label: "Getting Started",
            items: [
                "getting-started/overview",
                "getting-started/data-warehouse-support",
                "getting-started/mapping-guide",
                "getting-started/customizations",
                "getting-started/terminology",
            ]
        },
        {
            type: "category",
            label: "Connectors",
            items: [
                "connectors/overview",
                "connectors/input-layer",
                {
                    type: "category",
                    label: "Claims",
                    items: [
                        "connectors/cms-cclf",
                        "connectors/cms-lds",
                    ]
                },
                {
                    type: "category",
                    label: "FHIR",
                    items: [
                        "connectors/fhir-inferno",
                        "connectors/cms-bcda",
                        "connectors/health-gorilla",
                    ]
                },
                {
                    type: "category",
                    label: "Medical Records",
                    items: [
                        "connectors/athenahealth",
                        "connectors/elation",
                    ]
                },
            ]
        },

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
                "data-marts/ahrq-measures",
                "data-marts/ccsr",
                "data-marts/chronic-conditions",
                "data-marts/claims-normalization",
                "data-marts/cms-hccs",
                "data-marts/ed-classification",
                "data-marts/encounter-types",
                "data-marts/financial-pmpm",
                "data-marts/hcc-suspecting",
                "data-marts/pharmacy",
                "data-marts/quality-measures",
                "data-marts/readmissions",
                "data-marts/service-categories",
            ]
        },

        {
            type: "category",
            label: "Data Quality",
            items: [
                "data-quality/overview",
                "data-quality/mapping",
                "data-quality/data-marts",
                "data-quality/key-metrics",
            ]
        },

        {
            type: "category",
            label: "Terminology",
            items: [
                "terminology/overview",
                "terminology/admit-source",
                "terminology/admit-type",
                "terminology/ansi-fips-state",
                "terminology/apr-drg",
                "terminology/bill-type",
                "terminology/calendar",
                "terminology/census-shape-files",
                "terminology/claim-type",
                "terminology/code-type",
                "terminology/discharge-disposition",
                "terminology/encounter-type",
                "terminology/ethnicity",
                "terminology/fips-county",
                "terminology/gender",
                "terminology/hcpcs-level-2",
                "terminology/hcpcs-to-rbcs",
                "terminology/icd-9-cm",
                "terminology/icd-9-pcs",
                "terminology/icd-10-cm",
                "terminology/icd-10-pcs",
                "terminology/loinc-deprecated",
                "terminology/loinc",
                "terminology/mdc",
                "terminology/medicare-dual-eligibility",
                "terminology/medicare-orec",
                "terminology/medicare-status",
                "terminology/ms-drg-weights-los",
                "terminology/ms-drg",
                "terminology/ndc",
                "terminology/other-provider-taxonomy",
                "terminology/payer-type",
                "terminology/place-of-service",
                "terminology/present-on-admission",
                "terminology/provider",
                "terminology/race",
                "terminology/revenue-center",  
                "terminology/rxnorm-to-atc",
                "terminology/snomed-ct-transitive-closures",
                "terminology/snomed-ct",  
                "terminology/snomed-to-icd10-map",
                "terminology/social-vulnerability-index",
                "terminology/ssa-state-fips",
            ]
        },

        {
            type: "category",
            label: "Value Sets",
            items: [
                "value-sets/overview",
                "value-sets/ahrq-measures",
                "value-sets/ccsr-groupers",
                "value-sets/chronic-conditions",
                "value-sets/clinical-concepts",
                "value-sets/cms-hccs",
                "value-sets/data-quality",
                "value-sets/ed-classification",
                "value-sets/hcc-suspecting",
                "value-sets/quality-measures",
                "value-sets/readmissions",
                "value-sets/service-categories",

            ]
        },
        {
            type: "category",
            label: "Guides",
            items: [
                "guides/geo-coding-sdoh",
            ]
        },
        {
            type: "category",
            label: "Contributing",
            items: [
                "contributing/contributing",
                "contributing/style-guide",
            ]
        },
        "help",
    ],

    analyticsSidebar: 
    [ 
        "analytics/introduction",
    ],

    knowledgeSidebar: 
    [ 
        "knowledge/introduction",

        {
            type: "category",
            label: "1. Claims Data Fundamentals",
            items: [
                "knowledge/claims-data-fundamentals/intro-to-claims",
                "knowledge/claims-data-fundamentals/claims-data-elements",
                "knowledge/claims-data-fundamentals/adjustments-denials-reversals",
                "knowledge/claims-data-fundamentals/member-months",
                "knowledge/claims-data-fundamentals/provider-npi",
                "knowledge/claims-data-fundamentals/service-categories",
            ]
        },

        {
            type: "category",
            label: "2. Risk Adjustment",
            items: [
                "knowledge/risk-adjustment/overview",
                "knowledge/risk-adjustment/cms-hccs",
                "knowledge/risk-adjustment/hhs-hccs",
            ]
        },

        "knowledge/hospital-readmissions",
        "knowledge/quality-measures",
        "knowledge/provider-attribution",
        "knowledge/national-drug-codes",
    ],
    
    communitySidebar: 
    [ 
        "community/community-guidelines",
        "community/community-meetups",
        "community/manifesto",
    ]
};

module.exports = sidebars;

