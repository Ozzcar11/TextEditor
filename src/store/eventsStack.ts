import { defineStore } from "pinia";

import { ref, computed } from "vue";
import type { Ref } from "vue";

export const useEventsStackStore = defineStore("eventsStack", () => {
  let container: Ref<HTMLDivElement | undefined> = ref(undefined);

  const eventsStack: Ref<string[]> = ref([]);
  const eventsStackIndex: Ref<number> = ref(0);

  const setContainer = (value: Ref<HTMLDivElement | undefined>) => {
    container = value;
  };

  const getContainer = computed(() => {
    return container;
  });

  const pushToStack = () => {
    if (!lastItemSame()) {
      eventsStackIndex.value++;
      eventsStack.value.splice(eventsStackIndex.value);
      eventsStack.value.push(container!.value!.innerHTML!);
    }
  };

  const lastItemSame = () => {
    // @ts-ignore: at() не поддерживается этой версий
    return container.value.innerHTML === eventsStack.value.at(-1);
  };

  return {
    eventsStack,
    eventsStackIndex,
    getContainer,
    setContainer,
    pushToStack,
  };
});
