<script setup lang="ts">
import LowIcon from "@/assets/icons/LowIcon.vue";
import surroundSelection from "@/utils/surroundSelection";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const createParagraph = () => {
  const selection: Selection | null = document.getSelection();

  if (selection === null) return alert("Выберите текст");

  surroundSelection("p", selection);
  store.pushToStack();
};
</script>

<template>
  <button class="tool-bar__button icon" @click="createParagraph">
    <LowIcon />
  </button>
</template>
