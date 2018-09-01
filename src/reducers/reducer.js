import {combineReducers} from 'redux'
import architectureReducer from "./layer/architectureReducer";

export default combineReducers({
  architecture: architectureReducer
});
