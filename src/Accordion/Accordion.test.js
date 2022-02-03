import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';
import Header from './Header';
import Section from './Section';

describe('Accordion', () => {
  test('renders its children', () => {
    const { getByText } = render(
      <Accordion>
        <Section>{() => <div>Some content</div>}</Section>
      </Accordion>
    );

    expect(getByText(/some content/i)).toBeInTheDocument();
  });

  test('sets first child as active', () => {
    const { container } = render(
      <Accordion>
        <Section />
        <Section />
      </Accordion>
    );
    const firstSection = container.getElementsByTagName('section')[0];

    expect(firstSection.className.includes('is-active')).toBe(true);
  });

  test('sets other children as no active', () => {
    const { container } = render(
      <Accordion>
        <Section />
        <Section />
      </Accordion>
    );
    const secondSection = container.getElementsByTagName('section')[1];

    expect(secondSection.className.includes('is-active')).toBe(false);
  });

  describe('activeChildIndex', () => {
    test('sets selected child as active', () => {
      const props = { activeChildIndex: 1 };

      const { container } = render(
        <Accordion {...props}>
          <Section />
          <Section />
        </Accordion>
      );
      const firstSection = container.getElementsByTagName('section')[0];
      const secondSection = container.getElementsByTagName('section')[1];

      expect(firstSection.className.includes('is-active')).toBe(false);
      expect(secondSection.className.includes('is-active')).toBe(true);
    });
  });

  describe('setActive', () => {
    test('sets child as active', () => {
      const { container, getByText } = render(
        <Accordion>
          <Section />
          <Section>
            <Header>Some header</Header>
          </Section>
        </Accordion>
      );
      const header = getByText(/some header/i);
      fireEvent.click(header);
      const firstSection = container.getElementsByTagName('section')[0];
      const secondSection = container.getElementsByTagName('section')[1];

      expect(firstSection.className.includes('is-active')).toBe(false);
      expect(secondSection.className.includes('is-active')).toBe(true);
    });
  });

  describe('setNextActive', () => {
    test('sets second child as active', () => {
      const { container, getByText } = render(
        <Accordion>
          <Section>
            {({ setNextActive }) => (
              <div>
                <button onClick={setNextActive}>Next</button>
              </div>
            )}
          </Section>
          <Section />
        </Accordion>
      );
      const nextButton = getByText(/next/i);
      fireEvent.click(nextButton);
      const firstSection = container.getElementsByTagName('section')[0];
      const secondSection = container.getElementsByTagName('section')[1];

      expect(firstSection.className.includes('is-active')).toBe(false);
      expect(secondSection.className.includes('is-active')).toBe(true);
    });
  });
});
