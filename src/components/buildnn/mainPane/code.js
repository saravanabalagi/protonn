import React, {Component} from 'react';
import {connect} from "react-redux";
import Parser from 'html-react-parser';
import Prism from 'prismjs';
import {Content} from "bloomer";

import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/components/prism-python';

class Code extends Component {

  getKerasCode = () => {
    let layers = this.props.layers.map(layer => layer.neurons);
    let kerasCode = '';
    kerasCode += 'from keras.layers import Input\n';
    kerasCode += 'from keras.models import Model\n';
    kerasCode += '\n';
    kerasCode += 'def get_model():\n';
    kerasCode += '  ' + 'input = Input(shape=(n))\n';

    let last_layer = null;
    for(let i=0; i<layers.length; i++) {
      let layer_number = i+1;
      let prev_layer = 'input';
      if(layer_number-1>0) prev_layer = `dense_${layer_number-1}`;
      let current_layer = `dense_${layer_number}`;
      kerasCode += '  ' + `${current_layer} = Dense(${layers[i]}, activation='relu')(${prev_layer})\n`;
      if(layer_number===layers.length) last_layer = current_layer;
    }

    kerasCode += '  ' + `output = Dense(, activation='relu')(${last_layer})\n`;
    kerasCode += '  ' + 'model = Model(inputs=input, outputs=output)\n';
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
