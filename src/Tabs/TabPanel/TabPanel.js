import PropTypes from 'prop-types';

export const TabPanel = ({ children }, { onSelectTab }) =>
  typeof children === 'function'
    ? children({ selectTab: onSelectTab })
    : children;

TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
};

TabPanel.contextTypes = {
  onSelectTab: PropTypes.func.isRequired
};

export default TabPanel;
