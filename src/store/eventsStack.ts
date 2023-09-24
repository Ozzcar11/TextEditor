import { defineStore } from "pinia";

import { ref, computed } from "vue";
import type { Ref } from "vue";

export const useEventsStackStore = defineStore("eventsStack", () => {
  let container: Ref<HTMLDivElement | undefined> = ref(undefined);

  const eventsStack: Ref<string[]> = ref([]);
  const eventsStackIndex: Ref<number> = ref(0);

  const isSpaceKey: Ref<boolean> = ref(false);

  const setContainer = (value: Ref<HTMLDivElement | undefined>) => {
    container = value;
  };

  const getContainer = computed(() => {
    return container;
  });

  const pushToStack = () => {
    if (!lastItemSame()) {
      eventsStack.value.splice(eventsStackIndex.value);
      eventsStack.value.push(container!.value!.innerHTML!);
      eventsStackIndex.value++;
    }
  };

  const recordEvent = (e?: Event) => {
    if ((e as InputEvent).data === " ") {
      if (!isSpaceKey.value) {
        isSpaceKey.value = true;

        pushToStack();

        return;
      }
    } else isSpaceKey.value = false;
  };

  const lastItemSame = () => {
    // @ts-ignore: at() не поддерживается этой версий
    return container.value === eventsStack.value.at(-1);
  };

  return {
    eventsStack,
    eventsStackIndex,
    getContainer,
    setContainer,
    pushToStack,
    recordEvent,
  };
});
