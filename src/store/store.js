import { configureStore } from "@reduxjs/toolkit";
import { emailReducer } from "./slices/emailSlice";

export const store = configureStore({
  reducer: {
    emails: emailReducer,
  },
});
export * from "./thunks/fetchAllEmails";
export * from "./thunks/fetchEmailInfo";
