import store from "../../store";
import {inputLayer} from "./inputReducer";
import {addLayer} from "../architectureActions";

export const CHANGE_DIMENSIONS = 'CHANGE_DIMENSIONS';

export function changeDimension(dimension, index) {
  return (dispatch) => {
    if(store.getState().architecture.layers.length<1) addLayer(inputLayer);
    let dimensionsArray = store.getState().architecture.layers[0].dimensions;
    if(index < dimensionsArray.length) {
      dimensionsArray[index] = dimension;
      dispatch({type: CHANGE_DIMENSIONS, layerPosition: 0, dimensions: dimensionsArray})
    }
  }
}

export function deleteDimension() {
  return (dispatch) => {
    let dimensionsArray = store.getState().architecture.layers[0].dimensions;
    dispatch({type: CHANGE_DIMENSIONS, layerPosition: 0, dimensions: dimensionsArray.slice(0, -1)})
  }
}

export function addDimension() {
  return (dispatch) => {
    let dimensionsArray = store.getState().architecture.layers[0].dimensions;
    dispatch({type: CHANGE_DIMENSIONS, layerPosition: 0, dimensions: [...dimensionsArray, dimensionsArray[dimensionsArray.length-1]]})
  }
}
