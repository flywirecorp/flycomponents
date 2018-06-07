# Rating

Stars to provide a rating feedback

## Example rating

```javascript
class ControlledRating extends React.Component {
  state = {
    rating: null
  };

  selectRating = rating => {
    this.setState({ rating });
  };

  render() {
    const { rating } = this.state;
    const errorText = rating === null ? 'Please select a star' : '';

    return (
      <Component readme={README}>
        <Rating
          errorText={errorText}
          higherRatingText="Very satisfied"
          lowerRatingText="Very unsatisfied"
          onClick={this.selectRating}
          rating={rating}
        />
      </Component>
    );
  }
}
```

## Properties

| Property         | Req | Type     | Description                                          | Default           |
| ---------------- | --- | ---------| ---------------------------------------------------- | ----------------- |
| errorText        | no  | string   | Text to display when no star is selected             | ""                |
| higherRatingText | no  | string   | Text to show next to the lower rating star           | ""                |
| lowerRatingText  | no  | string   | Text to show next to the higher rating star          | ""                |
| onClick          | no  | function | Function to execute when clicking a star             |                   |
| rating           | no  | number   | Selected star                                        | null              |
