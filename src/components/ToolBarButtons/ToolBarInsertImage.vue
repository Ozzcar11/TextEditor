<script setup lang="ts">
import ImageIcon from "@/assets/icons/ImageIcon.vue";

import inEditableContainer from "@/utils/in-editable-container";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const insertImage = () => {
  const selection = document.getSelection();

  if (selection?.anchorNode === null || inEditableContainer(selection))
    return alert("Выберите место вставки");

  const imgSrc = prompt("Введите URL изображения");

  if (imgSrc === null) return alert("Заполните поле");

  const img = document.createElement("img");

  img.setAttribute("src", new URL(imgSrc).href);

  img.classList.add("img");

  selection?.getRangeAt(0).insertNode(img);

  selection?.empty();

  store.pushToStack();
};
</script>

<template>
  <button class="tool-bar__button icon" @click="insertImage">
    <ImageIcon />
  </button>
</template>
