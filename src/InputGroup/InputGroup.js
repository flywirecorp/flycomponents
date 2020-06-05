import PropTypes from 'prop-types';
import React from 'react';
import Input from '../Input';

const InputGroup = ({ prefix, suffix, ...other }) => (
  <div className="InputGroup">
    {prefix ? (
      <span className="InputGroup-context" aria-hidden>
        {prefix}
      </span>
    ) : null}
    <Input autoComplete="off" className="Input InputGroup-input" {...other} />
    {suffix ? (
      <span className="InputGroup-context" aria-hidden>
        {suffix}
      </span>
    ) : null}
  </div>
);

InputGroup.displayName = 'InputGroup';
InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default InputGroup;
