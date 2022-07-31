import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { appApi } from "../../../api/app-api";
import { NullableType } from "../../types";

import { FeedbackFormNames } from "./enums";
import { RequestStatusType } from "./types";

export const sendFeedbackForm = createAsyncThunk(
  "feedbackForm/sendFeedbackForm",
  async () => {
    try {
      const formData = {
        [FeedbackFormNames.fullName]: "Roma",
        [FeedbackFormNames.email]: "roma@fa.as",
        [FeedbackFormNames.phone]: "+7 (234) 123-34-56",
        [FeedbackFormNames.birthDate]: "09.09.1995",
        [FeedbackFormNames.message]: "First test message",
      };
      const { message } = await appApi.sendFeedbackForm(formData);

      console.log(message);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("123");
    }
  },
);

const slice = createSlice({
  name: "feedbackForm",
  initialState: {
    status: "idle" as RequestStatusType,
    message: null as NullableType<string>,
  },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(sendFeedbackForm.pending, state => {
        state.status = "idle";
      })
      .addCase(sendFeedbackForm.fulfilled, state => {
        state.status = "succeeded";
      })
      .addCase(sendFeedbackForm.rejected, state => {
        state.status = "failed";
      }),
});

export const feedbackFormReducer = slice.reducer;
