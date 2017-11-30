import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Section = ({ children, ...props }) => (
  <section
    className={classNames('Accordion-section', {
      'is-active': props.isActive,
      'has-success': props.success
    })}
  >
    {typeof children === 'function'
      ? children(props)
      : Children.map(children, child => cloneElement(child, props))}
  </section>
);

Section.defaultProps = {
  success: false
};

Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isActive: PropTypes.bool,
  success: PropTypes.bool
};

export default Section;
