import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import TextInput from '../TextInput';
import { getCardType } from '../../utils/card';

const FORMAT = {
  pattern: '....-....-....-....',
  shouldAddSeparatorBeforeTyping: true,
  allowedCharacters: /[0-9]*/g
};

class CardNumberInput extends Component {
  static propTypes = {
    className: PropTypes.string,
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
    const { onChange, className, ...otherProps } = this.props;

    const cardTypeClassName = cardType.toLowerCase();

    const textInputClassName = classNames('CardNumberInput', className, {
      [cardTypeClassName]: !!cardType
    });

    return (
      <TextInput
        onChange={this.handleChange}
        className={textInputClassName}
        format={FORMAT}
        {...otherProps}
      />
    );
  }
}

export default CardNumberInput;
