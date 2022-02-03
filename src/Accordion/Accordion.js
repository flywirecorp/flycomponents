import React, { Children, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';

function Accordion({ activeChildIndex = 0, children = [] }) {
  const [activeChild, setActiveChild] = useState(activeChildIndex);

  const amountOfChildren = Children.count(children);
  const elements = Children.map(
    children,
    (child, index) =>
      child &&
      cloneElement(child, {
        isActive: index === activeChild,
        setActive: () => setActiveChild(index),
        setNextActive: () => {
          const nextIndex = activeChild + 1;
          const isLastChild = index === amountOfChildren - 1;
          setActiveChild(isLastChild ? index : nextIndex);
        }
      })
  );

  return <div className="Accordion">{elements}</div>;
}

Accordion.propTypes = {
  activeChildIndex: PropTypes.number,
  children: PropTypes.node
};

export default Accordion;
