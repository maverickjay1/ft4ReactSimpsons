import React, { Component } from "react";

class Name extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="name">
        <p>{name}</p>
      </div>
    );
  }
}

export default Name;
