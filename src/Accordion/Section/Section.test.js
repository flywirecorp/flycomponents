import React from 'react';
import { render } from '@testing-library/react';
import Section from './Section';

describe('Section', () => {
  test('renders its children', () => {
    const { getByText } = render(
      <Section>{() => <div>Some content</div>}</Section>
    );

    expect(getByText(/some content/i)).toBeInTheDocument();
  });

  test('drills props to children', () => {
    const { getByText } = render(
      <Section showComponent>
        {({ showComponent }) =>
          showComponent ? <div>Some content</div> : null
        }
      </Section>
    );
    const content = getByText(/some content/i);

    expect(content).toBeInTheDocument();
  });

  test('has is-active class', () => {
    const { container } = render(<Section isActive />);

    expect(container.firstChild).toHaveClass('is-active');
  });

  test('has has-success class', () => {
    const { container } = render(<Section success />);

    expect(container.firstChild).toHaveClass('has-success');
  });
});
