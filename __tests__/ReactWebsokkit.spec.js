import React from "react";
import { shallow } from "enzyme";
import Stomp from "stompjs";
import Sokket from "index";

let wrapper;

const sendMock = jest.fn();

describe("React Websokkit Tests", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    Stomp.over = () => ({
      connect: jest.fn(),
      send: sendMock 
    });
  });

  it("Should render a child component when passed in the render prop", () => {
    wrapper = shallow(
      <Sokket
        url={"http://test"}
        render={() => <div className="should-render" />}
      />
    );
    expect(wrapper.find(".should-render").length).toEqual(1);
  });

  it("Should fire the sendToServer callback with the correct parameters when it is invoked, parsing the JSON object before sending.", () => {
    const mockPayload = { name: "Jim" };
    wrapper = shallow(
      <Sokket
        url={"http://test"}
        render={({ send }) => <button onClick={() => send("topic", mockPayload)}> Click me </button>}
      />
    );
    wrapper.find("button").simulate("click");
    expect(sendMock).toHaveBeenCalledWith("topic", {}, JSON.stringify(mockPayload));
  });
});
