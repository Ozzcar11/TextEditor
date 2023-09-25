import inEditableContainer from "@/utils/in-editable-container";

export default (node: string, selection: Selection) => {
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
