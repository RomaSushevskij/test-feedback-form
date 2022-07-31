import { useEffect, useMemo, useState } from "react";

import { EMPTY_STRING } from "../../constants";

export const MIN_LENGTH = "minLength";
export const MIN_LENGTH_VALUE = 10;
export const MAX_LENGTH = "maxLength";
export const MAX_LENGTH_VALUE = 300;
export const IS_EMPTY = "isEmpty";
export const VALID_EMAIL = "validEmail";
export const VALID_FULL_NAME = "validFullName";

const IS_EMPTY_ERROR_MESSAGE = "Field is required";
const MIN_LENGTH_ERROR_MESSAGE = `The field length must be at least ${MIN_LENGTH_VALUE} characters`;
const MAX_LENGTH_ERROR_MESSAGE = `The field length must have a maximum of ${MAX_LENGTH_VALUE} characters`;
const INVALID_EMAIL_ADDRESS = "Invalid email address";
const INVALID_FULL_NAME = "Invalid full name";

export const useValidation = (fieldValue: string, validations: any) => {
  const [errors, setErrors] = useState<string>(EMPTY_STRING);

  useEffect(() => {
    const validationsValues = Object.keys(validations);

    validationsValues.forEach(validation => {
      switch (validation) {
        case IS_EMPTY: {
          if (fieldValue) {
            setErrors(EMPTY_STRING);
            break;
          }
          setErrors(IS_EMPTY_ERROR_MESSAGE);
          break;
        }

        case MIN_LENGTH: {
          if (fieldValue && fieldValue.length < validations[validation]) {
            setErrors(MIN_LENGTH_ERROR_MESSAGE);
            break;
          }
          break;
        }
        case MAX_LENGTH: {
          if (fieldValue.length > validations[validation]) {
            setErrors(MAX_LENGTH_ERROR_MESSAGE);
            break;
          }

          break;
        }
        case VALID_EMAIL: {
          if (
            fieldValue &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fieldValue)
          ) {
            setErrors(INVALID_EMAIL_ADDRESS);
            break;
          }
          break;
        }
        case VALID_FULL_NAME: {
          if (fieldValue && !/^[A-Z]{3,30}\s[A-Z]{3,30}$/g.test(fieldValue)) {
            setErrors(INVALID_FULL_NAME);
            break;
          }
          break;
        }
        default:
      }

      return undefined;
    });
  }, [fieldValue, validations]);

  return useMemo(
    () => ({
      errors,
    }),
    [errors, fieldValue, validations],
  );
};
