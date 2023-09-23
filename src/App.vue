<script setup lang="ts">
import ToolBar from "./components/ToolBar.vue";
import { ref, onMounted, computed } from "vue";
import type { Ref } from "vue";

const editableText: Ref<string> = ref("Таким");

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
  if (e !== undefined) saveText(e);
  recordEvent(e);
};

const range: Ref<Range | undefined> = ref(undefined);
const saveRange = () => {
  range.value = document.getSelection()?.getRangeAt(0);
};

const saveText = (e: Event) => {
  console.log(range.value);

  editableText.value = (e?.target as HTMLElement).innerHTML;
  console.log(range.value);
  const newSelection = document.getSelection();
  newSelection?.removeAllRanges();
  newSelection?.addRange(range.value!);
};

const pushToStack = () => {
  if (!lastItemSame()) {
    eventsStack.value.push(editableText.value);
    eventsStackIndex.value++;
  }
};

const lastItemSame = () => {
  // @ts-ignore: at() не поддерживается этой версий
  return editableText.value === eventsStack.value.at(-1);
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
  }
};

onMounted(() => {
  pushToStack();
});
</script>

<template>
  <div class="container">
    <ToolBar
      :editableText="editableText"
      :canUndo="canUndo"
      :canRedo="canRedo"
      @undoText="undoText"
    />
    <div
      v-html="editableText"
      id="editable-text"
      @input="textEdit($event)"
      @focusout="pushToStack()"
      @beforeinput="saveRange"
      contenteditable
    ></div>
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
