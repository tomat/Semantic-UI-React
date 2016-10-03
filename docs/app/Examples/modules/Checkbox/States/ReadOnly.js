import React, { Component } from 'react'
import { Checkbox } from 'semantic-ui-react'

export default class CheckboxReadOnlyExample extends Component {
  render() {
    return (
      <Checkbox label='This checkbox is read-only' readOnly />
    )
  }
}
