import { ADD_EXPERIENCE, CLEAR_EXPERIENCE, DELETE_EXPERIENCE } from "./types";

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EXPERIENCE:
      return {
        data: [...action.payload],
      };
    case DELETE_EXPERIENCE:
      let removeExperience = state.data.filter((_, index) => {
        return index !== action.id;
      });
      return {
        data: [...removeExperience],
      };
    case CLEAR_EXPERIENCE:
      return {
        initialState,
      };
    default:
      return state;
  }
}
