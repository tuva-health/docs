/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = 
{
    docsSidebar: 
    [ 
        "welcome",
        "quickstart",
        {
            type: "category",
            label: "Connectors",
            items: [
                "connectors/overview",
                "connectors/input-layer",
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
                "terminology/claim-type",
                "terminology/code-type",
                "terminology/discharge-disposition",
                "terminology/encounter-type",
                "terminology/ethnicity",
                "terminology/fips-county",
                "terminology/gender",
                "terminology/hcpcs-level-2",
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

        "help",
    ],

    guidesSidebar: 
    [
        "guides/overview",
        {
            type: "category",
            label: "Contributing",
            items: [
                "guides/contributing/contributing",
                "guides/contributing/style-guide",
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
        "guides/terminology",
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

