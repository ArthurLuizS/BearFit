<template>
  <div
    class="tw-border tw-border-slate-300 tw-rounded-md tw-h-[60vh] tw-px-2 tw-overflow-hidden"
  >
    <div class="tw-w-full tw-h-[300px]">
      <render-list
        @delete-item="handleDelete"
        @edit-item="handleEdit"
        :Items="onlyExercices"
      ></render-list>
    </div>
    <!-- <div class="tw-w-full tw-h-80 tw-border">
      <q-scroll-area class="tw-h-full tw-w-full">
        lista de exercicios cadastrados

        <div v-for="(exercice, index) in onlyExercices" :key="index">
          {{ exercice }}
        </div>
      </q-scroll-area>
    </div> -->
    <div class="tw-w-full tw-flex tw-justify-end tw-mt-4">
      <q-btn
        label="Adicionar Exercicio"
        outline
        dense
        rounded
        @click="open"
        text-color="primary"
      />
    </div>

    <q-dialog v-model="openForm" persistent>
      <q-card class="tw-w-full tw-h-[300px] tw-bg-[teal]">
        <q-card-section
          class="tw-flex tw-items-center tw-justify-center tw-gap-2"
          ><span>Cadastrar exercício </span>
          <q-icon name="fitness_center"></q-icon
        ></q-card-section>
        <q-card-section>
          <q-form class="tw-space-y-3">
            <q-input
              v-model="formData.name"
              rounded
              outlined
              dense
              label="Nome"
            />

            <q-select
              v-model="formData.muscleGroup"
              :options="muscleGroups"
              label="Grupo Muscular"
              rounded
              outlined
              dense
              emit-value
              map-options
            />

            <q-select
              v-model="formData.impactLevel"
              :options="impactLevels"
              label="Impacto"
              rounded
              outlined
              dense
              emit-value
              map-options
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
            @click="handleNewExercice"
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

const props = defineProps({
  ExercicesList: Array,
});
const emit = defineEmits(["sendExercice"]);

const muscleGroups = [
  { label: "Peito", value: "peito" },
  { label: "Costas", value: "costas" },
  { label: "Pernas", value: "pernas" },
  { label: "Ombros", value: "ombros" },
  { label: "Bíceps", value: "biceps" },
  { label: "Tríceps", value: "triceps" },
  { label: "Glúteos", value: "gluteos" },
  { label: "Panturrilhas", value: "panturrilhas" },
  { label: "Abdômen", value: "abdomen" },
  { label: "Antebraço", value: "antebraco" },
];

const impactLevels = [
  { label: "Baixo", value: "baixo" },
  { label: "Médio", value: "medio" },
  { label: "Alto", value: "alto" },
];

const formData = ref({
  name: "",
  muscleGroup: null,
  impactLevel: null,
  category: "exercícios",
});

const clearForm = () => {
  formData.value = {
    name: "",
    muscleGroup: null,
    impactLevel: null,
    category: "exercícios",
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
    formData.value = item.data;
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
  sheetStore.updateItem(itemToEdit.value.id, formData.value);
  clearForm();
  itemToEdit.value = null;
};
const handleNewExercice = () => {
  sheetStore.addItem(formData.value);
  openForm.value = false;
  clearForm();
};
const onlyExercices = computed(() =>
  props.ExercicesList.filter((e) => e.data.category === "exercícios")
);
</script>

<style></style>
