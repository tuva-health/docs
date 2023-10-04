/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = 
{
    docsSidebar: 
    [ 
        "intro",

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
            "claims-data-fundamentals/data-quality-issues",
            "claims-data-fundamentals/service-categories",
            "claims-data-fundamentals/member-months",
            ]
        },

        "cms-hccs",

        {
        type: "category",
        label: "Drug Terminology",
        link: {
            type: 'doc',
            id: "drug-terminology/about",
        },
        items: [
            "drug-terminology/national-drug-codes",
            ]
        },

        "hospital-readmissions",

        "provider-data",

        "contributing",

    ]
};

module.exports = sidebars;

