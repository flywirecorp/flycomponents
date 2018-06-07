import React from 'react';
import Rating from '../../../../src/Rating';
import Component from '../Component';
import README from './README.md';

class RatingExample extends React.Component {
  state = {
    rating: null
  };

  selectRating = rating => {
    this.setState({ rating });
  };

  render() {
    const { rating } = this.state;
    const errorText = rating === null ? 'Please select a star' : '';

    return (
      <Component readme={README}>
        <Rating
          errorText={errorText}
          higherRatingText="Very satisfied"
          lowerRatingText="Very unsatisfied"
          onClick={this.selectRating}
          rating={rating}
        />
      </Component>
    );
  }
}

export default RatingExample;
