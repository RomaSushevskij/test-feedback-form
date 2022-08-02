import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { appApi, ResponseFeedbackFormType } from "../../../api";
import { EMPTY_STRING } from "../../../common/constants";

import { RequestStatusType, SendFeedbackParamsType } from "./types";

export const sendFeedbackForm = createAsyncThunk<
  ResponseFeedbackFormType,
  SendFeedbackParamsType,
  { rejectValue: ResponseFeedbackFormType }
>(
  "feedbackForm/sendFeedbackForm",
  async ({ formData, requestStatus }: SendFeedbackParamsType, { rejectWithValue }) => {
    try {
      const { message, status } = await appApi.sendFeedbackForm(formData, requestStatus);

      return { message, status };
    } catch (e) {
      const errorData = e as ResponseFeedbackFormType;

      return rejectWithValue(errorData);
    }
  },
);

const slice = createSlice({
  name: "feedbackForm",
  initialState: {
    status: "idle" as RequestStatusType,
    message: EMPTY_STRING,
    responseStatus: EMPTY_STRING as "error" | "success",
  },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(sendFeedbackForm.pending, state => {
        state.status = "loading";
      })
      .addCase(sendFeedbackForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.message = action.payload.message;
          state.responseStatus = action.payload.status;
        }
      })
      .addCase(sendFeedbackForm.rejected, (state, action) => {
        state.status = "failed";

        // @ts-ignore
        state.message = action.payload.message;
        // @ts-ignore
        state.responseStatus = action.payload.status;
      }),
});

export const feedbackFormReducer = slice.reducer;
