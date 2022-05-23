import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAttributeModal,
  changeAttributeStates,
} from "../../../redux/formBuilderSlice";
import AttributeWrapper from "../attribute/attributeWrapper/AttributeWrapper";
import CssWrapper from "../css/cssWrapper/CssWrapper";
import LabelElement from "../labelElement/LabelElement";
import styles from "./AttributesWrapper.module.css";

function AttributesWrapperModal() {
  const [valueState, setValueState] = useState({});
  const { state, css, label, attributes } = useSelector(
    (state) => state.formBuilderSlice.attributeModal
  );
  const dispatch = useDispatch();
  const onChangeValue = (name, value) => {
    setValueState({
      ...valueState,
      [name]: value,
    });
  };

  const changeModal = () => {
    setValueState({});
    dispatch(changeAttributeModal());
  };
  const changeAttributes = () => {
    let state = { ...valueState };
    const label = state.label;
    const css = {
      width: state.width,
      height: state.height,
    };
    valueState.width && delete state["width"];
    valueState.label && delete state["label"];
    valueState.height && delete state["height"];
    const attributes = state;
    dispatch(changeAttributeStates({ css, attributes, label }));
    setValueState({});
    dispatch(changeAttributeModal());
  };
  return (
    <div
      className={`${styles.attributesWrapper} ${state ? styles.active : null}`}
    >
      <button onClick={changeModal} className={styles.close}>
        x
      </button>
      {state && (
        <LabelElement
          onChangeValue={onChangeValue}
          value={valueState.label ? valueState.label : label}
        />
      )}
      {state && (
        <CssWrapper
          onChangeValue={onChangeValue}
          css={css}
          valueState={valueState}
        />
      )}
      {state && (
        <AttributeWrapper
          onChangeValue={onChangeValue}
          attributes={attributes}
          valueState={valueState}
        />
      )}
      <button onClick={changeAttributes} className={styles.button}>
        {" "}
        Submit
      </button>
    </div>
  );
}

export default AttributesWrapperModal;
