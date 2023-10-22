import { createSlice } from "@reduxjs/toolkit";
import { fetchAllMails } from "../thunks/fetchAllEmails";
import { fetchEmailInfo } from "../thunks/fetchEmailInfo";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    allEmails: [],
    filteredEmailValue: "unread",
    isShowingFullEmail: false,
    emailFullDetail: {
      isLoading: false,
      error: null,
      info: null,
    },
  },
  reducers: {
    setIsShowingFullEmail: (state, action) => {
      state.isShowingFullEmail = action.payload;
    },
    setUpdateStatus: (state, action) => {
      const updatedId = action.payload;
      state.allEmails = state.allEmails.map((email) => {
        if (email.id === updatedId) {
          return { ...email, status: "read" };
        }
        return email;
      });
    },
    setFavorite: (state, action) => {
      const updatedId = action.payload;
      state.allEmails = state.allEmails.map((email) => {
        if (email.id === updatedId) {
          return { ...email, isFavorite: !email.isFavorite };
        }
        return email;
      });
    },
    setFilteredStatus: (state, action) => {
      state.filteredEmailValue = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllMails.fulfilled, (state, action) => {
      state.allEmails = action.payload;
    });
    builder.addCase(fetchEmailInfo.fulfilled, (state, action) => {
      state.emailFullDetail.isLoading = false;
      state.emailFullDetail.info = action.payload;
    });
    builder.addCase(fetchEmailInfo.pending, (state, action) => {
      state.emailFullDetail.isLoading = true;
    });
    builder.addCase(fetchEmailInfo.rejected, (state, action) => {
      state.emailFullDetail.isLoading = false;
      state.emailFullDetail = action.payload.error;
    });
  },
});
export const emailReducer = emailSlice.reducer;
export const {
  setIsShowingFullEmail,
  setUpdateStatus,
  setFavorite,
  setFilteredStatus,
} = emailSlice.actions;
