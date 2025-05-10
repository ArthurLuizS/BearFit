<template>
  <q-page>
    <div class="tw-border tw-w-[100vw] tw-h-full tw-p-4">
      <!-- class="tw-border tw-w-[100vw] tw-h-full tw-p-4 tw-bg-slate-900 tw-color text-white" -->
      <div class="tw-flex tw- tw-items-center">
        <div
          class="tw-w-24 tw-h-24 tw-flex tw-items-center data-[dark=true]:tw-bg-black/60 tw-bg-red-500"
        >
          *imagem do urso*
        </div>
        <div>BearFit</div>
      </div>
      <div>
        <div>Ficha {{ ficha.nome }}</div>
        <q-virtual-scroll
          :items="ficha.exercicios"
          virtual-scroll-item-size="42"
          class="tw-flex tw-flex-col tw-gap-2"
        >
          <template v-slot="{ item, index }">
            <div
              :key="index"
              class="tw-flex tw-justify-between tw-items-center tw-border tw-bg-slate-400 tw-text-black tw-h-10 tw-rounded-md tw-p-2"
            >
              <div>{{ item.nome }}</div>
              <q-btn flat icon="chevron_right" size="sm" />
            </div>
          </template>
        </q-virtual-scroll>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, Dark } from "quasar";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const toggleDarkMode = () => {
  Dark.set(!Dark.isActive);
  console.log(Dark.isActive);
};

const ficha = ref({
  exercicios: [],
  nome: null,
});

onBeforeMount(() => {
  ficha.value = {
    exercicios: [
      { nome: "LegPress 45", carga: null, historico: [] },
      { nome: "Agachamento", carga: null, historico: [] },
      { nome: "Mesa extensora", carga: null, historico: [] },
    ],
    nome: "ABCDE",
  };
  const dataAtual = new Date();
});
</script>

<style lang="scss"></style>
