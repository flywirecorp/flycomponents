import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Tabs';

const TabPanels = ({ children }) => (
  <Context.Consumer>
    {({ activeIndex, id }) => (
      <div className="TabPanels">
        {Children.map(children, (child, index) =>
          React.cloneElement(child, {
            id: `${id}-panel-${index}`,
            role: 'tabpanel',
            'aria-labelledby': `${id}-tab-${index}`,
            style: {
              ...(index !== activeIndex && {
                display: 'none'
              })
            },
            'aria-hidden': index !== activeIndex
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
