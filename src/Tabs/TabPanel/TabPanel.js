import React from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Tabs';

export const TabPanel = ({ children, ...rest }) =>
  typeof children === 'function' ? (
    <Context.Consumer>
      {({ onSelectTab }) => children({ selectTab: onSelectTab, ...rest })}
    </Context.Consumer>
  ) : (
    <div {...rest}>{children}</div>
  );

TabPanel.displayName = 'TabPanel';
TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
};

export default TabPanel;
