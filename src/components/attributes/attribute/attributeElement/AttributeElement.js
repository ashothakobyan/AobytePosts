import React from "react";
import styles from "./AttributeElement.module.css";
function AttributeElement({ name, value, onChangeValue }) {
  return (
    <div className={styles.attributeElement}>
      {name}:
      <input
        className={styles.input}
        onChange={(e) => onChangeValue(name, e.target.value)}
        value={value ? value : ""}
      />
    </div>
  );
}

export default React.memo(AttributeElement);
