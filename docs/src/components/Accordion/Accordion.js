import React from 'react';
import { Accordion } from '../../../../src';
import { Card, Content, Title } from './Card';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Accordion>
      <Card>
        <Title>First</Title>
        <Content>
          Minions ipsum underweaaar tatata bala tu jiji gelatooo para tú wiiiii
          para tú me want bananaaa! Tatata bala tu.
        </Content>
      </Card>
      <Card>
        <Title>Second</Title>
        <Content>
          {({ onSelect }) => {
            return (
              <p>
                Belloo! pepete para tú jiji underweaaar tatata bala tu me want
                bananaaa!
                <button onClick={onSelect}>Select next</button>
              </p>
            );
          }}
        </Content>
      </Card>
    </Accordion>
  </Component>
);
