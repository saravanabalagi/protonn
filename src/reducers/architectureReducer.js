import denseReducer, {denseLayer} from "./layer/denseReducer";
import conv2dReducer, {conv2dLayer} from "./layer/conv2dReducer";
import inputReducer, {inputLayer} from "./layer/inputReducer";
import layerReducer from "./layer/layerReducer";

import {ADD_LAYER, DELETE_LAYER} from "./architectureActions";
import {UPDATE_LAYER_POSITION} from "./layer/layerActions";
import maxPooling2dReducer, {maxPooling2dLayer} from "./layer/maxPooling2dReducer";
import upSampling2dReducer, {upSampling2dLayer} from "./layer/upSampling2dReducer";

export default (state={
  layers: []
},action) => {
  switch (action.type) {
    case ADD_LAYER: {
      if(state.layers.length<2) {
        return {...state, layers: [...state.layers, action.layer]};
      } else {
        let newLayers = [...state.layers.slice(0, state.layers.length - 1), action.layer, ...state.layers.slice(state.layers.length - 1)];
        return {...state,
          layers: newLayers.map((layer, index) => layerReducer(layer, {
            type: UPDATE_LAYER_POSITION,
            layerPosition: index
          }))
        };
      }
    }
    case DELETE_LAYER: {
      let newLayers = [...state.layers.slice(0, action.layerPosition), ...state.layers.slice(action.layerPosition + 1)];
      return {...state,
        layers: newLayers.map((layer, index) => layerReducer(layer, {
          type: UPDATE_LAYER_POSITION,
          layerPosition: index
        }))
      };
    }
    default: {
      if(action!=null && action.layerPosition!=null) {
        let currentLayer = state.layers[action.layerPosition];
        switch (currentLayer.type) {
          case denseLayer: {
            let changedLayer = denseReducer(state.layers[action.layerPosition], action);
            return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
          }
          case conv2dLayer: {
            let changedLayer = conv2dReducer(state.layers[action.layerPosition], action);
            return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
          }
          case maxPooling2dLayer: {
            let changedLayer = maxPooling2dReducer(state.layers[action.layerPosition], action);
            return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
          }
          case upSampling2dLayer: {
            let changedLayer = upSampling2dReducer(state.layers[action.layerPosition], action);
            return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
          }
          case inputLayer: {
            let changedLayer = inputReducer(state.layers[action.layerPosition], action);
            let updatedState = {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
            return {...updatedState, layers: updatedState.layers.map(layer => {
                if(layer.type===conv2dLayer)
                  return conv2dReducer(layer, {...action, layers: state.layers});
                return layer;
              })};
          }
          default:
        }
      }
      return state;
    }
  }
}
