import React, { Component } from "react";

class Button extends Component {
  render() {
    const { text, onClick, id, className } = this.props;

    return (
      <button className={className} onClick={() => onClick(id)}>
        {text}
      </button>
    );
  }
}

export default Button;
