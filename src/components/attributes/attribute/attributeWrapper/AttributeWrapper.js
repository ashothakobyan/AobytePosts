import AttributeElement from "../attributeElement/AttributeElement";
import styles from "./AttributeWrapper.module.css";
function AttributeWrapper({ attributes, valueState, onChangeValue }) {
  const convertObject = (name) => {
    return name === "attributes" && attributes ? Object.keys(attributes) : [];
  };
  return (
    <div className={styles.attributeWrapper}>
      {convertObject("attributes")?.map((el, index) => {
        return (
          <AttributeElement
            key={index}
            name={el}
            value={valueState[el] ? valueState[el] : attributes[el]}
            onChangeValue={onChangeValue}
          />
        );
      })}
    </div>
  );
}

export default AttributeWrapper;
