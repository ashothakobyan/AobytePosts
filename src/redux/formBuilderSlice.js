import { createSlice } from "@reduxjs/toolkit";
import { setAttributes } from "../config/attributes/setAttributes";
import { createBorder } from "../config/containerConfig";
const containerSchema = createBorder();
const initialState = {
  containerSchema,
  attributeModal: {},
};

export const formBuilderSlice = createSlice({
  name: "formBuilderSlice",
  initialState,
  reducers: {
    setDragStartElement: (state, action) => {
      state.currentElement = { name: action.payload, state: true };
    },
    endDragStartElement: (state) => {
      state.currentElement.state = false;
    },
    changeBorderSTate: (state, action) => {
      const border = state.containerSchema;
      const i = action.payload.rowIndex;
      const j = action.payload.columnIndex;
      border[i][j].state = "dropped";
      if (i - 1 >= 0 && border[i - 1][j].state === "empty") {
        border[i - 1][j].state = "active";
      }
      if (border[i][j + 1] && border[i][j + 1].state === "empty") {
        border[i][j + 1].state = "active";
      }
      if (border[i + 1] && border[i + 1][j].state === "empty") {
        border[i + 1][j].state = "active";
      }
      if (border[i][j - 1] && border[i][j - 1].state === "empty") {
        border[i][j - 1].state = "active";
      }
      border[i][j].element = state.currentElement.name;
      border[i][j] = setAttributes(border[i][j]);
      if (!state.lastElementCoordinates) {
        state.lastElementCoordinates = [
          {
            rowIndex: i,
            columnIndex: j,
          },
        ];
      } else {
        state.lastElementCoordinates.push({
          rowIndex: i,
          columnIndex: j,
        });
      }

      state.containerSchema = border;
    },
    removeLastElement: (state) => {
      if (state.lastElementCoordinates && state.lastElementCoordinates.length) {
        const { rowIndex, columnIndex } =
          state.lastElementCoordinates[state.lastElementCoordinates.length - 1];
        const i = rowIndex;
        const j = columnIndex;
        const border = state.containerSchema;

        if (
          (i - 1 >= 0 && border[i - 1][j].state === "dropped") ||
          (border[i][j + 1] && border[i][j + 1].state === "dropped") ||
          (border[i + 1] && border[i + 1][j].state === "dropped") ||
          (border[i][j - 1] && border[i][j - 1].state === "dropped")
        ) {
          border[rowIndex][columnIndex].state = "active";
        } else {
          border[rowIndex][columnIndex].state = "empty";
        }
        const allActiveElements = border
          .map((el) => {
            return el.filter((el) => el.state === "active");
          })
          .reduce((acc, el) => {
            return acc.concat(el);
          }, []);
        allActiveElements.forEach((el) => {
          const i = el.rowIndex;
          const j = el.columnIndex;
          if (
            (i - 1 >= 0 ? border[i - 1][j].state !== "dropped" : true) &&
            (border[i][j + 1] ? border[i][j + 1].state !== "dropped" : true) &&
            (border[i + 1] ? border[i + 1][j].state !== "dropped" : true) &&
            (border[i][j - 1] ? border[i][j - 1].state !== "dropped" : true)
          ) {
            border[i][j].state = "empty";
          }
        });
        state.containerSchema[rowIndex][columnIndex].element = {};
        const newLastElementCoordinates = state.lastElementCoordinates;
        newLastElementCoordinates.pop();

        state.lastElementCoordinates = newLastElementCoordinates;
        if (!newLastElementCoordinates.length) {
          state.containerSchema[3][3].state = "active";
        }

        state.containerSchema = border;
      } else if (
        state.lastElementCoordinates &&
        !state.lastElementCoordinates.length
      ) {
        state.containerSchema[3][3].state = "active";
      }
    },
    changeAttributeModal: (state, action) => {
      if (state.attributeModal.state) {
        state.attributeModal.state = false;
      } else {
        const { rowIndex, columnIndex } = action.payload;
        const { attributes, css, label } =
          state.containerSchema[rowIndex][columnIndex].element;
        state.attributeModal.rowIndex = rowIndex;
        state.attributeModal.columnIndex = columnIndex;
        state.attributeModal.state = true;
        state.attributeModal.attributes = attributes;
        state.attributeModal.css = css;
        state.attributeModal.label = label;
      }
    },

    changeAttributeStates: (state, action) => {
      const { css, label, attributes } = action.payload;
      const { rowIndex, columnIndex } = state.attributeModal;
      state.containerSchema[rowIndex][columnIndex].element.attributes = {
        ...state.containerSchema[rowIndex][columnIndex].element.attributes,
        ...attributes,
      };
      state.containerSchema[rowIndex][columnIndex].element.label = label;
      state.containerSchema[rowIndex][columnIndex].element.css = {
        ...state.containerSchema[rowIndex][columnIndex].css,
        ...css,
      };
    },
  },
});

export const {
  setDragStartElement,
  endDragStartElement,
  changeBorderSTate,
  changeAttributeModal,
  changeAttributeStates,
  removeLastElement,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
