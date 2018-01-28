import React, { Component } from "react";
import ReactSokkit from "./index";

const withSokkit = (sokkitConfig, WrappedComponent) => class extends Component {
  render() {
    return (
      <ReactSokkit
        {...sokkitConfig}
        render={sokkitProps => (
          <WrappedComponent {...this.props} {...sokkitProps} />
        )}
      />
    );
  }
};

export default withSokkit;
