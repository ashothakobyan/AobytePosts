import React from "react";
import styles from "./Error.module.css";
class Error extends React.Component {
  render() {
    const { massage } = this.props;
    return <h4 className={styles.errorMassage}>{massage}</h4>;
  }
}

export default Error;
