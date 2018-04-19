import React from 'react';
import { shallow } from 'enzyme';
import { FileInput } from './FileInput';

describe('FileInput', () => {
  describe('renders elements texts', () => {
    test('renders browse button text', () => {
      const browse = 'a_text';
      const wrapper = shallow(<FileInput browse={browse} />);

      const button = wrapper.find('[data-qa="browseButton"]');

      expect(button.text()).toContain(browse);
    });

    test('renders placeholder text', () => {
      const placeholder = 'a_text';
      const wrapper = shallow(<FileInput placeholder={placeholder} />);

      const box = wrapper.find('[data-qa="fileName"]');

      expect(box.text()).toContain(placeholder);
    });

    test('renders submit button text', () => {
      const submit = 'a_text';
      const wrapper = shallow(<FileInput submit={submit} />);

      const button = wrapper.find('[data-qa="submitButton"]');

      expect(button.text()).toContain(submit);
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

  test('handles on click events', () => {
    const spy = jest
      .spyOn(FileInput.prototype, 'handleClick')
      .mockImplementation(() => {});
    const wrapper = shallow(<FileInput />);
    const input = wrapper.find('.FileInput-input');

    input.simulate('click');

    expect(spy).toBeCalled();
  });

  test('handles on change events', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<FileInput onChange={onChange} />);
    const input = wrapper.find('[data-qa="fileInput"]');

    input.simulate('change');

    expect(onChange).toBeCalled();
  });

  test('handles on submit events', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<FileInput onSubmit={onSubmit} />);
    const submit = wrapper.find('[data-qa="submitButton"]');

    submit.simulate('click');

    expect(onSubmit).toBeCalled();
  });

  test('admits accepted extensions', () => {
    const expectedExtension = '.jpg';
    const wrapper = shallow(<FileInput accepts={expectedExtension} />);

    const inputFile = wrapper.find('[data-qa="fileInput"]');

    expect(inputFile.prop('accept')).toEqual(expectedExtension);
  });

  test('renders a spinner animation while uploading', () => {
    const animationClass = 'FileInput--uploading';
    const wrapper = shallow(<FileInput uploading />);

    const button = wrapper.find('[data-qa="submitButton"]');

    expect(button.hasClass(animationClass)).toBe(true);
  });
});
