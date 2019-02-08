import React, { Component } from 'react';
import Canvas from '../canvas';
import mapping from '../mock/mapping.json';
import Toolbar from '../tools';
import { Button } from 'antd';
import './assets/demo.css';

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount = () => {
    if (fetch) {
      fetch('../mock/mapping.json')
        .then(result => result.json())
        .then(data => this.setState({ data }));
    } else {
      this.setState({ data: mapping });
    }
  };

  outputData = () => {
    let data = Object.assign({}, DataCollector.getAll());
    this.setState({ data });

    for (let key in data['LineGroup']) {
      delete data['LineGroup'][key].from;
      delete data['LineGroup'][key].to;
    }

    const treeData = JSON.stringify(data);
    // eslint-disable-next-line
    console.log(treeData);
    return data;
  };

  render = () => {
    const { data } = this.state;

    return (
      <div className="Demo">
        <Toolbar />
        <Canvas className="canvas-wrapper" data={data} />
        <Button
          onClick={this.outputData}
          type="primary"
          style={{ position: 'absolute', top: 10, left: 10 }}
        >
          save
        </Button>
      </div>
    );
  };
}
