import {UPDATE_LAYER_POSITION} from "./layerActions";

export default (state, action) => {
  switch (action.type) {
    case UPDATE_LAYER_POSITION:
      return {...state, layerPosition: action.layerPosition};
  }
}
