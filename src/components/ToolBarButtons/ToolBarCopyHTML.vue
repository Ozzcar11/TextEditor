<script setup lang="ts">
import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const copyHTML = () => {
  if (store.getContainer.value !== undefined)
    navigator.clipboard.writeText(store.getContainer.value.innerHTML);
};
</script>

<template>
  <button class="tool-bar__button text" @click="copyHTML">
    Скопировать HTML
  </button>
</template>

<style lang="scss"></style>
