<template>
  <header>
    <nav>
      <div
        class="flex items-center justify-between bg-primary-400 p-5 dark:bg-primary-500"
      >
        <a class="text-3xl font-bold" href="/">Elias&nbsp;Schaut</a>

        <ul class="flex items-center space-x-5 text-lg font-semibold">
          <li class="hidden sm:list-item"><a href="/#about">Über&nbsp;uns</a></li>
          <li class="space-x-3">
            <SettingTheme />
            <SettingLang />
          </li>
        </ul>
      </div>
      <div class="h-1 bg-primary-500 px-1 dark:bg-primary-400" />
    </nav>
  </header>
</template>