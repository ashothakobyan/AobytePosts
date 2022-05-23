import React from "react";
import styles from "./CssElement.module.css";
function CssElement({ name, value, onChangeValue }) {
  return (
    <div className={styles.cssElement}>
      {name}:
      <input
        className={styles.input}
        onChange={(e) => onChangeValue(name, e.target.value)}
        value={value ? value : ""}
      />
    </div>
  );
}

export default React.memo(CssElement);
