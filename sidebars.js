/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docsSidebar: [ 
        "intro",
        {
            type: "category",
            label: "Getting Started",
            items: [
                "getting-started/quickstart",
                "getting-started/tutorial",
                "getting-started/contributing",
            ]
          },

        {
        type: "category",
        label: "Claims Data",
        link: {
            type: 'doc',
            id: "claims-data/about",
        },
        items: [
            {
                type: "category",
                label: "Fundamentals",
                link: {
                    type: 'doc',
                    id: "claims-data/fundamentals/about",
                },
                items: [
                    "claims-data/fundamentals/intro-to-claims",
                    "claims-data/fundamentals/claims-data-elements",
                    "claims-data/fundamentals/how-claims-are-paid",
                ]
            },
            {
                type: "category",
                label: "Data Model",
                link: {
                    type: 'doc',
                    id: "claims-data/data-model/about",
                },
                items: [
                        "claims-data/data-model/eligibility",
                        "claims-data/data-model/medical-claim",
                        "claims-data/data-model/pharmacy-claim",
                        ]
            },
            "claims-data/mapping-guide",
            {
                type: "category",
                label: "Preprocessing",
                link: {
                    type: 'doc',
                    id: "claims-data/preprocessing/about",
                },
                items: [
                    {
                        type: "category",
                        label: "Data Profiling",
                        link: {
                            type: 'doc',
                            id: "claims-data/preprocessing/data-profiling/about",
                        },
                        items: [
                                "claims-data/preprocessing/data-profiling/summary",
                                "claims-data/preprocessing/data-profiling/test-detail",
                                "claims-data/preprocessing/data-profiling/test-result",
                                "claims-data/preprocessing/data-profiling/example-sql",
                                ]
                    },
                    {
                        type: "category",
                        label: "Encounter Grouper",
                        link: {
                            type: 'doc',
                            id: "claims-data/preprocessing/encounter-grouper/about",
                        },
                        items: [
                                "claims-data/preprocessing/encounter-grouper/acute-inpatient-summary",
                            
                                ]
                    },
                    {
                        type: "category",
                        label: "Service Categories",
                        link: {
                            type: 'doc',
                            id: "claims-data/preprocessing/service-category/about",
                        },
                        items: [
                                "claims-data/preprocessing/service-category/service-category-grouper",
                                ]
                    },
            ]
            },
            ]
        },
        "clinical-data/about",
        {
            type: "category",
            label: "Core Data Model",
            link: {
                type: 'doc',
                id: "core-data-model/about",
            },
            items: [
                    "core-data-model/condition",
                    "core-data-model/eligibility",
                    "core-data-model/encounter",
                    "core-data-model/lab-result",
                    "core-data-model/location",
                    "core-data-model/medical-claim",
                    "core-data-model/medication",
                    "core-data-model/observation",
                    "core-data-model/patient",
                    "core-data-model/practitioner",
                    "core-data-model/pharmacy-claim",
                    "core-data-model/procedure",
                    ]
        },
        {
            type: "category",
            label: "Data Marts",
            link: {
                type: 'doc',
                id: "data-marts/about",
            },
            items: [
                {
                    type: "category",
                    label: "CCSR",
                    link: {
                        type: 'doc',
                        id: "data-marts/ccsr/about",
                    },
                    items: [

                                "data-marts/ccsr/data-dictionary/long-condition-category",
                                "data-marts/ccsr/data-dictionary/long-procedure-category",
                                "data-marts/ccsr/data-dictionary/wide-condition-category",
                                "data-marts/ccsr/data-dictionary/wide-procedure-category",
                                "data-marts/ccsr/data-dictionary/singular-condition-category",
                            ]
                },
                {
                    type: "category",
                    label: "Chronic Conditions",
                    link: {
                        type: 'doc',
                        id: "data-marts/chronic-conditions/about",
                    },
                    items: [
                            "data-marts/chronic-conditions/data-dictionary/cms-chronic-conditions-long",
                            "data-marts/chronic-conditions/data-dictionary/cms-chronic-conditions-wide",
                            "data-marts/chronic-conditions/data-dictionary/tuva-chronic-conditions-long",
                            "data-marts/chronic-conditions/data-dictionary/tuva-chronic-conditions-wide",
                            ]
                },
                {
                    type: "category",
                    label: "CMS-HCC",
                    link: {
                        type: 'doc',
                        id: "data-marts/cms-hcc/about",
                    },
                    items: [
                                "data-marts/cms-hcc/data-dictionary/patient-risk-factors",
                                "data-marts/cms-hcc/data-dictionary/patient-risk-scores",
                            ]
                },
                {
                    type: "category",
                    label: "Financial PMPM",
                    link: {
                        type: 'doc',
                        id: "data-marts/financial-pmpm/about",
                    },
                    items: [
                            "data-marts/financial-pmpm/data-dictionary/pmpm",
                            "data-marts/financial-pmpm/data-dictionary/pmpm-prep",
                    ]
                },
                {
                    type: "category",
                    label: "Quality Measures",
                    link: {
                        type: 'doc',
                        id: "data-marts/quality-measures/about",
                    },
                    items: [
                            "data-marts/quality-measures/summary-long",
                            "data-marts/quality-measures/summary-wide",
                            "data-marts/quality-measures/summary-counts",
                    ]
                },
                {
                    type: "category",
                    label: "Readmissions",
                    link: {
                        type: 'doc',
                        id: "data-marts/readmissions/about",
                    },
                    items: [
                            "data-marts/readmissions/data-dictionary/readmission-summary",
                            "data-marts/readmissions/data-dictionary/encounter-augmented",
                    ]
                },
            ]
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
                {
                  type: "category",
                  label: "Calendar",
                  items: [
                      "terminology/calendar/calendar"
                  ]
                },
                {
                    type: "category",
                    label: "Conditions and Procedures",
                    items: [
                        "terminology/conditions-and-procedures/apr-drg",
                        "terminology/conditions-and-procedures/hcpcs-level-2",
                        "terminology/conditions-and-procedures/icd-9-cm",
                        "terminology/conditions-and-procedures/icd-9-pcs",
                        "terminology/conditions-and-procedures/icd-10-cm",
                        "terminology/conditions-and-procedures/icd-10-pcs",
                        "terminology/conditions-and-procedures/mdc",
                        "terminology/conditions-and-procedures/ms-drg"
                    ]
                },
                {
                    type: "category",
                    label: "Lab",
                    items: [
                        "terminology/lab/loinc"
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
                    link: {
                        type: 'doc',
                        id: "terminology/medications",
                    },
                    items: ["terminology/medications/ndc",
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
                        "terminology/providers/provider",
                        "terminology/providers/other-provider-taxonomy"
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
                }]
        },
        "example-sql",
        "help"
    ]
};

module.exports = sidebars;

