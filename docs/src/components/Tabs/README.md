# Tabs

Tabs element

## Example of Tabs

```javascript
import { Tabs } from 'flycomponents';
const { Tab, TabList, TabPanel, TabPanels } = Tabs;

return (
  <Component readme={README}>
    <Tabs className="customTabs" defaultActiveIndex={1}>
      <TabList>
        <Tab>First</Tab>
        <Tab onClick={() => alert('clicked')}>Second</Tab>
        <Tab>Third</Tab>
        <Tab isDisabled>Disabled</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>First option content</TabPanel>
        <TabPanel>Second option content</TabPanel>
        <TabPanel>
          {({ selectTab }) => (
            <Button
              className="Button Button--primary"
              onClick={() => {
                selectTab(0);
              }}
            >
              Go to first
            </Button>
          )}
        </TabPanel>
        <TabPanel>Third option content</TabPanel>
      </TabPanels>
    </Tabs>
  </Component>
);
```

## Properties

| Property           | Req | Type    | Description                                | Default |
| ------------------ | --- | ------- | ------------------------------------------ | ------- |
| defaultActiveIndex | no  | number  | Default visible tab index (zero based)     | 0       |
| isDisabled         | no  | boolean | Used in the `<Tab>` tag to disable the Tab | `false` |
| className          | no  | string  | Classes to add to the component            |         |
