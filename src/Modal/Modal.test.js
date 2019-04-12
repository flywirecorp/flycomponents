import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from './Modal';

describe('Modal', () => {
  const dummyContent = 'This is the content';

  test('renders children', () => {
    const wrapper = shallow(<Modal>{dummyContent}</Modal>);

    expect(wrapper.find('.Modal-content').text()).toEqual(dummyContent);
  });

  test('starts open', () => {
    const wrapper = shallow(<Modal>{dummyContent}</Modal>);

    expect(wrapper.state('isOpen')).toBe(true);
  });

  test('renders with specified size', () => {
    const size = 'medium';
    const wrapper = shallow(<Modal size={size}>{dummyContent}</Modal>);
    const modal = wrapper.find('[data-qa="Modal"]');

    expect(modal.hasClass('Modal--medium')).toBe(true);
  });

  test('starts closed', () => {
    const wrapper = shallow(
      <Modal defaultIsOpen={false}>{dummyContent}</Modal>
    );

    expect(wrapper.state('isOpen')).toBe(false);
  });

  test('executes callback when it opens', () => {
    const onOpen = jest.fn();
    const wrapper = shallow(<Modal onOpen={onOpen}>{dummyContent}</Modal>);

    wrapper.find('.Modal-closeButton').simulate('click');

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('executes callback when it closes', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<Modal onClose={onClose}>{dummyContent}</Modal>);

    wrapper.find('.Modal-closeButton').simulate('click');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('merges content class sent with its default class', () => {
    const wrapper = shallow(
      <Modal className="customClass">{dummyContent}</Modal>
    );

    expect(wrapper.find('.customClass').length).toEqual(1);
  });

  describe('when closing is allowed', () => {
    test('closes clicking the close button', () => {
      const wrapper = shallow(<Modal>{dummyContent}</Modal>);

      wrapper.find('.Modal-closeButton').simulate('click');

      expect(wrapper.state('isOpen')).toBe(false);
    });

    test('closes clicking the ESC key', () => {
      const wrapper = shallow(<Modal>{dummyContent}</Modal>);
      const keyboardEvent = new KeyboardEvent('keydown', { keyCode: 27 });

      document.dispatchEvent(keyboardEvent);

      expect(wrapper.state('isOpen')).toBe(false);
    });

    test('closes clicking outside the modal', () => {
      const wrapper = mount(<Modal>{dummyContent}</Modal>);
      const modal = wrapper.find('.Modal');

      modal.simulate('mouseDown');

      expect(wrapper.state('isOpen')).toBe(false);
    });
  });

  describe('when closing is not allowed', () => {
    test('does not show a close button', () => {
      const wrapper = shallow(
        <Modal allowClosing={false}>{dummyContent}</Modal>
      );

      expect(wrapper.find('.Modal-closeButton').length).toBe(0);
    });

    test('does not close clicking the ESC key', () => {
      const wrapper = shallow(
        <Modal allowClosing={false}>{dummyContent}</Modal>
      );
      const keyboardEvent = new KeyboardEvent('keydown', { keyCode: 27 });

      document.dispatchEvent(keyboardEvent);

      expect(wrapper.state('isOpen')).toBe(true);
    });

    test('does not close clicking outside the modal', () => {
      const wrapper = mount(<Modal allowClosing={false}>{dummyContent}</Modal>);
      const modal = wrapper.find('.Modal');

      modal.simulate('click');

      expect(wrapper.state('isOpen')).toBe(true);
    });
  });

  describe('as controlled component', () => {
    test('handles status outside the component', () => {
      let isOpen = true;
      const wrapper = shallow(
        <Modal isOpen={isOpen} onClose={() => (isOpen = false)}>
          {dummyContent}
        </Modal>
      );

      wrapper.find('.Modal-closeButton').simulate('click');

      expect(isOpen).toBe(false);
    });
  });
});
