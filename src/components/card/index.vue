<template>
  <div
    class="overflow-hidden rounded-xl border border-second-200 bg-white dark:border-second-700 dark:bg-second-900 dark:text-second-100"
  >
    <div
      class="flex items-center gap-x-4 border-b border-second-900/5 bg-second-50 p-6 dark:bg-second-800"
    >
      <div
        class="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white object-cover ring-1 ring-second-900/10 dark:dark:bg-second-900 dark:ring-second-700"
      >
        <component class="h-8 w-8" :is="icon()" />
      </div>

      <div
        class="text-lg font-medium leading-6 text-second-900 dark:text-second-200"
      >
        {{ title }}
      </div>
    </div>
    <div
      class="break-words px-6 py-4 text-sm leading-6 text-second-500 dark:text-second-400"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ElementCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: Function,
      required: true,
    },
  },
});
</script>
