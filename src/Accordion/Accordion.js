import React, { Children, Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Accordion extends Component {
  static propTypes = {
    activeChildIndex: PropTypes.number,
    children: PropTypes.node
  };

  static defaultProps = {
    activeChildIndex: 0,
    children: []
  };

  constructor(props) {
    super(props);

    const { activeChildIndex } = this.props;
    this.state = {
      activeChildIndex
    };
  }

  render() {
    const { children } = this.props;
    const { activeChildIndex } = this.state;
    const numberOfChildren = Children.count(children);
    const elements = Children.map(children, (child, index) => {
      return (
        child &&
        cloneElement(child, {
          isActive: index === activeChildIndex,
          setActive: () => this.setState({ activeChildIndex: index }),
          setNextActive: () => {
            const nextIndex = activeChildIndex + 1;
            const isLastChild = index === numberOfChildren - 1;
            this.setState({
              activeChildIndex: isLastChild ? index : nextIndex
            });
          }
        })
      );
    });

    return <div className="Accordion">{elements}</div>;
  }
}

export default Accordion;
