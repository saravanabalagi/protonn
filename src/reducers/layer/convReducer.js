import {
  CHANGE_DISPLAY_KERNEL_POSITION_X,
  CHANGE_DISPLAY_KERNEL_POSITION_Y,
  CHANGE_FEATURE_MAPS,
  CHANGE_HEIGHT,
  CHANGE_KERNEL_SIZE,
  CHANGE_WIDTH
} from "./convActions";

export const conv2dLayer = 'conv2D';
export const defaultConv2dLayer = {
  layerPosition: null,
  type: conv2dLayer,
  kernelSize: 3,
  featureMaps: 32,
  height: 128,
  width: 128,
  displayKernelPositionX: 0,
  displayKernelPositionY: 0
};

export default (state=defaultConv2dLayer, action) => {
  switch (action.type) {
    case CHANGE_KERNEL_SIZE:
      return {...state, kernelSize: action.kernelSize};
    case CHANGE_FEATURE_MAPS:
      return {...state, featureMaps: action.featureMaps};
    case CHANGE_HEIGHT:
      return {...state, height: action.height};
    case CHANGE_WIDTH:
      return {...state, width: action.width};
    case CHANGE_DISPLAY_KERNEL_POSITION_X:
      return {...state, displayKernelPositionX: action.displayKernelPositionX};
    case CHANGE_DISPLAY_KERNEL_POSITION_Y:
      return {...state, displayKernelPositionY: action.displayKernelPositionY};
    case "UPDATE_LAYER_POSITION":
      return {...state, layerPosition: action.layerPosition};
    default:
      return state;
  }
}
