import React from 'react';
import { shallow } from 'enzyme';
import Drawer from './Drawer';

describe('Drawer', () => {
  const dummyContent = (
    <form>
      <input type="text" name="fname" />
      <input type="submit" value="Submit" />
    </form>
  );

  test('render drawer children', () => {
    const wrapper = shallow(<Drawer isOpen>{dummyContent}</Drawer>);

    expect(wrapper.exists('form')).toBe(true);
  });

  test('trap the focus when open', () => {
    const wrapper = shallow(<Drawer isOpen>{dummyContent}</Drawer>);

    expect(wrapper.find('FocusTrap').length).toBe(1);
  });

  test('close drawer using the X button', () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(
      <Drawer onClose={onCloseMock} isOpen>
        {dummyContent}
      </Drawer>
    );

    wrapper.find('.Drawer-close').simulate('click');

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('close drawer using ESC key', () => {
    const onCloseMock = jest.fn();
    const keyboardEvent = new KeyboardEvent('keydown', { keyCode: 27 });

    shallow(
      <Drawer onClose={onCloseMock} isOpen>
        {dummyContent}
      </Drawer>
    );

    document.dispatchEvent(keyboardEvent);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
