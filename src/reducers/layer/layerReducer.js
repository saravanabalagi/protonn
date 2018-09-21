import {CHANGE_ACTIVATION, UPDATE_LAYER} from "./layerActions";
import {conv2dLayer} from "./conv2dReducer";
import {computeHeightWidth} from "./conv2dActions";

export const reluActivation = 'reluActivation';
export const eluActivation = 'eluActivation';
export const seluActivation = 'seluActivation';
export const tanhActivation = 'tanhActivation';
export const sigmoidActivation = 'sigmoidActivation';
export const hardSigmoidActivation = 'hardSigmoidActivation';
export const softmaxActivation = 'softmaxActivation';
export const softPlusActivation = 'softPlusActivation';
export const softSignActivation = 'softSignActivation';
export const exponentialActivation = 'exponentialActivation';
export const linearActivation = 'linearActivation';
export const noActivation = 'noActivation';

export const displayNameActivations = {
  reluActivation: 'ReLU',
  eluActivation: 'ELU',
  seluActivation: 'SELU',
  sigmoidActivation: 'Sigmoid',
  softmaxActivation: 'Softmax',
  noActivation: 'No Activation',
  tanhActivation: 'Hyperbolic Tan',
  hardSigmoidActivation: 'Hard Sigmoid',
  softPlusActivation: 'SoftPlus',
  softSignActivation: 'SoftSign',
  exponentialActivation: 'Exponential',
  linearActivation: 'Linear/Identity'
};

export const codeActivations = {
  reluActivation: "'relu'",
  eluActivation: "'elu'",
  seluActivation: "'selu'",
  sigmoidActivation: "'sigmoid'",
  softmaxActivation: "'softmax'",
  noActivation: "None",
  tanhActivation: "'tanh'",
  hardSigmoidActivation: "'hard_sigmoid'",
  softPlusActivation: "'softplus'",
  softSignActivation: "'softsign'",
  exponentialActivation: "'exponential'",
  linearActivation: "'linear'"
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
