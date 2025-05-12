<template>
  <q-layout view="hHh lpR fFf" class="tw-flex">
    <q-header class="bg-primary text-white tw-hidden">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar size="24px" color="white">🐻</q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.fullPath" />
      <!-- <footer-navigation
        :links="[
          { link: '/', icon: 'sports_gymnastics ' },
          { link: '/fichas', icon: 'assignment ' },
          { link: '/exercices', icon: 'fitness_center' },
        ]"
      /> -->
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import FooterNavigation from "src/components/MobNav/FooterNavigation.vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
