# Rating

Stars to provide a rating feedback

## Example rating

```javascript
<Rating
  errorText="Please select a star"
  higherRatingText="Very satisfied"
  lowerRatingText="Very unsatisfied"
  onClick={callback}
/>

<Rating
  errorText=""
  higherRatingText="Very satisfied"
  lowerRatingText="Very unsatisfied"
  onClick={callback}
  rating="4"
/>
```

## Properties

| Property         | Req | Type     | Description                                          | Default           |
| ---------------- | --- | ---------| ---------------------------------------------------- | ----------------- |
| errorText        | no  | string   | Text to display when no star is selected             | ""                |
| higherRatingText | no  | string   | Text to show next to the lower rating star           | ""                |
| lowerRatingText  | no  | string   | Text to show next to the higher rating star          | ""                |
| onClick          | no  | function | Function to execute when clicking a star             |                   |
| rating           | no  | number   | Selected star                                        | null              |
