import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Highlighter from '../Highlighter';
import Option from './Option';

describe('Option', () => {
  class OptionComponent {
    constructor(ownProps) {
      const defaultProps = {
        hasFocus: false,
        highlighText: true,
        onClick: () => {},
        onMouseEnter: () => {},
        option: { label: 'Option', value: 'opt' },
        searchQuery: null
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Option {...props} />);
    }

    option() {
      return this.component.find('li');
    }

    simulateClick() {
      this.component.simulate('click');
    }

    doMouseEnter() {
      this.option().simulate('mouseEnter');
    }

    highlighText() {
      return this.option().find(Highlighter);
    }
  }

  it('renders an option', () => {
    const component = new OptionComponent();

    expect(component.option()).to.have.length(1);
  });

  it('has an active status when focus', () => {
    const hasFocus = true;
    const component = new OptionComponent({ hasFocus });

    expect(component.option().prop('className')).to.include('is-active');
  });

  it('simulates click events', () => {
    const onClick = sinon.spy();
    const option = { label: 'Option', value: 'opt' };
    const component = new OptionComponent({ onClick, option });

    component.simulateClick();

    expect(onClick.calledWith('opt')).to.be.true;
  });

  it('simulates mouse enter events', () => {
    const onMouseEnter = sinon.spy();
    const option = { label: 'Option', value: 'opt' };
    const component = new OptionComponent({ onMouseEnter, option });

    component.doMouseEnter();

    expect(onMouseEnter.calledWith('opt')).to.be.true;
  });

  it('highlighs texts', () => {
    const option = { label: 'Hello World!', value: 'hw' };
    const searchQuery = 'World';
    const component = new OptionComponent({ option, searchQuery });
    const highlighText = component.highlighText();

    expect(highlighText).to.have.length(1);
    expect(highlighText.prop('text')).to.equal(option.label);
    expect(highlighText.prop('subString')).to.equal(searchQuery);
  });

  it('disables highligh text', () => {
    const highlighText = false;
    const component = new OptionComponent({ highlighText });

    expect(component.highlighText()).to.have.length(0);
  });

  it('renders custom templates', () => {
    const customTemplate = sinon.spy();
    // eslint-disable-next-line
    new OptionComponent({
      template: customTemplate
    });

    expect(customTemplate.called).to.be.true;
  });
});
