import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageState {
  message: string;
}

const initialState: MessageState = {
  message: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    postMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: () => initialState,
  },
});

export const { postMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
