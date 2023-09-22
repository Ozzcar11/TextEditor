<script setup lang="ts">
import UndoIcon from "@/assets/icons/UndoIcon.vue";
import RedoIcon from "@/assets/icons/RedoIcon.vue";
import HighIcon from "@/assets/icons/HighIcon.vue";
import LowIcon from "@/assets/icons/LowIcon.vue";
import ImageIcon from "@/assets/icons/ImageIcon.vue";

const props = defineProps<{
  editableText: HTMLDivElement | undefined;
}>();

let selection: Selection | null = null;

const inEditableContainer = (selection: Selection | null) => {
  return (
    selection!.focusNode?.parentElement?.closest("#editable-text") === null
  );
};

const surroundText = (node: string) => {
  selection = document.getSelection();

  if (selection?.isCollapsed || inEditableContainer(selection)) {
    return alert("Выделите другой текст");
  }

  const surroundingNode = document.createElement(node);

  try {
    selection?.getRangeAt(0).surroundContents(surroundingNode);

    selection?.empty();
  } catch (e: unknown) {
    if (e instanceof Error) alert(`Произошла ошибка: ${e.message}`);
  }
};

const copyHTML = () => {
  if (props.editableText !== undefined)
    navigator.clipboard.writeText(props.editableText?.innerHTML);
};

const insertImage = () => {
  selection = document.getSelection();

  if (selection?.anchorNode === null || inEditableContainer(selection))
    return alert("Выберите место вставки");

  const imgSrc = prompt("Введите URL изображения");

  if (imgSrc === null) return alert("Заполните поле");

  const img = document.createElement("img");

  img.setAttribute("src", new URL(imgSrc).href);

  img.classList.add("img");

  selection?.getRangeAt(0).insertNode(img);

  selection?.empty();
};
</script>

<template>
  <div class="tool-bar">
    <button class="tool-bar__button icon" @click="$emit('undoText')">
      <UndoIcon />
    </button>
    <button class="tool-bar__button icon" @click="$emit('redoText')">
      <RedoIcon />
    </button>
    <button class="tool-bar__button icon" @click="surroundText('h1')">
      <HighIcon />
    </button>
    <button class="tool-bar__button icon" @click="surroundText('p')">
      <LowIcon />
    </button>
    <button class="tool-bar__button icon" @click="insertImage">
      <ImageIcon />
    </button>
    <button class="tool-bar__button text" @click="copyHTML">
      Скопировать HTML
    </button>
  </div>
</template>

<style lang="scss">
.tool-bar {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  &__button {
    cursor: pointer;
    &.icon {
      width: 42px;
      height: 38px;
      background-color: #282828;
      border: 0;
      border-radius: 8px;
    }

    &.text {
      display: block;
      height: 38px;
      color: #639eff;
      font-size: 15px;
      border: none;
      background-color: transparent;
    }

    & + & {
      margin-left: 12px;
    }
  }
}
</style>
