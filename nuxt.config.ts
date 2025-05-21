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

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  runtimeConfig: {
    public: {
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
  },
});
