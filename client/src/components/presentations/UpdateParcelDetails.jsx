import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import request from "../../js/utils/request";
import Form from "../containers/Form";
import TextInput from "./TextInput";
import CheckInput from "./CheckInput";
import actionTypes from "../../js/actions/actionTypes";
import validator from "../../js/utils/validations/validator";
import messageAction from "../../js/actions/messageAction";

class UpdateParcelDetails extends Component {
  constructor(props) {
    super(props);
    this.fields = {
      weight: this.props.weight,
      description: this.props.description,
      deliveryMethod: this.props.deliveryMethod
    };
    this.state = {
      fields: this.fields,
      errors: {}
    };
    this.fieldRefs = this.createInputRefs(Object.keys(this.fields));
  }

  /**
   * @description Create ref for inputs
   *
   * @param {array} fields array of fields
   * @returns {object} object containing the refs
   */
  createInputRefs = fields => {
    const fieldRefs = {};
    fields.forEach(field => {
      fieldRefs[field] = React.createRef();
    });
    return fieldRefs;
  };

  /**
   * @description Handle an input on change event
   *
   * @param {object} event browser event
   */
  onChangeHandler = event => {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      errors: omit(this.state.errors, name),
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };

  updateDetails = async () => {
    try {
      const validation = await validator("details", this.state.fields);
      if (validation.hasError) {
        this.setState({
          ...this.state,
          errors: validation.errors
        });
      } else {
        const response = await request.update(
          `/parcels/${this.props.parcelId}/editParcel`,
          this.state.fields
        );
        this.props.renderUpdate(response.data.parcel, response.data.message);
      }
    } catch (error) {
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-danger",
          message: error.response.message //"Something went wrong, could not update location"
        }
      });
    }
  };

  render() {
    const { fields, errors } = this.state;
    return (
      <div className="panel">
        <Form
          btnText="Save"
          btnStyles="btn-block"
          requiredStyles="hide"
          submitHandler={this.updateDetails}
        >
          <TextInput
            name="weight"
            placeholder="Parcel weight"
            onChangeHandler={this.onChangeHandler}
            forwardRef={weight => (this.fieldRefs.weight = weight)}
            autofocus
            value={fields.weight}
            error={errors.weight}
            styles="col-12"
          />
          <TextInput
            name="description"
            placeholder="Parcel description"
            onChangeHandler={this.onChangeHandler}
            forwardRef={description =>
              (this.fieldRefs.description = description)
            }
            required
            value={fields.description}
            error={errors.description}
            styles="col-12"
          />
          <div className="control-group">
            <span style={{ fontSize: ".8rem", fontWeight: "bold" }}>
              Choose your delivery method
            </span>
            <div className="panel">
              <CheckInput
                id="normal"
                value="Normal"
                forwardRef={deliveryMethod =>
                  (this.fieldRefs.deliveryMethod = deliveryMethod)
                }
                name="deliveryMethod"
                type="radio"
                placeholder="Normal delivery"
                onChangeHandler={this.onChangeHandler}
                checked={fields.deliveryMethod === "Normal"}
              />
              <CheckInput
                id="fast"
                value="Fast"
                forwardRef={deliveryMethod =>
                  (this.fieldRefs.deliveryMethod = deliveryMethod)
                }
                name="deliveryMethod"
                type="radio"
                placeholder="Fast delivery"
                onChangeHandler={this.onChangeHandler}
                checked={fields.deliveryMethod === "Fast"}
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

UpdateParcelDetails.propTypes = {
  weight: PropTypes.string,
  description: PropTypes.description,
  deliveryMethod: PropTypes.string,
  messageAction: PropTypes.func,
  renderUpdate: PropTypes.func,
  parcelId: PropTypes.string
};
export default connect(
  null,
  {
    messageAction
  }
)(UpdateParcelDetails);
