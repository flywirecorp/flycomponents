import React from 'react';
import { mount } from 'enzyme';
import { Ratings, Rating } from './Rating';

const Plus = props => (
  <Rating
    {...props}
    render={({ index, select, selectedIndex }) => (
      <span onClick={select}>+</span>
    )}
  />
);

describe('Ratings', () => {
  const initialIndex = 2;
  const lastIndex = 3;
  const mockOnSelect = jest.fn();
  const wrapper = mount(
    <Ratings defaultSelectedIndex={initialIndex} onSelect={mockOnSelect}>
      <Plus />
      <Plus />
      <Plus />
      <Plus />
    </Ratings>
  );
  const lastChild = wrapper.find(Plus).last();

  test('renders children', () => {
    const chilren = wrapper.find(Plus);

    expect(chilren.length).toBe(4);
  });

  test('gives an index to each child', () => {
    const index = lastChild.prop('index');

    expect(index).toBe(lastIndex);
  });

  test('children know the selected index', () => {
    const index = lastChild.prop('selectedIndex');

    expect(index).toBe(initialIndex);
  });

  test('starts with selected a rating index', () => {
    const selected = wrapper.state().selectedIndex;

    expect(selected).toBe(initialIndex);
  });

  test('calls onSelect callback function when selecting a rating', () => {
    lastChild.simulate('click');

    expect(mockOnSelect).toBeCalled();
  });

  test('changes the selected rating index when clicking a rating', () => {
    lastChild.simulate('click');
    const selected = wrapper.state().selectedIndex;

    expect(selected).toBe(lastIndex);
  });
});
