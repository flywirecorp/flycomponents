import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Tabs extends Component {
  static propTypes = {
    children: PropTypes.node,
    defaultActiveIndex: PropTypes.number
  };

  static childContextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired
  };

  static defaultProps = {
    children: null,
    defaultActiveIndex: 0
  };

  state = {
    activeIndex: this.props.defaultActiveIndex
  };

  getChildContext() {
    return {
      activeIndex: this.state.activeIndex,
      onSelectTab: this.selectTabIndex
    };
  }

  selectTabIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    return <div className="Tabs">{this.props.children}</div>;
  }
}

export default Tabs;
