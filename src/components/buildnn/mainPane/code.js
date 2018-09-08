import React, {Component} from 'react';
import {connect} from "react-redux";
import Parser from 'html-react-parser';
import Prism from 'prismjs';
import {Content} from "bloomer";

import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/components/prism-python';
import {getLayerName} from "../../../reducers/architectureActions";

class Code extends Component {

  getKerasCode = () => {
    let layers = this.props.layers;
    let kerasCode = '';
    kerasCode += 'from keras.layers import Input\n';
    kerasCode += 'from keras.models import Model\n';
    kerasCode += '\n';
    kerasCode += 'def get_model():\n';

    let inputLayer = layers[0];
    kerasCode += '  ' + `${getLayerName(inputLayer)} = Input(shape=(${inputLayer.neurons}))\n`;

    for(let i=1; i<layers.length-1; i++) {
      let currentLayer = layers[i];
      let prevLayer = layers[i - 1];
      kerasCode += '  ' + `${getLayerName(currentLayer)} = Dense(${currentLayer.neurons}, activation='relu')(${getLayerName(prevLayer)})\n`;
    }

    let outputLayer = layers[layers.length-1];
    kerasCode += '  ' + `${getLayerName(outputLayer)} = Dense(${outputLayer.neurons}, activation='relu')(${getLayerName(outputLayer)})\n`;
    kerasCode += '  ' + 'model = Model(inputs=input, outputs=output_layer)\n';
    kerasCode += '  ' + 'return model\n';
    return kerasCode;
  };

  getCodeHtml = () => {
    let code = this.getKerasCode();
    return Prism.highlight(code, Prism.languages.python, 'python');
  };

  render() {
    return (
      <Content className="Code">
        <pre className="language-python">
          <code className="language-python">
            {Parser(this.getCodeHtml())}
          </code>
        </pre>
      </Content>
    );
  }
}

export default connect((store)=> {
  return {
    layers: store.architecture.layers
  };
})(Code);
