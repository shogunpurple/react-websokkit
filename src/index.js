import React, { Component } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import PropTypes from "prop-types";
import withSokkit from "./withSokkit";

class ReactWebsokkit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        error: null
      }
    };

    this.connect();
  }

  /**
   * Called when a message is successfully received through the websocket from the server.
   * This will parse objects and strings.
   * @param {Object} data - Data in the payload from the server
   */
  onSuccess = data => {
    let response;

    try {
      response = JSON.parse(data.body).content;
    } catch (e) {
      response = data.body;
    }

    this.setState({
      data: {
        response
      }
    });
  };

  /**
   * Connects to a STOMP broker over SockJS. Establishes subscriptions to STOMP topics
   */
  connect() {
    const { url, subscriptions } = this.props;
    const socket = new SockJS(url);
    this.client = Stomp.over(socket);

    this.client.connect({}, () => {
      subscriptions.forEach(url =>
        this.client.subscribe(url, this.onSuccess, error =>
          this.setState({ data: { error } })
        )
      );
    });
  }

  /**
   * Connects to a STOMP broker over SockJS. Establishes subscriptions to STOMP topics
   * @param {String} topic - the STOMP topic to send the message to
   * @param {Object | String} messag - the message to send over the websocket to the server. 
   */
  sendToServer = (topic, message) =>
    this.client.send(topic, {}, JSON.stringify(message));

  render() {
    const childProps = { send: this.sendToServer, ...this.state };

    return <div>{this.props.render({ ...childProps })}</div>;
  }
}

ReactWebsokkit.propTypes = {
  render: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export { withSokkit };

export default ReactWebsokkit;
