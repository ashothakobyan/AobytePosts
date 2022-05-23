import Button from "../components/formElements/button/Button";
import Checkbox from "../components/formElements/checkbox/Checkbox";
import Input from "../components/formElements/input/Input";
import Radio from "../components/formElements/radio/Radio";
import Select from "../components/formElements/select/select";
import TextArea from "../components/formElements/textarea/Textarea";

export const formElementFinder = (name, columnIndex, rowIndex) => {
  if (name === "button") {
    return <Button columnIndex={columnIndex} rowIndex={rowIndex} />;
  } else if (name === "input") {
    return <Input columnIndex={columnIndex} rowIndex={rowIndex} />;
  } else if (name === "checkbox") {
    return <Checkbox columnIndex={columnIndex} rowIndex={rowIndex} />;
  } else if (name === "radio") {
    return <Radio columnIndex={columnIndex} rowIndex={rowIndex} />;
  } else if (name === "select") {
    return <Select columnIndex={columnIndex} rowIndex={rowIndex} />;
  } else if (name === "textarea") {
    return <TextArea columnIndex={columnIndex} rowIndex={rowIndex} />;
  }
};
