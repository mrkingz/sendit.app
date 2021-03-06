import React from "react";
import { connect } from "react-redux";
import omit from "lodash/omit";
import request from "../../js/utils/request";
import SelectField from "./SelectField";
import Form from "../containers/Form";
import Places from "../globals/Places";
import actionTypes from "../../js/actions/actionTypes";
import messageAction from "../../js/actions/messageAction";
import modalAction from "../../js/actions/modalAction";
import validator from "../../js/utils/validations/validator";
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
      parcel: {},
      errors: {}
    };
    this.fieldRefs = this.createInputRefs(Object.keys(this.fields));
  }

  async componentDidMount() {
    await this.fetchStates();
    this.setState({
      ...this.state,
      lgas: await this.fetchLGAs(this.state.fields.locationStateId)
    });
  }

  updateLocation = async () => {
    try {
      const validation = await validator("location", this.state.fields);
      if (validation.hasError) {
        this.setState({
          ...this.state,
          errors: validation.errors
        });
      } else {
        const response = await request.update(
          `/parcels/${this.props.parcelId}/presentLocation`,
          this.state.fields
        );
        this.props.renderUpdate(response.data.parcel, response.data.message);
      }
    } catch (error) {
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-danger",
          message: "Something went wrong, could not update location"
        }
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
      lgas:
        name !== "locationStateId"
          ? this.state.lgas
          : await this.fetchLGAs(value, name),
      errors: omit(this.state.errors, name),
      fields: {
        ...this.state.fields,
        locationLGAId:
          name === "locationStateId" ? "" : this.state.fields.locationLGAId,
        [name]: value
      }
    });
  };

  /**
   * @description Fetch all L.G. Areas of a particular state
   *
   * @param {string} stateId the Id of the state
   * @param {object} object with the L.G. Area field name and list of all LGAs as key-value pairs
   */
  fetchLGAs = async stateId => {
    if (name === "locationLGAId") return this.state.lgas;
    else if (stateId) {
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
    } else return [];
  };

  render() {
    const { errors, fields } = this.state;
    return (
      <div className="panel">
        <Form
          btnText="Save"
          btnStyles="btn-block"
          requiredStyles="hide"
          submitHandler={this.updateLocation}
        >
          <SelectField
            id="location-state"
            name="locationStateId"
            placeholder="State"
            value={`${fields.locationStateId}`}
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
            value={`${fields.locationLGAId}`}
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
  {
    messageAction,
    modalAction
  }
)(UpdateLocation);
