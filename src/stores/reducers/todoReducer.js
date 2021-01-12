const initialState = {
  isLoading: false,
  isLoadingEdit: false,
  todo: [],
};

export default function todoReducer(todoState = initialState, action) {
  switch (action.type) {
    case "START_FETCH_DATA":
      return {
        ...todoState,
        isLoading: true,
      };
    case "SUCCESS_FETCH_DATA":
      return {
        ...todoState,
        todo: action.payload,
        isLoading: false,
      };
    case "FAIL_FETCH_DATA":
      return {
        ...todoState,
        todo: [],
        isLoading: false,
      };
    case "START_CREATE_DATA":
      return {
        ...todoState,
        isLoadingEdit: true,
      };
    case "SUCCESS_CREATE_DATA":
      return {
        ...todoState,
        todo: action.payload,
        isLoadingEdit: false,
      };
    case "FAIL_CREATE_DATA":
      return {
        ...todoState,
        isLoadingEdit: false,
      };
    case "START_UPDATE_DATA":
      return {
        ...todoState,
        isLoadingEdit: true,
      };
    case "SUCCESS_UPDATE_DATA":
      return {
        ...todoState,
        todo: action.payload,
        isLoadingEdit: false,
      };
    case "FAIL_UPDATE_DATA":
      return {
        ...todoState,
        isLoadingEdit: false,
      };
    default:
      return todoState;
  }
}
