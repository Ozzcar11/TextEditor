export default (selection: Selection) => {
  return (
    selection.focusNode?.parentElement?.closest("#editable-text") === null
  );
};
