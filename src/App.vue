<script setup lang="ts">
import ToolBar from "./components/ToolBar.vue";
import { ref, onMounted, computed } from "vue";
import type { Ref } from "vue";

const editableContainer: Ref<HTMLDivElement | undefined> = ref(undefined);

const eventsStack: Ref<string[]> = ref([]);
const eventsStackIndex: Ref<number> = ref(0);

const isSpaceKey: Ref<boolean> = ref(false);

const recordEvent = (e?: Event) => {
  if ((e as InputEvent).data === " ") {
    if (!isSpaceKey.value) {
      isSpaceKey.value = true;

      pushToStack();

      return;
    }
  } else isSpaceKey.value = false;
};

const textEdit = (e?: Event) => {
  recordEvent(e);
};

const pushToStack = () => {
  if (!lastItemSame()) {
    eventsStack.value.splice(eventsStackIndex.value);
    eventsStack.value.push(editableContainer.value!.innerHTML!);
    eventsStackIndex.value++;
  }
  console.log(eventsStack.value);
};

const lastItemSame = () => {
  // @ts-ignore: at() не поддерживается этой версий
  return editableContainer.value === eventsStack.value.at(-1);
};

const canUndo = computed(() => {
  return eventsStackIndex.value > 0;
});

const canRedo = computed(() => {
  return eventsStack.value.length - 1 - eventsStackIndex.value > 0;
});

const undoText = () => {
  if (canUndo.value) {
    eventsStackIndex.value--;
    editableContainer.value!.innerHTML =
      eventsStack.value[eventsStackIndex.value];
  }
};

const redoText = () => {
  if (canRedo.value) {
    eventsStackIndex.value++;
    editableContainer.value!.innerHTML =
      eventsStack.value[eventsStackIndex.value];
  }
};

onMounted(() => {
  pushToStack();
});
</script>

<template>
  <div class="container">
    <ToolBar
      :editableContainer="editableContainer"
      :canUndo="canUndo"
      :canRedo="canRedo"
      @undoText="undoText"
      @redoText="redoText"
    />
    <div
      id="editable-text"
      ref="editableContainer"
      @input="textEdit($event)"
      @focusout="pushToStack()"
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
