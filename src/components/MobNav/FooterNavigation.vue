<template>
  <div
    class="tw-z-50 tw-left-4 tw-right-4 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center box-shadow tw-absolute tw-bottom-3 tw-bg-white/60"
  >
    <RouterLink v-for="(link, index) in links" :key="index" :to="link.link">
      <q-icon
        :name="link.icon"
        size="sm"
        class="icon q-mx-md"
        :class="{
          'q-ml-lg': index === 0,
          'q-mr-lg': index === links.length - 1,
          'text-primary': $route.fullPath === link.link,
        }"
      />
    </RouterLink>
  </div>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.accent {
  // background-color: v-bind(accent);
}

.icon {
  .body--dark & {
    // color: $c1;
  }

  .body--light & {
    // color: $c7;
    // color: $c6;
  }
}
</style>
