<script setup lang="ts">
import HighIcon from "@/assets/icons/HighIcon.vue";
import surroundSelection from "@/utils/surroundSelection";
</script>

<template>
  <button class="tool-bar__button icon" @click="surroundSelection('h1')">
    <HighIcon />
  </button>
</template>
