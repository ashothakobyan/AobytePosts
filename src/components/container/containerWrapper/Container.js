import { useSelector } from "react-redux";
import ContainerElement from "../containerElement/ContainerElement";
import styles from "./Container.module.css";

function Container() {
  const containerSchema = useSelector(
    (state) => state.formBuilderSlice.containerSchema
  );

  return (
    <div className={styles.container}>
      {containerSchema.map((el, rowIndex) =>
        el.map((el, columnIndex) => (
          <ContainerElement
            key={Number(`${columnIndex}${rowIndex}`)}
            elementInfo={el}
          />
        ))
      )}
    </div>
  );
}

export default Container;
