import {CHANGE_POOL_SIZE} from "./maxPooling2dActions";

export const maxPooling2dLayer = 'maxPooling2D';
export const defaultMaxPooling2dLayer = {
  layerPosition: null,
  type: maxPooling2dLayer,
  poolSize: [2,2]
};

export default (state=defaultMaxPooling2dLayer, action) => {
  switch (action.type) {
    case CHANGE_POOL_SIZE:
      return {...state, upSampleSize: action.upSampleSize};
    default:
      return state;
  }
}
