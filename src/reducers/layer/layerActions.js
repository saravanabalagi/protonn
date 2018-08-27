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
    dispatch({type: "ADD_LAYER", layer: { neurons: 1, layerPosition: layerPosition }});
  }
}

export function deleteLayer(layerPosition) {
  return (dispatch) => {
    dispatch({type: "DELETE_LAYER", layerPosition: layerPosition});
  }
}

export function getLayerName(layer) {
  return "dense_" + layer.layerPosition;
}
