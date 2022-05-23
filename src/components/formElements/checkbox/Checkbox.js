import { useSelector } from "react-redux";
import ActionButton from "../actionButton/ActionButton";
import styles from "./Checkbox.module.css";

function Checkbox({ columnIndex, rowIndex }) {
  const { attributes, css, label } = useSelector(
    (state) =>
      state.formBuilderSlice.containerSchema[rowIndex][columnIndex].element
  );
  return (
    <div
      style={
        css && {
          width: `${css.width}px`,
          height: `${css.height}px`,
        }
      }
      className={styles.wrapper}
    >
      <ActionButton rowIndex={rowIndex} columnIndex={columnIndex} />
      {<label>{label ? label : "label"}</label>}
      <input {...attributes} type={"checkbox"} className={styles.Checkbox} />
    </div>
  );
}

export default Checkbox;
