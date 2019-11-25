import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from './Modal';

describe('Modal', () => {
  const dummyContent = (
    <form>
      <input type="text" name="fname" />
      <input type="submit" value="Submit" />
    </form>
  );

  test('renders children', () => {
    const wrapper = shallow(<Modal>{dummyContent}</Modal>);

    expect(wrapper.exists('form')).toBe(true);
  });

  test('traps the focus', () => {
    const wrapper = shallow(<Modal>{dummyContent}</Modal>);

    expect(wrapper.find('FocusTrap').length).toBe(1);
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

  test('executes callback when opens', () => {
    const onOpen = jest.fn();

    shallow(
      <Modal onOpen={onOpen} isOpen>
        {dummyContent}
      </Modal>
    );

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('does not execute callback if closed', () => {
    const onOpen = jest.fn();

    shallow(
      <Modal onOpen={onOpen} isOpen={false}>
        {dummyContent}
      </Modal>
    );

    expect(onOpen).toHaveBeenCalledTimes(0);
  });

  test('executes callback if closed but opens', () => {
    const onOpen = jest.fn();
    const wrapper = shallow(
      <Modal onOpen={onOpen} isOpen={false}>
        {dummyContent}
      </Modal>
    );

    wrapper.setProps({ isOpen: true });

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('executes callback when closed', () => {
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

    describe('clicking outside the modal', () => {
      test('closes clicking the mouse left button on $browser browsers', () => {
        const wrapper = mount(<Modal>{dummyContent}</Modal>);
        const modal = wrapper.find('.Modal');

        modal.simulate('mouseDown');

        expect(wrapper.state('isOpen')).toBe(false);
      });
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
