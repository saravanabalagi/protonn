import {CHANGE_NEURONS, CHANGE_SPACING} from "./denseActions";
import {reluActivation} from "./layerReducer";

export const denseLayer = 'dense';
export const defaultDenseLayer = {
  layerPosition: null,
  type: denseLayer,
  neurons: 1,
  spacingWithin: 20,
  activation: reluActivation
};

export default (state=defaultDenseLayer, action) => {
  switch (action.type) {
    case CHANGE_NEURONS:
      return {...state, neurons: action.neurons};
    case CHANGE_SPACING:
      return {...state, spacingWithin: action.spacingWithin};
    default:
      return state;
  }
}
