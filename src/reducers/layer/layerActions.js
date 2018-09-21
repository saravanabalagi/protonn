export const UPDATE_LAYER = 'UPDATE_LAYER';
export const CHANGE_ACTIVATION = 'CHANGE_ACTIVATION';

export function changeActivation(activation, layerPosition) {
  return (dispatch) => {
    dispatch({ type:CHANGE_ACTIVATION, activation: activation, layerPosition:layerPosition });
  }
}
