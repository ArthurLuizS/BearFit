<template>
  <q-page>
    <div class="tw-p-2 tw-w-[100vw] tw-h-full tw-relative">
      <q-tabs
        v-model="tab"
        class="text-teal tw-absolute tw-bottom-0 tw-left-[50%] tw-translate-x-[-50%]"
      >
        <q-tab name="Home" icon="sports_gymnastics" label="Home" />
        <q-tab name="Fichas" icon="assignment" label="Fichas" />
        <q-tab name="Exercicios" icon="fitness_center" label="Exercicios" />
      </q-tabs>
      <!-- class="tw-border tw-w-[100vw] tw-h-full tw-p-4 tw-bg-slate-900 tw-color text-white" -->
      <div class="tw-flex tw-items-center tw-gap-9">
        <!-- <div
          class="tw-w-24 tw-h-24 tw-flex tw-items-center data-[dark=true]:tw-bg-black/60 tw-border"
        >
      </div> -->
        <q-img :src="Panda" class="tw-w-36" />
        <div class="tw-text-xl">BearFit 🐾</div>
      </div>
      <q-tab-panels v-model="tab" class="no-padding">
        <q-tab-panel name="Home">
          <home-section />
        </q-tab-panel>
        <q-tab-panel name="Fichas">
          <fichas-section></fichas-section
        ></q-tab-panel>
        <q-tab-panel name="Exercicios">
          <exercices-section></exercices-section>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useSheet } from "stores/WorkoutSheet.js";
import ExercicesSection from "src/components/ExercicesSection.vue";
import HomeSection from "src/components/HomeSection.vue";
import FichasSection from "src/components/FichasSection.vue";
import Panda from "src/assets/panda.png";

const tab = ref();
onBeforeMount(() => {
  // ficha.value = {
  //   exercicios: [
  //     { nome: "LegPress 45", carga: null, historico: [] },
  //     { nome: "Agachamento", carga: null, historico: [] },
  //     { nome: "Mesa extensora", carga: null, historico: [] },
  //   ],
  //   nome: "ABCDE",
  // };
  tab.value = "Home";
  const dataAtual = new Date();
});
</script>

<style lang="scss" scoped>
* {
  @apply tw-text-white;
}

#q-app
  > div
  > div.q-page-container
  > main
  > div
  > div.q-tab-panels.q-panel-parent.no-padding
  > div
  > div {
  padding: 0;
}
</style>
