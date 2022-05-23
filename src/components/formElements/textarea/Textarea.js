import { useSelector } from "react-redux";
import ActionButton from "../actionButton/ActionButton";
import styles from "./Textarea.module.css";

function Textarea({ columnIndex, rowIndex }) {
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
      <textarea {...attributes} className={styles.textarea}></textarea>
    </div>
  );
}

export default Textarea;
