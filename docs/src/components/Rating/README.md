# Rating

Generic rating component

## Example rating

```javascript
class Emoji extends React.Component {
  state = {
    isMouseOver: false
  };

  render() {
    const { isMouseOver } = this.state;

    return (
      <Rating
        {...this.props}
        render={({ index, select, selectedIndex }) => (
          <span
            onClick={select}
            style={{ fontSize: '60px', margin: '0 2px' }}
            onMouseEnter={() => this.setState({ isMouseOver: true })}
            onMouseLeave={() => this.setState({ isMouseOver: false })}
          >
            {isMouseOver ? '😛' : index === selectedIndex ? '😃' : '😐'}
          </span>
        )}
      />
    );
  }
}

class RatingExample extends React.Component {
  render() {
    return (
      <Component readme={README}>
        <Ratings
          defaultSelectedIndex={3}
          onSelect={index => console.log('selected', index)}
        >
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
        </Ratings>
      </Component>
    );
  }
}
```

## Properties
### Ratings

| Property         | Req | Type     | Description                                          | Default           |
| ---------------- | --- | ---------| ---------------------------------------------------- | ----------------- |
| defaultSelectedIndex   | no  | number   | Selected rating | null              |
| onSelect          | no  | function | Function to execute when selecting a rating             |                   |

### Rating

| Property         | Req | Type     | Description                                          | Default           |
| ---------------- | --- | ---------| ---------------------------------------------------- | ----------------- |
| index   | no  | number   | Rating index | null              |
| select          | no  | function | Function to execute to select a rating             |                   |
| selectedIndex   | no  | number   | Selected rating | null              |
