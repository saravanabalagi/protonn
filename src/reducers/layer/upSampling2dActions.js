export const CHANGE_POOL_SIZE = "CHANGE_POOL_SIZE";

export function changeUpSampleSize(layerPosition, poolSize) {
  return (dispatch) => {
    dispatch({ type: CHANGE_POOL_SIZE, upSampleSize: poolSize})
  }
}
