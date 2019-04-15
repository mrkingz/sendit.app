import React from "react";
import { shallow } from "enzyme";
import Button from "../Button";

const props = {
  message: "Message",
  styles: "style",
  onClick: jest.fn(),
  isDisabled: false,
  text: "",
  btnStyle: "style",
  children: "<h1>Head</h1>"
};

const wrapper = shallow(<Button {...props} />);

describe("Button", () => {
  it("should render Button", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
