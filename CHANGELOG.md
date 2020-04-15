# Changelog

## 4.2.0 (2020-04-15)
### Added
- Debounce onChange calls in MoneyInput, PhoneNumber and TextInput components.
  Wait time is 250ms by default.

## 4.0.0 (2020-02-17)
### Removed
- Autocomplete component does not re-render when its options or default value change. For more info check the React notes for [unsafe_componentwillreceiveprops](https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops)
