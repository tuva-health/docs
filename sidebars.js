/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docsSidebar: [ 
        "intro",
        "demo",
        "setup",
        {
            type: "category",
            label: "Claims Data Fundamentals",
            link: {
                type: 'doc',
                id: "claims-data-fundamentals/about",
            },
            items: [
                "claims-data-fundamentals/intro-to-claims",
                "claims-data-fundamentals/claims-data-elements",
                "claims-data-fundamentals/how-claims-are-paid",
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
                    label: "Acute Inpatient",
                    link: {
                        type: 'doc',
                        id: "data-marts/acute-inpatient/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "data-marts/acute-inpatient/data-dictionary/acute-inpatient-summary",
                        ]
                        },
                        "data-marts/acute-inpatient/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "CCSR",
                    link: {
                        type: 'doc',
                        id: "data-marts/ccsr/about",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Data Dictionary",
                            items: [
                                "data-marts/ccsr/data-dictionary/long-condition-category",
                            ],
                        },
                        "data-marts/ccsr/example-sql"
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
                        {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "data-marts/chronic-conditions/data-dictionary/cms-chronic-conditions-long",
                            "data-marts/chronic-conditions/data-dictionary/cms-chronic-conditions-wide",
                            "data-marts/chronic-conditions/data-dictionary/tuva-chronic-conditions-long",
                            "data-marts/chronic-conditions/data-dictionary/tuva-chronic-conditions-wide",
                        ]
                        },
                        {
                            type: "category",
                            label: "Value Sets",
                            items: [
                                "data-marts/chronic-conditions/value-sets/cms-chronic-conditions",
                                "data-marts/chronic-conditions/value-sets/tuva-chronic-conditions",
                            ]
                            },
                        "data-marts/chronic-conditions/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "Core",
                    link: {
                        type: 'doc',
                        id: "data-marts/core/about",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Data Dictionary",
                            items: [
                                "data-marts/core/data-dictionary/condition",
                                "data-marts/core/data-dictionary/encounter",
                                "data-marts/core/data-dictionary/patient",
                                "data-marts/core/data-dictionary/procedure",
                                "data-marts/core/data-dictionary/provider",
                            ],
                        },
                        "data-marts/core/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "Data Profiling",
                    link: {
                        type: 'doc',
                        id: "data-marts/data-profiling/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "data-marts/data-profiling/data-dictionary/summary",
                            "data-marts/data-profiling/data-dictionary/test-result",
                            "data-marts/data-profiling/data-dictionary/test-detail",
                        ],
                    },
                    "data-marts/data-profiling/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "Member Months",
                    link: {
                        type: 'doc',
                        id: "data-marts/member-months/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "data-marts/member-months/data-dictionary/member-months",
                        ]
                        },
                        "data-marts/member-months/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "PMPM",
                    link: {
                        type: 'doc',
                        id: "data-marts/pmpm/about",
                    },
                    items: [
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "data-marts/pmpm/data-dictionary/pmpm-builder",
                            "data-marts/pmpm/data-dictionary/pmpm-trends",
                        ]
                        },
                        "data-marts/pmpm/example-sql"
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
                    {
                        type: "category",
                        label: "Data Dictionary",
                        items: [
                            "data-marts/readmissions/data-dictionary/readmission-summary",
                            "data-marts/readmissions/data-dictionary/encounter-augmented",
                        ]
                        },
                        {
                            type: "category",
                            label: "Value Sets",
                            items: [
                                "data-marts/readmissions/value-sets/acute-diagnosis-ccs",
                                "data-marts/readmissions/value-sets/acute-diagnosis-icd-10-cm",
                                "data-marts/readmissions/value-sets/always-planned-css-diagnosis-category",
                                "data-marts/readmissions/value-sets/always-planned-css-procedure-category",
                                "data-marts/readmissions/value-sets/exclusion-ccs-diagnosis-category",
                                "data-marts/readmissions/value-sets/icd-10-cm-to-ccs",
                                "data-marts/readmissions/value-sets/icd-10-pcs-to-ccs",
                                "data-marts/readmissions/value-sets/potentially-planned-css-procedure-category",
                                "data-marts/readmissions/value-sets/potentially-planned-icd-10-pcs",
                                "data-marts/readmissions/value-sets/specialty-cohort",
                                "data-marts/readmissions/value-sets/surgery-gynecology-cohort",
                            ]
                            },
                        "data-marts/readmissions/example-sql"
                    ]
                },

                {
                    type: "category",
                    label: "Service Category Grouper",
                    link: {
                        type: 'doc',
                        id: "data-marts/service-category-grouper/about",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Data Dictionary",
                            items: [
                                "data-marts/service-category-grouper/data-dictionary/service-category-grouper",
                            ],
                        },
                        "data-marts/service-category-grouper/example-sql"
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
                        "terminology/conditions-and-procedures/icd-10-cm",
                        "terminology/conditions-and-procedures/icd-10-pcs",
                        "terminology/conditions-and-procedures/icd-9-cm",
                        "terminology/conditions-and-procedures/mdc",
                        "terminology/conditions-and-procedures/ms-drg"
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
        "help"
    ]
};

module.exports = sidebars;

