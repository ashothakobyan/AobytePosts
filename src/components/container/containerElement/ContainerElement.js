import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formElementFinder } from "../../../helperFunctions/formElementFinder";
import { changeBorderSTate } from "../../../redux/formBuilderSlice";
import styles from "./ContainerElement.module.css";

function ContainerElement({ elementInfo }) {
  const [element, setElement] = useState("");
  useEffect(() => {
    elementInfo.element &&
      setElement(
        formElementFinder(
          elementInfo.element?.name,
          elementInfo.columnIndex,
          elementInfo.rowIndex
        )
      );
  }, [elementInfo.element, elementInfo.columnIndex, elementInfo.rowIndex]);
  const isCurrentElement = useSelector(
    (state) => state.formBuilderSlice.currentElement?.state
  );

  const dispatch = useDispatch();
  const { columnIndex, rowIndex, state } = elementInfo;

  const onDropHandler = (e) => {
    if (state === "active") {
      e.preventDefault();
    }
    dispatch(
      changeBorderSTate({ columnIndex: columnIndex, rowIndex: rowIndex })
    );
  };

  const onDragOverHandler = (e) => {
    if (state === "active") {
      e.preventDefault();
    }
  };
  const setClassName = () => {
    return state === "active" && isCurrentElement
      ? styles.active
      : state === "dropped"
      ? styles.dropped
      : null;
  };

  return (
    <div
      className={`${styles.containerElement} ${setClassName()}`}
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => {
        onDropHandler(e);
      }}
    >
      {element}
    </div>
  );
}

export default ContainerElement;
