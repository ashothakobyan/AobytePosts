import React from "react";
import "../css/Validator.css";
import { initialState } from "../schema/initialState";
import { schema } from "../schema/schemaClass";
import Error from "./Error";
import PopUp from "./PopUp";
class Validator extends React.Component {
  constructor() {
    super();

    this.state = initialState;
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
        ...initialState,
        popUpState: true,
      });
    } else {
      this.setState({
        fname: { stat: !fname.validate, massage: fname.errMessage },

        email: {
          state: !email.validate,
          massage: email.errMessage,
        },
        age: {
          state: !age.validate,
          massage: age.errMessage,
        },
        passport: {
          state: !passport.validate,
          massage: passport.errMessage,
        },
        phone: {
          state: !phone.validate,
          massage: phone.errMessage,
        },
        website: {
          state: !website.validate,
          massage: website.errMessage,
        },
      });
    }
  };
  changePopUpState = () => {
    this.setState({
      popUpState: !this.state.popUpState,
    });
  };

  render() {
    const { fname, email, age, passport, phone, website } = this.state;

    return (
      <React.Fragment>
        <div className="validator">
          <form className="form" onSubmit={(e) => this.onSubmit(e)}>
            <div className="form--wrapper">
              <label className="wrapper--label" htmlFor="fname">
                {fname.title}
              </label>
              <input
                className={`wrapper--input ${fname.state ? "errorState" : ""}`}
                type="text"
                name="fname"
              />
              {fname.massage && <Error massage={fname.massage} />}
            </div>
            <div className="form--wrapper">
              <label className="wrapper--label" htmlFor="email">
                {email.title}
              </label>
              <input
                className={`wrapper--input ${email.state ? "errorState" : ""}`}
                type="text"
                name="email"
              />
              {email.massage && <Error massage={email.massage} />}
            </div>
            <div className="form--wrapper">
              <label className="wrapper--label" htmlFor="age">
                {age.title}
              </label>
              <input
                className={`wrapper--input ${age.state ? "errorState" : ""}`}
                type="number"
                name="age"
              />
              {age.massage && <Error massage={age.massage} />}
            </div>
            <div className="form--wrapper">
              <label className="wrapper--label" htmlFor="passport">
                {passport.title}
              </label>
              <input
                className={`wrapper--input ${
                  passport.state ? "errorState" : ""
                }`}
                type="text"
                name="passport"
              />
              {passport.massage && <Error massage={passport.massage} />}
            </div>

            <div className="form--wrapper">
              <label className="wrapper--label" htmlFor="website">
                {website.title}
              </label>
              <input
                className={`wrapper--input ${
                  website.state ? "errorState" : ""
                }`}
                type="text"
                name="website"
              />
              {website.massage && <Error massage={website.massage} />}
            </div>
            <div className="form--wrapper">
              <label className="wrapper--label" htmlFor="phone">
                {phone.title}
              </label>
              <input
                className={`wrapper--input ${phone.state ? "errorState" : ""}`}
                type="text"
                name="phone"
              />
              {phone.massage && <Error massage={phone.massage} />}
            </div>

            <button className="form--button">Click</button>
          </form>
        </div>
        <PopUp
          popUpState={this.state.popUpState}
          changePopUpState={this.changePopUpState}
        />
      </React.Fragment>
    );
  }
}

export default Validator;
