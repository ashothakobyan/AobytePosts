import { elementInfo } from "./schemaAttr";

export const setAttributes = (object) => {
  if (object.element.name === "textarea") {
    object.element.attributes = elementInfo.textareaAttr;
    object.element.css = elementInfo.css;
    object.element.label = elementInfo.label;
  } else {
    object.element.attributes = elementInfo.attr;
    object.element.css = elementInfo.css;
    object.element.label = elementInfo.label;
  }

  return object;
};
