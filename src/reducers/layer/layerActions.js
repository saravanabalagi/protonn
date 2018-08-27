export function changeNeuron(layerPosition, neurons) {
  return (dispatch) => {
    dispatch({ type: "CHANGE_NEURONS",
                  layerPosition: layerPosition,
                  neurons: neurons });
  }
}

export function addLayer() {
  return (dispatch) => {
    dispatch({type: "ADD_LAYER", layer:{neurons: 1}});
  }
}
