import PropTypes from 'prop-types';
import React from 'react';

const Label = ({ htmlFor, required, value, id, ...other }) => (
  <label className="Label" {...other} htmlFor={htmlFor} id={id}>
    {value}
    {required ? <span aria-hidden="true"> *</span> : null}
  </label>
);

Label.displayName = 'Label';
Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired
};

export default Label;
