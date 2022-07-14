import { combineReducers } from "redux";
import basicInformation from "./basicInformation/reducer";
import education from "./Education/reducer";
import experience from "./Experience/reducer";

export default combineReducers({
  basicInformation,
  education,
  experience,
});
