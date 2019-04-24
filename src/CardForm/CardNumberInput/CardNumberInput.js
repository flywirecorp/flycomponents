import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import TextInput from '../TextInput';
import { getCardType } from '../../utils/card';

class CardNumberInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  };

  state = {
    cardType: ''
  };

  handleChange = (name, value) => {
    const { onChange } = this.props;

    const cardType = getCardType(value) || '';
    this.setState({ cardType });

    onChange(name, value);
  };

  render() {
    const { cardType } = this.state;
    const { onChange, ...otherProps } = this.props;

    const cardTypeClassName = cardType.toLowerCase();

    const className = classNames('CardNumberInput', {
      [cardTypeClassName]: !!cardType
    });

    return (
      <TextInput
        onChange={this.handleChange}
        className={className}
        {...otherProps}
      />
    );
  }
}

export default CardNumberInput;
