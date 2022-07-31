import { FeedbackFormNames } from "../enums";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type FeedbackFormDataType = {
  [FeedbackFormNames.fullName]: string;
  [FeedbackFormNames.email]: string;
  [FeedbackFormNames.phone]: string;
  [FeedbackFormNames.birthDate]: string;
  [FeedbackFormNames.message]: string;
};

export type SendFeedbackParamsType = {
  formData: FeedbackFormDataType;
  requestStatus: boolean;
};
