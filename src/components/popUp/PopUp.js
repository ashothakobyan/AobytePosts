import React from "react";
import styles from "./PopUp.module.css";
class PopUp extends React.Component {
  render() {
    const { popUpState, changePopUpState } = this.props;
    return (
      <div className={`${styles.popUp} ${popUpState ? styles.active : ""}`}>
        <h1>All validated</h1>
        <button onClick={changePopUpState} className={styles.button}>
          Ok
        </button>
      </div>
    );
  }
}

export default PopUp;
