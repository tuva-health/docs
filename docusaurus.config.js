// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// {
//   plugins: [require.resolve("docusaurus-plugin-image-zoom")];
// }

const lightCodeTheme = require('prism-react-renderer/dist/index').github;
const darkCodeTheme = require('prism-react-renderer/dist/index').dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Tuva Project',
  tagline: 'Open source software for transforming raw healthcare data',
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
      {
        docs: {
          path: 'docs',
          routeBasePath: "/",
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/tuva-health/docs/edit/main/'
        },

        // blog: {
        //   blogTitle: 'Decoding Healthcare Analytics',
        //   blogDescription: 'A Docusaurus powered blog!',
        //   postsPerPage: 'ALL',
        //   blogSidebarTitle: 'All posts',
        //   blogSidebarCount: 'ALL',
        //   showReadingTime: true,
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          // Google Analytics 4 https://developers.google.com/analytics/devguides/collection/gtagjs/
          trackingID: 'G-2FG30MEX5P',
          anonymizeIP: false,
        },
      },
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

          {
            type: 'doc',
            docId: 'welcome',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'analytics/analytics-gallery',
            position: 'left',
            label: 'Analytics',
          },
          {
            type: 'docSidebar',
            sidebarId: 'knowledgeSidebar',
            position: 'left',
            label: 'Knowledge',
          },
          {
            type: 'docSidebar',
            sidebarId: 'communitySidebar',
            position: 'left',
            label: 'Community',
          },
          {
            type: 'docSidebar',
            sidebarId: 'videoSidebar',
            position: 'left',
            label: 'Videos',
          },
          // { to: 'journal-club', label: 'Journal Club', position: 'left' },
          // { to: 'manifesto', label: 'Manifesto', position: 'left' },

          {
            href: 'https://www.tuvahealth.com',
            position: 'right',
            className: 'header-tuva-link',
            'aria-label': 'Tuva Health',
          },
          {
            href: 'https://www.youtube.com/@tuvahealth',
            position: 'right',
            className: 'header-youtube-link',
            'aria-label': 'YouTube',
          },
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
          // {to: '/blog', label: 'Blog', position: 'left'}

        ],

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
            hideable: true,
            autoCollapseCategories: true
          },

        },
        blog: {
          // Use a custom truncate marker
          truncateMarker: /<!-- truncate -->/,
        },
    }),
};

module.exports = config
