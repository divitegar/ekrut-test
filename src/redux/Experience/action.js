import { ADD_EXPERIENCE, CLEAR_EXPERIENCE, DELETE_EXPERIENCE } from "./types";

export const addExperience = (payload) => {
  return (dispatch) => {
    dispatch({ type: ADD_EXPERIENCE, payload });
  };
};

export const clearExperience = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_EXPERIENCE });
  };
};

export const deleteExperience = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_EXPERIENCE, id });
  };
};
