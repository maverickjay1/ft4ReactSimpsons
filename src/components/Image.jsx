import React, { Component } from "react";

class Image extends Component {
  render() {
    const { image, name } = this.props;

    return (
      <div className="image">
        <img src={image} alt={name} />
      </div>
    );
  }
}

export default Image;
