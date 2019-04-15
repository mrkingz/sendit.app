import React from "react";
import { shallow } from "enzyme";
import { AuthRedirect } from "../AuthRedirect";

const props = {
  text: "Message",
  linkStyles: "style",
  prompt: "prompt",
  wrapperStyles: "styles",
  path: "path"
};

const wrapper = shallow(<AuthRedirect {...props} />);

describe("Auth Redirect", () => {
  it("should render Auth Redirect", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
