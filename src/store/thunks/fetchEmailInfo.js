import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchEmailInfo = createAsyncThunk("email/info", async (emailId) => {
  const resp = await fetch(`https://flipkart-email-mock.now.sh/?id=${emailId}`);
  const data = await resp.json();
  console.log(data);
  return data;
});

export { fetchEmailInfo };
