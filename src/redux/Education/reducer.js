import { ADD_EDUCATION, CLEAR_EDUCATION, DELETE_EDUCATION } from "./types";

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EDUCATION:
      return {
        data: [...action.payload],
      };
    case DELETE_EDUCATION:
      let removeEducation = state.data.filter((_, index) => {
        return index !== action.id;
      });
      return {
        data: [...removeEducation],
      };
    case CLEAR_EDUCATION:
      return {
        data: initialState,
      };
    default:
      return state;
  }
}
