<template>
  <div
    class="tw-border tw-border-slate-300 tw-rounded-md tw-h-[60vh] tw-px-2 tw-overflow-hidden tw-bg-black"
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
    <div v-else class="tw-pt-1 tw-h-full">
      <div class="tw-w-full tw-h-8 tw-flex tw-justify-center tw-relative">
        <q-icon
          name="arrow_back"
          @click="openSheet = !openSheet"
          size="sm"
          class="tw-absolute tw-left-0"
        />
        <span class="tw-text-xl">
          {{ sheet.name }}
        </span>
      </div>
      <q-scroll-area class="tw-relative tw-overflow-hidden tw-h-full">
        <div
          v-for="(exercice, index) in sheet.exercises"
          :key="index"
          class="tw-flex tw-flex-col tw-border tw-bg-neutral-400 tw-rounded-md tw-p-2 tw-mb-3 tw-text-lg tw-transition-all tw-duration-300 tw-ease-in-out tw-relative tw-overflow-hidden"
          :class="{
            'tw-h-72': expandedIndex === index,
            'tw-h-10': expandedIndex !== index,
          }"
        >
          <div class="tw-text-black">
            {{ exercice.name }}
            <q-btn
              flat
              :icon="
                expandedIndex === index
                  ? 'keyboard_arrow_up'
                  : 'keyboard_arrow_down'
              "
              size="sm"
              @click="toggleExpand(index)"
              class="tw-h-10"
            />

            <q-toggle
              v-if="expandedIndex === index"
              v-model="editMode"
              icon="edit"
            />
          </div>
          <q-form>
            <q-input
              label="Nome do exercicio"
              v-if="editMode"
              color="secondary"
              rounded
              flat
              dense
              v-model="exercice.name"
            />
            <q-input
              label="Carga"
              rounded
              flat
              dense
              v-model="exercice.weight"
            />
            <q-input
              label="Anotações"
              rounded
              flat
              dense
              v-model="exercice.notes"
            />
            <q-btn
              @click="handleHistory(exercice)"
              label="Histórico de Carga"
              rounded
              flat
              dense
            />
            <q-btn
              @click="saveExercice(exercice)"
              label="salvar"
              v-if="editMode"
            />
          </q-form>
        </div>
        <q-dialog v-model="openHistory" class="tw-w-60 tw-h-72">
          <q-card class="tw-w-full tw-h-full tw-p-4 tw-bg-slate-600">
            <q-card-section class="text-h6">
              Histórico de Carga
            </q-card-section>

            <q-card-section class="tw-w-full tw-h-full">
              <q-timeline>
                <q-timeline-entry
                  v-for="(entry, index) in weightHistory"
                  :key="index"
                  :title="entry.date"
                >
                  {{ entry.weight + "kg" }}
                </q-timeline-entry>
              </q-timeline>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Fechar" @click="openHistory = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, Dark } from "quasar";
import { useSheet } from "stores/WorkoutSheet.js";
import ExercicesSection from "src/components/ExercicesSection.vue";
import Panda from "src/assets/panda.png";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const sheetStore = useSheet();
const toggleDarkMode = () => {
  Dark.set(!Dark.isActive);
  console.log(Dark.isActive);
};

const tab = ref();

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

const expanded = ref(false);
const toggleExpand = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
  expanded.value = true;
};

const handleExercice = (exercice) => {
  console.log(exercice);
};

const openHistory = ref(false);
const weightHistory = ref();
const handleHistory = (exercice) => {
  console.log(exercice);
  openHistory.value = true;
  weightHistory.value = exercice.weightHistory;
};

const editMode = ref(false);

const saveExercice = async (exercice) => {
  try {
    // TODO: mandar pro banco de dados
    console.log(exercice);
    editMode.value = false;
  } catch (error) {
    console.error(error);
  }
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
  tab.value = "Home";
  const dataAtual = new Date();
});
</script>
