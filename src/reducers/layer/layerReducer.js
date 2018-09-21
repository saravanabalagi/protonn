import {CHANGE_ACTIVATION, UPDATE_LAYER} from "./layerActions";
import {conv2dLayer} from "./conv2dReducer";
import {computeHeightWidth} from "./conv2dActions";

export const reluActivation = 'reluActivation';
export const eluActivation = 'eluActivation';
export const seluActivation = 'seluActivation';
export const sigmoidActivation = 'sigmoidActivation';
export const noActivation = 'noActivation';

export const displayNameActivations = {
  reluActivation: 'ReLU',
  eluActivation: 'ELU',
  seluActivation: 'SELU',
  sigmoidActivation: 'Sigmoid',
  noActivation: 'No Activation'
};

export const codeActivations = {
  reluActivation: 'relu',
  eluActivation: 'elu',
  seluActivation: 'selu',
  sigmoidActivation: 'sigmoid',
  noActivation: 'none'
};

export default (state, action) => {
  let newState = {...state};
  switch (action.type) {
    case UPDATE_LAYER:
      switch (state.type) {
        case conv2dLayer:
          let {height, width} = computeHeightWidth(action.layers, state);
          newState = {...state, height: height, width: width};
          break;
      }
      return {...newState, layerPosition: action.layerPosition};
    case CHANGE_ACTIVATION:
      return {...state, activation: action.activation};
  }
}
