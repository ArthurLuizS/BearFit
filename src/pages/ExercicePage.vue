<template>
  <q-page>
    <div
      class="tw-w-full tw-flex tw-items-center tw-justify-center tw-flex-col"
    >
      <img :src="Panda" class="tw-h-32" />
      <span>Exercicios Cadastrados</span>
    </div>
    <div class="tw-w-full tw-h-80 tw-border">
      <q-scroll-area class="tw-h-full tw-w-full">
        lista de exercicios cadastrados
      </q-scroll-area>
    </div>
    <div>
      <q-btn
        label="Adicionar Exercicio"
        flat
        dense
        rounded
        color="primary"
        @click="open"
      />
    </div>
  </q-page>
  <q-dialog v-model="openForm">
    <q-card class="tw-w-full tw-h-[300px]">
      <q-card-section
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
        <q-btn label="Cancelar" rounded flat @click="openForm = false" />
        <q-btn label="Cadastrar" rounded flat @click="handleNewExercice" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSheet } from "stores/WorkoutSheet.js";
import Panda from "src/assets/panda.png";

const route = useRoute();
const router = useRouter();
const sheetStore = useSheet();

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
});

const openForm = ref(false);
const open = () => {
  sheetStore.$reset();
  openForm.value = true;
};
const handleNewExercice = () => {
  // TODO: Fazer cadastro com um banco
  console.log(formData.value);
};
</script>

<style>
* {
  @apply tw-text-white;
}
</style>
