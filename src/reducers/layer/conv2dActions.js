import {inputLayer} from "./inputReducer";
import {conv2dLayer} from "./conv2dReducer";
import {maxPooling2dLayer} from "./maxPooling2dReducer";
import {upSampling2dLayer} from "./upSampling2dReducer";

export const CHANGE_HEIGHT = 'CHANGE_HEIGHT';
export const CHANGE_WIDTH = 'CHANGE_WIDTH';
export const CHANGE_KERNEL_SIZE = 'CHANGE_KERNEL_SIZE';
export const CHANGE_FEATURE_MAPS = 'CHANGE_FEATURE_MAPS';
export const CHANGE_DISPLAY_KERNEL_POSITION_X = 'CHANGE_DISPLAY_KERNEL_POSITION_X';
export const CHANGE_DISPLAY_KERNEL_POSITION_Y = 'CHANGE_DISPLAY_KERNEL_POSITION_Y';

export function changeHeight(layerPosition, height) {
  return (dispatch) => {
    dispatch({ type: CHANGE_HEIGHT,
      layerPosition: layerPosition,
      height: height });
  }
}

export function changeWidth(layerPosition, width) {
  return (dispatch) => {
    dispatch({ type: CHANGE_WIDTH,
      layerPosition: layerPosition,
      width: width });
  }
}

export function changeKernelSize(layerPosition, kernelSize) {
  return (dispatch) => {
    dispatch({ type: CHANGE_KERNEL_SIZE,
      layerPosition: layerPosition,
      kernelSize: kernelSize });
  }
}

export function changeFeatureMaps(layerPosition, featureMaps) {
  return (dispatch) => {
    dispatch({ type: CHANGE_FEATURE_MAPS,
      layerPosition: layerPosition,
      featureMaps: featureMaps });
  }
}

export function changeDisplayKernelPositionX(layerPosition, xPosition) {
  return (dispatch) => {
    dispatch({ type: CHANGE_DISPLAY_KERNEL_POSITION_X,
      layerPosition: layerPosition,
      kernelDisplayPositionX: xPosition });
  }
}

export function changeDisplayKernelPositionY(layerPosition, yPosition) {
  return (dispatch) => {
    dispatch({ type: CHANGE_DISPLAY_KERNEL_POSITION_Y,
      layerPosition: layerPosition,
      kernelDisplayPositionY: yPosition });
  }
}

export function computeHeightWidth(layers, layer) {
  let previousConvLayerPosition = (layer.layerPosition === 0) ? 0 : layer.layerPosition - 1;
  for(; previousConvLayerPosition>0; previousConvLayerPosition--)
    if(layers[previousConvLayerPosition].type===conv2dLayer) break;
  let prevLayer = layers[previousConvLayerPosition];
  let height = layer.height;
  let width = layer.width;
  if(prevLayer.type===inputLayer) {
    width = prevLayer.dimensions[0];
    height = prevLayer.dimensions[1];
  } else {
    height = prevLayer.height;
    width = prevLayer.width;
  }
  if(layer.layerPosition - previousConvLayerPosition > 1) {
    for(let i = previousConvLayerPosition+1; i<layer.layerPosition; i++) {
      let currentLayer = layers[i];
      switch (currentLayer.type) {
        case maxPooling2dLayer:
          width = width/currentLayer.poolSize[0];
          height = height/currentLayer.poolSize[1];
          break;
        case upSampling2dLayer:
          width = width * currentLayer.upSampleSize[0];
          height = height * currentLayer.upSampleSize[1];
          break;
      }
    }
  }
  return { height, width };
}
