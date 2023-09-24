<script setup lang="ts">
import UndoIcon from "@/assets/icons/UndoIcon.vue";

import { computed } from "vue";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const canUndo = computed(() => {
  return store.eventsStackIndex > 0;
});

const undoText = () => {
  if (canUndo) {
    store.eventsStackIndex--;
    store.getContainer.value!.innerHTML =
      store.eventsStack[store.eventsStackIndex];
  }
};
</script>

<template>
  <button
    class="tool-bar__button icon"
    @mousedown="undoText"
    :disabled="!canUndo"
  >
    <UndoIcon />
  </button>
</template>
