<template>
  <div class="tw-w-full tw-h-full tw-border">
    <q-scroll-area class="tw-h-full tw-w-full" v-if="items.length > 0">
      <span v-if="props.title"> {{ props.title }}</span>
      <span class="tw-text-lg tw-w-full" v-else>
        Lista de {{ items[0].data.category }} cadastrados:
      </span>
      <div
        v-for="item in items"
        :key="item.id || item.data?.name"
        class="tw-w-full tw-flex tw-flex-row tw-justify-between tw-mt-3"
      >
        <div>
          {{ item.data?.name || "Item Sem nome" }}
        </div>
        <div class="tw-w-14 tw-flex tw-justify-between" v-if="props.actions">
          <q-icon
            name="edit"
            @click="handleEdit(item)"
            color="teal"
            size="sm"
          />
          <q-icon name="delete" @click="confirm(item)" color="red" size="sm" />
        </div>
      </div>
    </q-scroll-area>
    <div v-else>0 Registros</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

function confirm(item) {
  $q.dialog({
    title: "Remover?",
    message: "Deletar permanentemente este item?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      // console.log('>>>> OK')
      handleDelete(item);
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    });
}

const props = defineProps({
  Items: {
    type: Array,
    required: true,
  },
  title: String,
  actions: Boolean,
});

// Garante que Items é sempre um array
const items = computed(() => (Array.isArray(props.Items) ? props.Items : []));

const emit = defineEmits(["editItem", "deleteItem"]);

const handleEdit = (item) => {
  emit("editItem", item);
};

const handleDelete = (item) => {
  emit("deleteItem", item);
};
</script>
