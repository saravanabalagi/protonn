import store from 'src/store';
import {defaultDenseLayer, denseLayer} from "./denseReducer";
import {conv2dLayer, defaultConv2dLayer} from "./convReducer";

export function changeNeuron(layerPosition, neurons) {
  return (dispatch) => {
    dispatch({ type: "CHANGE_NEURONS",
                  layerPosition: layerPosition,
                  neurons: neurons });
  }
}

export function addLayer(layerType) {
  return (dispatch) => {
    let layerPosition = store.getState().architecture.layers.length;
    if(layerType === denseLayer) dispatch({type: "ADD_LAYER", layer: {...defaultDenseLayer, layerPosition: layerPosition }});
    if(layerType === conv2dLayer) dispatch({type: "ADD_LAYER", layer: {...defaultConv2dLayer, layerPosition: layerPosition }});
  }
}

export function deleteLayer(layerPosition) {
  return (dispatch) => {
    dispatch({type: "DELETE_LAYER", layerPosition: layerPosition});
  }
}

export function changeSpacing(layerPosition, spacing) {
  return (dispatch) => {
    dispatch({type: "CHANGE_SPACING", layerPosition: layerPosition, spacing: spacing});
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

export function getArchitecture() {
  let layers = store.getState().architecture.layers;
  return layers.map((layer)=>layer.neurons);
}

export function getSpacing() {
  let layers = store.getState().architecture.layers;
  return layers.map((layer)=>layer.spacing);
}

