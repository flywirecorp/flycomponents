# Accordion

## Example

```
import Accordion from 'flycomponents';
const { Section, Header, Content } = Accordion;

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
```

## Properties

### Accordion

| Property         | Req | Type    | Description                      | Default |
| ---------------- | --- | ------- | -------------------------------- | ------- |
| activeChildIndex | no  | boolean | Sets the default section visible | 0       |
| children         | no  | node    | Children node                    | []      |

### Section

| Property | Req | Type       | Description                  | Default |
| -------- | --- | ---------- | ---------------------------- | ------- |
| children | no  | node, func | Children node                | null    |
| success  | no  | boolean    | Adds the class `has-success` | false   |

### Header

| Property | Req | Type | Description   | Default |
| -------- | --- | ---- | ------------- | ------- |
| children | no  | node | Children node | null    |

### Content

| Property | Req | Type       | Description   | Default |
| -------- | --- | ---------- | ------------- | ------- |
| children | no  | node, func | Children node | null    |
