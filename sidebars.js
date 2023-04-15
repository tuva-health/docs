/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docsSidebar: [ 
        {
            type: "category",
            label: "Getting Started",
            link: {
                type: 'doc',
                id: "intro",
            },
            items: ["getting-started/setup",
                    "getting-started/help"]
        },

        {
            type: "category",
            label: "Connectors",
            link: {
                type: 'doc',
                id: "connectors/about",
            },
            items: ["connectors/medicare-cclf",
                    "connectors/medicare-lds"]
        },

        {
            type: "category",
            label: "Terminology",
            link: {
                type: 'doc',
                id: "terminology/about",
            },
            items: [
                    {
                        type: "category",
                        label: "Administrative Codes",
                        items: [
                            "terminology/administrative-codes/admit-source",
                            "terminology/administrative-codes/admit-type",
                            "terminology/administrative-codes/bill-type",
                            "terminology/administrative-codes/discharge-disposition",
                            "terminology/administrative-codes/medicare-dual-eligibility",
                            "terminology/administrative-codes/medicare-status",
                            "terminology/administrative-codes/place-of-service",
                            "terminology/administrative-codes/present-on-admission",
                            "terminology/administrative-codes/revenue-center"
                        ]
                    },
                    "terminology/calendar/calendar",
                    {
                        type: "category",
                        label: "Conditions and Procedures",
                        items: [
                            "terminology/conditions-and-procedures/apr-drg",
                            "terminology/conditions-and-procedures/betos",
                            "terminology/conditions-and-procedures/ccsr",
                            "terminology/conditions-and-procedures/hcpcs",
                            "terminology/conditions-and-procedures/icd-10-cm",
                            "terminology/conditions-and-procedures/icd-10-pcs",
                            "terminology/conditions-and-procedures/mdc",
                            "terminology/conditions-and-procedures/ms-drg"
                            // "terminology/conditions-and-procedures/snomed-ct"
                        ]
                    },
                    {
                        type: "category",
                        label: "Demographics",
                        items: [
                            "terminology/demographics/ethnicity",
                            "terminology/demographics/gender",
                            "terminology/demographics/race"
                        ]
                    },
                    {
                        type: "category",
                        label: "Geography",
                        items: [
                            "terminology/geography/ansi-fips-county",
                            "terminology/geography/ansi-fips-state",
                            "terminology/geography/ssa-fips-state"
                        ]
                    },
                {
                    type: "category",
                    label: "Medications",
                    items: [
                        // "terminology/medications/atc",
                        "terminology/medications/ndc",
                        // "terminology/medications/rx-norm"
                    ]
                },
                    {
                        type: "category",
                        label: "Providers",
                        link: {
                            type: 'doc',
                            id: "terminology/providers",
                        },
                        items: [
                            // "terminology/providers/medicare-specialty",
                            // "terminology/providers/nppes",
                            // "terminology/providers/nucc-taxonomy",
                            "terminology/providers/provider",
                            "terminology/providers/other-provider-taxonomy"
                            // "terminology/providers/provider-data"
                        ]
                    },
                    {
                        type: "category",
                        label: "Tuva Concepts",
                        items: [
                            "terminology/tuva-concepts/claim-type",
                            "terminology/tuva-concepts/code-type",
                            "terminology/tuva-concepts/encounter-type",
                            "terminology/tuva-concepts/payer-type"]
                    }
                ]
        },
      
        {
            type: "category",
            label: "Preprocessing",
            link: {
                type: 'doc',
                id: "preprocessing/about",
            },
            items: [
                {
                    type: "category",
                    label: "Input Layer",
                    link: {
                        type: 'doc',
                        id: "preprocessing/input-layer/about",
                    },
                    items: [
                            {
                            type: "category",
                            label: "Data Dictionary",
                            items: ["preprocessing/input-layer/data-dictionary/eligibility",
                                    "preprocessing/input-layer/data-dictionary/medical-claim",
                                    "preprocessing/input-layer/data-dictionary/pharmacy-claim"]
                            },
                    ]
                },

                {
                    type: "category",
                    label: "Data Profiling",
                    link: {
                        type: 'doc',
                        id: "preprocessing/data-profiling/about",
                    },
                    items: [
                            {
                            type: "category",
                            label: "Data Dictionary",
                            items: ["preprocessing/data-profiling/data-dictionary/summary",
                                    "preprocessing/data-profiling/data-dictionary/test-result",
                                    "preprocessing/data-profiling/data-dictionary/test-detail"]
                            },
                            "preprocessing/data-profiling/example-sql",
                    ]                
                },

                {
                    type: "category",
                    label: "Claims Preprocessing",
                    link: {
                        type: 'doc',
                        id: "preprocessing/claims-preprocessing/about",
                    },
                    items: ["preprocessing/claims-preprocessing/service-category-grouper",
                            "preprocessing/claims-preprocessing/encounter-grouper",]                
                },

                {
                    type: "category",
                    label: "Core",
                    link: {
                        type: 'doc',
                        id: "preprocessing/core/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "preprocessing/core/data-dictionary/condition",
                            "preprocessing/core/data-dictionary/eligibility",
                            "preprocessing/core/data-dictionary/encounter",
                            "preprocessing/core/data-dictionary/medical-claim",
                            "preprocessing/core/data-dictionary/patient",
                            "preprocessing/core/data-dictionary/pharmacy-claim",
                            "preprocessing/core/data-dictionary/procedure",
                            "preprocessing/core/data-dictionary/provider"]
                        },
                        "preprocessing/core/example-sql"
                    ]
                },
            ]
        },

        {
            type: "category",
            label: "Analytics",
            link: {
                type: 'doc',
                id: "analytics/about",
            },
            items: [

                {
                    type: "category",
                    label: "Acute Inpatient",
                    link: {
                        type: 'doc',
                        id: "analytics/acute-inpatient/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            ]
                        },

                        {
                            type: "category",
                            label: "Value Sets",
                            items: [
                            ]
                        },
                        "analytics/acute-inpatient/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "CCSR",
                    link: {
                        type: 'doc',
                        id: "analytics/ccsr/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            ]
                        },

                        {
                            type: "category",
                            label: "Value Sets",
                            items: [
                            ]
                        },
                        "analytics/ccsr/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "Chronic Conditions",
                    link: {
                        type: 'doc',
                        id: "analytics/chronic-conditions/about",
                    },
                    items: [
                        {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "analytics/chronic-conditions/data-dictionary/cms-chronic-conditions-long",
                            "analytics/chronic-conditions/data-dictionary/cms-chronic-conditions-wide",
                            "analytics/chronic-conditions/data-dictionary/tuva-chronic-conditions-long",
                            "analytics/chronic-conditions/data-dictionary/tuva-chronic-conditions-wide",
                        ]
                        },
                        {
                            type: "category",
                            label: "Value Sets",
                            items: [
                                "analytics/chronic-conditions/value-sets/cms-chronic-conditions",
                                "analytics/chronic-conditions/value-sets/tuva-chronic-conditions",
                            ]
                            },
                        "analytics/chronic-conditions/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "Emergency Department",
                    link: {
                        type: 'doc',
                        id: "analytics/emergency-department/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            ]
                        },

                        {
                            type: "category",
                            label: "Value Sets",
                            items: [
                            ]
                        },
                        "analytics/emergency-department/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "PMPM",
                    link: {
                        type: 'doc',
                        id: "analytics/pmpm/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "analytics/pmpm/data-dictionary/pmpm-builder",
                            "analytics/pmpm/data-dictionary/pmpm-trends",
                        ]
                        },
                        "analytics/pmpm/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "Readmissions",
                    link: {
                        type: 'doc',
                        id: "analytics/readmissions/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "analytics/readmissions/data-dictionary/readmission-summary",
                            "analytics/readmissions/data-dictionary/encounter-augmented",
                        ]
                        },
                        {
                            type: "category",
                            label: "Value Sets",
                            items: [
                                "analytics/readmissions/value-sets/acute-diagnosis-ccs",
                                "analytics/readmissions/value-sets/acute-diagnosis-icd-10-cm",
                                "analytics/readmissions/value-sets/always-planned-css-diagnosis-category",
                                "analytics/readmissions/value-sets/always-planned-css-procedure-category",
                                "analytics/readmissions/value-sets/exclusion-ccs-diagnosis-category",
                                "analytics/readmissions/value-sets/icd-10-cm-to-ccs",
                                "analytics/readmissions/value-sets/icd-10-pcs-to-ccs",
                                "analytics/readmissions/value-sets/potentially-planned-css-procedure-category",
                                "analytics/readmissions/value-sets/potentially-planned-icd-10-pcs",
                                "analytics/readmissions/value-sets/specialty-cohort",
                                "analytics/readmissions/value-sets/surgery-gynecology-cohort",
                            ]
                            },
                        "analytics/readmissions/example-sql"
                    ]
                },


                
            ]
        },

        {
            type: "category",
            label: "Appendix",
            items: [
                "appendix/dbt",
                {
                type: "category",
                label: "B. Intro to Claims Data",
                items: ["appendix/fundamentals/introduction",
                        "appendix/fundamentals/claims-data-elements",
                        "appendix/fundamentals/eligibility",
                        "appendix/fundamentals/payments"]
                },
                        "appendix/mapping-guide",
                        "appendix/style-guide"
                ]
            },
    ]
};

module.exports = sidebars;

