<script setup lang="ts">
import ToolBar from "./components/ToolBar.vue";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

import { useEventsStackStore } from "@/store/eventsStack";

const store = useEventsStackStore();

const containerRef: Ref<HTMLDivElement | undefined> = ref(undefined);

const saveOnFocusOut = (e: FocusEvent) => {
  if ((e?.relatedTarget as HTMLElement)?.tagName !== "BUTTON")
    store.pushToStack();
};

const isSpaceKey: Ref<boolean> = ref(false);

const recordEvent = (e?: Event) => {
  if ((e as InputEvent).data === " ") {
    if (!isSpaceKey.value) {
      isSpaceKey.value = true;

      store.pushToStack();

      return;
    }
  } else isSpaceKey.value = false;
};

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
      @beforeinput="recordEvent($event)"
      @focusout="saveOnFocusOut"
      contenteditable
    >
      Таким образом консультация с широким активом представляет собой интересный
      эксперимент проверки позиций, занимаемых участниками в отношении
      поставленных задач. С другой стороны постоянное
      информационно-пропагандистское обеспечение нашей деятельности представляет
      собой интересный эксперимент проверки форм развития. Идейные соображения
      высшего порядка, а также укрепление и развитие структуры влечет за собой
      процесс внедрения и модернизации соответствующий условий активизации.
      Задача организации, в особенности же реализация намеченных плановых
      заданий играет важную роль в формировании дальнейших направлений развития.
      Повседневная практика показывает, что постоянное
      информационно-пропагандистское обеспечение нашей деятельности играет
      важную роль в формировании существенных финансовых и административных
      условий.
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
