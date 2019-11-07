import PropTypes from 'prop-types';
import React from 'react';

const Label = ({ htmlFor, required, value, id, ...other }) => (
  <label className="Label" {...other} htmlFor={htmlFor} id={id}>
    {value}
    {required ? <span aria-hidden="true"> *</span> : null}
  </label>
);

const { bool, string } = PropTypes;

Label.propTypes = {
  htmlFor: string.isRequired,
  id: string.isRequired,
  required: bool,
  value: string.isRequired
};

export default Label;
