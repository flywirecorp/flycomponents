import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';
import TextInput from '../TextInput';

const CVVInput = ({ cvvTooltip, className, onFocus, onBlur, ...props }) => {
  const [isTooltipVisible, showTooltip] = useState(false);
  const textInputClassName = classNames('cvvInput', className);

  const handleFocus = () => {
    showTooltip(true);
    onFocus();
  };

  const handleBlur = () => {
    showTooltip(false);
    onBlur();
  };

  return (
    <TextInput
      className={textInputClassName}
      ariaDescribedBy="cvvInput-Label-Tooltip"
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      <span
        className="cvvInput-Icon-Tooltip"
        onMouseOver={() => showTooltip(true)}
        onMouseOut={() => showTooltip(false)}
      />
      <span
        id="cvvInput-Label-Tooltip"
        className={`cvvInput-Label-Tooltip opacity-${isTooltipVisible ? 1 : 0}`}
        role="tooltip"
      >
        {cvvTooltip}
      </span>
    </TextInput>
  );
};

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
