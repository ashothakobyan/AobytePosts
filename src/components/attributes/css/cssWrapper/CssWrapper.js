import CssElement from "../cssElement/CssElement";
import styles from "./CssWrapper.module.css";
function CssWrapper({ css, valueState, onChangeValue }) {
  const convertObject = (name) => {
    return name === "css" && css ? Object.keys(css) : [];
  };
  return (
    <div className={styles.cssWrapper}>
      {convertObject("css")?.map((el, index) => {
        return (
          <CssElement
            key={index}
            name={el}
            value={valueState[el] ? valueState[el] : css[el]}
            onChangeValue={onChangeValue}
          />
        );
      })}
    </div>
  );
}

export default CssWrapper;
