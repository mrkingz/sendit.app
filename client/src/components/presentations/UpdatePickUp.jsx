import React, { Fragment } from "react";
import { connect } from "react-redux";
import omit from "lodash/omit";
import request from "../../js/utils/request";
import Form from "../containers/Form";
import Places from "../globals/Places";
import TextInput from "./TextInput";
import SelectField from "./SelectField";
import actionTypes from "../../js/actions/actionTypes";
import messageAction from "../../js/actions/messageAction";
import modalAction from "../../js/actions/modalAction";
import validator from "../../js/utils/validations/validator";

class UpdatePickUp extends Places {
  constructor(props) {
    super(props);
    this.fields = {
      pickUpAddress: this.props.pickUpAddress,
      pickUpStateId: this.props.pickUpStateId,
      pickUpLGAId: this.props.pickUpLGAId
    };
    this.state = {
      fields: this.fields,
      states: [],
      lgas: [],
      errors: {}
    };
    this.fieldRefs = this.createInputRefs(Object.keys(this.fields));
  }

  async componentDidMount() {
    await this.fetchStates();
    this.setState({
      ...this.state,
      lgas: await this.fetchLGAs(this.state.fields.pickUpStateId)
    });
  }

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
        name !== "pickUpStateId"
          ? this.state.lgas
          : await this.fetchLGAs(value, name),
      errors: omit(this.state.errors, name),
      fields: {
        ...this.state.fields,
        pickUpLGAId:
          name === "pickUpStateId" ? "" : this.state.fields.pickUpLGAId,
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
    if (name === "pickUpLGAId") return this.state.lgas;
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

  updatepickUp = async () => {
    try {
      const validation = await validator("pickup", this.state.fields);
      if (validation.hasError) {
        this.setState({
          ...this.state,
          errors: validation.errors
        });
        this.fieldRefs[Object.keys(validation.errors)[0]].focus();
      } else {
        const {
          data: { parcel, message }
        } = await request.update(
          `/parcels/${this.props.parcelId}/editPickup`,
          this.state.fields
        );
        const { stateId, lgaId } = parcel.from;
        const {
          data: { area }
        } = await request.get(`/states/${stateId}/lgas/${lgaId}`);
        parcel.from = { ...parcel.from, ...area };
        this.props.renderUpdate(parcel, message);
      }
    } catch (error) {
      console.log(error);
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-danger",
          message: "Something went wrong, could not update pick up details"
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
          submitHandler={this.updatepickUp}
        >
          <TextInput
            name="pickUpAddress"
            placeholder="pickUp address"
            onChangeHandler={this.onChangeHandler}
            forwardRef={pickUpAddress =>
              (this.fieldRefs.pickUpAddress = pickUpAddress)
            }
            value={fields.pickUpAddress}
            error={errors.pickUpAddress}
            styles="col-12"
          />
          <SelectField
            id="pickUp-state"
            name="pickUpStateId"
            placeholder="State"
            value={`${fields.pickUpStateId}`}
            onChangeHandler={this.onChangeHandler}
            forwardRef={pickUpStateId =>
              (this.fieldRefs.pickUpStateId = pickUpStateId)
            }
            getFieldsName={() => "state"}
            getObjectKey={() => "stateId"}
            options={this.state.states}
            error={errors.pickUpStateId}
          />
          <SelectField
            id="desination-lga"
            name="pickUpLGAId"
            placeholder="L.G. Area"
            value={`${fields.pickUpLGAId}`}
            onChangeHandler={this.onChangeHandler}
            forwardRef={pickUpLGAId =>
              (this.fieldRefs.pickUpLGAId = pickUpLGAId)
            }
            getFieldsName={() => "lga"}
            getObjectKey={() => "lgaId"}
            options={this.state.lgas}
            error={errors.pickUpLGAId}
          />
        </Form>
      </div>
    );
  }
}
export default connect(
  null,
  {
    messageAction
  }
)(UpdatePickUp);
