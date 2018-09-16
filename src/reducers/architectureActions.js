import store from 'src/store';
import {defaultDenseLayer, denseLayer} from "./layer/denseReducer";
import {conv2dLayer, defaultConv2dLayer} from "./layer/conv2dReducer";
import {defaultInputLayer, inputLayer} from "./layer/inputReducer";
import {changeDimensions} from "./layer/inputActions";
import {defaultMaxPooling2dLayer, maxPooling2dLayer} from "./layer/maxPooling2dReducer";
import {defaultUpSampling2dLayer, upSampling2dLayer} from "./layer/upSampling2dReducer";
import {batchNormLayer, defaultBatchNormLayer} from "./layer/batchNormReducer";

export const ADD_LAYER = 'ADD_LAYER';
export const DELETE_LAYER = 'DELETE_LAYER';

export function addLayer(layerType) {
  return (dispatch) => {
    let layerPosition = store.getState().architecture.layers.length;
    switch (layerType) {
      case inputLayer: dispatch({type: ADD_LAYER, layer: {...defaultInputLayer, layerPosition: 0}}); break;
      case denseLayer: dispatch({type: ADD_LAYER, layer: {...defaultDenseLayer, layerPosition: layerPosition }}); break;
      case conv2dLayer: {
        let inputLayer = store.getState().architecture.layers[0];
        if(inputLayer.dimensions.length<2)
          dispatch(changeDimensions([128,128]));
        dispatch({type: ADD_LAYER, layer: {...defaultConv2dLayer, layerPosition: layerPosition }});
      } break;
      case maxPooling2dLayer: dispatch({type: ADD_LAYER, layer: {...defaultMaxPooling2dLayer, layerPosition: layerPosition }}); break;
      case upSampling2dLayer: dispatch({type: ADD_LAYER, layer: {...defaultUpSampling2dLayer, layerPosition: layerPosition }}); break;
      case batchNormLayer: dispatch({type: ADD_LAYER, layer: {...defaultBatchNormLayer, layerPosition: layerPosition }}); break;
    }
  }
}

export function deleteLayer(layerPosition) {
  return (dispatch) => {
    dispatch({type: DELETE_LAYER, layerPosition: layerPosition});
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
  let maxPooling2dCount = 0;
  let upSampling2dCount = 0;
  let batchNormCount = 0;
  let unknownCount = 0;

  for(let currentLayer of layers) {
    if(currentLayer.layerPosition===0) continue;
    switch (currentLayer.type) {
      case denseLayer: denseCount += 1; break;
      case conv2dLayer: conv2dCount += 1; break;
      case maxPooling2dLayer: maxPooling2dCount += 1; break;
      case upSampling2dLayer: upSampling2dCount += 1; break;
      case batchNormLayer: batchNormCount += 1; break;
      default: unknownCount += 1;
    }
    if(currentLayer.layerPosition === layer.layerPosition) break;
  }
  let layerName = '';
  switch (layer.type) {
    case denseLayer: layerName = 'dense_' + denseCount; break;
    case conv2dLayer: layerName = 'conv_' + conv2dCount; break;
    case maxPooling2dLayer: layerName = 'maxPooling_' + maxPooling2dCount; break;
    case upSampling2dLayer: layerName = 'upSampling_' + upSampling2dCount; break;
    case batchNormLayer: layerName = 'batchNorm_' + batchNormCount; break;
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
