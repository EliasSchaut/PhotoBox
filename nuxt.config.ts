import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  workspaceDir: ".",
  srcDir: "./src",
  compatibilityDate: "2025-05-20",
  css: ["~/assets/css/main.css"],
  modules: [],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: "https://photobox.schaut.dev",
    name: "PhotoBox",
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
});
