import { useDispatch } from "react-redux";
import { changeAttributeModal } from "../../../redux/formBuilderSlice";
import styles from "./ActionButton.module.css";

function ActionButton({ rowIndex, columnIndex }) {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(changeAttributeModal({ rowIndex, columnIndex }));
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={onClickHandler} className={styles.actionButton}>
        Action
      </button>
    </div>
  );
}

export default ActionButton;
