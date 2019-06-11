require("dotenv").config();
import NuxtConfiguration from "@nuxt/config";

const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = "3000";

const config: NuxtConfiguration = {

  mode: "universal",

  srcDir: "src/",

  debug: false,

  server: {
    host: process.env.SERVER_HOST || DEFAULT_HOST,
    port: process.env.SERVER_PORT || DEFAULT_PORT,
  },

  /*
  ** REST api endpoints
  */
  serverMiddleware: [
    {
      path: "/api/recipes",
      handler: "~/api/recipes.ts",
    },
    {
      path: "/api/articles",
      handler: "~/api/articles.ts",
    },
    {
      path: "/feed",
      handler: "~/api/feeds.ts",
    },
  ],

  /*
  ** Headers of the page
  */
  head: {
    title: "Copy & Pasta - der Foodblog aus Karlsruhe",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Copy & Pasta wurde 2019 von Michael Müller aus Karlsruhe ins Leben gerufen." },
      { name: "theme-color", content: "#ffffff" },
      { name: "p:domain_verify", content: "5f8e964f94d8de2f299a1e19f700c401" }, // Pinterest verify (delete after some time)
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "apple-touch-icon", sizes: "144x144", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.sv", color: "#5bbad5" },
      { rel: "alternate", type: "application/rss+xml", title: "RSS Feed für copyundpasta.de", href: "/feed/rss.xml" },
      { rel: "alternate", type: "application/atom+xml", title: "Atom Feed für copyundpasta.de", href: "/feed/atom.xml" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Merriweather+Sans:300,400,400i,700&display=swap" },
    ]
  },

  messages: {
    loading: "Lädt...",
    server_error: "Fehler",
    server_error_details: "Bei der Verarbeitung ist ein Fehler aufgetreten.",
    client_error: "Fehler",
    client_error_details: "Bei dere Generierung der Seite ist ein Fehler aufgetreten."
  },

  loading: {
    color: "#1eb5da",
  },

  /*
  ** Global CSS
  */
  css: [
    "normalize.css",
    "@/scss/element-theme/index.css",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/fontawesome",
    "@/plugins/filters",
    "@/plugins/globalComponents",
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    "@nuxtjs/axios",
  ],

  /*
  ** Axios module configuration
  ** Doc: https://axios.nuxtjs.org/usage
  */
  axios: {
    browserBaseURL: process.env.AXIOS_BASE_URL || `http://${DEFAULT_HOST}:${DEFAULT_PORT}`,
    baseUrl: process.env.AXIOS_BASE_URL || `http://${DEFAULT_HOST}:${DEFAULT_PORT}`,
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|ts|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }

}

export default config;
