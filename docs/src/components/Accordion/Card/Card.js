import React from 'react';
import PropTypes from 'prop-types';

const Card = props => {
  const children = React.Children.map(props.children, child =>
    React.cloneElement(child, {
      isActive: props.isActive,
      onSelect: props.onSelect
    })
  );

  return <section style={{ border: '1px solid black' }}>{children}</section>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func
};

Card.defaultProps = {
  isActive: false,
  onSelect: () => {}
};

export default Card;
