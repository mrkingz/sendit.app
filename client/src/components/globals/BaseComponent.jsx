import omit from "lodash/omit";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import actionTypes from "../../js/actions/actionTypes";

class BaseComponent extends PureComponent {
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
   * @description Shows an error messages
   *
   * @param {String} message the error message to render
   * @memberof ChangePassword
   */
  showErrorMessage = message => {
    this.props.messageAction({
      type: actionTypes.SHOW_MESSAGE,
      payload: {
        styles: "alert-danger",
        message
      }
    });
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

BaseComponent.propTypes = {
  messageAction: PropTypes.func
};

export default BaseComponent;
