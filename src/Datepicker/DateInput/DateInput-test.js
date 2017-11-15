import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import DateInput from './DateInput';

describe('DateInput', () => {
  class DateInputComponent {
    constructor(ownProps) {
      const defaultProps = {
        name: 'name',
        onCalendarIconClick: () => {},
        onClick: () => {},
        selectedDate: '',
        setSelectedDate: () => {}
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<DateInput {...props} />);
    }

    input() {
      return this.component.find('input');
    }

    simulateChange(value) {
      this.component.setState({ value });
      this.input().simulate('change');
    }

    state() {
      return this.component.state();
    }

    setState(state) {
      this.component.setState(state);
    }

    pressKey(k) {
      const keys = {
        0: { which: 48 },
        delete: { which: 8 }
      };

      this.input().simulate('keyDown', keys[k]);
    }
  }

  it('sets the state value while writing', () => {
    const setSelectedDate = sinon.spy();
    const component = new DateInputComponent({ setSelectedDate });

    component.pressKey(0);

    expect(setSelectedDate.calledWith('0')).to.be.true;
  });

  it('removes the last character when pressing delete key', () => {
    const setSelectedDate = sinon.spy();
    const selectedDate = '05/12/2016';
    const component = new DateInputComponent({ selectedDate, setSelectedDate });

    component.pressKey('delete');

    expect(setSelectedDate.calledWith('05/12/201')).to.be.true;
  });

  it('does not change input field if readOnly prop is passed in', () => {
    const setSelectedDate = sinon.spy();
    const component = new DateInputComponent({
      setSelectedDate,
      readOnly: true
    });

    component.pressKey(0);

    expect(setSelectedDate.called).to.be.false;
  });
});
