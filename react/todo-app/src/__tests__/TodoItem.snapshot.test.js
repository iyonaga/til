import React from 'react';
import TodoItem from '../TodoItem';
import renderer from 'react-test-renderer';

describe('TodoItem', () => {
  it('TodoItem component renders the todo correctly', () => {
    const todo = {
      title: 'dummy',
      status: 'active'
    }

    const tree = renderer.create(
      <TodoItem todo={todo} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  })
})
