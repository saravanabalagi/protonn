export default (state={
  layerPosition: null,
  neurons: 1
}, action) => {
  switch (action.type) {
    case "CHANGE_NEURONS":
      return {...state, neurons: action.neurons};
    case "UPDATE_LAYER_POSITION":
      return {...state, layerPosition: action.layerPosition};
  }
  return state;
}
