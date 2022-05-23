import { configureStore } from "@reduxjs/toolkit";
import formBuilderSlice from "./formBuilderSlice";

export const store = configureStore({
  reducer: {
    formBuilderSlice: formBuilderSlice,
  },
});
