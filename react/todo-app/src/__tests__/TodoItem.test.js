import React from 'react';
import TodoItem from '../TodoItem';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('TodoItem', () => {
  it('TodoItem component calls onChange when radio button is clicked', () => {
    const todo = {
      title: 'dummy',
      status: 'active'
    }

    const handleChange = jest.fn();
    const wrapper = shallow(<TodoItem todo={todo} handleChange={handleChange} />);
    const input = wrapper.find('input');
    input.simulate('change', {target: {value: 0}});

    // expect(handleChange).toBeCalledWith(1);
    expect(handleChange).toHaveBeenCalledWith({target: {value: 0}});
  })
})
