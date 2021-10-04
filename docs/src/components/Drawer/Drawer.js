import React from 'react';
import Component from '../Component';
import { Drawer, Button } from '../../../../src';
import README from './README.md';

function DrawerExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Component readme={README}>
      <Button
        className="Button Button--primary"
        onClick={() => setIsOpen(true)}
      >
        Open drawer
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeButtonText="Close"
      >
        <h1>Drawer dialog content</h1>
        <form
          onSubmit={evt => {
            evt.preventDefault();
            setIsOpen(false);
          }}
        >
          First name: <input type="text" name="fname" />
          <br />
          Last name: <input type="text" name="lname" />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </Drawer>
    </Component>
  );
}

export default DrawerExample;
