import React from "react";
import { shallow } from "enzyme";
import { AlertMessage, mapStateToProps } from "../AlertMessage";

const props = {
  message: "Message",
  styles: "style"
};
const mockStore = {
  messageReducer: {
    message: "Message",
    styles: "style"
  }
};
const wrapper = shallow(<AlertMessage {...props} />);

describe("Alert Message", () => {
  it("should render Alert Message", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should return message", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.message).toEqual("Message");
  });

  it("should render when there is no message", () => {
    wrapper.setProps({
      message: null
    });
    expect(wrapper).toMatchSnapshot();
  });
});
