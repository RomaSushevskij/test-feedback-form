import { FeedbackFormDataType } from "../store";

import { SECONDS } from "./constants";
import { ResponseFeedbackFormType } from "./types";

export const appApi = {
  sendFeedbackForm(formData: FeedbackFormDataType, requestStatus: boolean) {
    return new Promise<ResponseFeedbackFormType>((res, rej) => {
      setTimeout(() => {
        const successResponse: ResponseFeedbackFormType = {
          status: "success",
          message: "Form submitted successfully",
        };
        const errorResponse: ResponseFeedbackFormType = {
          status: "error",
          message: "Some error occurred",
        };

        if (requestStatus) rej(errorResponse);
        res(successResponse);
      }, SECONDS);
    });
  },
};
