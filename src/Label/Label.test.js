import React from 'react';
import { shallow } from 'enzyme';
import Label from './Label';

describe('Label', () => {
  class LabelComponent {
    constructor(props) {
      this.component = shallow(<Label {...props} />);
    }

    label(name) {
      return this.component.find(`label[htmlFor="${name}"]`).text();
    }
  }

  test('renders a label', () => {
    const props = { htmlFor: 'amount', value: 'Amount', id: 'amount' };
    const component = new LabelComponent(props);

    expect(component.label('amount')).toBe('Amount');
  });

  test('renders a required label', () => {
    const props = {
      htmlFor: 'amount',
      required: true,
      value: 'Amount',
      id: 'amount'
    };
    const component = new LabelComponent(props);

    expect(component.label('amount')).toBe('Amount *');
  });
});
