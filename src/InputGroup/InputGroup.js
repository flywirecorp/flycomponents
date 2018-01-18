import PropTypes from 'prop-types';
import React from 'react';
import Input from '../Input';

const InputGroup = ({ prefix, suffix, ...other }) => (
  <div className="InputGroup">
    {prefix ? <span className="InputGroup-context">{prefix}</span> : null}
    <Input autoComplete="off" className="Input InputGroup-input" {...other} />
    {suffix ? <span className="InputGroup-context">{suffix}</span> : null}
  </div>
);

const { oneOfType, node, string } = PropTypes;

InputGroup.propTypes = {
  name: string.isRequired,
  prefix: oneOfType([string, node]),
  suffix: oneOfType([string, node])
};

export default InputGroup;
