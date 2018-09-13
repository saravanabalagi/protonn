import {
  CHANGE_DISPLAY_KERNEL_POSITION_X,
  CHANGE_DISPLAY_KERNEL_POSITION_Y,
  CHANGE_FEATURE_MAPS,
  CHANGE_HEIGHT,
  CHANGE_KERNEL_SIZE,
  CHANGE_WIDTH
} from "./convActions";
import {CHANGE_DIMENSIONS} from "./inputActions";
import {inputLayer} from "./inputReducer";

export const conv2dLayer = 'conv2D';
export const defaultConv2dLayer = {
  layerPosition: null,
  type: conv2dLayer,
  kernelSize: 3,
  featureMaps: 32,
  height: 128,
  width: 128,
  kernelDisplayPositionX: 0,
  kernelDisplayPositionY: 0
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
      return {...state, kernelDisplayPositionX: action.kernelDisplayPositionX};
    case CHANGE_DISPLAY_KERNEL_POSITION_Y:
      return {...state, kernelDisplayPositionY: action.kernelDisplayPositionY};
    case "UPDATE_LAYER_POSITION":
      return {...state, layerPosition: action.layerPosition};
    case CHANGE_DIMENSIONS:
      let previousConvLayerPosition = (state.layerPosition === 0) ? 0 : state.layerPosition - 1;
      console.log('layers', action.layers);
      for(; previousConvLayerPosition>0; previousConvLayerPosition--)
        if(action.layers[previousConvLayerPosition].type===conv2dLayer) break;
      let prevLayer = action.layers[previousConvLayerPosition];
      let newHeight = state.height;
      let newWidth = state.width;
      if(prevLayer.type===inputLayer) {
        newWidth = prevLayer.dimensions[0];
        newHeight = prevLayer.dimensions[1];
      } else {
        newHeight = prevLayer.height;
        newWidth = prevLayer.width;
      }
      return {...state, height: newHeight, width: newWidth};
    default:
      return state;
  }
}
