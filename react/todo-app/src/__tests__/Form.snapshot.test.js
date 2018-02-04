import React from 'react';
import Form from '../Form';
import renderer from 'react-test-renderer';

describe('Form', () => {
  it('Form renders correctly', () => {
    const tree = renderer.create(<Form/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
