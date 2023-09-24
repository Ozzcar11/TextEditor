<script setup lang="ts">
import RedoIcon from "@/assets/icons/RedoIcon.vue";

import { computed } from "vue";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const canRedo = computed(() => {
  return store.eventsStack.length - 1 - store.eventsStackIndex > 0;
});

const redoText = () => {
  if (canRedo) {
    store.eventsStackIndex++;
    store.getContainer.value!.innerHTML =
      store.eventsStack[store.eventsStackIndex];
  }
};
</script>

<template>
  <button
    class="tool-bar__button icon"
    @mousedown="redoText"
    :disabled="!canRedo"
  >
    <RedoIcon />
  </button>
</template>
