/* eslint-disable */
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
          <Header><span className="paddingRight-xs">1.</span>This is the first step</Header>
          <Content>This is content</Content>
        </Section>
        <Section>
          <Header><span className="paddingRight-xs">2.</span>This is the second step</Header>
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
          <Header><span className="paddingRight-xs">3.</span>This is the third step</Header>
          <Content>This is content.</Content>
        </Section>
      </Accordion>
    </Component>
  );
};
