import React, { Component } from "react";
import omit from "lodash/omit";

class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * @description Create ref(s) for input(s)
   *
   * @param {array} fields array of fields
   * @returns {object} object containing the refs
   * @memberof BaseComponent
   */
  createInputRefs = fields => {
    const fieldRefs = {};
    fields.forEach(field => {
      fieldRefs[field] = React.createRef();
    });
    return fieldRefs;
  };

  /**
   * @description Handles the change event
   *
   * @param {Object} event the DOM event object
   * @memberof BaseComponent
   */
  onChangeHandler = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      },
      errors: omit(this.state.errors, name)
    });
  };
}

export default BaseComponent;
