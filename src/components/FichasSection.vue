<template>
  <div
    class="tw-border tw-border-slate-300 tw-rounded-md tw-h-[60vh] tw-px-2 tw-overflow-hidden"
  >
    <div class="tw-w-full tw-h-[300px]">
      <render-list
        @delete-item="handleDelete"
        @edit-item="handleEdit"
        :Items="onlySheets"
        title="Lista de Fichas Cadastradas"
        :actions="true"
      ></render-list>
    </div>

    <div class="tw-w-full tw-flex tw-justify-end tw-mt-4">
      <q-btn
        label="Criar Ficha"
        outline
        dense
        rounded
        @click="open"
        text-color="primary"
      />
    </div>

    <q-dialog v-model="openForm" persistent>
      <q-card class="tw-w-full tw-h-[800px] tw-bg-[teal]">
        <q-card-section
          class="tw-flex tw-items-center tw-justify-center tw-gap-2"
          ><span>Cadastrar Ficha </span> <q-icon name="fitness_center"></q-icon
        ></q-card-section>
        <q-card-section>
          <q-form class="q-pa-md">
            <q-input
              v-model="form.name"
              label="Nome da Ficha"
              outlined
              class="q-mb-md"
            />

            <div
              v-for="(division, dIndex) in form.divisions"
              :key="dIndex"
              class="q-mb-lg"
            >
              <q-input
                v-model="division.name"
                label="Nome da Divisão"
                outlined
                class="q-mb-sm"
              />

              <div
                v-for="(exercise, eIndex) in division.exercises"
                :key="eIndex"
                class="q-pa-sm q-mb-sm bg-grey-2 rounded-borders"
              >
                <q-select
                  v-model="exercise.exercise"
                  :options="onlyExercises"
                  label="Exercício"
                  :option-label="(opt) => opt.data.name"
                  :option-value="(opt) => opt.id"
                  @update:model-value="
                    (exercise) => updateExerciseNameById(exercise)
                  "
                  outlined
                  class="q-mb-sm"
                />

                <q-input
                  v-model.number="exercise.load"
                  type="number"
                  label="Carga (kg)"
                  outlined
                  class="q-mb-sm"
                />
                <q-input
                  v-model="exercise.notes"
                  label="Observações"
                  outlined
                  class="q-mb-sm"
                />
                <q-input
                  v-model.number="exercise.reps"
                  type="number"
                  label="Repetições"
                  outlined
                  class="q-mb-sm"
                />
                <q-input
                  v-model.number="exercise.restTime"
                  type="number"
                  label="Descanso (segundos)"
                  outlined
                  class="q-mb-sm"
                />
                <q-btn
                  flat
                  label="Remover Exercício"
                  icon="delete"
                  color="negative"
                  @click="removeExercise(dIndex, eIndex)"
                />
              </div>

              <q-btn
                outline
                icon="add"
                label="Adicionar Exercício"
                @click="addExercise(dIndex)"
                class="q-mb-md"
              />
            </div>

            <q-btn
              icon="add"
              label="Adicionar Divisão"
              color="primary"
              @click="addDivision"
              class="q-mb-md"
            />
          </q-form>
        </q-card-section>
        <q-card-actions class="tw-flex tw-justify-end tw-items-end">
          <q-btn
            label="Cancelar"
            rounded
            flat
            @click="
              {
                openForm = false;
                itemToEdit = null;
              }
            "
            color="white"
          />
          <q-btn
            v-if="itemToEdit"
            label="salvar"
            @click="updateItem"
            rounded
            flat
            color="white"
          />
          <q-btn
            v-else
            label="Cadastrar"
            rounded
            flat
            @click="saveTrainingSheet"
            color="white"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSheet } from "stores/WorkoutSheet.js";
import Panda from "src/assets/panda.png";
import RenderList from "src/components/RenderList.vue";

const route = useRoute();
const router = useRouter();
const sheetStore = useSheet();
const divisaoTreino = ref(3);

const props = defineProps({
  itemsList: Array,
});

const onlyExercises = computed(() =>
  props.itemsList.filter((e) => e.data.category === "exercícios")
);

const exerciseOptions = ref(onlyExercises);

const form = ref({
  name: "",
  divisions: [],
  createdAt: new Date().toISOString(),
  category: "fichas",
});

function addDivision() {
  form.value.divisions.push({
    name: "",
    exercises: [],
  });
}

// Adiciona um novo exercício dentro da divisão escolhida
function addExercise(divisionIndex) {
  form.value.divisions[divisionIndex].exercises.push({
    exercise: null,
    load: null,
    loadHistory: [],
    notes: "",
    reps: null,
    restTime: null,
  });
}

// Atualiza o nome do exercício baseado no ID selecionado
function updateExerciseName(val, division, exercise) {
  const selected = exerciseOptions.value.find((opt) => opt.id === val);
  if (selected) {
    exercise.exerciseName = selected.name;
  }
}

function updateExerciseNameById(exercise) {
  console.log("Recebido");
  console.log(exercise);
}

// Remove exercício
function removeExercise(divisionIndex, exerciseIndex) {
  form.value.divisions[divisionIndex].exercises.splice(exerciseIndex, 1);
}

// Simulação de salvar a ficha
function saveTrainingSheet() {
  console.log("Ficha salva:", form.value);
  // Aqui você pode usar seu método para salvar no Capacitor Storage
  sheetStore.addItem(form.value);
}

const clearForm = () => {
  form.value = {
    name: "",
    divisions: [],
    createdAt: new Date().toISOString(),
    category: "fichas",
  };
};

const openForm = ref(false);
const open = (item) => {
  clearForm();
  nextTick(() => {
    openForm.value = true;
  });
  console.log("item aqui", item);
  if (item === itemToEdit.value) {
    form.value = item.data;
  }
};

const handleDelete = (item) => {
  console.log("enviando ao store: ", item);
  sheetStore.deleteItem(item.id);
};
const itemToEdit = ref();
const handleEdit = (item) => {
  itemToEdit.value = item;
  open(item);
};
const updateItem = () => {
  sheetStore.updateItem(itemToEdit.value.id, form.value);
  clearForm();
  itemToEdit.value = null;
};
const handleNewExercise = () => {
  sheetStore.addItem(formData.value);
  openForm.value = false;
  clearForm();
};
const onlySheets = computed(() =>
  props.itemsList.filter((e) => e.data.category === "fichas")
);
</script>

<style></style>
