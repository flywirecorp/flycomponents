import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';

class Ratings extends Component {
  static propTypes = {
    children: PropTypes.node,
    defaultSelectedIndex: PropTypes.number,
    error: PropTypes.string,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    children: null,
    defaultSelectedIndex: null,
    onSelect: () => {}
  };

  state = {
    selectedIndex: this.props.defaultSelectedIndex
  };

  selectIndex = index => {
    this.setState(() => {
      return { selectedIndex: index };
    }, this.props.onSelect(index));
  };

  getStateAndHelpers(index) {
    const { selectedIndex } = this.state;

    return {
      index,
      onSelect: () => this.selectIndex(index),
      selectedIndex
    };
  }

  render() {
    const { error, children } = this.props;
    const childrenWithStateAndHelpers = Children.map(children, (child, index) =>
      React.cloneElement(child, this.getStateAndHelpers(index))
    );

    return (
      <FormGroup
        name="ratings"
        error={error}
        style={{ border: '1px solid red;' }}
      >
        {childrenWithStateAndHelpers}
      </FormGroup>
    );
  }
}

const Rating = ({
  children,
  index,
  onClick = () => {},
  onSelect,
  render,
  selectedIndex
}) =>
  typeof render === 'function'
    ? render({
        index,
        select: onSelect,
        selectedIndex
      })
    : children;

export default {
  Ratings,
  Rating
};
