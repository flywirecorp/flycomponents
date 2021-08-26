import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Tabs';

function TabList({ children }) {
  return (
    <Context.Consumer>
      {({ activeIndex, onSelectTab }) => (
        <nav className="TabList">
          {Children.map(children, (child, index) =>
            React.cloneElement(child, {
              isActive: index === activeIndex,
              onSelect: event => {
                event.preventDefault();
                onSelectTab(index);
              },
            }),
          )}
        </nav>
      )}
    </Context.Consumer>
  );
}

TabList.displayName = 'TabList';
TabList.propTypes = {
  children: PropTypes.node,
};

export default TabList;
