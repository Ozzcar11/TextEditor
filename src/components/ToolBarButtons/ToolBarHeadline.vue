<script setup lang="ts">
import HighIcon from "@/assets/icons/HighIcon.vue";
import surroundSelection from "@/utils/surroundSelection";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const createHeadlne = () => {
  const selection: Selection | null = document.getSelection();

  if (selection === null) return alert("Выберите текст");

  if (selection.focusNode?.parentElement?.tagName !== "H1") {
    surroundSelection("h1", selection);
    store.pushToStack();
  } else {
    alert("Выберите другой текст");
  }
};
</script>

<template>
  <button class="tool-bar__button icon" @click="createHeadlne">
    <HighIcon />
  </button>
</template>
