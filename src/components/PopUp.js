import React from "react";
import "../css/PopUp.css";
class PopUp extends React.Component {
  render() {
    const { popUpState, changePopUpState } = this.props;
    return (
      <div className={`popUp ${popUpState ? "popUp--active" : ""}`}>
        <h1>There is no more Post !</h1>
        <button onClick={changePopUpState} className="popUp--button ">
          Ok
        </button>
      </div>
    );
  }
}

export default PopUp;
