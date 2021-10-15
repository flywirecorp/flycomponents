import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormGroup from '../FormGroup';
import { ENTER, SPACE } from '../utils/keycodes';

export class Rating extends Component {
  handleClick = e => this.selectStar(e);

  createMultipleStars = numberOfStars => {
    const { errorText, rating } = this.props;

    const stars = [];
    for (let starId = numberOfStars; starId > 0; starId--) {
      stars.push(
        <Star
          error={!!errorText}
          key={starId}
          id={starId}
          selected={starId === parseInt(rating)}
          onClick={this.handleClick}
        />
      );
    }
    return stars;
  };

  selectStar = e => {
    const { target } = e;
    const { onClick } = this.props;
    const rating = target.getAttribute('data-value');

    onClick(rating);
  };

  render() {
    const { lowerRatingText, higherRatingText, errorText, name } = this.props;
    const numberOfStars = 5;
    const stars = this.createMultipleStars(numberOfStars);

    return (
      <FormGroup name={name} error={errorText}>
        <div className="Rating">
          <span className="textAlign-center fontSize-sm">
            {lowerRatingText}
          </span>
          <div className="Rating-stars">{stars}</div>
          <span className="textAlign-center fontSize-sm">
            {higherRatingText}
          </span>
        </div>
      </FormGroup>
    );
  }
}

Rating.propTypes = {
  errorText: PropTypes.string,
  higherRatingText: PropTypes.string,
  lowerRatingText: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  rating: PropTypes.string
};

Rating.defaultProps = {
  errorText: '',
  higherRatingText: '',
  lowerRatingText: '',
  name: 'stars',
  onClick: () => {},
  rating: null
};

export const Star = ({ id, selected, error, onClick }) => {
  const starClasses = classNames('Star', {
    selected,
    error
  });

  return (
    <span
      data-value={id}
      onClick={onClick}
      onKeyDown={evt => [ENTER, SPACE].includes(evt.keyCode) && onClick(evt)}
      className={starClasses}
      role="button"
      tabIndex={0}
    >
      &#9734;
    </span>
  );
};

Star.propTypes = {
  error: PropTypes.bool,
  id: PropTypes.number,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default Rating;
