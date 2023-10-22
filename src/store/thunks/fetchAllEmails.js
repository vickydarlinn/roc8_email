import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchAllMails = createAsyncThunk("emails/fetch", async (page) => {
  const resp = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`);
  const data = await resp.json();
  const editedData = data.list.map((email) => ({
    ...email,
    status: "unread",
    isFavorite: false,
  }));
  return editedData;
});

export { fetchAllMails };
