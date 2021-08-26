import React from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Tabs';

const TabPanels = ({ children }) => (
  <Context.Consumer>
    {({ activeIndex }) => (
      <div className="TabPanels">{children[activeIndex]}</div>
    )}
  </Context.Consumer>
);

TabPanels.displayNane = 'TabPanels';
TabPanels.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabPanels;
