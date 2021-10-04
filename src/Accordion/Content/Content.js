import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children, isActive, ...props }) => (
  <div className="Accordion-sectionContentWrapper" hidden={!isActive}>
    <div className="Accordion-sectionContent">
      {typeof children === 'function' ? children(props) : children}
    </div>
  </div>
);

Content.displayName = 'Content';
Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isActive: PropTypes.bool
};

export default Content;
