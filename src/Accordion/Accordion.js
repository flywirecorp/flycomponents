import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Accordion extends Component {
  static propTypes = {
    children: PropTypes.node,
    defaultActiveIndex: PropTypes.number
  };

  static childContextTypes = {
    activeIndex: PropTypes.number,
    select: PropTypes.func
  };

  static defaultProps = {
    defaultActiveIndex: 0
  };

  state = {
    activeIndex: this.props.defaultActiveIndex
  };

  getChildContext() {
    return {
      activeIndex: this.state.activeIndex,
      select: this.select
    };
  }

  select(index) {
    this.setState({ activeIndex: index });
  }

  render() {
    const children = React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child, {
        isActive: index === this.state.activeIndex,
        onSelect: () => {
          this.setState({ activeIndex: index });
        }
      })
    );

    return <div className="Accordion">{children}</div>;
  }
}

export default Accordion;
