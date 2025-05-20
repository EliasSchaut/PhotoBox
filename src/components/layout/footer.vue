<template>
  <footer class="bg-second-100 dark:bg-second-900">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
      <nav
        class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        :aria-label="$t('footer.title')"
      >
        <div v-for="link in links" :key="link.title" class="pb-6">
          <nuxt-link
            v-if="link?.intern"
            :to="link.href"
            class="text-sm leading-6 text-second-600 hover:text-second-900 dark:text-second-300 dark:hover:text-second-400"
          >
            {{ link.title }}
          </nuxt-link>
          <a
            v-else
            :href="link.href"
            target="_blank"
            class="text-sm leading-6 text-second-600 hover:text-second-900 dark:text-second-300 dark:hover:text-second-400"
            >{{ link.title }}</a
          >
        </div>
      </nav>
      <p
        class="mt-10 text-center text-xs leading-5 text-second-500 dark:text-second-300"
      >
        &copy; 2024 Elias Lorenz Schaut
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const { t } = useI18n();

    return {
      links: [
        {
          title: t('footer.home'),
          href: '/',
          intern: true,
        },
        {
          title: t('footer.source'),
          href: 'https://github.com/EliasSchaut/NuxtTemplate',
        },
        { title: t('footer.resources'), href: '/resources', intern: true },
        { title: t('footer.imprint'), href: '/imprint', intern: true },
        { title: t('footer.privacy'), href: '/privacy', intern: true },
      ] as Array<{ title: string; href: string; intern?: boolean }>,
    };
  },
});
</script>
