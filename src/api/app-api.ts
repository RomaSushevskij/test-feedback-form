import { FeedbackFormDataType } from "../store/reducers/feedbackForm/types";

const SECONDS = 2000;

export const appApi = {
  sendFeedbackForm(formData: FeedbackFormDataType) {
    return new Promise<{ message: string }>(res => {
      console.log(formData);
      setTimeout(() => {
        res({ message: "Form submitted successfully" });
      }, SECONDS);
    });
  },
};
