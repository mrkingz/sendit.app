import React from "react";
import { connect } from "react-redux";
import omit from "lodash/omit";
import request from "@request";
import SelectField from "@presentations/SelectField";
import Form from "@containers/Form";
import Places from "@globals/Places";
import actionTypes from "@actions/actionTypes";
import messageAction from "@actions/messageAction";
import validator from "@validations/validator";

class UpdateLocation extends Places {
  constructor(props) {
    super(props);

    this.fields = {
      locationStateId: this.props.location
        ? this.props.location.locationStateId
        : "",
      locationLGAId: this.props.location
        ? this.props.location.locationLGAId
        : ""
    };
    this.state = {
      fields: this.fields,
      parcelId: this.props.parcelId,
      states: [],
      lgas: [],
      locationLGAs: [],
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

  submitHandler = async e => {
    e.preventDefault();
    const validation = await validator("location", this.state.fields);
    console.log(validation);
    if (validation.hasError) {
      this.setState({
        ...this.state,
        errors: validation.errors
      });
    }
  };

  /**
   * @description Handle an input on change event
   *
   * @param {object} event browser event
   */
  onChangeHandler = async event => {
    const { value, name } = event.target;
    this.clearLGAsOnStateSelection(name);
    this.setState({
      ...this.state,
      lgas: await this.fetchLGAs(value, name),
      errors: omit(this.state.errors, name),
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };

  /**
   * @description Fetch all L.G. Areas of a particular state
   *
   * @param {string} stateId the Id of the state
   * @param {string} name the name of the L.G. Area select field
   * @param {object} object with the L.G. Area field name and list of all LGAs as key-value pairs
   */
  fetchLGAs = async (stateId, name) => {
    if (name === "locationLGAId") return this.state.lgas;
    try {
      const response = await request.get(`/states/${stateId}/lgas`);
      if (response.status === 200) {
        return response.data.lgas;
      }
    } catch (error) {
      if (error.response.status === 404) {
        return [];
      }
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          type: "alert-danger",
          message: "Something went wrong, could not load states"
        }
      });
    }
  };

  render() {
    const { errors, fields } = this.state;
    return (
      <div className="panel">
        <Form
          btnText="Save"
          btnStyles="btn-block"
          requiredStyles="hide"
          submitHandler={this.submitHandler}
        >
          <SelectField
            id="location-state"
            name="locationStateId"
            placeholder="State"
            value={fields.locationStateId}
            onChangeHandler={this.onChangeHandler}
            forwardRef={locationStateId =>
              (this.fieldRefs.locationStateId = locationStateId)
            }
            getFieldsName={() => "state"}
            getObjectKey={() => "stateId"}
            options={this.state.states}
            error={errors.locationStateId}
          />
          <SelectField
            id="location-lga"
            name="locationLGAId"
            placeholder="L.G. Area"
            value={fields.locationLGAId}
            onChangeHandler={this.onChangeHandler}
            forwardRef={locationLGAId =>
              (this.fieldRefs.locationLGAId = locationLGAId)
            }
            getFieldsName={() => "lga"}
            getObjectKey={() => "lgaId"}
            options={this.state.lgas}
            error={errors.locationLGAId}
          />
        </Form>
      </div>
    );
  }
}
export default connect(
  null,
  { messageAction }
)(UpdateLocation);
