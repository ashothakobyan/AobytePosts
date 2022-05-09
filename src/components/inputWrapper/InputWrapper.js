import React from "react";
import Error from "../error/Error";
import styles from "./InputWrapper.module.css";

class InputWrapper extends React.Component {
  render() {
    const { title, massage, type, onChangeValue, value } = this.props;
    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={`${title.toLowerCase()}`}>
          {title}
        </label>
        <input
          className={`${styles.input} ${massage ? styles.errorState : ""}`}
          type={type}
          name={`${title.toLowerCase()}`}
          value={value}
          onChange={(event) =>
            onChangeValue(event.target.value, title.toLowerCase())
          }
        />
        {massage && <Error massage={massage} />}
      </div>
    );
  }
}

export default InputWrapper;
