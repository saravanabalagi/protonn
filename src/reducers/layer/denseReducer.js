export default (state={
  layerPosition: null,
  neurons: 1,
  spacing: 20
}, action) => {
  switch (action.type) {
    case "CHANGE_NEURONS":
      return {...state, neurons: action.neurons};
    case "CHANGE_SPACING":
      return {...state, spacing: action.spacing};
    case "UPDATE_LAYER_POSITION":
      return {...state, layerPosition: action.layerPosition};
    default:
      return state;
  }
}
