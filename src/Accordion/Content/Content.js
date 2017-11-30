import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children, ...props }) => (
  <div className="Accordion-sectionContentWrapper">
    <div className="Accordion-sectionContent">
      {typeof children === 'function' ? children(props) : children}
    </div>
  </div>
);

Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

export default Content;
