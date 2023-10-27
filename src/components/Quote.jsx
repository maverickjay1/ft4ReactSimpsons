import React, { Component } from "react";

class Quote extends Component {
  render() {
    const { quote } = this.props;
    return (
      <div className="quote">
        <p>{quote}</p>
      </div>
    );
  }
}

export default Quote;
