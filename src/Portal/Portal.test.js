import React from 'react';
import ReactDOM from 'react-dom';

import Portal from './Portal';

describe('<Portal />', () => {
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    document.body.innerHTML = '';
  });

  it('should append portal to the document.body', () => {
    document.body.innerHTML = '<div id="root"></div>';
    ReactDOM.render(<Portal>Foo</Portal>, document.getElementById('root'));

    expect(document.body.firstChild.outerHTML).toBe('<div id="root"></div>');
    expect(document.body.lastChild.outerHTML).toBe(
      '<div class="Modal-container">Foo</div>'
    );
  });

  it('should position fixed to the document.body', () => {
    document.body.innerHTML = '<div id="root"></div>';
    ReactDOM.render(<Portal>Foo</Portal>, document.getElementById('root'));

    expect(document.body.style.position).toBe('fixed');
  });

  it('should append portal to a custom node', () => {
    document.body.innerHTML = '<div id="root"></div><div id="custom"></div>';
    ReactDOM.render(
      <Portal node={document.getElementById('custom')}>Foo</Portal>,
      document.getElementById('root')
    );

    expect(document.body.firstChild.outerHTML).toBe('<div id="root"></div>');
    expect(document.getElementById('custom').outerHTML).toBe(
      '<div id="custom">Foo</div>'
    );
  });
});
