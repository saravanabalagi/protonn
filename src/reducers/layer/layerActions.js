import store from '../../store';

export function changeNeuron(layerPosition, neurons) {
  return (dispatch) => {
    dispatch({ type: "CHANGE_NEURONS",
                  layerPosition: layerPosition,
                  neurons: neurons });
  }
}

export function addLayer() {
  return (dispatch) => {
    let layerPosition = store.getState().layers.layers.length;
    dispatch({type: "ADD_LAYER", layer: { neurons: 1, layerPosition: layerPosition, spacing: 20 }});
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
  let no_of_layers = store.getState().layers.layers.length;
  if(layer.layerPosition===0) return 'input_layer';
  else if(layer.layerPosition===no_of_layers-1) return 'output_layer';
  return "dense_" + layer.layerPosition;
}

export function getArchitecture() {
  let layers = store.getState().layers.layers;
  return layers.map((layer)=>layer.neurons);
}

export function getSpacing() {
  let layers = store.getState().layers.layers;
  return layers.map((layer)=>layer.spacing);
}

