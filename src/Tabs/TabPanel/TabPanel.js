import React from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Tabs';

export const TabPanel = ({ isActive = false, children, ...rest }) => {
  const panelProps = {
    role: 'tabpanel',
    style: {
      ...(!isActive && { display: 'none' })
    },
    'aria-hidden': !isActive,
    ...rest
  };

  return (
    <Context.Consumer>
      {({ onSelectTab }) => (
        <div {...panelProps}>
          {typeof children === 'function'
            ? children({ selectTab: onSelectTab, isActive })
            : children}
        </div>
      )}
    </Context.Consumer>
  );
};

TabPanel.displayName = 'TabPanel';
TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  isActive: PropTypes.bool
};

export default TabPanel;
