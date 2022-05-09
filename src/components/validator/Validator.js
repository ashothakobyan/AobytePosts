import React from "react";
import styles from "./Validator.module.css";
import {
  initialErrorMassages,
  initialInputsValues,
} from "../../schema/initialState";
import { schema } from "../../schema/schemaClass";
import InputWrapper from "../inputWrapper/InputWrapper";
import PopUp from "../popUp/PopUp";
import { formDate } from "../../schema/formData";
class Validator extends React.Component {
  constructor() {
    super();
    this.state = {
      errorMassages: { ...initialErrorMassages },
      inputsValues: { ...initialInputsValues },
      popUpState: false,
    };
  }
  onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formObject = Object.fromEntries(data.entries());

    const validationResult = schema.validate(formObject);
    const { age, email, fname, passport, phone, website } = validationResult;
    const isValidated = Object.values(validationResult).every(
      (el) => el.validate === true
    );
    if (isValidated) {
      this.setState({
        errorMassages: initialErrorMassages,
        inputsValues: initialInputsValues,
        popUpState: true,
      });
    } else {
      this.setState({
        errorMassages: {
          fname: fname.errMessage,
          email: email.errMessage,
          age: age.errMessage,
          passport: passport.errMessage,
          phone: phone.errMessage,
          website: website.errMessage,
        },
      });
    }
  };
  changePopUpState = () => {
    this.setState({
      popUpState: !this.state.popUpState,
    });
  };
  onChangeValue = (value, name) => {
    const inputsValues = this.state.inputsValues;
    inputsValues[name] = value;
    this.setState({
      inputsValues: inputsValues,
    });
  };
  render() {
    const { errorMassages, popUpState, inputsValues } = this.state;
    return (
      <React.Fragment>
        <div className={styles.validator}>
          <form className={styles.form} onSubmit={(e) => this.onSubmit(e)}>
            {Object.values(formDate).map((el, i) => (
              <InputWrapper
                title={el.title}
                type={el.type}
                key={i}
                massage={errorMassages[el.title.toLocaleLowerCase()]}
                onChangeValue={this.onChangeValue}
                value={inputsValues[el.title.toLocaleLowerCase()]}
              />
            ))}
            <button className={styles.button}>Click</button>
          </form>
        </div>
        <PopUp
          popUpState={popUpState}
          changePopUpState={this.changePopUpState}
        />
      </React.Fragment>
    );
  }
}

export default Validator;
