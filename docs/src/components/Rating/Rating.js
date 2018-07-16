import React from 'react';
import Rating from '../../../../src/Rating';
import Component from '../Component';
import README from './README.md';

class RatingExample extends React.Component {
  state = {
    ratingWithErrors: null,
    ratingWithoutErrors: 4
  };

  selectRating = rating => {
    this.setState({ rating });
  };

  render() {
    const { ratingWithErrors, ratingWithoutErrors } = this.state;

    return (
      <Component readme={README}>
        <Rating
          errorText="Please select a star"
          higherRatingText="Very satisfied"
          lowerRatingText="Very unsatisfied"
          onClick={ratingWithErrors =>
            this.setState({ ...this.state, ratingWithErrors })
          }
          rating={ratingWithErrors}
        />

        <Rating
          higherRatingText="Very satisfied"
          lowerRatingText="Very unsatisfied"
          onClick={ratingWithoutErrors =>
            this.setState({ ...this.state, ratingWithoutErrors })
          }
          rating={ratingWithoutErrors}
        />
      </Component>
    );
  }
}

export default RatingExample;
