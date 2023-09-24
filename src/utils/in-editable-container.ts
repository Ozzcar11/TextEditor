export default (selection: Selection | null) => {
  return (
    selection!.focusNode?.parentElement?.closest("#editable-text") === null
  );
};
