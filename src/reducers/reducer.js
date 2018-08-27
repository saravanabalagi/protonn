import {combineReducers} from 'redux'
import layersReducer from "./layer/layersReducer";

export default combineReducers({
  layers: layersReducer,
});
