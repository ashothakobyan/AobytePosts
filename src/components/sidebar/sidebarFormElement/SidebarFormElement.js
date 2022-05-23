import { useDispatch } from "react-redux";
import {
  endDragStartElement,
  setDragStartElement,
} from "../../../redux/formBuilderSlice";
import styles from "./SidebarFormElement.module.css";

function SidebarFormElement({ name }) {
  const dispatch = useDispatch();
  const onDragStartHandler = () => {
    dispatch(setDragStartElement({ name: name }));
  };
  const onDragEndHandler = () => {
    dispatch(endDragStartElement());
  };
  return (
    <div
      className={styles.sidebarFormElement}
      draggable="true"
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      onDrop={(e) => {
        e.preventDefault();
      }}
    >
      {name}
    </div>
  );
}

export default SidebarFormElement;
