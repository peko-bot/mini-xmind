import React from 'react';
import { mount } from 'enzyme';
let Toolbar;
switch (process.env.LIB_DIR) {
  case 'lib':
    Toolbar = require('../../../lib/tools').default;
    break;
  case 'dist':
    Toolbar = require('../../../dist/lib/toolbar').default;
    break;
  default:
    Toolbar = require('../..').Toolbar;
    break;
}
import { tools } from '../../options/tools';

describe('Toolbar', () => {
  it('toolbar render correctly', () => {
    const wrapper = mount(<Toolbar />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.anticon').length).toBe(tools.length);
  });

  it('onDragStart', () => {
    const wrapper = mount(<Toolbar />).instance();
    const onChange = jest.fn();
    const setData = function() {
      onChange();
    };
    const event = { dataTransfer: { effectAllowed: '', setData } };
    wrapper.onDragStart(event, '{ test: 1 }');
    expect(onChange).toBeCalled();
    expect(event.dataTransfer.effectAllowed).toBe('copy');
  });
});
