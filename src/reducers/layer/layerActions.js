export const UPDATE_LAYER = 'UPDATE_LAYER';
export const CHANGE_ACTIVATION = 'CHANGE_ACTIVATION';

export function changeActivation(activation) {
  return (dispatch) => {
    dispatch({ type:CHANGE_ACTIVATION, activation: activation});
  }
}
