export const CHANGE_NEURONS = "CHANGE_NEURONS";

export function changeNeuron(layerPosition, neurons) {
  return (dispatch) => {
    dispatch({ type: CHANGE_NEURONS,
      layerPosition: layerPosition,
      neurons: neurons });
  }
}
