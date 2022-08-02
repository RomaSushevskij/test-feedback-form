import { useEffect, useMemo, useState } from "react";

import { EMPTY_STRING } from "../../common/constants";

import {
  INVALID_EMAIL_ADDRESS,
  INVALID_FULL_NAME,
  IS_EMPTY,
  IS_EMPTY_ERROR_MESSAGE,
  MAX_LENGTH,
  MAX_LENGTH_ERROR_MESSAGE,
  MIN_LENGTH,
  MIN_LENGTH_ERROR_MESSAGE,
  VALID_EMAIL,
  VALID_FULL_NAME,
} from "./constatnts";

export const useValidation = (fieldValue: string, validations: any) => {
  const [errors, setErrors] = useState<string>(EMPTY_STRING);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);

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

  useEffect(() => {
    if (errors) {
      setIsValidInput(false);

      return;
    }
    setIsValidInput(true);
  }, [errors]);

  return useMemo(
    () => ({
      errors,
      isValidInput,
    }),
    [errors, fieldValue, validations],
  );
};
