<script setup lang="ts">
import LowIcon from "@/assets/icons/LowIcon.vue";
import surroundSelection from "@/utils/surroundSelection";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const createParagraph = () => {
  surroundSelection("p");
  store.pushToStack();
};
</script>

<template>
  <button class="tool-bar__button icon" @click="createParagraph">
    <LowIcon />
  </button>
</template>
