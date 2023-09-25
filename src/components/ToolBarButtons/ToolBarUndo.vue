<script setup lang="ts">
import UndoIcon from "@/assets/icons/UndoIcon.vue";

import { computed } from "vue";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const canUndo = computed(() => {
  return store.eventsStackIndex > 0;
});

const saveInContainer = () => {
  store.getContainer.value!.innerHTML =
    store.eventsStack[store.eventsStackIndex];
};

const undoText = () => {
  if (canUndo.value) {
    if (store.eventsStackIndex === store.eventsStack.length) {
      store.eventsStackIndex -= 2;
      saveInContainer();
      return;
    }
    store.eventsStackIndex--;
    saveInContainer();
  }
};
</script>

<template>
  <button class="tool-bar__button icon" @click="undoText" :disabled="!canUndo">
    <UndoIcon />
  </button>
</template>
