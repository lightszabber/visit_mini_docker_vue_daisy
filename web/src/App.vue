<template>
  <div class="min-h-screen">
    <div class="navbar bg-base-100 border-b">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Docker + Vue mini</a>
      </div>

      <div class="flex gap-2">
        <select class="select select-bordered"
                :value="store.theme"
                @change="store.setTheme($event.target.value)">
          <option value="corporate">corporate</option>
          <option value="dark">dark</option>
          <option value="dracula">dracula</option>
          <option value="cupcake">cupcake</option>
        </select>

        <RouterLink class="btn btn-ghost" to="/">Home</RouterLink>
        <RouterLink class="btn btn-ghost" to="/about">About</RouterLink>
      </div>
    </div>

    <main class="p-6 max-w-4xl mx-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAppStore } from "./stores/app";

const store = useAppStore();
store.setTheme(store.theme);
</script>
