import React from "react";
import "../css/Error.css";
class Error extends React.Component {
  render() {
    const { massage } = this.props;
    return <h4 className="errorMassage">{massage}</h4>;
  }
}

export default Error;
