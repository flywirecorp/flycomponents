import React from 'react';
import Accordion from '../../../../src/Accordion';
import { Button } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  const { Section, Header, Content } = Accordion;

  return (
    <Component readme={README}>
      <Accordion>
        <Section success>
          <Header>1. This is the first step</Header>
          <Content>This is content</Content>
        </Section>
        <Section>
          <Header>2. This is the second step</Header>
          <Content>
            {({ setNextActive }) => (
              <div>
                <p>This is content.</p>
                <Button
                  className="Button Button--primary"
                  onClick={setNextActive}
                >
                  Next
                </Button>
              </div>
            )}
          </Content>
        </Section>
        <Section>
          <Header>3. This is the third step</Header>
          <Content>This is content.</Content>
        </Section>
      </Accordion>
    </Component>
  );
};
