import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import TextInput from '../TextInput';

const CVVInput = ({ cvvTooltip, className, ...props }) => {
  const textInputClassName = classNames('cvvInput', className);

  return (
    <TextInput className={textInputClassName} {...props}>
      <input className="cvvInput-Checkbox" type="checkbox" />
      <span className="cvvInput-Label-Tooltip">{cvvTooltip}</span>
    </TextInput>
  );
};

CVVInput.propTypes = {
  className: PropTypes.string,
  cvvTooltip: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default CVVInput;
