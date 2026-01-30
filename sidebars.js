/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    "welcome",
    "getting-started",

    {
      type: "category",
      label: "1. Connectors",
      items: [
        "connectors/overview",
        "connectors/building-a-connector",
        "connectors/pre-built-connectors",
        "connectors/fhir-inferno",
      ],
    },
    "input-layer",
    {
      type: "category",
      label: "3. Data Quality",
      items: [
        "data-quality-overview",
        "data-pipeline-tests",
        "data-quality-dashboard",
      ],
    },
    {
      type: "category",
      label: "4. Core Data Model",
      items: [
        "core-data-model/overview",
        "core-data-model/appointment",
        "core-data-model/condition",
        "core-data-model/eligibility",
        "core-data-model/encounter",
        "core-data-model/immunization",
        "core-data-model/lab-result",
        "core-data-model/location",
        "core-data-model/medical-claim",
        "core-data-model/medication",
        "core-data-model/member-months",
        "core-data-model/observation",
        "core-data-model/patient",
        "core-data-model/person_id_crosswalk",
        "core-data-model/pharmacy-claim",
        "core-data-model/practitioner",
        "core-data-model/procedure",
      ],
    },
    {
      type: "category",
      label: "5. Data Marts",
      items: [
        "data-marts/overview",
        "data-marts/ahrq-measures",
        "data-marts/ccsr",
        "data-marts/chronic-conditions",
        "data-marts/cms-hccs",
        "data-marts/ed-classification",
        "data-marts/encounter-types",
        "data-marts/fhir-preprocessing",
        "data-marts/financial-pmpm",
        "data-marts/hcc-recapture",
        "data-marts/hcc-suspecting",
        "data-marts/pharmacy",
        {
          type: "doc",
          id: "data-marts/tuva-provider-attribution",
          label: "Provider Attribution",
        },
        "data-marts/quality-measures",
        "data-marts/readmissions",
        "data-marts/service-categories",
      ],
    },
    "terminology",
    "dashboards",
    "example-sql",
    "dbt-variables",
    {
      type: "category",
      label: "Data Warehouse Support",
      items: [
        "data-warehouse-support/data-warehouse-support-overview",
        "data-warehouse-support/tuva-databricks",
      ],
    },
    {
      type: "category",
      label: "Additional Tools",
      collapsible: true,
      items: [
        "empi",
        "predictive-models/risk-adjusted-benchmarking",
        "vocab-normalization",
      ],
    },
    {
      type: "category",
      label: "Contribution Guide",
      items: [
        "contributing/contributing",
        "contributing/style-guide",
      ],
    },

    "help",
  ],
  knowledgeSidebar: [
    "knowledge/introduction",
    {
      type: "category",
      label: "Getting Started",
      collapsed: true,
      items: [
        "knowledge/getting-started/data-engineering-tools",
        "knowledge/getting-started/data-science-tools",
      ],
    },
    {
      type: "category",
      label: "Part 1: Healthcare Data Sources",
      collapsible: false,
      className: "sidebar-chapter",
      items: [
        "knowledge/data-sources/member-and-enrollment-data",
        {
          type: "category",
          label: "Medical Claims Data",
          collapsible: true,
          collapsed: true,
          items: [
            "knowledge/data-sources/claims-data/intro-to-claims",
            "knowledge/data-sources/claims-data/header-line",
            "knowledge/data-sources/claims-data/key-data-elements",
            "knowledge/data-sources/claims-data/adjustments-denials-reversals",
            "knowledge/data-sources/claims-data/incurred-paid-runout",
          ],
        },
        "knowledge/data-sources/pharmacy-claims-data",
        "knowledge/data-sources/provider-data",
        "knowledge/data-sources/ehr-data",
        "knowledge/data-sources/fhir-apis",
        "knowledge/data-sources/adt-messages",
        "knowledge/data-sources/lab-results",
      ],
    },
    {
      type: "category",
      label: "Part 2: Claims Groupers & Algorithms",
      collapsible: false,
      className: "sidebar-chapter",
      items: [
        "knowledge/claims-groupers-and-algos/service-categories",
        "knowledge/claims-groupers-and-algos/encounters",
        "knowledge/claims-groupers-and-algos/attribution",
      ],
    },
    {
      type: "category",
      label: "Part 3: Analytics",
      collapsible: false,
      className: "sidebar-chapter",
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
          ],
        },
        "knowledge/analytics/hospital-readmissions",
        "knowledge/analytics/quality-measures",
        "knowledge/analytics/risk-adjustment",
      ],
    },
  ],

  communitySidebar: [
    "community/community-overview",
    "community/community-meetups",
    "community/manifesto",
  ],
};

module.exports = sidebars;
