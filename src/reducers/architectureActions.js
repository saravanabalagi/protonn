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
  let layers = store.getState().architecture.layers;
  let no_of_layers = store.getState().architecture.layers.length;

  // input and output layer
  if(layer.layerPosition===0) return 'input_layer';
  else if(layer.layerPosition===no_of_layers-1) return 'output_layer';

  //other layers
  let denseCount = 0;
  let conv2dCount = 0;
  let unknownCount = 0;
  for(let currentLayer of layers) {
    if(currentLayer.layerPosition===0) continue;
    switch (currentLayer.type) {
      case denseLayer: denseCount += 1; break;
      case conv2dLayer: conv2dCount += 1; break;
      default: unknownCount += 1;
    }
    if(currentLayer.layerPosition === layer.layerPosition) break;
  }
  let layerName = '';
  switch (layer.type) {
    case denseLayer: layerName = 'dense_' + denseCount; break;
    case conv2dLayer: layerName = 'conv_' + conv2dCount; break;
    default: layerName = 'unknown_' + unknownCount;
  }
  return layerName;
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
