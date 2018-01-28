import React, { Component } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import PropTypes from "prop-types";
import withSokkit from "./withSokkit";
 
class ReactSokkit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        error: null
      }
    };

    this.connect();
  }

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

  connect() {
    const { url, subscriptions } = this.props;
    const socket = new SockJS(url);
    this.client = Stomp.over(socket);

    this.client.connect({}, () => {
      subscriptions.forEach(
        url => this.client.subscribe(url, this.onSuccess),
        error => this.setState({ data: { error } })
      );
    });
  }

  sendToServer = (topic, message) =>
    this.client.send(topic, {}, JSON.stringify(message));

  render() {
    const childProps = { send: this.sendToServer, ...this.state };

    return <div>{this.props.render({ ...childProps })}</div>;
  }
}

ReactSokkit.propTypes = {
  render: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export { withSokkit };

export default ReactSokkit;
