import React from 'react';
import PropTypes from 'prop-types';
import { ENTER, SPACE } from '../../utils/keycodes';

const Header = ({ children, setActive, isActive }) => (
  <div
    className="Accordion-sectionHeader"
    onClick={setActive}
    onKeyDown={evt => [ENTER, SPACE].includes(evt.keyCode) && setActive()}
    role="button"
    aria-expanded={isActive}
    tabIndex={0}
  >
    {children}
  </div>
);

Header.displayName = 'Header';
Header.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  setActive: PropTypes.func
};

export default Header;
