import React from 'react';
import PropTypes from 'prop-types';

const TabPanels = ({ children }, { activeIndex }) => (
  <div className="TabPanels">{children[activeIndex]}</div>
);

TabPanels.propTypes = {
  children: PropTypes.node.isRequired
};

TabPanels.contextTypes = {
  activeIndex: PropTypes.number.isRequired
};

export default TabPanels;
