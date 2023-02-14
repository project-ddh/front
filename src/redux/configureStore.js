import { configureStore } from "@reduxjs/toolkit";
import event from "./EventSlice";

const store = configureStore({
  reducer: {
    event,
  },
});
export default store;
