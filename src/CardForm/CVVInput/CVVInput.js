import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import TextInput from '../TextInput';

const CVVInput = ({ cvvTooltip, className, ...props }) => {
  const textInputClassName = classNames('cvvInput', className);

  return (
    <TextInput
      className={textInputClassName}
      ariaDescribedBy="cvvInput-Label-Tooltip"
      {...props}
    >
      <span className="cvvInput-Icon-Tooltip" />
      <span
        id="cvvInput-Label-Tooltip"
        className="cvvInput-Label-Tooltip"
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
  name: PropTypes.string.isRequired
};

export default CVVInput;
