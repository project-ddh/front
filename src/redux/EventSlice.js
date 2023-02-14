import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: { data: [] },
  reducers: {
    setEvent: (state, action) => {
      state.data = action.payload;
    },
  },
});
export default eventSlice.reducer;
export const { setEvent } = eventSlice.actions;
