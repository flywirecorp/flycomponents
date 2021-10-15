import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Context = createContext();
export function Tabs({
  id = 'tabs',
  children,
  className,
  defaultActiveIndex = 0,
  onChange = () => {}
}) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const tabClassName = classNames('Tabs', className);

  return (
    <Context.Provider
      value={{
        activeIndex,
        id,
        onChange,
        onSelectTab: setActiveIndex
      }}
    >
      <div className={tabClassName}>{children}</div>
    </Context.Provider>
  );
}

Tabs.displayName = 'Tabs';
Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultActiveIndex: PropTypes.number,
  id: PropTypes.string,
  onChange: PropTypes.func
};

export default Tabs;
