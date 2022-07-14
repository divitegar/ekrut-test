import { ADD_DATA, CLEAR_DATA } from "./types";

export const addData = (payload) => {
  return (dispatch) => {
    dispatch({ type: ADD_DATA, payload });
  };
};

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
};
