class Schema {
  constructor(props) {
    for (const key in props) {
      this[key] = props[key];
    }
  }
  validate = (payload) => {
    const result = {};
    for (const key in payload) {
      if (this[key]) {
        const validationsArr = this[key].validators.map((el) =>
          this[el.validator](payload[key], el.requiredProp)
        );
        const isValid = validationsArr.every((boolean) => boolean === true);
        result[key] = {
          validate: isValid,
          errMessage: !isValid ? this[key].message : "",
        };
      }
    }
    return result;
  };

  minValidator = (text, number) => {
    return text.length >= number ? true : false;
  };
  emailValidator = (email) => {
    const regex_pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex_pattern.test(email);
  };
  required = (value, age) => {
    if (age) {
      return value.length && value >= 0 ? true : false;
    }
    return value.length ? true : false;
  };
  maxValidator = (text, number) => {
    return text.length <= number ? true : false;
  };
  urlValidator = (url) => {
    let urlEx;
    try {
      urlEx = new URL(url);
    } catch (_) {
      return false;
    }

    return urlEx.protocol === "http:" || urlEx.protocol === "https:";
  };
  passportValidator = (passportId) => {
    const passportLetter = passportId.slice(0, 2);
    const passportNumbers = passportId.slice(2);

    return passportLetter.toUpperCase() === passportLetter &&
      Number(passportNumbers) &&
      passportId.length === 9 &&
      !Number(passportLetter)
      ? true
      : false;
  };
  phoneValidator = (number) => {
    const regEx = /^[0-9]*$/;
    return number.length && regEx.test(number) ? true : false;
  };
}

export const schema = new Schema({
  fname: {
    type: "string",
    validators: [{ validator: "minValidator", requiredProp: 3 }],
    message: "The field must contain min 3 letters",
  },
  email: {
    type: "string",
    validators: [{ validator: "emailValidator" }],
    message: "Invalid email address",
  },
  age: {
    type: "numeric",
    validators: [{ validator: "required", requiredProp: "age" }],
    message: "Invalid age",
  },
  passport: {
    type: "string",
    validators: [
      { validator: "maxValidator", requiredProp: 9 },
      { validator: "passportValidator" },
    ],
    message: "Invalid passportId,EX: AA1234567",
  },
  website: {
    type: "string",
    validators: [{ validator: "urlValidator" }],
    message: "Invalid URL,try URL with http: | https:",
  },
  phone: {
    type: "array[string]",
    validators: [{ validator: "phoneValidator" }],
    message: "Invalid phone inputs",
  },
});
