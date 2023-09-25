<script setup lang="ts">
import HighIcon from "@/assets/icons/HighIcon.vue";
import surroundSelection from "@/utils/surroundSelection";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const createHeadlne = () => {
  surroundSelection("h1");
  store.pushToStack()
};
</script>

<template>
  <button class="tool-bar__button icon" @click="createHeadlne">
    <HighIcon />
  </button>
</template>