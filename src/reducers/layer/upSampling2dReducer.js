import {CHANGE_POOL_SIZE} from "./upSampling2dActions";

export const upSampling2dLayer = 'upSampling2D';
export const defaultUpSampling2dLayer = {
  layerPosition: null,
  type: upSampling2dLayer,
  upSampleSize: [2,2]
};

export default (state=defaultUpSampling2dLayer, action) => {
  switch (action.type) {
    case CHANGE_POOL_SIZE:
      return {...state, upSampleSize: action.upSampleSize};
    default: return state;
  }
}
