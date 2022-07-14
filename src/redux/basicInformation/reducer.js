import { ADD_DATA, CLEAR_DATA } from "./types";

const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_DATA:
      return {
        data: { ...action.payload },
      };
    case CLEAR_DATA:
      return {
        initialState,
      };
    default:
      return state;
  }
}
