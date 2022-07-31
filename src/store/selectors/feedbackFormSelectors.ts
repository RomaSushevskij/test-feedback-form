import { AppStateType } from "../types";

export const selectSendingStatus = (state: AppStateType) => state.feedbackForm.status;
export const selectMessage = (state: AppStateType) => state.feedbackForm.message;
export const selectResponseStatus = (state: AppStateType) =>
  state.feedbackForm.responseStatus;
