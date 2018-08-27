import denseReducer from "./denseReducer";

export default (state={
  layers: []
},action) => {
  switch (action.type) {
    case "ADD_LAYER":
      return {...state, layers: [...state.layers, action.layer]};
    case "DELETE_LAYER":
      return {...state, layers: [...state.layers.slice(0, action.layerPosition), ...state.layers.slice(action.layerPosition+1)]};
    case "CHANGE_NEURONS":
      let changedLayer = denseReducer(state.layers[action.layerPosition],action);
      return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
  }
  return state;
}
