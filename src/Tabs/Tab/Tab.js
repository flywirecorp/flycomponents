import React from 'react';
import PropTypes from 'prop-types';
import { ENTER, SPACE } from '../../utils/keycodes';

const NOOP = () => {};
const Tab = ({
  children,
  isActive = false,
  isDisabled = false,
  onClick = NOOP,
  onSelect = NOOP,
  ...rest
}) => {
  const handleClick = e => {
    if (isDisabled) e.preventDefault();

    onSelect(e);
    onClick(e);
  };

  return (
    <div
      className={
        isDisabled
          ? 'Tab-link is-disabled'
          : isActive
          ? 'Tab-link is-active'
          : 'Tab-link'
      }
      aria-disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={evt =>
        [ENTER, SPACE].includes(evt.keyCode) && handleClick(evt)
      }
      role="tab"
      tabIndex={0}
      {...rest}
    >
      {children}
    </div>
  );
};

Tab.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onSelect: PropTypes.func
};

export default Tab;
