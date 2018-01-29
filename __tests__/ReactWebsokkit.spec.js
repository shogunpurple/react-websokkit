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
        render={({ send }) => (
          <button onClick={() => send("topic", mockPayload)}> Click me </button>
        )}
      />
    );
    wrapper.find("button").simulate("click");
    expect(sendMock).toHaveBeenCalledWith(
      "topic",
      {},
      JSON.stringify(mockPayload)
    );
  });

  const onSuccessParsingTest = ({ payload, expected }) => {
    wrapper = shallow(<Sokket url={"http://test"} render={() => {}} />);

    wrapper.instance().onSuccess(payload);

    expect(wrapper.state()).toEqual(expected);
  };

  it("Should fire the onSuccess callback with an object and parse successfully", () => {
    const payload = {
      body: '{"content": { "name":"John" }}'
    };

    const expected = {
      data: {
        response: {
          name: "John"
        }
      }
    };

    onSuccessParsingTest({ payload, expected });
  });

  it("Should fire the onSuccess callback and parse successfully with a string", () => {
    const payload = {
      body: "hey"
    };

    const expected = {
      data: {
        response: "hey"
      }
    };

    onSuccessParsingTest({ payload, expected });
  });
});
