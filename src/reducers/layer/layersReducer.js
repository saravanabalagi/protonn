import denseReducer from "./denseReducer";

export default (state={
  layers: []
},action) => {
  switch (action.type) {
    case "ADD_LAYER":
      return {...state, layers: [...state.layers, action.layer]};
    case "CHANGE_NEURONS":
      let changedLayer = denseReducer(state.layers[action.layerPosition],action);
      return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
  }
  return state;
}
