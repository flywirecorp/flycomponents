import React from 'react';
import { shallow } from 'enzyme';
import { FileInput } from './FileInput';

describe('FileInput', () => {
  describe('renders elements texts', () => {
    test('renders submit button text', () => {
      const buttonText = 'a_text';
      const wrapper = shallow(<FileInput buttonText={buttonText} />);

      const button = wrapper.find('[data-qa="submitButton"]');

      expect(button.text()).toContain(buttonText);
    });

    test('renders a hint', () => {
      const hint = 'a_hint';
      const wrapper = shallow(<FileInput hint={hint} />);

      const hintParagraf = wrapper.find('[data-qa="hint"]');

      expect(hintParagraf.props().dangerouslySetInnerHTML.__html).toContain(
        hint
      );
    });
  });

  test('handles on change events', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<FileInput onChange={onChange} />);
    const input = wrapper.find('[data-qa="fileInput"]');

    input.simulate('change');

    expect(onChange).toBeCalled();
  });

  test('accepts accepted extensions', () => {
    const expectedExtension = '.jpg';
    const wrapper = shallow(<FileInput accepts={expectedExtension} />);

    const inputFile = wrapper.find('[data-qa="fileInput"]');

    expect(inputFile.prop('accept')).toEqual(expectedExtension);
  });

  test('accepts multiple files', () => {
    const wrapper = shallow(<FileInput multiple />);

    const inputFile = wrapper.find('[data-qa="fileInput"]');

    expect(inputFile.prop('multiple')).toBe(true);
  });

  test('renders a spinner animation while uploading', () => {
    const animationClass = 'FileInput--uploading';
    const wrapper = shallow(<FileInput uploading />);

    const button = wrapper.find('[data-qa="submitButton"]');

    expect(button.hasClass(animationClass)).toBe(true);
  });

  test('renders disabled while uploading', () => {
    const wrapper = shallow(<FileInput uploading />);

    const button = wrapper.find('[data-qa="submitButton"]');

    expect(button.prop('disabled')).toBe(true);
  });
});
