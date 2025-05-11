<template>
  <q-page>
    <div class="tw-border tw-w-[100vw] tw-h-full tw-p-4 tw-bg-slate-950">
      <!-- class="tw-border tw-w-[100vw] tw-h-full tw-p-4 tw-bg-slate-900 tw-color text-white" -->
      <div class="tw-flex tw-items-center tw-gap-9">
        <!-- <div
          class="tw-w-24 tw-h-24 tw-flex tw-items-center data-[dark=true]:tw-bg-black/60 tw-border"
        >
      </div> -->
        <q-img :src="Panda" class="tw-w-36" />
        <div class="tw-text-xl">BearFit 🐾</div>
      </div>
      <div
        class="tw-border tw-border-slate-300 tw-rounded-md tw-h-[60vh] tw-p-3 tw-overflow-hidden"
      >
        <div v-if="!openSheet" class="tw-h-[60vh] tw-p-3 tw-overflow-hidden">
          <div>
            <span class="tw-text-xl"> Ficha: </span>
            <span class="tw-text-lg">
              {{ sheetStore.WorkoutSheet.title }}
            </span>
          </div>
          <q-virtual-scroll
            :items="sheetStore.WorkoutSheet.sheets"
            virtual-scroll-item-size="5"
            class="tw-flex tw-flex-col tw-h-full"
          >
            <template v-slot="{ item, index }">
              <div
                :key="index"
                class="tw-flex tw-justify-between tw-items-center tw-border tw-bg-neutral-400 tw-h-10 tw-rounded-md tw-p-2 tw-mb-3 tw-text-lg"
              >
                <div class="tw-text-black">{{ item.name }}</div>
                <q-btn
                  flat
                  icon="chevron_right"
                  size="sm"
                  @click="handleSheet(item)"
                />
              </div>
            </template>
          </q-virtual-scroll>
        </div>
        <div v-else class="tw-pt-4 tw-h-full">
          <div>{{ sheet.name }}</div>
          <q-scroll-area class="tw-relative tw-overflow-hidden tw-h-full">
            <div
              v-for="(exercice, index) in sheet.exercises"
              :key="index"
              class="tw-flex tw-flex-col tw-justify-between tw-border tw-bg-neutral-400 tw-rounded-md tw-p-2 tw-mb-3 tw-text-lg tw-transition-all tw-duration-300 tw-ease-in-out tw-relative tw-overflow-hidden"
              :class="{
                'tw-h-80': expandedIndex === index,
                'tw-h-10': expandedIndex !== index,
              }"
            >
              <div class="tw-text-black">
                {{ exercice.name }}
                <q-btn
                  flat
                  :icon="
                    expandedExercise
                      ? 'keyboard_arrow_up'
                      : 'keyboard_arrow_down'
                  "
                  size="sm"
                  @click="toggleExpand(index)"
                  class="tw-h-10"
                />
              </div>
              <div>teste</div>
            </div>
          </q-scroll-area>
        </div>
        <!-- <div class="tw-relative tw-h-[60vh] tw-p-3 tw-overflow-hidden">
          <div class="tw-w-full tw-border">
            <q-btn @click="openSheet = !openSheet" label="voltar" />
            <span>{{ sheet.name }}</span>
          </div>
          <q-virtual-scroll
            :items="sheet.exercises"
            virtual-scroll-item-size="5"
            class="tw-flex tw-flex-col tw-h-full"
          >
            <template v-slot="{ item, index }">
              <div
                :key="index"
                class="tw-flex tw-justify-between tw-border tw-bg-neutral-400 tw-rounded-md tw-p-2 tw-mb-3 tw-text-lg tw-transition-all tw-duration-300 tw-ease-in-out"
                :class="{
                  'tw-h-96': expandedIndex === index,
                  'tw-h-10': expandedIndex !== index,
                }"
              >
                <div class="tw-text-black">
                  {{ item.name }}
                </div>
                <q-btn
                  flat
                  :icon="
                    expandedExercise
                      ? 'keyboard_arrow_up'
                      : 'keyboard_arrow_down'
                  "
                  size="sm"
                  @click="toggleExpand(index)"
                  class="tw-h-10"
                />
              </div>
            </template>
          </q-virtual-scroll>
        </div> -->
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, Dark } from "quasar";
import { useSheet } from "stores/WorkoutSheet.js";
import Panda from "src/assets/panda.png";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const sheetStore = useSheet();
const toggleDarkMode = () => {
  Dark.set(!Dark.isActive);
  console.log(Dark.isActive);
};

const exercise = ref({
  id: null,
  name: null,
  muscleGroup: null,
  sets: null,
  reps: null,
  weight: null,
  restSeconds: null,
  notes: null,
});

const openSheet = ref(false);
const sheet = ref();

const handleSheet = (item) => {
  openSheet.value = true;
  sheet.value = item;
  console.log(item);
};

const expandedIndex = ref(null);

const toggleExpand = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
};

const handleExercice = (exercice) => {
  console.log(exercice);
};
// const WorkoutSheet = ref({
//   id: null,
//   title: null,
//   createdAt: null,
//   sheets: [
//     {
//       id: null,
//       name: "LegDay",
//       muscleGroup: null,
//       notes: null,
//       exercises: [
//         {
//           id: null,
//           name: null,
//           muscleGroup: null,
//           sets: null,
//           reps: null,
//           weight: null,
//           restSeconds: null,
//           notes: null,
//         },
//       ],
//     },
//   ],
// });
// const ficha = ref({
//   exercicios: [],
//   nome: null,
// });

onBeforeMount(() => {
  // ficha.value = {
  //   exercicios: [
  //     { nome: "LegPress 45", carga: null, historico: [] },
  //     { nome: "Agachamento", carga: null, historico: [] },
  //     { nome: "Mesa extensora", carga: null, historico: [] },
  //   ],
  //   nome: "ABCDE",
  // };
  const dataAtual = new Date();
});
</script>

<style lang="scss">
* {
  @apply tw-text-white;
}
</style>
