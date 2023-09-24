<script setup lang="ts">
import ToolBar from "./components/ToolBar.vue";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const containerRef: Ref<HTMLDivElement | undefined> = ref(undefined);

onMounted(() => {
  store.setContainer(containerRef);
  store.pushToStack();
});
</script>

<template>
  <div class="container">
    <ToolBar />
    <div
      id="editable-text"
      ref="containerRef"
      @input="store.recordEvent($event)"
      @focusout="store.pushToStack()"
      contenteditable
    >
      Таким
    </div>
  </div>
</template>

<style lang="scss">
:root {
  font-family: Roboto, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #1e1e1e;
}
.container {
  width: 60%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 77px 100px;
  color: #fff;

  .img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
}

#editable-text {
  outline: none;
}
</style>
