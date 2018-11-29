import React from 'react';
import { Ratings, Rating } from '../../../../src/Rating';
import Component from '../Component';
import README from './README.md';

class Emoji extends React.Component {
  state = {
    isMouseOver: false
  };

  render() {
    const { isMouseOver } = this.state;

    return (
      <Rating
        {...this.props}
        render={({ index, select, selectedIndex }) => (
          <span
            onClick={select}
            style={{ fontSize: '60px', margin: '0 2px' }}
            onMouseEnter={() => this.setState({ isMouseOver: true })}
            onMouseLeave={() => this.setState({ isMouseOver: false })}
          >
            {isMouseOver ? '😛' : index === selectedIndex ? '😃' : '😐'}
          </span>
        )}
      />
    );
  }
}

class RatingExample extends React.Component {
  render() {
    return (
      <Component readme={README}>
        <Ratings
          defaultSelectedIndex={3}
          onSelect={index => console.log('selected', index)}
        >
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
        </Ratings>
      </Component>
    );
  }
}

export default RatingExample;
