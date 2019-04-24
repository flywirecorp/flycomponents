import PropTypes from 'prop-types';
import React from 'react';
import TextInput from '../TextInput';

const CVVInput = ({ cvvTooltip, ...props }) => {
  return (
    <TextInput {...props}>
      <input className="cvvInput-Checkbox" type="checkbox" />
      <span className="cvvInput-Label-Tooltip">{cvvTooltip}</span>
    </TextInput>
  );
};

CVVInput.propTypes = {
  cvvTooltip: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default CVVInput;
