<script setup lang="ts">
import LowIcon from "@/assets/icons/LowIcon.vue";
import surroundSelection from "@/utils/surroundSelection";
</script>

<template>
  <button class="tool-bar__button icon" @click="surroundSelection('p')">
    <LowIcon />
  </button>
</template>