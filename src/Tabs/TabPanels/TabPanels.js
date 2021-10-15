import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Tabs';

const TabPanels = ({ children }) => (
  <Context.Consumer>
    {({ activeIndex, id }) => (
      <div className="TabPanels">
        {Children.map(children, (child, index) =>
          React.cloneElement(child, {
            'aria-labelledby': `${id}-tab-${index}`,
            id: `${id}-panel-${index}`,
            isActive: index === activeIndex
          })
        )}
      </div>
    )}
  </Context.Consumer>
);

TabPanels.displayNane = 'TabPanels';
TabPanels.propTypes = {
  children: PropTypes.node.isRequired
};

export default TabPanels;
