import React, {Component} from 'react';
import {connect} from "react-redux";
import Parser from 'html-react-parser';
import Prism from 'prismjs';
import {Content} from "bloomer";

import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/components/prism-python';
import {getLayerName} from "../../../reducers/architectureActions";
import {denseLayer} from "../../../reducers/layer/denseReducer";
import {conv2dLayer} from "../../../reducers/layer/conv2dReducer";
import {maxPooling2dLayer} from "../../../reducers/layer/maxPooling2dReducer";
import {upSampling2dLayer} from "../../../reducers/layer/upSampling2dReducer";
import {batchNormLayer} from "../../../reducers/layer/batchNormReducer";
import {codeActivations} from "../../../reducers/layer/layerReducer";

class Code extends Component {

  getKerasCode = () => {
    let layers = this.props.layers;
    let kerasCode = '';

    let denseCount = false;
    let conv2dCount = false;
    let upSampling2dCount = false;
    let maxPooling2dCount = false;
    let batchNormCount = false;

    for(let layer of layers)
      switch (layer.type) {
        case denseLayer: denseCount += 1; break;
        case conv2dLayer: conv2dCount += 1; break;
        case upSampling2dLayer: upSampling2dCount += 1; break;
        case maxPooling2dLayer: maxPooling2dCount += 1; break;
        case batchNormLayer: batchNormCount += 1; break;
      }

    kerasCode += 'from keras.layers import Input\n';
    kerasCode += 'from keras.models import Model\n';
    if(denseCount>0) kerasCode += 'from keras.layers import Dense\n';
    if(conv2dCount>0) kerasCode += 'from keras.layers import Conv2D\n';
    if(maxPooling2dCount>0) kerasCode += 'from keras.layers import MaxPooling2D\n';
    if(upSampling2dCount>0) kerasCode += 'from keras.layers import UpSampling2D\n';
    if(batchNormCount>0) kerasCode += 'from keras.layers import BatchNormalization\n';
    kerasCode += '\n';
    kerasCode += 'def get_model():\n';

    let inputLayer = layers[0];
    kerasCode += '  ' + `${getLayerName(inputLayer)} = Input(shape=(${inputLayer.dimensions}))\n`;

    for(let i=1; i<layers.length-1; i++) {
      let currentLayer = layers[i];
      let prevLayer = layers[i - 1];
      switch (currentLayer.type) {
        case denseLayer: kerasCode += '  ' + `${getLayerName(currentLayer)} = Dense(${currentLayer.neurons}, activation=${codeActivations[currentLayer.activation]})(${getLayerName(prevLayer)})\n`; break;
        case conv2dLayer: kerasCode += '  ' + `${getLayerName(currentLayer)} = Conv2D(${currentLayer.featureMaps}, (${currentLayer.kernelSize},${currentLayer.kernelSize}), activation=${codeActivations[currentLayer.activation]}, padding='same')(${getLayerName(prevLayer)})\n`; break;
        case maxPooling2dLayer: kerasCode += '  ' + `${getLayerName(currentLayer)} = MaxPooling2D((${currentLayer.poolSize}))(${getLayerName(prevLayer)})\n`; break;
        case upSampling2dLayer: kerasCode += '  ' + `${getLayerName(currentLayer)} = UpSampling2D((${currentLayer.upSampleSize}))(${getLayerName(prevLayer)})\n`; break;
        case batchNormLayer: kerasCode += '  ' + `${getLayerName(currentLayer)} = BatchNormalization()(${getLayerName(prevLayer)})\n`; break;
      }
    }

    let outputLayer = layers[layers.length-1];
    kerasCode += '  ' + `${getLayerName(outputLayer)} = Dense(${outputLayer.neurons}, activation=${codeActivations[outputLayer.activation]})(${getLayerName(layers[layers.length-2])})\n`;
    kerasCode += '  ' + `model = Model(inputs=${getLayerName(inputLayer)}, outputs=${getLayerName(outputLayer)})\n`;
    kerasCode += '  ' + 'return model\n';
    return kerasCode;
  };

  getCodeHtml = () => {
    let code = this.getKerasCode();
    return Prism.highlight(code, Prism.languages.python, 'python');
  };

  render() {
    let layersLength = this.props.layers.length;
    return (
      <Content className="Code">
        {
          layersLength<2 &&
          <div className="notification is-danger">
            <span className="icon">
              <i className="fa fa-exclamation-triangle"/>
            </span>
            <span>We need atleast two layers to show code</span>
          </div>
        }
        {
          layersLength>=2 &&
          <pre className="language-python">
            <code className="language-python">
              {Parser(this.getCodeHtml())}
            </code>
          </pre>
        }
      </Content>
    );
  }
}

export default connect((store)=> {
  return {
    layers: store.architecture.layers
  };
})(Code);
