<template>
  <q-page>
    <div class="tw-p-2 tw-w-[100vw] tw-h-full tw-relative">
      <!-- <div class="tw-bg-white">
        <q-btn color="black" label="deletar tudo" @click="masterResetData" />
      </div> -->
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
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel name="Home">
          <home-section />
        </q-tab-panel>
        <q-tab-panel name="Fichas">
          <fichas-section
            :items-list="sheetStore.savedDataList"
          ></fichas-section
        ></q-tab-panel>
        <q-tab-panel name="Exercicios">
          <exercises-section
            @send-exercise="saveData"
            :-exercises-list="sheetStore.savedDataList"
          ></exercises-section>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useSheet } from "src/stores/WorkoutSheet.js";
import ExercisesSection from "src/components/ExercisesSection.vue";
import HomeSection from "src/components/HomeSection.vue";
import FichasSection from "src/components/FichasSection.vue";

import Panda from "src/assets/panda.png";
import { Storage } from "@capacitor/storage";
import { v4 as uuidv4 } from "uuid";

const tab = ref();

const sheetStore = useSheet();

const masterResetData = () => {
  sheetStore.clearAllItems();
};
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
  getAllData();
  sheetStore.loadAllItems();
});

// Storage com capacitor
// Salvar dados (Create)
const form = ref({
  nome: "",
  tel: "",
  idade: "",
});
const saveData = async (data) => {
  const key = uuidv4(); // Gerar uma chave única para cada item
  try {
    await Storage.set({
      key: key,
      value: JSON.stringify(data), // Convertendo o dado para string antes de salvar
    });

    // Salvar a chave no array de chaves para uso futuro
    const storedKeys = await Storage.get({ key: "keys" });
    const keys = storedKeys.value ? JSON.parse(storedKeys.value) : [];
    keys.push(key);
    await Storage.set({
      key: "keys",
      value: JSON.stringify(keys),
    });

    console.log("Data saved with key:", key);
  } catch (e) {
    console.error("Error saving data", e);
  }
};

const tudo = ref([]);
const getAllData = async () => {
  try {
    const storedKeys = await Storage.get({ key: "keys" });
    const keys = storedKeys.value ? JSON.parse(storedKeys.value) : [];
    const allData = [];

    for (const key of keys) {
      const { value } = await Storage.get({ key: key });
      allData.push({
        key: key,
        data: value ? JSON.parse(value) : null,
      });
    }
    tudo.value = allData;
    console.log("All Data:", allData);
    return allData;
  } catch (e) {
    console.error("Error loading data", e);
  }
};

// Carregar dados (Read)
const loadData = async (key) => {
  try {
    const { value } = await Storage.get({ key: key });
    console.log("Loaded data:", value);
    return value;
  } catch (e) {
    console.error("Error loading data", e);
  }
};

// Atualizar dados (Update) - sobrescreve o valor atual
const updateData = async (key, newValue) => {
  try {
    await saveData(key, newValue); // A atualização é feita sobrescrevendo o valor
    console.log("Data updated to:", newValue);
  } catch (e) {
    console.error("Error updating data", e);
  }
};

// Deletar dados (Delete)
const removeData = async (key) => {
  try {
    await Storage.remove({ key: key });
    console.log("Data removed:", key);
  } catch (e) {
    console.error("Error removing data", e);
  }
};

// Exemplo de uso dentro do componente
const handleCRUDOperations = async () => {
  // Criar
  await saveData("username", "arthu");

  // Ler
  const username = await loadData("username");
  console.log("Username:", username);

  // Atualizar
  await updateData("username", "arthu_updated");

  // Deletar
  await removeData("username");
};

const clearAllData = async () => {
  try {
    await Storage.clear();
    console.log("All data cleared!");
  } catch (e) {
    console.error("Error clearing data", e);
  }
};
</script>

<style lang="scss" scoped>
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
