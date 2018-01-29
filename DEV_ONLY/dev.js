import React from "react";
import ReactDOM from "react-dom";
import Sokkit, { withSokkit } from "../src";

const SOKKIT_CONFIG = {
  url: "//localhost:8080/yo", 
  subscriptions: ["/topic/greetings"]
}

const DUMMY_PAYLOAD = {
  id: "58330e0e-a6f4-42b9-8d18-ec7bf3502fbe", 
  front: "backaksdfads", 
  back: "hwfadjsf"
}; 

const WebSocketAware = ({ data: { error, response }, send }) => {
  return (
    <div>
      <button onClick={() => send("/app/hello", DUMMY_PAYLOAD)}> Send </button>
      <span> {error && error} {response && response} </span>
    </div>
  );
} 

const HOCSokkit = withSokkit(SOKKIT_CONFIG, WebSocketAware);

const App = () => (
  <div>
    <Sokkit {...SOKKIT_CONFIG} render={WebSocketAware} />
    <HOCSokkit />
    <HOCSokkit />
    <HOCSokkit />
    <HOCSokkit />
    <HOCSokkit />
    <HOCSokkit />
  </div>
);

ReactDOM.render(<App />, document.querySelector(".root"));