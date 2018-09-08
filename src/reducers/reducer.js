import {combineReducers} from 'redux'
import architectureReducer from "./architectureReducer";

export default combineReducers({
  architecture: architectureReducer
});
