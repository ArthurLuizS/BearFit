<template>
  <div
    class="tw-border tw-border-slate-300 tw-rounded-md tw-h-[60vh] tw-px-2 tw-overflow-hidden"
  >
    <div v-if="!openSheet" class="tw-h-[60vh] tw-p-3 tw-overflow-hidden">
      <div class="tw-flex tw-items-center tw-justify-around">
        <span class="tw-text-2xl"> Ficha: </span>

        <q-select
          v-model="selectedSheet"
          :options="formattedSheets"
          option-label="label"
          option-value="value"
          outlined
          dense
          rounded
          class="tw-w-32"
        />
      </div>
      <q-virtual-scroll
        :items="selectedSheet.data.divisions"
        virtual-scroll-item-size="5"
        class="tw-flex tw-flex-col tw-h-full"
        v-if="selectedSheet"
      >
        <template v-slot="{ item, index }">
          <div
            :key="index"
            class="tw-flex tw-justify-between tw-items-center tw-border tw-bg-teal-50 tw-h-10 tw-rounded-xl tw-p-2 tw-mb-3 tw-text-lg tw-mt-2"
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
      <div v-else>Selecione uma ficha</div>
    </div>
    <div v-else class="tw-pt-1 tw-h-full">
      <div class="tw-w-full tw-h-8 tw-flex tw-justify-center tw-relative">
        <q-icon
          name="arrow_back"
          @click="openSheet = !openSheet"
          size="sm"
          class="tw-absolute tw-left-0"
        />
        <span class="tw-text-lg">
          {{ sheet.name }}
        </span>
      </div>
      <q-scroll-area class="tw-relative tw-overflow-hidden tw-h-full">
        <div
          v-for="(exercise, index) in sheet.exercises"
          :key="index"
          class="tw-flex tw-flex-col tw-border tw-bg-teal-50 tw-h-10 tw-rounded-xl tw-p-2 tw-mb-3 tw-text-lg tw-transition-all tw-duration-300 tw-ease-in-out tw-relative tw-overflow-hidden"
          :class="{
            'tw-h-72': expandedIndex === index,
            'tw-h-10': expandedIndex !== index,
          }"
        >
          <div class="tw-flex tw-justify-between">
            <span
              class="tw-text-black tw-h-10 tw-text-sm"
              @click="toggleExpand(index)"
            >
              {{ exercise.exercise.data.name }}
            </span>

            <q-toggle
              v-if="expandedIndex === index"
              v-model="editMode"
              icon="edit"
              @update:model-value="(val) => onToggleEdit(val, exercise)"
            />
          </div>
          <q-form>
            <!-- <q-input
              label="Nome do exercicio"
              v-if="editMode"
              color="secondary"
              rounded
              flat
              dense
              v-model="exercise.name"
            /> -->
            <span class="tw-text-sm">
              <!-- {{ exercise }} -->
            </span>
            <q-input label="Carga" rounded flat dense v-model="exercise.load" />
            <q-input
              label="Anotações"
              rounded
              flat
              dense
              v-model="exercise.notes"
            />
            <q-btn
              @click="handleHistory(exercise)"
              label="Histórico de Carga"
              rounded
              flat
              dense
            />
            <q-btn
              @click="saveExercise(exercise)"
              label="salvar"
              v-if="editMode"
            />
          </q-form>
          <q-dialog v-model="openHistory" class="tw-w-60 tw-h-20">
            <q-card
              class="tw-w-full tw-h-[400px] tw-p-4 tw-bg-slate-300 tw-text-black"
            >
              <q-card-section class="text-h6">
                Histórico de Carga
              </q-card-section>

              <q-card-section class="tw-w-full">
                <q-timeline>
                  <q-timeline-entry
                    v-for="(entry, index) in exercise.loadHistory"
                    :key="index"
                    :title="formatDate(entry.date)"
                  >
                    {{ entry.load + "kg" }}
                  </q-timeline-entry>
                </q-timeline>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Fechar" @click="openHistory = false" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, Dark } from "quasar";
import { useSheet } from "stores/WorkoutSheet.js";
import ExercisesSection from "src/components/ExercisesSection.vue";
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
const openSheet = ref(false);
const sheet = ref();

const onlySheets = computed(() =>
  sheetStore.savedDataList.filter((e) => e.data.category === "fichas")
);

const formattedSheets = computed(() =>
  onlySheets.value.map((item) => ({
    label: item.data?.name || "Sem nome",
    value: item,
    ...item,
  }))
);

const selectedSheet = ref();

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

const handleExercise = (exercise) => {
  console.log(exercise);
};

const openHistory = ref(false);
const weightHistory = ref();
const handleHistory = (exercise) => {
  console.log(exercise);
  openHistory.value = true;
  weightHistory.value = exercise.loadHistory;
};

const editMode = ref(false);
const previousLoads = ref({});
const onToggleEdit = (isEditing, exercise) => {
  if (isEditing) {
    previousLoads.value[exercise.exercise.id] = exercise.load;
  }
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR");
};

const saveExercise = async (exercise) => {
  try {
    const oldLoad = previousLoads.value[exercise.exercise.id];
    if (!Array.isArray(exercise.loadHistory)) {
      exercise.loadHistory = [];
    }
    if (oldLoad != null && oldLoad !== exercise.load) {
      exercise.loadHistory.push({
        load: oldLoad,
        date: new Date().toISOString(),
      });
    }
    console.log(exercise);
    console.log(selectedSheet.value);
    editMode.value = false;
    sheetStore.updateItem(selectedSheet.value.id, selectedSheet.value.data);
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(() => {
  tab.value = "Home";
  const dataAtual = new Date();
});
</script>
