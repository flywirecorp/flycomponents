import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Tabs';

function TabList({ children }) {
  return (
    <Context.Consumer>
      {({ activeIndex, id, onSelectTab, onChange }) => (
        <div className="TabList" role="tablist">
          {Children.map(children, (child, index) =>
            React.cloneElement(child, {
              id: `${id}-tab-${index}`,
              'aria-controls': `${id}-panel-${index}`,
              isActive: index === activeIndex,
              onSelect: event => {
                event.preventDefault();
                onSelectTab(index);
                onChange({ index });
              }
            })
          )}
        </div>
      )}
    </Context.Consumer>
  );
}

TabList.displayName = 'TabList';
TabList.propTypes = {
  children: PropTypes.node
};

export default TabList;
