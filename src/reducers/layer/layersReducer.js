import denseReducer from "./denseReducer";

export default (state={
  layers: [
  ]
},action) => {
  switch (action.type) {
    case "ADD_LAYER":
      let newLayersAddLayer = [...state.layers.slice(0, state.layers.length-1), action.layer, ...state.layers.slice(state.layers.length-1)];
      return {...state, layers: newLayersAddLayer.map((layer, index) => denseReducer(layer, {type: "UPDATE_LAYER_POSITION", layerPosition: index}))};

    case "DELETE_LAYER":
      let newLayers = [...state.layers.slice(0, action.layerPosition), ...state.layers.slice(action.layerPosition+1)];
      return {...state, layers: newLayers.map((layer, index) => denseReducer(layer, {type: "UPDATE_LAYER_POSITION", layerPosition: index}))};
    case "CHANGE_NEURONS":
      let changedLayer = denseReducer(state.layers[action.layerPosition],action);
      return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
    default:
      return state;
  }
}
