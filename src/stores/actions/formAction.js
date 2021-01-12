export const changeInput = (e) => {
  return {
    type: "CHANGE_INPUT",
    payload: e,
  };
};

export const resetForm = () => {
  return { type: "RESET_FORM" };
};
