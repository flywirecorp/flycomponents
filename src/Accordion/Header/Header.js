import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../../Heading';

const Header = ({ children, setActive }) => (
  <header className="Accordion-sectionHeader" onClick={setActive}>
    <Heading as="h2" size="large" className="margin-0" text={children} />
  </header>
);

Header.propTypes = {
  children: PropTypes.node,
  setActive: PropTypes.func
};

export default Header;
