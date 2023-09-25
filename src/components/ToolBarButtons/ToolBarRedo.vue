<script setup lang="ts">
import RedoIcon from "@/assets/icons/RedoIcon.vue";

import { computed } from "vue";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const canRedo = computed(() => {
  return store.eventsStackIndex < store.eventsStack.length - 1;
});

const redoText = () => {
  if (canRedo.value) {
    store.eventsStackIndex++;
    store.getContainer.value!.innerHTML =
      store.eventsStack[store.eventsStackIndex];
  }
};
</script>

<template>
  <button class="tool-bar__button icon" @click="redoText" :disabled="!canRedo">
    <RedoIcon />
  </button>
</template>
