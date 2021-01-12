import axios from "axios";
import { resetForm } from "./formAction";
const baseUrl =
  "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
const dummyResponse = require("../../dummy-response/fetch.json");

export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: "START_FETCH_DATA" });
    // await axios({
    //   method: "GET",
    //   url: baseUrl,
    // })
    //   .then((response) => {
    const response = dummyResponse;
    if (response?.length) {
      dispatch({ type: "SUCCESS_FETCH_DATA", payload: response });
    } else {
      dispatch({ type: "FAIL_FETCH_DATA" });
    }
    //   })
    //   .catch((error) => {
    //     dispatch({ type: "FAIL_FETCH_DATA" });
    //     console.error(error);
    //   });
  };
};

export const createData = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "START_CREATE_DATA" });
    const todo = getState().todoState.todo;
    const newTodo = [...todo, data];
    if (todo.length + 1 == newTodo.length) {
      resetForm();
      dispatch({ type: "SUCCESS_CREATE_DATA", payload: newTodo });
    } else {
      resetForm();
      dispatch({ type: "FAIL_CREATE_DATA" });
    }
  };
};

export const updateData = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "START_UPDATE_DATA" });
    const todo = getState().todoState.todo;
    const filtered = todo.filter(function (value, index, arr) {
      return value.id !== data.id;
    });
    const newTodo = [...filtered, data];
    if (todo.length == newTodo.length) {
      resetForm();
      dispatch({ type: "SUCCESS_UPDATE_DATA", payload: newTodo });
    } else {
      resetForm();
      dispatch({ type: "FAIL_UPDATE_DATA" });
    }
  };
};
