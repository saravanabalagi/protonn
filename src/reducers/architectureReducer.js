import denseReducer, {denseLayer} from "./layer/denseReducer";
import conv2dReducer, {conv2dLayer} from "./layer/convReducer";
import inputReducer, {inputLayer} from "./layer/inputReducer";

export default (state={
  layers: []
},action) => {
  switch (action.type) {
    case "ADD_LAYER": {
      if(state.layers.length<2) {
        return {...state, layers: [...state.layers, action.layer]};
      } else {
        let newLayers = [...state.layers.slice(0, state.layers.length - 1), action.layer, ...state.layers.slice(state.layers.length - 1)];
        return {...state,
          layers: newLayers.map((layer, index) => denseReducer(layer, {
            type: "UPDATE_LAYER_POSITION",
            layerPosition: index
          }))
        };
      }
    }
    case "DELETE_LAYER": {
      let newLayers = [...state.layers.slice(0, action.layerPosition), ...state.layers.slice(action.layerPosition + 1)];
      return {...state,
        layers: newLayers.map((layer, index) => denseReducer(layer, {
          type: "UPDATE_LAYER_POSITION",
          layerPosition: index
        }))
      };
    }
    default: {
      if(action!=null && action.layerPosition!=null) {
        let changedLayer = null;
        let currentLayer = state.layers[action.layerPosition];
        switch (currentLayer.type) {
          case denseLayer: {
            changedLayer = denseReducer(state.layers[action.layerPosition], action);
            return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
          }
          case conv2dLayer: {
            changedLayer = conv2dReducer(state.layers[action.layerPosition], action);
            return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
          }
          case inputLayer: {
            console.log('calling Inputred');
            changedLayer = inputReducer(state.layers[action.layerPosition], action);
            return {...state, layers: Object.assign([], state.layers, {[action.layerPosition]: changedLayer})};
          }
          default:
        }
      }
      return state;
    }
  }
}
