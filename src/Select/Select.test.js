import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

describe('Select', () => {
  const values = [
    { label: 'first', value: 'first_value' },
    { label: 'second', value: 'second_value' }
  ];

  test('renders a select node', () => {
    const wrapper = shallow(<Select values={values} />);
    const select = wrapper.find('select');

    expect(select.length).toEqual(1);
  });

  test('adds a name to the select node', () => {
    const name = 'a_name';
    const wrapper = shallow(<Select values={values} name={name} />);

    const select = wrapper.find('select');

    expect(select.props().name).toContain(name);
  });

  test('adds a class to the select node', () => {
    const aClass = 'a_class';
    const wrapper = shallow(<Select values={values} className={aClass} />);

    const select = wrapper.find('select');

    expect(select.props().className).toContain(aClass);
  });

  test('selects a default value', () => {
    const selectedValue = 'second_value';
    const wrapper = shallow(
      <Select values={values} selectedValue={selectedValue} />
    );

    const select = wrapper.find('select');

    expect(select.props().value).toBe(selectedValue);
  });

  test('can be disabled', () => {
    const wrapper = shallow(<Select values={values} disabled />);

    const select = wrapper.find('select');

    expect(select.props().disabled).toBe(true);
  });

  test('calls function on change', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Select values={values} onChange={onChange} />);
    const select = wrapper.find('select');

    select.simulate('change');

    expect(onChange).toHaveBeenCalled();
  });

  test('calls function on click', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Select values={values} onClick={onClick} />);
    const select = wrapper.find('select');

    select.simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  describe('other properties', () => {
    test('can be passed', () => {
      const wrapper = shallow(<Select values={values} aria-required />);

      const select = wrapper.find('select');

      expect(select.prop('aria-required')).toBe(true);
    });

    test('can override previous ones', () => {
      const wrapper = shallow(
        <Select values={values} required={false} aria-required />
      );

      const select = wrapper.find('select');

      expect(select.prop('aria-required')).toBe(true);
    });
  });
});
