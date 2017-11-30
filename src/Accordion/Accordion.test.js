import React from 'react';
import { shallow } from 'enzyme';
import Accordion from './Accordion';

describe('Accordion', () => {
  const setup = (accordionProps = {}) => {
    const Section = () => <section />;
    const component = shallow(
      <Accordion {...accordionProps}>
        <Section />
        <Section />
      </Accordion>
    );

    const firstSection = component.find(Section).first();
    const secondSection = component.find(Section).last();

    return { component, firstSection, secondSection };
  };

  test('renders its children', () => {
    const { component } = setup();

    expect(component.children()).toHaveLength(2);
  });

  test('sets first child as active', () => {
    const { firstSection } = setup();

    expect(firstSection.prop('isActive')).toBe(true);
  });

  test('sets second child as no active', () => {
    const { secondSection } = setup();

    expect(secondSection.prop('isActive')).toBe(false);
  });

  describe('activeChildIndex', () => {
    test('sets second child as active', () => {
      const props = { activeChildIndex: 1 };
      const { firstSection, secondSection } = setup(props);

      expect(firstSection.prop('isActive')).toBe(false);
      expect(secondSection.prop('isActive')).toBe(true);
    });
  });

  describe('setActive', () => {
    test('sets second child as active', () => {
      const { component, secondSection } = setup();

      expect(component.state().activeChildIndex).toBe(0);
      secondSection.prop('setActive')();
      expect(component.state().activeChildIndex).toBe(1);
    });
  });

  describe('setNextActive', () => {
    test('sets second child as active', () => {
      const { component, secondSection } = setup();

      expect(component.state().activeChildIndex).toBe(0);
      secondSection.prop('setNextActive')();
      expect(component.state().activeChildIndex).toBe(1);
    });

    test('sets second child as active', () => {
      const props = { activeChildIndex: 1 };
      const { component, secondSection } = setup(props);

      expect(component.state().activeChildIndex).toBe(1);
      secondSection.prop('setNextActive')();
      expect(component.state().activeChildIndex).toBe(1);
    });
  });
});
