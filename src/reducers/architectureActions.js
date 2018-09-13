import store from 'src/store';
import {defaultDenseLayer, denseLayer} from "./layer/denseReducer";
import {conv2dLayer, defaultConv2dLayer} from "./layer/convReducer";
import {defaultInputLayer, inputLayer} from "./layer/inputReducer";
import {changeDimensions} from "./layer/inputActions";

export const CHANGE_SPACING = 'CHANGE_SPACING';

export function addLayer(layerType) {
  return (dispatch) => {
    let layerPosition = store.getState().architecture.layers.length;
    if(layerType === inputLayer) dispatch({type: "ADD_LAYER", layer: {...defaultInputLayer, layerPosition: 0}});
    if(layerType === denseLayer) dispatch({type: "ADD_LAYER", layer: {...defaultDenseLayer, layerPosition: layerPosition }});
    if(layerType === conv2dLayer) {
      let inputLayer = store.getState().architecture.layers[0];
      if(inputLayer.dimensions.length<2)
        dispatch(changeDimensions([128,128]));
      dispatch({type: "ADD_LAYER", layer: {...defaultConv2dLayer, layerPosition: layerPosition }});
    }
  }
}

export function deleteLayer(layerPosition) {
  return (dispatch) => {
    dispatch({type: "DELETE_LAYER", layerPosition: layerPosition});
  }
}

export function changeSpacing(layerPosition, spacing) {
  return (dispatch) => {
    dispatch({type: CHANGE_SPACING, layerPosition: layerPosition, spacingWithin: spacing});
  }
}

export function getLayerName(layer) {
  let no_of_layers = store.getState().architecture.layers.length;

  // input and output layer
  if(layer.layerPosition===0) return 'input_layer';
  else if(layer.layerPosition===no_of_layers-1) return 'output_layer';

  // //other layers
  // let denseCount = 1;
  // let conv2dCount = 1;
  // let unknownCount = 1;
  // let layerName = "unknown";
  // if(layer.type===denseLayer) {
  //   layerName = 'dense' + '_' + denseCount;
  //   denseCount += 1;
  // } else if(layer.type===conv2dLayer) {
  //   layerName = 'conv' + '_' + conv2dCount;
  //   conv2dCount += 1;
  // } else {
  //   layerName = layerName + '_' + unknownCount;
  //   unknownCount += 1;
  // }
  // return layerName;

  return 'layer_' + layer.layerPosition;
}

export function getDenseArchitecture() {
  let layers = store.getState().architecture.layers;
  return layers.reduce((result, layer)=>{
    switch (layer.type) {
      case denseLayer: return [...result, layer.neurons];
      case inputLayer: return [...result, layer.dimensions[0]];
      default: return result;
    }
  }, []);
}

export function getConvArchitecture() {
  let layers = store.getState().architecture.layers;
  let filtered2dLayers = layers.reduce((result, layer)=>{
    switch (layer.type) {
      case conv2dLayer: return [...result, layer];
      case inputLayer: return [...result, layer];
      default: return result;
    }
  }, []);
  return filtered2dLayers.map((layer, index, layers)=> {
    return {
      widthAndHeight: layer.width || layer.dimensions[0],
      featureMaps: layer.featureMaps || 1,
      kernelSize: layers[index + 1] && layers[index + 1].kernelSize,
      kernelDisplayPositionX: layers[index + 1] && layers[index + 1].kernelDisplayPositionX,
      kernelDisplayPositionY: layers[index + 1] && layers[index + 1].kernelDisplayPositionY
    };
  });
}

export function getDenseInConvArchitecture() {
  let layers = store.getState().architecture.layers;
  return layers.reduce((result, layer)=>{
    switch (layer.type) {
      case denseLayer: return [...result, layer.neurons];
      default: return result;
    }
  }, []);
}

export function getSpacing() {
  let layers = store.getState().architecture.layers;
  return layers.map((layer)=>layer.spacingWithin || 20);
}

export function hasOnlyDense() {
  let layers = store.getState().architecture.layers;
  let hasOnlyDense = true;
  for(let layer of layers){
    if(layer.type === inputLayer) continue;
    if(layer.type !== denseLayer) {
      hasOnlyDense = false;
      break;
    }
  }
  return hasOnlyDense;
}
