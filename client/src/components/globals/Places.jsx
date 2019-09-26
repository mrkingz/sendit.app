import omit from "lodash/omit";

import BaseComponent from "./BaseComponent";
import request from "../../js/utils/request";
import messageAction from "../../js/actions/messageAction";
import actionTypes from "../../js/actions/actionTypes";

class Places extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchStates();
  }

  /**
   * @description Fetch states from storage
   * @returns void
   */
  fetchStates = async () => {
    try {
      const response = await request.get("/states");
      if (response.status === 200) {
        this.setState({ states: response.data.states });
      }
    } catch (error) {
      messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          message: "Something went wrong, could not load states"
        }
      });
    }
  };

  clearLGAsOnStateSelection = selectInputName => {
    this.setState({
      ...this.state,
      [selectInputName === "pickUpStateId"
        ? "pickUpLGAs"
        : "destinationLGAs"]: []
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
    try {
      if (
        stateId &&
        (name === "pickUpStateId" || name === "destinationStateId")
      ) {
        const response = await request.get(`/states/${stateId}/lgas`);
        if (response.status === 200) {
          return {
            [name === "pickUpStateId"
              ? "pickUpLGAs"
              : "destinationLGAs"]: response.data.lgas
          };
        }
      } else
        return {
          [name === "pickUpStateId" ? "pickUpLGAs" : "destinationLGAs"]: []
        };
    } catch (error) {
      messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          message: "Something went wrong, could not load states"
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
    const reloadLGAs =
      name === "pickUpStateId" || name === "destinationStateId";
    if (reloadLGAs) {
      this.clearLGAsOnStateSelection(name);
    }
    this.setState({
      ...this.state,
      ...(reloadLGAs ? await this.fetchLGAs(value, name) : []),
      errors: omit(this.state.errors, name),
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };
}
export default Places;
