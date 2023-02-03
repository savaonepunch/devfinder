// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.scss"],
  modules: [
    "@nuxtjs/google-fonts",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon"
  ],
  imports: {
    dirs: ["stores"],
  },
  googleFonts: {
    families: {
      "Space Mono": [400, 500, 600, 700],
    },
  },
});
