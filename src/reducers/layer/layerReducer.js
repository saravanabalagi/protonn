import {UPDATE_LAYER} from "./layerActions";
import {conv2dLayer} from "./conv2dReducer";
import {computeHeightWidth} from "./conv2dActions";

export default (state, action) => {
  let newState = {...state};
  switch (action.type) {
    case UPDATE_LAYER:
      switch (state.type) {
        case conv2dLayer:
          let {height, width} = computeHeightWidth(action.layers, state);
          newState = {...state, height: height, width: width};
          break;
      }
      return {...newState, layerPosition: action.layerPosition};
  }
}
