// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// {
//   plugins: [require.resolve("docusaurus-plugin-image-zoom")];
// }

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Tuva Project',
  tagline: 'Open source software for cleaning and transforming raw healthcare data',
  url: 'https://www.thetuvaproject.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tuva-health', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'deployment',
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [require.resolve("docusaurus-plugin-image-zoom")],

  presets: [
    [
       'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tuva-health/docs/edit/main/'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),          
        },
        gtag: {
          // Google Analytics 4 https://developers.google.com/analytics/devguides/collection/gtagjs/
          trackingID: 'G-2FG30MEX5P',
          anonymizeIP: false,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'The Tuva Project',
          src: 'img/TheTuvaProjectLogo.png',
        },
        items: [
        //   {
        //     type: 'doc',
        //     docId: 'intro',
        //     position: 'left',
        //     label: 'Knowledge',
        //   },
          // {
          //   to: 'https://github.com/tuva-health',
          //   label: 'Code',
          //   position: 'left',
          //   target: null,
          // },
          // {
          //   to: 'https://join.slack.com/t/thetuvaproject/shared_invite/zt-16iz61187-G522Mc2WGA2mHF57e0il0Q',
          //   label: 'Community',
          //   position: 'left',
          //   target: null,
          // },
          {
            href: 'https://join.slack.com/t/thetuvaproject/shared_invite/zt-16iz61187-G522Mc2WGA2mHF57e0il0Q',
            position: 'right',
            className: 'header-slack-link',
            'aria-label': 'Slack Community',
          },
          {
            href: 'https://github.com/tuva-health',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          //{to: '/blog', label: 'Blog', position: 'left'}

        ],
        
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'L6P3IKFH0A',
        // Public API key: it is safe to commit it
        apiKey: '1f6319a3d641117e237634af4e8b90da',
        indexName: 'thetuvaproject',
        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: '/docs/', // or as RegExp: /\/docs\//
        //   to: '/',
        // },
        // Optional: Algolia search parameters
        // searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable it)
        // searchPagePath: 'search',
    },
      footer: {
        style: 'light',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           to: '/blog',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //       ],
      //     },
      //   ],
        copyright: `<a href="https://netlify.com">This site is powered by Netlify</a> &nbsp;&nbsp;&nbsp; Copyright © ${new Date().getFullYear()} The Tuva Project`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
        zoom: {
          selector: '.markdown :not(em) > img',
          config: {
            // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
            background: {
              light: 'rgb(255, 255, 255)',
              dark: 'rgb(50, 50, 50)'
            }
          }
        },
        docs: {
          sidebar: {
            hideable: false,
          },
        },
    }),
};

module.exports = config;

