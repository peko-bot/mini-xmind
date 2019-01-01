import React from 'react';
import ReactDOM from 'react-dom';
import { render, mount, shallow } from 'enzyme';
import { SteppedLineTo } from '..';
import Block from '../../tools/Block';

describe('Line', () => {
  it('SteppedLine render correctly', () => {
    class Demo extends React.Component {
      constructor() {
        super();

        this.state = {
          steps: null,
        };
      }

      componentDidMount = () => {
        let steps = (
          <SteppedLineTo
            from={ReactDOM.findDOMNode(this.blockA)}
            to={ReactDOM.findDOMNode(this.blockB)}
            fromAnchor="bottom"
            toAnchor="top"
          />
        );

        this.setState({ steps });
      };

      render() {
        return (
          <React.Fragment>
            <Block
              style={{
                left: 90,
                top: 50,
                color: '#00f',
              }}
              ref={ref => (this.blockA = ref)}
              key="blockA"
            >
              A
            </Block>
            <Block
              style={{
                left: 20,
                top: 150,
                color: '#00f',
              }}
              ref={ref => (this.blockB = ref)}
              key="blockB"
            >
              B
            </Block>
            {this.state.steps}
          </React.Fragment>
        );
      }
    }
    const wrapper = mount(<Demo />);

    expect(wrapper).toMatchSnapshot();
  });
});
