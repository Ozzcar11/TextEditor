<script setup lang="ts">
import ToolBarUndo from "./ToolBarButtons/ToolBarUndo.vue";
import ToolBarRedo from "./ToolBarButtons/ToolBarRedo.vue";
import ToolBarHeadline from "./ToolBarButtons/ToolBarHeadline.vue";
import ToolBarParagraph from "./ToolBarButtons/ToolBarParagraph.vue";
import ToolBarInsertImage from "./ToolBarButtons/ToolBarInsertImage.vue";
import ToolBarCopyHTML from "./ToolBarButtons/ToolBarCopyHTML.vue";
</script>

<template>
  <div class="tool-bar">
    <ToolBarUndo />
    <ToolBarRedo />
    <ToolBarHeadline />
    <ToolBarParagraph />
    <ToolBarInsertImage />
    <ToolBarCopyHTML />
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

    &.disabled {
      opacity: 0.3;
    }

    & + & {
      margin-left: 12px;
    }

    svg {
      pointer-events: none;
    }
  }
}
</style>
