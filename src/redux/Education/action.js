import { ADD_EDUCATION, CLEAR_EDUCATION, DELETE_EDUCATION } from "./types";

export const addEducation = (payload) => {
  return (dispatch) => {
    dispatch({ type: ADD_EDUCATION, payload });
  };
};

export const clearEducation = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_EDUCATION });
  };
};

export const deleteEducation = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_EDUCATION, id });
  };
};
