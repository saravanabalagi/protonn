export const CHANGE_HEIGHT = 'CHANGE_HEIGHT';
export const CHANGE_WIDTH = 'CHANGE_WIDTH';
export const CHANGE_KERNEL_SIZE = 'CHANGE_KERNEL_SIZE';
export const CHANGE_FEATURE_MAPS = 'CHANGE_FEATURE_MAPS';
export const CHANGE_DISPLAY_KERNEL_POSITION_X = 'CHANGE_DISPLAY_KERNEL_POSITION_X';
export const CHANGE_DISPLAY_KERNEL_POSITION_Y = 'CHANGE_DISPLAY_KERNEL_POSITION_Y';

export function changeHeight(layerPosition, height) {
  return (dispatch) => {
    dispatch({ type: CHANGE_HEIGHT,
      layerPosition: layerPosition,
      height: height });
  }
}

export function changeWidth(layerPosition, width) {
  return (dispatch) => {
    dispatch({ type: CHANGE_WIDTH,
      layerPosition: layerPosition,
      width: width });
  }
}

export function changeKernelSize(layerPosition, kernelSize) {
  return (dispatch) => {
    dispatch({ type: CHANGE_KERNEL_SIZE,
      layerPosition: layerPosition,
      kernelSize: kernelSize });
  }
}

export function changeFeatureMaps(layerPosition, featureMaps) {
  return (dispatch) => {
    dispatch({ type: CHANGE_FEATURE_MAPS,
      layerPosition: layerPosition,
      featureMaps: featureMaps });
  }
}

export function changeDisplayKernelPositionX(layerPosition, xPosition) {
  return (dispatch) => {
    dispatch({ type: CHANGE_DISPLAY_KERNEL_POSITION_X,
      layerPosition: layerPosition,
      kernelDisplayPositionX: xPosition });
  }
}

export function changeDisplayKernelPositionY(layerPosition, yPosition) {
  return (dispatch) => {
    dispatch({ type: CHANGE_DISPLAY_KERNEL_POSITION_Y,
      layerPosition: layerPosition,
      kernelDisplayPositionY: yPosition });
  }
}
