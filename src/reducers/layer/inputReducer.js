import {CHANGE_DIMENSIONS} from "./inputActions";

export const inputLayer = 'input';
export const defaultInputLayer = {
  dimensions: [1],
  type: inputLayer
};

export default (state=defaultInputLayer, action) => {
  switch (action.type) {
    case CHANGE_DIMENSIONS:
      return {...state, dimensions: action.dimensions};
    default: return this.state;
  }
}
