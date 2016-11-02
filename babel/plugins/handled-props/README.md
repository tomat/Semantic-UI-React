# Handled props

This plugins performs collecting array of handled props (`defaultProps`, `propTypes`) in component and places them in `_meta`. 
It is required for the correct operation of the `getUnhandledProps` function.

## Example

**In**

```jsx
function Component(props) {
  const {children, className} = props

  return <div className={className}>{children}</div>
}

Component._meta = {
  name: 'Component',
  type: META.TYPES.ELEMENT,
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Component
```

**Out**

```jsx
function Component(props) {
  const {children, className} = props

  return <div className={className}>{children}</div>
}

Component._meta = {
  name: 'Component',
  type: META.TYPES.ELEMENT,
  props: ['children', 'className'] // result is there
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Component
```
