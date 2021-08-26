import React from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Tabs';

export const TabPanel = ({ children }) =>
  typeof children === 'function' ? (
    <Context.Consumer>
      {({ onSelectTab }) => children({ selectTab: onSelectTab })}
    </Context.Consumer>
  ) : (
    children
  );

TabPanel.displayName = 'TabPanel';
TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default TabPanel;
