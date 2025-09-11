/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars =
{
    docsSidebar:
    [
        "welcome",
        {
            type: "category",
            label: "1. Connectors",
            items: [
                "connectors/connectors-overview",
                "connectors/building-a-connector",
                "connectors/claims-mapping-guide",
                {
                    type: "category",
                    label: "Pre-Built Connectors",
                    items: [
                        "connectors/cms-cclf",
                        "connectors/cms-lds",
                        "connectors/fhir-inferno",
                        "connectors/cms-bcda",
                        "connectors/health-gorilla",
                        "connectors/metriport",
                        "connectors/zus",
                        "connectors/athenahealth",
                        "connectors/canvas",
                        "connectors/cerner",
                        "connectors/elation",
                        "connectors/epic",
                        "connectors/healthie",
                        "connectors/bamboo",
                    ]
                },
            ]
        },
        "tuva-empi",
        "vocab-normalization",
        "data-quality",
        {
            type: "category",
            label: "5. Terminology Sets",
            items: [
                "terminology/overview",
                "terminology/loading-terminology",
                "terminology/act-site",
                "terminology/admit-source",
                "terminology/admit-type",
                "terminology/ansi-fips-state",
                "terminology/appointment-cancellation-reason",
                "terminology/appointment-status",
                "terminology/appointment-type",
                "terminology/apr-drg",
                "terminology/bill-type",
                "terminology/calendar",
                "terminology/census-shape-files",
                "terminology/claim-type",
                "terminology/code-type",
                "terminology/cvx",
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
                "terminology/immunization-route-code",
                "terminology/immunization-status",
                "terminology/immunization-status-reason",
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
            label: "6. Value Sets",
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
            label: "7. Data Model",
            items: [
                "core-data-model/overview",
                "connectors/input-layer",
                {
                type: "category",
                label: "Preprocessing",
                items: [
                    "data-marts/service-categories",
                    "data-marts/encounter-types",
                    ]
                },
                                {
                type: "category",
                label: "Core",
                items: [
                    "core-data-model/appointment",
                    "core-data-model/condition",
                    "core-data-model/eligibility",
                    "core-data-model/encounter",
                    "core-data-model/immunization",
                    "core-data-model/lab-result",
                    "core-data-model/location",
                    "core-data-model/medical-claim",
                    "core-data-model/medication",
                    "core-data-model/observation",
                    "core-data-model/patient",
                    "core-data-model/person_id_crosswalk",
                    "core-data-model/pharmacy-claim",
                    "core-data-model/practitioner",
                    "core-data-model/procedure",
                    ]
                },
                                {
                type: "category",
                label: "Data Marts",
                items: [
                    "data-marts/ahrq-measures",
                    "data-marts/ccsr",
                    "data-marts/chronic-conditions",
                    "data-marts/cms-hccs",
                    "data-marts/ed-classification",
                    "data-marts/fhir-preprocessing",
                    "data-marts/financial-pmpm",
                    "data-marts/hcc-suspecting",
                    "data-marts/pharmacy",
                    "data-marts/quality-measures",
                    "data-marts/readmissions",
                    ]
                },
            ]
        },

        {
            type: "category",
            label: "8. Analytics",
            items: [
                "analytics/overview",
                "analytics/dashboards",
                "analytics/streamlit",
                "analytics/notebooks"
            ]
        },
        
        {
            type: "category",
            label: "9. Predictive Models",
            items: [
                "predictive-models/overview",
                "predictive-models/risk-adjusted-benchmarking",
                "predictive-models/risk-stratification",
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
        {
            type: "category",
            label: "Data Warehouse Support",
            items: [
                "data-warehouse-support/data-warehouse-support-overview",
                "data-warehouse-support/tuva-databricks",
            ]
        },
        "help",
    ],

    knowledgeSidebar:
    [
        "knowledge/introduction",
        {
          type: 'category',
          label: 'Getting Started',
          collapsed: true,
          items: [
            "knowledge/data-engineering-fundamentals",
            "knowledge/data-science-tools",
            "knowledge/tuva-fundamentals",
          ],
        },

        {
            type: 'category',
            label: 'Part 1: Data Sources',
            collapsible: false,            // static, no caret, no toggle
            className: 'sidebar-chapter',  // for CSS (no indent)
            items: [
                'knowledge/data-sources/member-and-enrollment-data',
                {
                    type: 'category',
                    label: 'Medical Claims Data',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        'knowledge/data-sources/claims-data/intro-to-claims',
                        'knowledge/data-sources/claims-data/claims-data-elements',
                        'knowledge/data-sources/claims-data/adjustments-denials-reversals',
                        'knowledge/data-sources/claims-data/incurred-paid-runout',
                        'knowledge/data-sources/claims-data/cost-field-relationships',
                        'knowledge/data-sources/claims-data/claim-types-payment-codes',
                        'knowledge/data-sources/claims-data/header-line',
                        'knowledge/data-sources/claims-data/claims-data-sources',
                        'knowledge/data-sources/claims-data/providers',
                          ]
                },
                'knowledge/data-sources/pharmacy-claims-data',
                'knowledge/data-sources/provider-data',
                'knowledge/data-sources/clinical-data',
            ],
        },

        {
            type: 'category',
            label: 'Part 2: Claims Groupers & Algorithms',
            collapsible: false,            // static, no caret, no toggle
            className: 'sidebar-chapter',  // for CSS (no indent)
            items: [
                    "knowledge/claims-groupers-and-algos/service-categories",
                    "knowledge/claims-groupers-and-algos/encounters",
                    "knowledge/claims-groupers-and-algos/attribution",
            ],
        },

        {
            type: 'category',
            label: 'Part 3: Analytics',
            collapsible: false,            // static, no caret, no toggle
            className: 'sidebar-chapter',  // for CSS (no indent)
            items: [
                {
                    type: "category",
                    label: "Cost & Utilization",
                    collapsed: true,
                    items: [
                        "knowledge/analytics/member-months",
                        "knowledge/analytics/basic-pmpm",
                        "knowledge/analytics/utilization-metrics",
                        "knowledge/analytics/ed-visits",
                        "knowledge/analytics/acute-ip-visits",  
                    ]
                },
                "knowledge/analytics/hospital-readmissions",
                "knowledge/analytics/quality-measures",
                "knowledge/analytics/risk-adjustment",
            ],
        },
    ],

    communitySidebar:
    [
        "community/community-meetups",
        "community/manifesto",
        // "community/community-guidelines",

    ],

};

module.exports = sidebars;
