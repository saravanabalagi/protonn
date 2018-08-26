import {combineReducers} from 'redux'
import layerReducer from "./layer/layerReducer";

export default combineReducers({
  layer: layerReducer
});
