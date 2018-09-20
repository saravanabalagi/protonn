import {CHANGE_DIMENSIONS} from "./inputActions";
import {CHANGE_SPACING} from "./denseActions";

export const inputLayer = 'input';
export const defaultInputLayer = {
  dimensions: [1],
  type: inputLayer,
  spacingWithin: 20,
  layerPosition: 0
};

export default (state=defaultInputLayer, action) => {
  switch (action.type) {
    case CHANGE_DIMENSIONS:
      return {...state, dimensions: action.dimensions};
    case CHANGE_SPACING:
      return {...state, spacingWithin: action.spacingWithin};
    default: return this.state;
  }
}
