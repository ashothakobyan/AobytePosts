import styles from "./LabelElement.module.css";
function LabelElement({ value, onChangeValue }) {
  return (
    <div className={styles.labelElement}>
      Label:
      <input
        className={styles.input}
        onChange={(e) => onChangeValue("label", e.target.value)}
        value={value ? value : ""}
      />
    </div>
  );
}

export default LabelElement;
