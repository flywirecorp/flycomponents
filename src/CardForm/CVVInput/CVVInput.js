import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import TextInput from '../TextInput';

const NUMBERS_REGEX = /[0-9]*/g;

const FORMAT = {
  pattern: '....',
  allowedCharacters: NUMBERS_REGEX
};

class CVVInput extends React.Component {
  state = { showTooltip: false };
  showTooltip = () => this.setState({ showTooltip: true });
  hideTooltip = () => this.setState({ showTooltip: false });

  handleFocus = () => {
    this.showTooltip();
    this.props.onFocus(this.props.name);
  };

  handleBlur = () => {
    this.hideTooltip();
    this.props.onBlur(this.props.name);
  };

  render = () => {
    const { cvvTooltip, className, ...props } = this.props;
    const textInputClassName = classNames('cvvInput', className);

    return (
      <TextInput
        className={textInputClassName}
        ariaDescribedBy="cvvInput-Label-Tooltip"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        format={FORMAT}
        {...props}
      >
        {/* eslint-disable-next-line */}
        <span
          className="cvvInput-Icon-Tooltip"
          onMouseOver={() => this.showTooltip()}
          onMouseOut={() => this.hideTooltip()}
        />
        <span
          id="cvvInput-Label-Tooltip"
          className={`cvvInput-Label-Tooltip opacity-${
            this.state.showTooltip ? 1 : 0
          }`}
          role="tooltip"
        >
          {cvvTooltip}
        </span>
      </TextInput>
    );
  };
}

CVVInput.propTypes = {
  className: PropTypes.string,
  cvvTooltip: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

CVVInput.defaultProps = {
  onBlur: () => {},
  onFocus: () => {}
};

export default CVVInput;
