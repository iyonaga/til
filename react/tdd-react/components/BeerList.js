import React, { Component } from 'react';

export default class BeerList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )
  }
}

BeerList.defaultProps = { items: [] };
