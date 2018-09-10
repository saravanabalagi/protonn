export const denseLayer = 'dense';
export const defaultDenseLayer = {
  layerPosition: null,
  type: denseLayer,
  neurons: 1,
  spacingWithin: 20
};

export default (state=defaultDenseLayer, action) => {
  switch (action.type) {
    case "CHANGE_NEURONS":
      return {...state, neurons: action.neurons};
    case "CHANGE_SPACING":
      return {...state, spacingWithin: action.spacingWithin};
    case "UPDATE_LAYER_POSITION":
      return {...state, layerPosition: action.layerPosition};
    default:
      return state;
  }
}
