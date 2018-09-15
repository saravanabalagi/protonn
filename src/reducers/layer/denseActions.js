export const CHANGE_SPACING = 'CHANGE_SPACING';
export const CHANGE_NEURONS = "CHANGE_NEURONS";

export function changeNeuron(layerPosition, neurons) {
  return (dispatch) => {
    dispatch({ type: CHANGE_NEURONS,
      layerPosition: layerPosition,
      neurons: neurons });
  }
}

export function changeSpacing(layerPosition, spacing) {
  return (dispatch) => {
    dispatch({type: CHANGE_SPACING, layerPosition: layerPosition, spacingWithin: spacing});
  }
}

