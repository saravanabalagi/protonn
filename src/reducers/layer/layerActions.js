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
    let newLayerName = "dense_" + store.getState().layers.layers.length;
    dispatch({type: "ADD_LAYER", layer: { name: newLayerName, neurons: 1 }});
  }
}

export function deleteLayer(layerPosition) {
  return (dispatch) => {
    dispatch({type: "DELETE_LAYER", layerPosition: layerPosition});
  }
}
