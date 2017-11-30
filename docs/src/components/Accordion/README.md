# Accordion

## Example
```
<Accordion>
  <Section success>
    <Header>1. This is the first step</Header>
    <Content>This is content</Content>
  </Section>
  <Section>
    <Header>2. This is the second step</Header>
    <Content>This is content.</Content>
  </Section>
  <Section>
    <Header>3. This is the third step</Header>
    <Content>This is content.</Content>
  </Section>
</Accordion>
```

## Properties

### Accordion

| Property         | Req   | Type                  | Description                                               | Default   |
| ---------------- | ----- | --------------------- | --------------------------------------------------------- | --------- |
| activeChildIndex | no    | boolean               | Sets the default section visible                          | 0         |
| children         | no    | node                  | Children node                                             | []        |

### Section

| Property         | Req   | Type                  | Description                                               | Default   |
| ---------------- | ----- | --------------------- | --------------------------------------------------------- | --------- |
| children         | no    | node, func            | Children node                                             | null      |
| success          | no    | boolean               | Adds the class `has-success`                              | false     |

### Header

| Property         | Req   | Type                  | Description                                               | Default   |
| ---------------- | ----- | --------------------- | --------------------------------------------------------- | --------- |
| children         | no    | node                  | Children node                                             | null      |

### Content

| Property         | Req   | Type                  | Description                                               | Default   |
| ---------------- | ----- | --------------------- | --------------------------------------------------------- | --------- |
| children         | no    | node, func            | Children node                                             | null      |

