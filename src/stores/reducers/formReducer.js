const initialState = {
  title: "",
  description: "",
  status: null,
};

export default function formReducer(formState = initialState, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...formState,
        [action.payload.target.name]: action.payload.target.value,
      };
    case "RESET_FORM":
      return {
        title: "",
        description: "",
        status: null,
      };
    default:
      return formState;
  }
}
